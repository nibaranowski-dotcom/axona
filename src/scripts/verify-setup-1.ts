// Run: pnpm verify src/scripts/verify-setup-1.ts   (or: npx tsx src/scripts/verify-setup-1.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.1 — verify-latest pass / pinned versions\n');
  const fs = await import('fs');
  const claude = fs.readFileSync('CLAUDE.md', 'utf8');

  // VERIFIED-STACK BLOCK
  await check('CLAUDE.md has a "Verified stack (pinned" block', () => /##\s*Verified stack \(pinned/i.test(claude));
  await check('Pins Next.js 16', () => /Next\.js\s*16\b/.test(claude));
  await check('Notes Turbopack default', () => /Turbopack/i.test(claude));
  await check('Pins Node >= 20', () => /Node\s*(>=|≥)\s*20/.test(claude));
  await check('Pins shadcn New York', () => /New York/i.test(claude) && /shadcn/i.test(claude));
  await check('Notes unified radix-ui package', () => /radix-ui/i.test(claude));
  await check('Confirms WCAG 2.2 AA', () => /WCAG\s*2\.2\s*AA/i.test(claude));
  await check('Records a current model string', () => /claude-(opus-4-8|sonnet-4-6|haiku-4-5)/i.test(claude));

  // CHANGELOG
  await check('Has a Changelog entry dated 2026-06-21', () => /##\s*Changelog/i.test(claude) && /2026-06-21/.test(claude));

  // MANUAL CHECKS
  const manual = fs.existsSync('docs/manual-checks.md') ? fs.readFileSync('docs/manual-checks.md', 'utf8') : '';
  await check('docs/manual-checks.md has SETUP.1 block', () => /##\s*SETUP\.1/i.test(manual));

  // SCAFFOLD OWNERSHIP: SETUP.1 was docs-only. The package.json scaffold is introduced by SETUP.2
  // (verified by verify-setup-2.ts). The original "no package.json" guard was scoped to the SETUP.1
  // PR and is obsolete once SETUP.2 lands — assert the successor instead so this script stays green.
  await check('Scaffold owned by SETUP.2 (its verify script present)', () => fs.existsSync('src/scripts/verify-setup-2.ts'));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
