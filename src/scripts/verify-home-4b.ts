// Run: pnpm verify src/scripts/verify-home-4b.ts   (or: npx tsx src/scripts/verify-home-4b.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.4B — three pillars (redesign)\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const candidates = ['components/pillars.tsx', 'components/three-pillars.tsx', 'components/composed.tsx'].filter((p) => fs.existsSync(p));
  const comp = candidates.length ? read(candidates[0]) : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const all = comp + content;

  await check('pillars component found', () => !!comp);
  await check('content has pillars data with lead flags', () => /pillars/i.test(content) && /lead/i.test(content));

  // COPY verbatim (content.md §5)
  await check('heading verbatim', () => /Built once\. Composed everywhere\./.test(all));
  await check('framing line verbatim', () => /Build the primitives once/.test(all) && /package per vertical/.test(all));
  await check('three pillar labels present', () => /Primitives/i.test(all) && /Domains/i.test(all) && /Verticals/i.test(all));
  await check('lead items present', () => /Procurement \(the wedge\)/.test(all) && /Humanoids \(first\)/.test(all));
  await check('sample of items present', () => /SOPs/.test(all) && /manufacturing/.test(all) && /defense/.test(all));

  // STRUCTURE (the redesign — not a flat list)
  await check('renders bordered panels (border-border + bg-card)', () => /border-border/.test(comp) && /bg-card/.test(comp));
  await check('chips use flex-wrap (not a bare list)', () => /flex-wrap/.test(comp));
  await check('compose connective present + aria-hidden', () => /aria-hidden/.test(comp) && /(ArrowRight|Chevron|→)/.test(comp));
  await check('responsive grid (lg three-up)', () => /lg:grid-cols-3|grid-cols-3/.test(comp));
  await check('Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('one <h2>, has <h3> pillar headers', () => (comp.match(/<h2\b/g) || []).length === 1 && /<h3\b/.test(comp));

  // TEAL RESTRAINT — at most ~2 primary marks
  await check('teal used sparingly (lead chips only)', () => ((comp.match(/(text-primary|bg-primary|border-primary)/g) || []).length) <= 3);

  // GUARDRAILS
  await check('no inline hex', () => !/#[0-9a-fA-F]{3,8}\b/.test(comp));
  await check('no raw tailwind color utilities', () => !/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(comp));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
