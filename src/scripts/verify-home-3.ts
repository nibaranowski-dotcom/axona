// Run: pnpm verify src/scripts/verify-home-3.ts   (or: npx tsx src/scripts/verify-home-3.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.3 — product / wedge\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const wedge = fs.existsSync('components/wedge.tsx') ? read('components/wedge.tsx') : '';
  const mock = fs.existsSync('components/agent-action-mock.tsx') ? read('components/agent-action-mock.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = wedge + mock + content;
  const pkg = JSON.parse(read('package.json'));
  const deps = { ...(pkg.dependencies||{}), ...(pkg.devDependencies||{}) };

  // FILES + WIRING
  await check('components/wedge.tsx exists', () => !!wedge);
  await check('components/agent-action-mock.tsx exists', () => !!mock);
  await check('content/home.ts has a wedge object', () => /wedge\s*[:=]/.test(content));
  await check('page renders <Wedge', () => /<Wedge\b/.test(page));
  await check('section id="product"', () => /id=["']product["']/.test(wedge));

  // COPY (traces to content.md)
  await check('heading verbatim', () => /An agentic procurement & build co-pilot\. You approve; it remembers\./.test(all));
  await check('card 1 title', () => /Source without the grind/.test(all));
  await check('card 2 title', () => /Know every unit/.test(all));
  await check('card 3 title', () => /It compounds/.test(all));
  await check('trust line verbatim', () => /The AI proposes; a human approves; every action is auditable/.test(all));

  // MOCK — paper trail + sample labeling
  await check('audit trail names all 5 fields', () => ['inputs','output','model','confidence','approver'].every((f)=> new RegExp(f,'i').test(mock)));
  await check('propose + approve states present', () => /propose/i.test(mock) && /approve/i.test(mock));
  await check('persistent sample-data label', () => /sample/i.test(mock) && /(illustrative|sample data)/i.test(mock));

  // CONTENT INTEGRITY — no live AI, no obvious real entities
  await check('no AI-SDK dependency added', () => !deps['ai'] && !Object.keys(deps).some((d)=>/^@ai-sdk\//.test(d)));
  await check('mock data declared in content (typed const, not fetched)', () => /mock\s*[:=]/.test(content) && !/fetch\(|generateObject|generateText/.test(mock));

  // GUARDRAILS
  const files = ['components/wedge.tsx','components/agent-action-mock.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in wedge copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
