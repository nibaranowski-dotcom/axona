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

  // BRANCH-PER-STORY + PR HAND-OFF (never direct-to-main, never merge)
  await check('runner branches per story (uses branchPrefix)', () => /branchPrefix/.test(runner));
  await check('runner opens a PR (gh pr create or REST)', () => /pr\s+create/i.test(runner) || /pulls/i.test(runner));
  await check('runner NEVER auto-merges', () => !/pr\s+merge/i.test(runner) && !/merge_method|merge_pull/i.test(runner));
  await check('runner never pushes to baseBranch directly', () => !/push[^\n]*\bmain\b/i.test(runner));
  await check('runner requires GitHub auth before building', () => /ensureGitHubAuth/.test(runner));

  // HUMAN GATES LABELED
  const backlog = fs.existsSync('specs/backlog.md') ? read('specs/backlog.md') : '';
  await check('LAUNCH stories carry [human-gate]', () => /LAUNCH\.\d.*\[human-gate\]/i.test(backlog) || (cfg.humanGate?.ids || []).some((x: string) => /LAUNCH/.test(x)));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
