// Run: pnpm verify src/scripts/verify-home-4b.ts   (or: npx tsx src/scripts/verify-home-4b.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.4B — three pillars (Primitives × Domains × Verticals)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const comp = read('components/pillars.tsx');
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/pillars.tsx exists', () => !!comp);
  await check('content/home.ts has a pillars object', () => /pillars\s*[:=]/.test(content));
  await check('page renders <Pillars', () => /<Pillars\b/.test(page));
  await check('section id="pillars"', () => /id=["']pillars["']/.test(comp));
  await check('section aria-labelledby="pillars-title"', () => /aria-labelledby=["']pillars-title["']/.test(comp));

  // ORDER — Pillars sits between HowItWorks and Thesis
  await check('order: <HowItWorks> … <Pillars> … <Thesis>', () => {
    const h = page.indexOf('<HowItWorks'), p = page.indexOf('<Pillars'), t = page.indexOf('<Thesis');
    return h > -1 && p > -1 && t > -1 && h < p && p < t;
  });

  // COPY (verbatim, content.md §5)
  await check('heading verbatim ("Built once. Composed everywhere.")', () => /Built once\. Composed everywhere\./.test(all));
  await check('framing line verbatim', () => /Build the primitives once → compose them into domain workflows → package per vertical\./.test(all));
  await check('Primitives pillar verbatim', () => /Primitives/.test(all) && /SOPs, documents, data, agents, humans, machines \(fixed \+ mobile\), inventory, meetings, integrations, interfaces\./.test(all));
  await check('Primitives agents note verbatim', () => /Agents are self-improving, with skills, context, memory, and multimodal, multi-cloud reach\./.test(all));
  await check('Domains pillar verbatim', () => /Domains/.test(all) && /Procurement \(the wedge\), then manufacturing, quality & testing, logistics, field service, R&D, IT\/security, sales, marketing\./.test(all));
  await check('Verticals pillar verbatim', () => /Verticals/.test(all) && /Humanoids \(first\), defense, logistics, manufacturing, construction, healthcare, space, automotive\./.test(all));
  await check('the wedge markers present ("the wedge" + "first")', () => /\(the wedge\)/.test(all) && /Humanoids \(first\)/.test(all));
  await check('exactly three pillar columns, not more (no fourth pillar name)', () => {
    // Scope to the pillars export — content/home.ts also has howItWorks layers that use `name:`.
    const block = content.slice(content.indexOf('export const pillars'));
    const m = block.match(/name\s*:/g) || [];
    return m.length === 3;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('pillars is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('pillars rendered as semantic lists (<ul>/<ol> or role="list")', () => /<ul\b/.test(comp) || /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('not an <img> of the taxonomy (it is content, not an image)', () => !/<img\b/.test(comp) && !/\bImage\b/.test(comp));

  // TOKEN-DRIVEN — the named constraint of this story
  const files = ['components/pillars.tsx','content/home.ts'].filter((f) => exists(f));
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('the wedge accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // MOTION — any accent animation respects reduced motion
  await check('reduced-motion respected if accent animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in pillars copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
