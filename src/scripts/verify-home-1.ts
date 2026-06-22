// Run: pnpm verify src/scripts/verify-home-1.ts   (or: npx tsx src/scripts/verify-home-1.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.1 — hero\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const hero = fs.existsSync('components/hero.tsx') ? read('components/hero.tsx') : '';
  const motif = fs.existsSync('components/axon-signal.tsx') ? read('components/axon-signal.tsx') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const css = fs.existsSync('app/globals.css') ? read('app/globals.css') : '';
  const all = hero + content + page;

  // FILES
  await check('components/hero.tsx exists', () => !!hero);
  await check('components/axon-signal.tsx exists', () => !!motif);
  await check('content/home.ts hero object exists', () => /hero\s*[:=]/.test(content));
  await check('page renders <Hero', () => /<Hero\b/.test(page));

  // COPY (traces to messaging.md)
  await check('H1 headline verbatim', () => /The operating system for robotics companies\./.test(all));
  await check('subhead present (humans, machines, and agents)', () => /humans, machines, and agents/.test(all));
  await check('primary CTA Request access → #request-access', () => /Request access/.test(all) && /#request-access/.test(all));
  await check('secondary CTA See how it works → #how-it-works', () => /See how it works/.test(all) && /#how-it-works/.test(all));
  await check('micro-trust line present (design partners)', () => /first cohort of design partners/.test(all));

  // LCP / SERVER-COMPONENT DISCIPLINE
  await check('hero is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(hero));
  await check('exactly one <h1> in hero', () => (hero.match(/<h1\b/g) || []).length === 1);

  // MOTIF
  await check('motif is aria-hidden', () => /aria-hidden=("true"|\{true\})/.test(motif));
  await check('motif is an SVG', () => /<svg\b/.test(motif));
  await check('reduced-motion handled (globals)', () => /prefers-reduced-motion/.test(css));

  // GUARDRAILS — tokens only, no banned words
  const files = ['components/hero.tsx','components/axon-signal.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex in hero/motif/content', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in hero copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
