// Run: pnpm verify src/scripts/verify-home-2.ts   (or: npx tsx src/scripts/verify-home-2.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.2 — the problem section\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const problem = fs.existsSync('components/problem.tsx') ? read('components/problem.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = problem + content + page;

  // FILES + WIRING
  await check('components/problem.tsx exists', () => !!problem);
  await check('content/home.ts has a problem object', () => /problem\s*[:=]/.test(content));
  await check('page renders <Problem', () => /<Problem\b/.test(page));
  await check('section id="problem"', () => /id=["']problem["']/.test(problem));
  await check('section is aria-labelledby="problem-title"', () => /aria-labelledby=["']problem-title["']/.test(problem));

  // ORDER — Problem sits between Hero and Wedge
  await check('order: <Hero> … <Problem> … <Wedge>', () => {
    const h = page.indexOf('<Hero'), p = page.indexOf('<Problem'), w = page.indexOf('<Wedge');
    return h > -1 && p > -1 && w > -1 && h < p && p < w;
  });

  // COPY (traces verbatim to content.md §2)
  await check('heading verbatim', () => /Robotics scales on hardware\. Operations still run on spreadsheets\./.test(all));
  await check('body present (BOM changes)', () => /absorbing weekly BOM changes/.test(all));
  await check('body present (chasing parts)', () => /spend their week chasing parts/.test(all));

  // SERVER-COMPONENT + SEMANTICS DISCIPLINE
  await check('problem is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(problem));
  await check('heading is an <h2> (page keeps one <h1>)', () => /<h2\b/.test(problem) && !/<h1\b/.test(problem));

  // GUARDRAILS — tokens only, no banned words
  const files = ['components/problem.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in problem copy', () => !banned.test(content.replace(/^[\s\S]*?problem\s*[:=]/m, (m)=>m).match(/problem[\s\S]*/)?.[0] ?? content) ? !banned.test(content) : false);

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
