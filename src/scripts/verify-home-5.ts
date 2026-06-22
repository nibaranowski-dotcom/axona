// Run: pnpm verify src/scripts/verify-home-5.ts   (or: npx tsx src/scripts/verify-home-5.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.5 — why now (3 points)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const comp = read('components/why-now.tsx');
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/why-now.tsx exists', () => !!comp);
  await check('content/home.ts has a whyNow object', () => /whyNow\s*[:=]/.test(content));
  await check('page renders <WhyNow', () => /<WhyNow\b/.test(page));
  await check('section id="why-now"', () => /id=["']why-now["']/.test(comp));
  await check('section aria-labelledby="why-now-title"', () => /aria-labelledby=["']why-now-title["']/.test(comp));

  // ORDER — WhyNow sits between Pillars and Thesis
  await check('order: <Pillars> … <WhyNow> … <Thesis>', () => {
    const p = page.indexOf('<Pillars'), w = page.indexOf('<WhyNow'), t = page.indexOf('<Thesis');
    return p > -1 && w > -1 && t > -1 && p < w && w < t;
  });

  // COPY (verbatim, content.md §6)
  await check('heading verbatim ("Why now.")', () => /Why now\./.test(all));
  await check('point 1 verbatim (robotics inflecting)', () =>
    /Robotics is inflecting — AI-accelerated R&D, robots building robots, capital flooding humanoids, defense, and space\./.test(all));
  await check('point 2 verbatim (buildable today)', () =>
    /Specialized small models \+ agent infrastructure make an AI-native operating layer buildable today\./.test(all));
  await check('point 3 verbatim (forward-deployed)', () =>
    /Forward-deployed delivery lets us ship to production with you and compound the work into product\./.test(all));
  await check('exactly three points, not four (no extra point entry)', () => {
    const block = (content.match(/whyNow[\s\S]*?\]/) || [''])[0];
    const n = (block.match(/\btext\s*:/g) || []).length;
    return n === 3;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('why-now is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('points rendered as a semantic list (<ol> or role="list")', () => /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('not an <img> of the points (it is content, not an image)', () => !/<img\b/.test(comp) && !/\bImage\b/.test(comp));

  // TOKEN-DRIVEN — the named constraint of this story
  const files = ['components/why-now.tsx','content/home.ts'].filter((f) => exists(f));
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('any accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    !/(animate-|bg-primary|text-primary|border-primary|var\(--primary\))/.test(comp) ||
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // INTEGRITY — no fabricated metric/market-size/date snuck into the section copy
  await check('no fabricated stat (no %, $, or "billion" in the points)', () => {
    const block = (content.match(/whyNow[\s\S]*?\]/) || [''])[0];
    return !/[\$£€]\s?\d|\d+\s?%|\bbillion\b|\btrillion\b/i.test(block);
  });

  // MOTION — any animation respects reduced motion
  await check('reduced-motion respected if anything animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in whyNow copy', () => {
    const block = (content.match(/whyNow[\s\S]*?\]/) || [''])[0];
    return !banned.test(block);
  });

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
