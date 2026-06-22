// Run: pnpm verify src/scripts/verify-home-7.ts   (or: npx tsx src/scripts/verify-home-7.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.7 — who it\'s for (verticals strip + buyer/champion framing)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const comp = read('components/who-its-for.tsx');
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/who-its-for.tsx exists', () => !!comp);
  await check('content/home.ts has a whoItsFor object', () => /whoItsFor\s*[:=]/.test(content));
  await check('page renders <WhoItsFor', () => /<WhoItsFor\b/.test(page));
  await check('section id="who-its-for"', () => /id=["']who-its-for["']/.test(comp));
  await check('section aria-labelledby="who-its-for-title"', () => /aria-labelledby=["']who-its-for-title["']/.test(comp));

  // ORDER — WhoItsFor sits after Thesis
  await check('order: <Thesis> … <WhoItsFor>', () => {
    const t = page.indexOf('<Thesis'), w = page.indexOf('<WhoItsFor');
    return t > -1 && w > -1 && t < w;
  });

  // COPY (verbatim, content.md §8)
  await check('heading verbatim ("Built for robotics makers scaling production.")', () =>
    /Built for robotics makers scaling production\./.test(all));
  await check('Now vertical verbatim ("Humanoid robotics makers.")', () => /Humanoid robotics makers\./.test(all));
  await check('Next vertical verbatim ("Defense.")', () => /\bDefense\.?/.test(all));
  await check('Then verticals verbatim ("Logistics, industrial, space.")', () => /Logistics, industrial, space\./.test(all));
  await check('stage labels present (Now / Next / Then)', () =>
    /\bNow\b/.test(all) && /\bNext\b/.test(all) && /\bThen\b/.test(all));
  await check('buyer roles verbatim', () =>
    /VP\/Head of Operations, COO, Head of Supply Chain\./.test(all));
  await check('champion role verbatim ("procurement / ops lead")', () => /procurement \/ ops lead\.?/.test(all));
  await check('Buyer + Champion labels present', () => /\bBuyer\b/.test(all) && /\bChampion\b/.test(all));
  await check('exactly three stages, not more (no fourth stage label)', () => {
    const block = (content.match(/whoItsFor[\s\S]*?champion/) || [''])[0];
    const n = (block.match(/\blabel\s*:/g) || []).length;
    return n === 3;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('who-its-for is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('stages rendered as a semantic list (<ol> or role="list")', () => /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('buyer/champion as a labeled pair (<dl> or labeled rows)', () => /<dl\b/.test(comp) || /<dt\b/.test(comp) || /aria-label/.test(comp));
  await check('not an <img>/logo strip (it is content, not images)', () => !/<img\b/.test(comp) && !/\bImage\b/.test(comp));

  // TOKEN-DRIVEN — the named constraint
  const files = ['components/who-its-for.tsx','content/home.ts'].filter((f) => exists(f));
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('the Now accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // INTEGRITY — no fabricated customer/logo/count/metric snuck into the section copy
  await check('no fabricated stat (no %, $, or "billion" in the section copy)', () => {
    const block = (content.match(/whoItsFor[\s\S]*?\}\s*;?/) || [''])[0];
    return !/[\$£€]\s?\d|\d+\s?%|\bbillion\b|\btrillion\b/i.test(block);
  });
  await check('no "trusted by" / logo-wall language', () => !/trusted by|our customers|logos?\b/i.test(all));

  // MOTION — any animation respects reduced motion
  await check('reduced-motion respected if anything animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in whoItsFor copy', () => {
    const block = (content.match(/whoItsFor[\s\S]*?\}\s*;?/) || [''])[0];
    return !banned.test(block);
  });

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
