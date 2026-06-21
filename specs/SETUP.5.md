# PRD: Autonomous build loop — Builder subagent + headless runner + gate hooks

**Status**: Ready for Dev
**Priority**: P1
**Effort**: L (1.5–2 days)
**Last Updated**: 2026-06-21
**Backlog Reference**: SETUP.5

## Problem Statement
Today the operating loop is manual: a human pastes a `CPRD` row to Joe, saves the PRD, tells Claude Code to implement it, runs the gates, flips the backlog row, and repeats. That human is a serializer doing zero creative work between "PRD is written" and "tests are green." Without automating the mechanical handoff, throughput is capped at one-story-at-a-time-with-a-human-babysitting, and the gates (verify, tsc, Lighthouse, axe) only run when someone remembers. This story builds the orchestrator that drives planner→builder→gate→advance unattended for the **mechanical** stories, while deliberately halting at the **subjective** gates (design-critique, a11y sign-off, anything customer-named) so quality and content-integrity stay human-owned.

## Success Metrics
| Metric | Target |
|---|---|
| Mechanical `todo` stories taken from row → green gate with no human keystrokes | ≥ 1 end-to-end (proof), then N in a run |
| Gate enforced on every story (verify + `tsc --noEmit`) before a row flips to `done` | 100% — no flip without green |
| Loop halts (never auto-merges) on `[human-gate]` stories | 100% |
| Failed build retried then escalated, not silently marked done | ≤ 2 retries, then stop + write failure log |
| Each completed story produces a commit + updated `backlog.md` status | 100% |
| Each green story pushes a per-story branch + opens a PR (never merges, never pushes to `main`) | 100% |
| `main` stays green — no autonomous writes land on it | 100% |
| Loop is portable: same files drop into another repo with only config edits | Yes (config-driven, no Axona hardcoding in the runner) |

## User Stories
- As **Nicolas**, I want the loop to build mechanical stories unattended so that I only spend attention on taste and content-integrity calls.
- As **Joe**, I want the runner to invoke me with the exact `CPRD` row so that PRDs are authored consistently without copy-paste.
- As the **Builder**, I want a single instruction ("implement this spec, follow CLAUDE.md + design.md, run the gate") so that my job is unambiguous and gated on tests, not vibes.
- As a **reviewer**, I want the loop to stop at design/a11y/customer-named stories so that nothing subjective or unverified ships autonomously.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | `.claude/agents/builder.md` subagent: implements a given `specs/<id>.md`, follows CLAUDE.md + design.md, runs the story's verify script + `tsc --noEmit`, reports PASS/FAIL with the failing output | P0 | Worker role; context-isolated per story |
| R2 | `scripts/build-loop.mjs` headless runner: parse backlog → pick next eligible `todo` → invoke Joe (`claude -p`) to write the PRD → invoke Builder (`claude -p`) to implement → run gate → flip status + commit → loop | P0 | The orchestrator; no model logic of its own |
| R3 | Dependency + status awareness: only pick a row whose deps are `done`; respect backlog order | P0 | Parses the readable table + CPRD trigger lines |
| R4 | `[human-gate]` convention: rows flagged human-gate halt the loop with a notice instead of building | P0 | Default-gate LAUNCH.1/2/3 and any story touching customer/partner names |
| R5 | Retry + escalate: on gate FAIL, re-invoke Builder with the failure log up to `MAX_RETRIES` (default 2), then stop and write `logs/build-loop/<id>.fail.log` | P0 | Never flip a red story to done |
| R6 | `loop.config.json`: planner agent name, builder agent name, gate command, max retries, human-gate story IDs/labels, commit on/off, notify hook | P0 | Portability lever — no Axona specifics in the runner code |
| R7 | Optional `Stop`/`SubagentStop` hook in `.claude/settings.json` that runs the gate and emits a desktop/Slack notification on green/red | P1 | The "ping"; runner works without it but hook gives live signal |
| R8 | Structured run log (`logs/build-loop/run-<timestamp>.jsonl`) — one line per story: id, prd_ok, build_ok, gate_ok, retries, commit_sha | P1 | Observability |
| R9 | `--dry-run` (plan only, no model calls/commits) and `--once` (single story) flags | P1 | Safe to trial; cheap to test |
| R10 | README section "Autonomous build loop" documenting invoke, flags, config, and the human-gate rule | P1 | Operability |
| R11 | On green: create per-story branch `<branchPrefix><id>` off `baseBranch`, commit, push to `remote`, open a PR | P0 | The branch+PR hand-off; PR body links the spec + run log |
| R12 | **Never auto-merge; never commit/push to `baseBranch`.** Loop opens the PR; a human reviews + merges | P0 | The PR is where design-critique / a11y / customer-named sign-off happen |
| R13 | Push/PR via `gh` CLI if present, else GitHub REST with `GITHUB_TOKEN`; fail fast if neither is available | P1 | Don't half-commit then silently skip the push |

## Acceptance Criteria
- [ ] `node scripts/build-loop.mjs --dry-run` prints the next eligible story and the exact Joe + Builder prompts it *would* run, touching nothing.
- [ ] `node scripts/build-loop.mjs --once` on a mechanical story: writes `specs/<id>.md`, implements it, runs the gate, and only on green flips the backlog row to `done` and commits.
- [ ] A deliberately failing story is retried ≤ `MAX_RETRIES`, then the loop stops, leaves the row `todo`, and writes a `.fail.log` — no false `done`.
- [ ] A `[human-gate]` story halts the loop with a clear "human gate — <id> needs design-critique / a11y / sign-off" message and does not invoke the Builder.
- [ ] On a green story the loop creates `auto/<id>`, commits, pushes, and opens a PR targeting `main`; the PR body links the spec and run log.
- [ ] The loop never runs `git merge`/`gh pr merge` and never commits or pushes to `main` — verified by inspection and by the verify script.
- [ ] If neither `gh` nor `GITHUB_TOKEN` is available, the loop fails fast with a clear message *before* building (no orphaned local commits with no path to GitHub).
- [ ] No Axona-specific string is hardcoded in `build-loop.mjs`; all of it lives in `loop.config.json`.
- [ ] `pnpm verify src/scripts/verify-setup-5.ts` passes; `tsc --noEmit` clean.
- [ ] `docs/manual-checks.md` updated with the SETUP.5 block.

## Technical Requirements
- **Create `.claude/agents/builder.md`** — frontmatter `name: builder`; body: "Implement the spec file given to you. Follow CLAUDE.md and design.md. Use only design tokens. When code is written, run `pnpm verify src/scripts/verify-<id>.ts` and `tsc --noEmit`. Report `GATE: PASS` or `GATE: FAIL` followed by the failing output. Do not edit the backlog or commit — the runner owns that." Stop hooks in a subagent's frontmatter convert to SubagentStop events automatically.
- **Create `scripts/build-loop.mjs`** (Node ≥ 20, ESM). Shape:
  ```js
  // node scripts/build-loop.mjs [--once] [--dry-run] [--story <ID>]
  import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs';
  import { execFileSync } from 'node:child_process';
  const cfg = JSON.parse(readFileSync('loop.config.json', 'utf8'));
  const run = (args) => execFileSync('claude', args, { encoding: 'utf8', stdio: ['ignore','pipe','inherit'] });

  function nextStory(backlog) { /* parse table; first row status=todo, deps all done, not in cfg.humanGate */ }
  function isHumanGate(row) { return cfg.humanGate.ids.includes(row.id) || /\[human-gate\]/i.test(row.title); }

  for (;;) {
    const row = nextStory(readFileSync(cfg.backlog, 'utf8'));
    if (!row) { console.log('No eligible stories. Done.'); break; }
    if (isHumanGate(row)) { console.log(`HUMAN GATE — ${row.id} needs review (design-critique / a11y / sign-off). Stopping.`); break; }
    if (flags.dryRun) { console.log('DRY RUN — would build', row.id); break; }
    ensureGitHubAuth(cfg.git);          // gh CLI or GITHUB_TOKEN present, else fail fast BEFORE building

    // 1) Isolate: branch per story off baseBranch (never build on main)
    const branch = `${cfg.git.branchPrefix}${row.id}`;
    git(['fetch', cfg.git.remote, cfg.git.baseBranch]);
    git(['switch', '-C', branch, `${cfg.git.remote}/${cfg.git.baseBranch}`]);

    // 2) Planner writes the PRD (skip if specs/<id>.md already exists)
    run(['-p', `${cfg.plannerAgent ? '@'+cfg.plannerAgent+' ' : ''}CPRD "${row.cprd}"`, '--output-format','json' ]); // save stdout → specs/<id>.md
    // 3) Builder implements + self-gates
    let pass = false, tries = 0;
    while (!pass && tries <= cfg.maxRetries) {
      const out = run(['-p', `@${cfg.builderAgent} Implement specs/${row.id}.md, follow CLAUDE.md and design.md.${tries?' Previous gate failed:\n'+lastFail:''}`]);
      pass = runGate(row.id);            // execSync(cfg.gateCommand.replace('<id>', slug(row.id)))
      if (!pass) { lastFail = readGateOutput(); tries++; }
    }
    // 4) Advance or escalate — open a PR on green, NEVER merge, NEVER touch baseBranch
    if (pass) {
      flipStatus(cfg.backlog, row.id, 'done');
      if (cfg.git.commit) { git(['add','-A']); git(['commit','-m', `${row.id}: ${row.title}`]); }
      if (cfg.git.push)   { git(['push','-u', cfg.git.remote, branch]); }
      if (cfg.git.openPr) { openPr(branch, cfg.git.baseBranch, row, { draft: cfg.git.draftPr }); } // gh pr create — no merge
      logRun(row.id, { pass, tries, branch });
    } else {
      writeFileSync(`logs/build-loop/${row.id}.fail.log`, lastFail);
      console.log(`ESCALATE — ${row.id} failed after ${tries} tries. Branch ${branch} left for inspection.`);
      break;
    }
    if (flags.once) break;
  }
  ```
  (Sketch — Claude Code writes the real parser, JSON-output handling, and git/log helpers.)
- **Create `loop.config.json`** at repo root:
  ```json
  {
    "backlog": "specs/backlog.md",
    "plannerAgent": "joe",
    "builderAgent": "builder",
    "gateCommand": "pnpm verify src/scripts/verify-<id>.ts && pnpm exec tsc --noEmit",
    "maxRetries": 2,
    "git": {
      "commit": true,
      "push": true,
      "remote": "origin",
      "baseBranch": "main",
      "branchPrefix": "auto/",
      "openPr": true,
      "draftPr": false,
      "autoMerge": false
    },
    "humanGate": { "ids": ["LAUNCH.1","LAUNCH.2","LAUNCH.3"], "labels": ["[human-gate]"] },
    "notify": { "enabled": false, "command": "" }
  }
  ```
- **`.claude/settings.json`** — add an optional SubagentStop hook (matcher `builder`) that runs `cfg.gateCommand` and, on result, runs `notify.command` if enabled. The hook is the enforcer/ping; the runner is the driver. Both call the same gate so a manual Claude Code session is gated identically.
- **Mark human-gate rows in `backlog.md`** — append ` [human-gate]` to LAUNCH.1/2/3 titles (and HOME.8 until bios are confirmed) so both the runner and a human reading the file agree.
- **`src/scripts/verify-setup-5.ts`** — file-existence + config-shape checks (below).
- **Billing note:** `claude -p` / Agent SDK usage draws from a **separate monthly Agent SDK credit pool** (effective 2026-06-15), distinct from interactive limits. Loop runs consume it — surface in the README.

## UX Flow
```
node scripts/build-loop.mjs [--once|--dry-run|--story ID]
        │
        ▼
parse backlog ──► next row: status=todo AND deps done AND not human-gate
        │
        ├─ none eligible ─────────────► "Done." exit 0
        ├─ row is [human-gate] ───────► "HUMAN GATE — <id> needs review." stop (no build)
        └─ eligible mechanical row
                 │
                 ▼
        specs/<id>.md exists? ──no──► Joe (claude -p, CPRD row) ──► write specs/<id>.md
                 │ yes
                 ▼
        Builder (claude -p): "Implement specs/<id>.md, follow CLAUDE.md + design.md"
                 │
                 ▼
        check GitHub auth (gh or GITHUB_TOKEN) ──fail──► stop BEFORE building
                 │
                 ▼
        git switch -C auto/<id> off origin/main   (never build on main)
                 │
                 ▼
        Joe writes spec ──► Builder implements
                 │
                 ▼
        GATE: pnpm verify + tsc --noEmit
                 │
            ┌────┴─────┐
          PASS        FAIL
            │           │  retries left? ──yes──► re-invoke Builder w/ failure log
            │           └──no──► write logs/build-loop/<id>.fail.log ──► ESCALATE (branch kept), stop
            ▼
        flip row → done ──► commit ──► push auto/<id> ──► open PR → main  (NO merge)
            │
            ├─ --once ──► exit
            └─ loop ──► next row  (human reviews + merges the PR)
```

## Edge Cases
| Case | Handling |
|---|---|
| `specs/<id>.md` already exists | Skip the planner step; go straight to Builder (idempotent re-runs). |
| Story has unmet deps | Skip it; pick the next eligible row. If none, exit cleanly. |
| Gate command itself errors (not a test fail) | Treat as FAIL; capture stderr in the fail log; count as a retry. |
| Builder edits the backlog or commits | Forbidden by builder.md; runner owns status + git. If detected, runner reconciles from its own state. |
| Two loop processes run at once | Single-process assumption; document it. (Optional: lockfile `logs/build-loop/.lock`.) |
| `claude -p` not authenticated / no Agent SDK credit | Fail fast with a clear message before touching files. |
| Customer/partner-named story slips through without `[human-gate]` | Content-integrity rule still binds the Builder; but the **defense** is labeling — add `[human-gate]` to any customer-named row. Documented in README. |
| Runner started before SETUP.2 (no package.json/pnpm) | Gate command fails fast; `--dry-run` still works for planning. Loop is authored now, runs after SETUP.2. |
| Neither `gh` nor `GITHUB_TOKEN` available | Fail fast at `ensureGitHubAuth` before any build — never produce local commits with no path to GitHub. |
| Branch `auto/<id>` already exists (crash resume) | `git switch -C` resets it from `origin/main`; if a PR is already open, update it instead of opening a duplicate. |
| Push rejected (protected branch / perms) | Treat as escalation: leave the branch, write a `.push.fail.log`, stop. Never fall back to pushing `main`. |
| Working tree dirty at loop start | Refuse to start; require a clean tree so per-story branches stay isolated. |
| Someone set `git.autoMerge: true` | Disallowed — the runner rejects it at startup. The loop opens PRs; humans merge. (Verify script asserts no merge call exists.) |

## Out of Scope
- Parallel/fan-out building (tens of subagents at once). This is a **sequential** loop by design — simpler to reason about and to gate. Parallelism is a later story if throughput demands it.
- Auto-approving subjective gates (design-critique, accessibility sign-off). Permanently human by policy, not a v1 limitation.
- A web dashboard/observability UI. JSONL logs only for now.
- CI integration (GitHub Actions). The runner is local-first; CI is a follow-up.
- Editing application/site code — this story ships tooling only.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.2 (scaffold: package.json, pnpm, tsc) | todo | The gate command running end-to-end (`--dry-run` works without it) |
| SETUP.1 (verified stack / pattern frozen) | done | Confirms Node ≥ 20 for the runner |
| `claude` CLI + Agent SDK credit available | external | Any non-dry run |
| `gh` CLI authenticated (or `GITHUB_TOKEN` set) + a configured `origin` remote | external | Push + PR step (R11–R13) |
| GitHub repo exists with `main` as base; branch protection on `main` recommended | external | Keeps `main` green; blocks accidental direct writes |
| Joe agent (`.claude/agents/joe.md`) | done | Planner step |

## Implementation Plan
**Day 1 — Worker + gate.**
- Morning: write `.claude/agents/builder.md`; define the gate contract (`GATE: PASS/FAIL` + output). Add `loop.config.json`.
- Afternoon: `scripts/build-loop.mjs` skeleton — backlog parser, eligibility (status + deps + human-gate), `--dry-run`. Verify dry-run prints correct next story + prompts.

**Day 2 — Drive + gate + escalate.**
- Morning: wire the planner + builder `claude -p` invocations, JSON output handling, the gate runner, retry/escalate, status flip, git commit, run log.
- Afternoon: `ensureGitHubAuth` + branch-per-story + commit/push/`gh pr create` (no merge); optional SubagentStop + notify hook in `.claude/settings.json`; mark `[human-gate]` rows; README section (incl. `gh auth`/`GITHUB_TOKEN` + branch-protection note); `verify-setup-5.ts`; run `--once` on one mechanical story end-to-end and confirm a PR opens against `main` without merging; fix until green.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-setup-5.ts   (or: npx tsx src/scripts/verify-setup-5.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.5 — autonomous build loop\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');

  // FILES
  await check('builder subagent exists', () => fs.existsSync('.claude/agents/builder.md'));
  await check('runner exists', () => fs.existsSync('scripts/build-loop.mjs'));
  await check('loop.config.json exists', () => fs.existsSync('loop.config.json'));

  // BUILDER CONTRACT
  const builder = fs.existsSync('.claude/agents/builder.md') ? read('.claude/agents/builder.md') : '';
  await check('builder named "builder"', () => /name:\s*builder/i.test(builder));
  await check('builder runs the gate (verify + tsc)', () => /verify/i.test(builder) && /tsc\s*--noEmit/i.test(builder));
  await check('builder forbidden from committing/backlog edits', () => /commit/i.test(builder) && /backlog/i.test(builder));

  // CONFIG SHAPE
  const cfg = fs.existsSync('loop.config.json') ? JSON.parse(read('loop.config.json')) : {};
  await check('config has gateCommand', () => typeof cfg.gateCommand === 'string' && cfg.gateCommand.length > 0);
  await check('config has maxRetries number', () => typeof cfg.maxRetries === 'number');
  await check('config declares human-gate ids/labels', () => !!cfg.humanGate && (Array.isArray(cfg.humanGate.ids) || Array.isArray(cfg.humanGate.labels)));
  await check('config points at a backlog file', () => typeof cfg.backlog === 'string');

  // GIT / PR CONFIG
  await check('config has a git block', () => !!cfg.git && typeof cfg.git === 'object');
  await check('git.baseBranch + branchPrefix set', () => typeof cfg.git?.baseBranch === 'string' && typeof cfg.git?.branchPrefix === 'string');
  await check('git.autoMerge is false (loop never merges)', () => cfg.git?.autoMerge === false);

  // PORTABILITY: no Axona hardcoding in the runner
  const runner = fs.existsSync('scripts/build-loop.mjs') ? read('scripts/build-loop.mjs') : '';
  await check('runner reads loop.config.json', () => /loop\.config\.json/.test(runner));
  await check('runner has no hardcoded "Axona"', () => !/Axona/i.test(runner));
  await check('runner supports --dry-run', () => /dry-?run/i.test(runner));
  await check('runner branches per story (uses branchPrefix)', () => /branchPrefix/.test(runner));
  await check('runner opens a PR (gh pr create or REST)', () => /pr\s+create/i.test(runner) || /pulls/i.test(runner));
  await check('runner NEVER auto-merges', () => !/pr\s+merge/i.test(runner) && !/merge_method|merge_pull/i.test(runner));
  await check('runner never pushes to baseBranch directly', () => !/push[^\\n]*\bmain\b/i.test(runner));

  // HUMAN GATES LABELED
  const backlog = fs.existsSync('specs/backlog.md') ? read('specs/backlog.md') : '';
  await check('LAUNCH stories carry [human-gate]', () => /LAUNCH\.\d.*\[human-gate\]/i.test(backlog) || (cfg.humanGate?.ids||[]).some((x:string)=>/LAUNCH/.test(x)));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## SETUP.5 — autonomous build loop
- [ ] `node scripts/build-loop.mjs --dry-run` prints the correct next story + the Joe/Builder prompts, and writes nothing.
- [ ] `--once` on a mechanical story: branch auto/<id> created off main, PRD written, implemented, gate green, row flipped to done, commit + push + PR opened.
- [ ] The PR targets main, its body links the spec + run log, and it is NOT merged by the loop.
- [ ] `main` has no new commits from the run — all work is on the auto/<id> branch / PR.
- [ ] With gh logged out AND no GITHUB_TOKEN, the loop fails fast before building (no orphan commits).
- [ ] A forced gate failure retries ≤ maxRetries, then stops with a .fail.log and leaves the row todo (branch kept, no PR).
- [ ] A [human-gate] story halts the loop without invoking the Builder.
- [ ] Drop the four files into a second repo, edit only loop.config.json, and --dry-run resolves a story there too (portability).
```

## Common Mistakes to Avoid
- **Letting the Builder mark stories done.** The runner is the single writer of backlog status and git — the Builder only implements and reports PASS/FAIL. Two writers = corrupt state.
- **Gating on the model's word.** "Claude says it's done" is not the gate; `pnpm verify` + `tsc --noEmit` exiting 0 is. Parse the exit code, not the prose.
- **Hardcoding Axona.** The whole value is portability — every project-specific string lives in `loop.config.json`. The verify script fails if "Axona" appears in the runner.
- **Auto-running subjective gates.** Do not have the loop "pass" design-critique or accessibility by itself. Those halt for a human — that's the policy, enforced by `[human-gate]`.
- **Forgetting idempotency.** If `specs/<id>.md` exists, skip the planner. A re-run after a crash must not double-write PRDs or double-commit.
- **Ignoring the Agent SDK credit pool.** Long loops burn `claude -p` credits separately from interactive usage (post-2026-06-15). Surface cost in the README so a runaway loop isn't a surprise.
- **Auto-merging the PR.** The loop opens PRs and stops. It must never run `gh pr merge` / merge via API — the PR is the human review surface; auto-merge defeats the entire safety model.
- **Building on `main`.** Always `git switch -C auto/<id>` off `origin/main` *before* the Builder runs. Committing on `main` then pushing is the failure mode branch protection exists to catch — don't rely on protection alone, branch first.
- **Committing before the gate is green.** Branch first, build, gate, and only commit/push/PR on PASS. A red story leaves no commits on the remote — just a local branch and a `.fail.log`.

## Build Rules for This Story
- Tooling-only story: no `app/`, `components/`, or `content/` output; SEO/CWV/design-token rules don't bind here (they bind on the *stories the loop builds*, enforced by their own verify scripts).
- Marketing-site flavor: no auth/DB/jobs added; Joe's generic SaaS defaults don't apply.
- Content integrity still governs anything the loop touches: customer/partner-named stories must be `[human-gate]` — the loop must never autonomously ship a named claim.
- Portability is a hard requirement, not a nice-to-have: runner code is config-driven; Axona specifics live only in `loop.config.json` and `backlog.md`.
- Precedence: where this PRD and Joe's defaults differ, this PRD wins.

## Rollback Plan
Delete `scripts/build-loop.mjs`, `.claude/agents/builder.md`, `loop.config.json`, `src/scripts/verify-setup-5.ts`, the `logs/build-loop/` dir, the SubagentStop hook block from `.claude/settings.json`, the `[human-gate]` tags, and the SETUP.5 block from `docs/manual-checks.md`. No application code, no schema, no data — the loop only orchestrates existing tools. **Zero data risk.**
