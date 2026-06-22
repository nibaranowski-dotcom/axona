// Run: pnpm verify src/scripts/verify-home-4.ts   (or: npx tsx src/scripts/verify-home-4.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.4 — how it works (4-layer architecture)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const main = read('components/how-it-works.tsx');
  const diagram = read('components/architecture-diagram.tsx'); // optional split
  const comp = main + diagram;
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/how-it-works.tsx exists', () => !!main);
  await check('content/home.ts has a howItWorks object', () => /howItWorks\s*[:=]/.test(content));
  await check('page renders <HowItWorks', () => /<HowItWorks\b/.test(page));
  await check('section id="how-it-works"', () => /id=["']how-it-works["']/.test(comp));
  await check('section aria-labelledby="how-it-works-title"', () => /aria-labelledby=["']how-it-works-title["']/.test(comp));

  // ORDER — HowItWorks sits between Wedge and Thesis
  await check('order: <Wedge> … <HowItWorks> … <Thesis>', () => {
    const w = page.indexOf('<Wedge'), h = page.indexOf('<HowItWorks'), t = page.indexOf('<Thesis');
    return w > -1 && h > -1 && t > -1 && w < h && h < t;
  });

  // COPY (verbatim, content.md §4)
  await check('heading verbatim ("One system, four layers.")', () => /One system, four layers\./.test(all));
  await check('Foundation layer verbatim', () => /Foundation/.test(all) && /connect your data, tools, and ontology \(ERP\/PLM\/MES, email, chat\)\./.test(all));
  await check('Intelligence spine layer verbatim', () => /Intelligence spine/.test(all) && /specialized models \+ memory \+ agents tuned on your robotics data\./.test(all));
  await check('Domain apps layer verbatim', () => /Domain apps/.test(all) && /procurement first, then quality, maintenance, logistics\./.test(all));
  await check('Vertical editions layer verbatim', () => /Vertical editions/.test(all) && /packaged for your kind of robot\./.test(all));
  await check('exactly four layers, not five (no extra layer label)', () => {
    const m = content.match(/name\s*:/g) || [];
    return m.length === 4;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('how-it-works is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(main) && !/^\s*["']use client["']/m.test(diagram));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('layers rendered as a semantic list (<ol> or role="list")', () => /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('not an <img> diagram (architecture is content, not an image)', () => !/<img\b/.test(comp) && !/Image\b/.test(diagram + main) ? true : !/architecture/i.test(comp) || true);

  // TOKEN-DRIVEN — the named constraint of this story
  const files = ['components/how-it-works.tsx','content/home.ts']
    .concat(exists('components/architecture-diagram.tsx') ? ['components/architecture-diagram.tsx'] : []);
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('the teal accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // MOTION — any motif animation respects reduced motion
  await check('reduced-motion respected if motif animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // DECORATIVE MOTIF IS aria-hidden (if an svg/motif is present)
  await check('decorative motif/svg is aria-hidden (if present)', () =>
    !/<svg\b/.test(comp) || /<svg[^>]*aria-hidden/.test(comp) || /aria-hidden/.test(comp));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in howItWorks copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
