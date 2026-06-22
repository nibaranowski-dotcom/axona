// Run: pnpm verify src/scripts/verify-home-6.ts   (or: npx tsx src/scripts/verify-home-6.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.6 — thesis\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const thesis = fs.existsSync('components/thesis.tsx') ? read('components/thesis.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = thesis + content;

  // FILES + WIRING
  await check('components/thesis.tsx exists', () => !!thesis);
  await check('content/home.ts has a thesis object', () => /thesis\s*[:=]/.test(content));
  await check('page renders <Thesis', () => /<Thesis\b/.test(page));
  await check('section id="thesis"', () => /id=["']thesis["']/.test(thesis));

  // COPY (verbatim, content.md §7)
  await check('heading verbatim', () => /A robotics company's workforce is humans, machines, and agents\./.test(all));
  await check('body present (horizontal ERPs argument)', () => /Horizontal ERPs/.test(all) && /human-only company/.test(all));
  await check('moat payoff clause present', () => /a moat no horizontal incumbent can copy/.test(all));

  // STRUCTURE / SERVER-COMPONENT / a11y
  await check('thesis is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(thesis));
  await check('exactly one <h2> in thesis', () => (thesis.match(/<h2\b/g) || []).length === 1);

  // GUARDRAILS
  const files = ['components/thesis.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in thesis copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
