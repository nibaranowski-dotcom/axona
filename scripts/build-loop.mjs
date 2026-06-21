#!/usr/bin/env node
// Autonomous build loop (SETUP.5) — planner -> builder -> gate -> advance, sequentially.
//
// Usage:
//   node scripts/build-loop.mjs [--once] [--dry-run] [--story <ID>]
//
//   --dry-run   Plan only. Print the next eligible story and the exact planner/builder prompts
//               that WOULD run. No model calls, no writes, no commits.
//   --once      Build a single eligible story, then exit (default: loop until none eligible).
//   --story ID  Force a specific story id instead of picking the next eligible one.
//
// This runner is intentionally project-agnostic: every project-specific value (backlog path,
// agent names, gate command, human-gate ids/labels) lives in loop.config.json. Do not hardcode a
// project name here — portability is a hard requirement of SETUP.5 (the verify script enforces it).

import {
  readFileSync,
  writeFileSync,
  appendFileSync,
  existsSync,
  mkdirSync,
  rmSync,
} from 'node:fs';
import { execFileSync, execSync } from 'node:child_process';

const LOG_DIR = 'logs/build-loop';
const LOCK = `${LOG_DIR}/.lock`;

// ---------- args ----------
function parseArgs(argv) {
  const flags = { once: false, dryRun: false, story: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--once') flags.once = true;
    else if (a === '--dry-run' || a === '--dryrun') flags.dryRun = true;
    else if (a === '--story') flags.story = argv[++i];
    else if (a.startsWith('--story=')) flags.story = a.slice('--story='.length);
  }
  return flags;
}
const flags = parseArgs(process.argv.slice(2));

// ---------- config ----------
if (!existsSync('loop.config.json')) {
  console.error('FATAL: loop.config.json not found at repo root.');
  process.exit(1);
}
const cfg = JSON.parse(readFileSync('loop.config.json', 'utf8'));
const SPECS_DIR = cfg.specsDir || 'specs';
const MAX_RETRIES = Number.isInteger(cfg.maxRetries) ? cfg.maxRetries : 2;

// ---------- helpers: ids ----------
const slug = (id) => id.toLowerCase().replace(/\./g, '-'); // SETUP.5 -> setup-5
const specPath = (id) => `${SPECS_DIR}/${id}.md`;

// ---------- helpers: backlog parsing ----------
// Parse the "Backlog (readable)" markdown table. Columns (pipe-split, leading empty cell dropped):
//   [#, Epic, StoryID, Title, Pri, Size, Status, Deps]
const COL = { num: 0, epic: 1, id: 2, title: 3, pri: 4, size: 5, status: 6, deps: 7 };

function splitRow(line) {
  // "| a | b |" -> ['a','b'] (drop the empty edges)
  const parts = line.split('|');
  return parts.slice(1, parts.length - 1).map((c) => c.trim());
}

function isTableRow(line) {
  const t = line.trim();
  if (!t.startsWith('|')) return false;
  if (/^\|[\s|:-]+\|?$/.test(t)) return false; // separator row ---|---
  return true;
}

function parseBacklog(text) {
  const rows = [];
  for (const line of text.split('\n')) {
    if (!isTableRow(line)) continue;
    const cells = splitRow(line);
    if (cells.length < 8) continue;
    const id = cells[COL.id];
    // header row has "StoryID" as the id cell — skip non-id-looking headers
    if (!id || /storyid/i.test(id)) continue;
    rows.push({
      raw: line,
      id,
      title: cells[COL.title],
      status: cells[COL.status].toLowerCase(),
      deps: cells[COL.deps],
    });
  }
  return rows;
}

// Deps cell -> array of required ids ("—"/empty -> none; "HOME.*" -> wildcard).
function parseDeps(depsCell) {
  if (!depsCell || depsCell === '—' || /^none$/i.test(depsCell)) return [];
  return depsCell
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean);
}

function depsSatisfied(row, rows) {
  const byId = new Map(rows.map((r) => [r.id, r]));
  for (const dep of parseDeps(row.deps)) {
    if (dep.endsWith('.*')) {
      const prefix = dep.slice(0, -1); // "HOME." for "HOME.*"
      const matches = rows.filter((r) => r.id.startsWith(prefix));
      if (matches.length === 0 || !matches.every((r) => r.status === 'done')) return false;
    } else {
      const d = byId.get(dep);
      if (!d || d.status !== 'done') return false;
    }
  }
  return true;
}

function isHumanGate(row) {
  const ids = cfg.humanGate?.ids || [];
  const labels = cfg.humanGate?.labels || [];
  if (ids.includes(row.id)) return true;
  return labels.some((lbl) => row.title.toLowerCase().includes(lbl.toLowerCase()));
}

// First eligible row: status=todo AND deps satisfied (respecting table order). Human-gate rows are
// returned here too — the caller halts on them so they act as a barrier in backlog order.
function nextStory(rows) {
  for (const row of rows) {
    if (row.status !== 'todo') continue;
    if (!depsSatisfied(row, rows)) continue;
    return row;
  }
  return null;
}

// ---------- helpers: CPRD trigger extraction ----------
// Pull the exact `CPRD "..."` payload for a story id from the trigger code block.
function getCprd(text, id) {
  const re = /CPRD\s+"([^"]*)"/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m[1].includes(id)) return m[1];
  }
  return null;
}

// ---------- prompts ----------
function plannerPrompt(cprd) {
  const at = cfg.plannerAgent ? `@${cfg.plannerAgent} ` : '';
  return `${at}CPRD "${cprd}"`;
}
function builderPrompt(id, lastFail) {
  const at = cfg.builderAgent ? `@${cfg.builderAgent} ` : '';
  const retry = lastFail ? `\n\nThe previous gate failed. Fix these and re-run the gate:\n${lastFail}` : '';
  return `${at}Implement ${specPath(id)}, follow CLAUDE.md and design.md.${retry}`;
}

// ---------- claude CLI ----------
function claudeAvailable() {
  try {
    execFileSync('claude', ['--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

function runClaude(prompt, { json = false } = {}) {
  const args = ['-p', prompt];
  if (json) args.push('--output-format', 'json');
  const out = execFileSync('claude', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
  if (!json) return out;
  // --output-format json wraps the result; fall back to raw if it isn't parseable.
  try {
    const parsed = JSON.parse(out);
    return parsed.result ?? parsed.text ?? out;
  } catch {
    return out;
  }
}

// ---------- gate ----------
function runGate(id) {
  const cmd = cfg.gateCommand.replaceAll('<id>', slug(id));
  try {
    const output = execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { ok: true, output, cmd };
  } catch (e) {
    // Non-zero exit (test failure OR the gate command itself erroring) -> FAIL.
    const output = `$ ${cmd}\n${e.stdout || ''}${e.stderr || ''}${e.message || ''}`;
    return { ok: false, output, cmd };
  }
}

// ---------- backlog status writer (the runner is the SINGLE writer of status) ----------
function flipStatus(backlogPath, id, status) {
  const text = readFileSync(backlogPath, 'utf8');
  const lines = text.split('\n');
  let flipped = false;
  for (let i = 0; i < lines.length; i++) {
    if (!isTableRow(lines[i])) continue;
    const cells = splitRow(lines[i]);
    if (cells.length < 8 || cells[COL.id] !== id) continue;
    // rebuild preserving the original spacing style ("| a | b |")
    cells[COL.status] = status;
    lines[i] = `| ${cells.join(' | ')} |`;
    flipped = true;
    break;
  }
  if (!flipped) throw new Error(`flipStatus: row ${id} not found in ${backlogPath}`);
  writeFileSync(backlogPath, lines.join('\n'));
}

// ---------- git / GitHub hand-off ----------
// Policy: every green story lands as a per-story branch + a PR against baseBranch. The loop NEVER
// merges and NEVER commits or pushes to baseBranch. A human reviews and merges the PR.
const GIT = cfg.git || {};

function git(args, opts = {}) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts });
}
function gitQuiet(args) {
  try {
    git(args);
    return true;
  } catch {
    return false;
  }
}
function inGitRepo() {
  return gitQuiet(['rev-parse', '--is-inside-work-tree']);
}

// Reject the one config combination that would break the safety model.
function rejectAutoMerge() {
  if (GIT.autoMerge === true) {
    console.error(
      'FATAL: git.autoMerge must be false. The loop opens PRs for human review and never merges. ' +
        'Set "autoMerge": false in loop.config.json.',
    );
    process.exit(1);
  }
}

// gh CLI (authenticated) OR GITHUB_TOKEN must be present BEFORE building — never orphan a local
// commit with no path to GitHub. Also require a git repo and a clean working tree.
function ghAvailable() {
  try {
    execFileSync('gh', ['auth', 'status'], { stdio: ['ignore', 'pipe', 'pipe'] });
    return true;
  } catch {
    return false;
  }
}
function ensureGitHubAuth() {
  if (!(GIT.commit || GIT.push || GIT.openPr)) return; // git hand-off disabled entirely
  if (!inGitRepo()) {
    console.error('FATAL: not a git repository. The loop pushes per-story branches; initialize git + a remote first.');
    process.exit(1);
  }
  const hasGh = ghAvailable();
  const hasToken = !!process.env.GITHUB_TOKEN;
  if ((GIT.push || GIT.openPr) && !hasGh && !hasToken) {
    console.error(
      'FATAL: no GitHub access. Run `gh auth login` or set GITHUB_TOKEN before a non-dry run. ' +
        'Refusing to build so no local commit is orphaned without a path to a PR.',
    );
    process.exit(1);
  }
  return { hasGh, hasToken };
}
function ensureCleanTree() {
  if (!inGitRepo()) return;
  const status = git(['status', '--porcelain']).trim();
  if (status) {
    console.error(
      'FATAL: working tree is dirty. Commit or stash your changes first so per-story branches stay isolated.\n' +
        status,
    );
    process.exit(1);
  }
}

const branchName = (id) => `${GIT.branchPrefix}${id}`;

// Isolate the build: branch per story off baseBranch. -C resets an existing branch (crash resume).
// The Builder always runs here, never on baseBranch.
function startBranch(id) {
  const branch = branchName(id);
  git(['fetch', GIT.remote, GIT.baseBranch]);
  git(['switch', '-C', branch, `${GIT.remote}/${GIT.baseBranch}`]);
  return branch;
}

// Does an open PR already exist for this branch? (crash-resume idempotency)
function findOpenPr(branch) {
  try {
    const out = execFileSync('gh', ['pr', 'list', '--head', branch, '--state', 'open', '--json', 'number,url'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const arr = JSON.parse(out || '[]');
    return arr[0] || null;
  } catch {
    return null;
  }
}

function prBody(row, branch) {
  return [
    `Autonomous build loop — \`${row.id}\`.`,
    '',
    `**Story:** ${row.title}`,
    `**Spec:** \`${specPath(row.id)}\``,
    `**Run log:** \`${RUN_LOG()}\``,
    `**Branch:** \`${branch}\` (off \`${GIT.baseBranch}\`)`,
    '',
    'Gate is green (`pnpm verify` + `tsc --noEmit`). This PR is the human review surface for ' +
      'design-critique / a11y / content sign-off. The loop did not merge it.',
  ].join('\n');
}

// Open the PR via `gh pr create`, or update the existing one. The loop never merges; a human
// merges through the PR review surface. (No merge call via gh or the REST API, ever.)
function openOrUpdatePr(row, branch) {
  const existing = findOpenPr(branch);
  if (existing) {
    try {
      execFileSync('gh', ['pr', 'edit', String(existing.number), '--body', prBody(row, branch)], {
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch {
      /* edit is best-effort */
    }
    console.log(`  PR already open — updated ${existing.url}`);
    return existing.url;
  }
  const args = [
    'pr', 'create',
    '--base', GIT.baseBranch,
    '--head', branch,
    '--title', `${row.id}: ${row.title}`,
    '--body', prBody(row, branch),
  ];
  if (GIT.draftPr) args.push('--draft');
  const out = execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const url = out.trim().split('\n').pop();
  console.log(`  PR opened -> ${url}`);
  return url;
}

// Commit + push the branch + open/update PR. Returns {sha, branch, prUrl} or throws a push error
// the caller turns into an escalation. NEVER pushes baseBranch, NEVER merges.
function landBranch(row, branch) {
  let sha = null;
  if (GIT.commit) {
    git(['add', '-A']);
    git(['commit', '-m', `${row.id}: ${row.title}`]);
    sha = git(['rev-parse', '--short', 'HEAD']).trim();
  }
  let prUrl = null;
  if (GIT.push) {
    try {
      git(['push', '-u', GIT.remote, branch]);
    } catch (e) {
      const err = new Error((e.stderr || e.stdout || e.message || '').toString());
      err.isPushFail = true;
      throw err;
    }
    if (GIT.openPr) prUrl = openOrUpdatePr(row, branch);
  }
  return { sha, branch, prUrl };
}

// ---------- run log ----------
function ensureLogDir() {
  mkdirSync(LOG_DIR, { recursive: true });
}
const RUN_LOG = () => `${LOG_DIR}/run-${runStamp}.jsonl`;
let runStamp = '';
function logRun(entry) {
  appendFileSync(RUN_LOG(), JSON.stringify(entry) + '\n');
}

// ---------- lock ----------
function acquireLock() {
  ensureLogDir();
  if (existsSync(LOCK)) {
    console.error(
      `FATAL: ${LOCK} exists — another build loop may be running. ` +
        `If you are sure it is not, delete the lockfile and retry.`,
    );
    process.exit(1);
  }
  writeFileSync(LOCK, String(process.pid));
}
function releaseLock() {
  try {
    rmSync(LOCK, { force: true });
  } catch {
    /* noop */
  }
}

// ---------- main ----------
function selectRow(rows) {
  if (flags.story) {
    const row = rows.find((r) => r.id === flags.story);
    if (!row) {
      console.error(`FATAL: --story ${flags.story} not found in backlog.`);
      process.exit(1);
    }
    return row;
  }
  return nextStory(rows);
}

async function main() {
  // ---- DRY RUN: plan only, touch nothing (no lock, no model, no writes) ----
  if (flags.dryRun) {
    const backlogText = readFileSync(cfg.backlog, 'utf8');
    const rows = parseBacklog(backlogText);
    const row = selectRow(rows);
    if (!row) {
      console.log('DRY RUN — no eligible stories. Done.');
      return;
    }
    console.log(`DRY RUN — next eligible story: ${row.id} — ${row.title}`);
    if (isHumanGate(row)) {
      console.log(
        `HUMAN GATE — ${row.id} needs human review (design-critique / a11y / sign-off). ` +
          `The loop would STOP here and not invoke the Builder.`,
      );
      return;
    }
    const specExists = existsSync(specPath(row.id));
    console.log(`\nspecs/${row.id}.md exists? ${specExists ? 'yes (planner SKIPPED)' : 'no (planner runs)'}`);
    if (!specExists) {
      const cprd = getCprd(backlogText, row.id);
      console.log('\nWould run PLANNER:');
      console.log(`  claude -p ${JSON.stringify(plannerPrompt(cprd ?? row.id))} --output-format json`);
      console.log(`  -> save stdout to ${specPath(row.id)}`);
    }
    console.log('\nWould isolate on BRANCH:');
    console.log(`  git fetch ${GIT.remote} ${GIT.baseBranch} && git switch -C ${branchName(row.id)} ${GIT.remote}/${GIT.baseBranch}`);
    console.log('\nWould run BUILDER (on the branch, never on ' + GIT.baseBranch + '):');
    console.log(`  claude -p ${JSON.stringify(builderPrompt(row.id, null))}`);
    console.log('\nWould run GATE:');
    console.log(`  ${cfg.gateCommand.replaceAll('<id>', slug(row.id))}`);
    console.log('\nOn green: flip backlog row -> done' +
      (GIT.commit ? `, commit "${row.id}: ${row.title}"` : '') +
      (GIT.push ? `, push ${branchName(row.id)} to ${GIT.remote}` : '') +
      (GIT.openPr ? `, open PR -> ${GIT.baseBranch} (NEVER merged)` : '') +
      '. Nothing written in dry-run.');
    return;
  }

  // ---- LIVE RUN ----
  if (!claudeAvailable()) {
    console.error(
      'FATAL: `claude` CLI not available (not installed or not authenticated). ' +
        'Authenticate and ensure Agent SDK credit before a non-dry run. Use --dry-run to plan offline.',
    );
    process.exit(1);
  }

  // Fail fast BEFORE building so no local commit is orphaned and main stays untouched.
  rejectAutoMerge();
  ensureGitHubAuth();
  ensureCleanTree();

  acquireLock();
  process.on('exit', releaseLock);
  process.on('SIGINT', () => {
    releaseLock();
    process.exit(130);
  });

  ensureLogDir();
  runStamp = new Date().toISOString().replace(/[:.]/g, '-');

  for (;;) {
    const backlogText = readFileSync(cfg.backlog, 'utf8');
    const rows = parseBacklog(backlogText);
    const row = selectRow(rows);

    if (!row) {
      console.log('No eligible stories. Done.');
      break;
    }
    if (isHumanGate(row)) {
      console.log(
        `HUMAN GATE — ${row.id} needs human review (design-critique / a11y / sign-off). Stopping.`,
      );
      break;
    }

    console.log(`\n=== Building ${row.id} — ${row.title} ===`);

    // 0) Isolate: branch per story off baseBranch. The Builder never runs on baseBranch.
    //    -C resets an existing auto/<id> branch (crash-resume safe).
    const branch = startBranch(row.id);
    console.log(`[git] on branch ${branch} (off ${GIT.remote}/${GIT.baseBranch})`);

    // 1) Planner writes the PRD (idempotent: skip if spec already exists)
    let prdOk = true;
    if (!existsSync(specPath(row.id))) {
      const cprd = getCprd(backlogText, row.id) ?? row.id;
      console.log(`[planner] ${cfg.plannerAgent || 'inline'} writing ${specPath(row.id)} …`);
      try {
        const prd = runClaude(plannerPrompt(cprd), { json: true });
        writeFileSync(specPath(row.id), prd);
      } catch (e) {
        prdOk = false;
        console.error(`[planner] FAILED: ${e.message}`);
      }
      if (!prdOk) {
        logRun({ id: row.id, prd_ok: false, build_ok: false, gate_ok: false, retries: 0, commit_sha: null });
        console.log(`ESCALATE — ${row.id} planner step failed. Stopping.`);
        break;
      }
    } else {
      console.log(`[planner] ${specPath(row.id)} exists — skipping.`);
    }

    // 2) Builder implements + self-gates; runner re-checks the gate as the authority.
    let pass = false;
    let tries = 0;
    let lastFail = '';
    while (!pass && tries <= MAX_RETRIES) {
      console.log(`[builder] attempt ${tries + 1}/${MAX_RETRIES + 1} …`);
      try {
        runClaude(builderPrompt(row.id, tries ? lastFail : null));
      } catch (e) {
        lastFail = `Builder invocation error: ${e.message}`;
        tries++;
        continue;
      }
      const gate = runGate(row.id);
      pass = gate.ok;
      if (!pass) {
        lastFail = gate.output;
        tries++;
        console.log(`[gate] FAIL (attempt ${tries}/${MAX_RETRIES + 1})`);
      } else {
        console.log('[gate] PASS');
      }
    }

    // 3) Advance or escalate
    if (pass) {
      flipStatus(cfg.backlog, row.id, 'done');
      let landed;
      try {
        landed = landBranch(row, branch);
      } catch (e) {
        if (e.isPushFail) {
          // Push rejected (protected branch / perms). Keep the branch, write a log, STOP.
          // Never fall back to writing baseBranch.
          const pPath = `${LOG_DIR}/${row.id}.push.fail.log`;
          writeFileSync(pPath, e.message || 'push rejected with no captured output');
          logRun({ id: row.id, prd_ok: true, build_ok: true, gate_ok: true, retries: tries, commit_sha: null, push_ok: false, branch });
          console.log(
            `ESCALATE — ${row.id} gate green but push rejected. Branch ${branch} kept locally. See ${pPath}.`,
          );
          break;
        }
        throw e;
      }
      logRun({
        id: row.id, prd_ok: true, build_ok: true, gate_ok: true, retries: tries,
        commit_sha: landed.sha, push_ok: GIT.push, branch, pr_url: landed.prUrl,
      });
      console.log(
        `DONE — ${row.id} (retries: ${tries})${landed.sha ? `, commit ${landed.sha}` : ''}` +
          `${landed.prUrl ? `, PR ${landed.prUrl}` : ''}.`,
      );
    } else {
      const failPath = `${LOG_DIR}/${row.id}.fail.log`;
      writeFileSync(failPath, lastFail || 'gate failed with no captured output');
      logRun({ id: row.id, prd_ok: true, build_ok: false, gate_ok: false, retries: tries, commit_sha: null, branch });
      console.log(
        `ESCALATE — ${row.id} failed after ${tries} attempt(s). Row left 'todo'. ` +
          `Branch ${branch} kept for inspection (no PR). See ${failPath}.`,
      );
      break;
    }

    if (flags.once || flags.story) break;
  }
}

main().catch((e) => {
  console.error(`FATAL: ${e.stack || e.message}`);
  process.exit(1);
});
