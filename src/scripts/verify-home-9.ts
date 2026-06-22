// Run: pnpm verify src/scripts/verify-home-9.ts   (or: npx tsx src/scripts/verify-home-9.ts)
//
// Adapted from specs/HOME.9.md "Verification Script": the LAST-child check operates on app/page.tsx's
// returned fragment instead of a literal <main>…</main>. In this shell the <main> landmark lives in
// app/layout.tsx (SETUP.4) and page.tsx returns the fragment that renders as <main>'s children —
// adding a second <main> here would duplicate the landmark (a11y fail). Intent is preserved: FinalCta
// is present, after WhoItsFor, with no other component tag after it.
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.9 — final CTA band\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const cta = fs.existsSync('components/final-cta.tsx') ? read('components/final-cta.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = cta + content;

  // FILES + WIRING
  await check('components/final-cta.tsx exists', () => !!cta);
  await check('content/home.ts has a finalCta object', () => /finalCta\s*[:=]/.test(content));
  await check('page renders <FinalCta', () => /<FinalCta\b/.test(page));

  // STRUCTURE — the two prior failures
  await check('heading is <h2> (not <h1>)', () => /<h2\b/.test(cta) && !/<h1\b/.test(cta));
  await check('section id="request-access"', () => /id=["']request-access["']/.test(cta));
  await check('FinalCta is the LAST section rendered in the page body', () => {
    // page.tsx returns the fragment that the shell renders inside <main> (layout.tsx, SETUP.4).
    const m = page.match(/return\s*\(([\s\S]*?)\);/);
    if (!m) return false;
    const inner = m[1];
    const last = inner.lastIndexOf('<FinalCta');
    const who = inner.lastIndexOf('<WhoItsFor');
    // FinalCta present, after WhoItsFor, and no other component tag after it
    return last > -1 && last > who && !/<[A-Z][A-Za-z]+\b/.test(inner.slice(last + 1).replace(/<FinalCta[\s\S]*?\/>|<FinalCta[\s\S]*?<\/FinalCta>/, ''));
  });

  // COPY (verbatim, content.md §10)
  await check('heading verbatim', () => /Get early access to Axona\./.test(all));
  await check('sub verbatim', () => /small number of design partners at a time/.test(all));
  await check('primary "Request access" → #request-access', () => /Request access/.test(all) && /#request-access/.test(all));
  await check('secondary "Build it with us" → #company', () => /Build it with us/.test(all) && /#company/.test(all));

  // GUARDRAILS
  const files = ['components/final-cta.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f).replace(/#request-access|#company/g,''))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
