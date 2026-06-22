// Run: pnpm verify src/scripts/verify-setup-3.ts   (or: npx tsx src/scripts/verify-setup-3.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.3 — design tokens + theming\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const css = read('app/globals.css');
  const layout = read('app/layout.tsx');

  // TOKENS PRESENT (both themes)
  await check('globals.css imports tailwindcss v4', () => /@import\s+["']tailwindcss["']/.test(css));
  await check('has :root and .dark blocks', () => /:root\s*\{/.test(css) && /\.dark\s*\{/.test(css));
  await check('--background dark = #09090B', () => /\.dark[\s\S]*--background:\s*#09090B/i.test(css));
  await check('--background light = #FFFFFF', () => /:root[\s\S]*--background:\s*#FFFFFF/i.test(css));
  await check('--primary is electric teal (hsl 199)', () => /--primary:\s*hsl\(199/i.test(css));
  await check('--ring bound to primary', () => /--ring:\s*var\(--primary\)/i.test(css));
  await check('@theme inline maps color tokens', () => /@theme inline[\s\S]*--color-background:\s*var\(--background\)/.test(css));
  await check('fonts bound to Geist vars', () => /--font-sans:\s*var\(--font-geist-sans\)/.test(css));
  await check('radius token present', () => /--radius:/.test(css));
  await check('prefers-reduced-motion handled', () => /prefers-reduced-motion/.test(css));

  // THEMING WIRED
  await check('next-themes dependency present', () => { const p = JSON.parse(read('package.json')); return !!({ ...p.dependencies, ...p.devDependencies })['next-themes']; });
  await check('ThemeProvider used in layout', () => /ThemeProvider/.test(layout));
  await check('defaultTheme dark + enableSystem', () => /defaultTheme=["']dark["']/.test(layout) && /enableSystem/.test(layout));
  await check('suppressHydrationWarning on html', () => /<html[^>]*suppressHydrationWarning/.test(layout));
  await check('ThemeToggle exists + has aria-label', () => { const t = read('components/theme-toggle.tsx'); return /useTheme/.test(t) && /aria-label/.test(t); });

  // PRESET RECONCILED
  await check('components.json style = radix-vega', () => /"style"\s*:\s*"radix-vega"/.test(read('components.json')));

  // GUARDRAILS: tokens only (no inline hex / raw color utilities in components)
  const files: string[] = [];
  const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const fp = `${d}/${e.name}`;
    if (e.isDirectory()) walk(fp); else if (/\.(tsx|ts|css)$/.test(e.name)) files.push(fp);
  });
  ['app', 'components'].forEach((d) => fs.existsSync(d) && walk(d));
  const comps = files.filter((f) => !/globals\.css$/.test(f));
  await check('no inline hex in components/app (excl. globals.css)', () => !comps.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (bg-zinc-, text-blue-, etc.)', () =>
    !comps.some((f) => /\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
