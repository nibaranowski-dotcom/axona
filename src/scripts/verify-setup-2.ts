// Run: pnpm verify src/scripts/verify-setup-2.ts   (or: npx tsx src/scripts/verify-setup-2.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.2 — Next.js scaffold\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const pkg = JSON.parse(read('package.json'));
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

  // CORE
  await check('Next.js 16.x pinned', () => /(^|[^\d])16\./.test(String(deps.next || '')));
  await check('React present', () => !!deps.react);
  await check('TypeScript + tsx present', () => !!deps.typescript && !!deps.tsx);
  await check('Tailwind present', () => !!deps.tailwindcss);
  await check('geist font package present', () => !!deps.geist);

  // SCRIPTS
  await check('typecheck = tsc --noEmit', () => /tsc\s+--noEmit/.test(pkg.scripts?.typecheck || ''));
  await check('verify script runs tsx', () => /tsx/.test(pkg.scripts?.verify || ''));
  await check('build + dev scripts exist', () => !!pkg.scripts?.build && !!pkg.scripts?.dev);
  await check('Node >= 20 in engines', () => /(>=)?\s*20/.test(pkg.engines?.node || ''));

  // STRUCTURE
  await check('app/ at repo root', () => exists('app/layout.tsx') && exists('app/page.tsx'));
  await check('src/scripts preserved', () => exists('src/scripts/verify-setup-1.ts') && exists('src/scripts/verify-setup-5.ts'));
  await check('tsconfig has @/* alias', () => /"@\/\*"/.test(read('tsconfig.json')));

  // SHADCN — New York lineage + unified radix-ui (the substantive requirement)
  // Note: shadcn CLI v4 (2026) replaced named styles ("new-york"/"default") with registry
  // presets; the New York successor is "Nova" → components.json style "radix-nova". Accept the
  // lineage label, and assert the unified `radix-ui` package is what components actually import.
  await check('components.json New York lineage (new-york | nova)', () =>
    exists('components.json') && /"style"\s*:\s*"(new-york|[a-z-]*nova)"/i.test(read('components.json')));
  await check('shadcn uses unified radix-ui package (not @radix-ui/react-*)', () =>
    !!deps['radix-ui'] && !Object.keys(deps).some((d) => d.startsWith('@radix-ui/')));
  await check('a shadcn component imports from "radix-ui"', () =>
    exists('components/ui/button.tsx') && /from\s+["']radix-ui["']/.test(read('components/ui/button.tsx')));
  await check('lib/utils cn present', () => exists('lib/utils.ts') && /export\s+function\s+cn/.test(read('lib/utils.ts')));

  // FONTS — self-hosted Geist via the `geist` package (not next/font/google)
  await check('Geist wired in layout via geist package', () => /geist\/font\/(sans|mono)/.test(read('app/layout.tsx')));
  await check('layout does not import next/font/google', () => !/from\s+["']next\/font\/google["']/.test(read('app/layout.tsx')));
  await check('html lang set', () => /<html[^>]*lang=/.test(read('app/layout.tsx')));

  // GUARDRAILS — forbidden deps not added yet
  for (const bad of ['@clerk', '@supabase', 'stripe', 'inngest', 'ai'])
    await check(`no ${bad} dependency`, () => !Object.keys(deps).some((d) => d === bad || d.startsWith(bad + '/') || d.startsWith(bad)));

  // PRESERVATION — tooling/docs intact
  for (const f of ['CLAUDE.md', 'design.md', 'specs/backlog.md', '.claude/agents/joe.md', 'scripts/build-loop.mjs', 'loop.config.json'])
    await check(`preserved: ${f}`, () => exists(f));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
