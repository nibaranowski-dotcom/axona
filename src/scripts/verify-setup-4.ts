// Run: pnpm verify src/scripts/verify-setup-4.ts   (or: npx tsx src/scripts/verify-setup-4.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.4 — app shell (sticky nav + footer + a11y statement)\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const exists = (p: string) => fs.existsSync(p);

  const layout = read('app/layout.tsx');
  const header = read('components/site-header.tsx');
  const footer = read('components/site-footer.tsx');
  const scroll = read('components/header-scroll.tsx');
  const navLinks = read('components/nav-links.tsx');
  const mobileNav = read('components/mobile-nav.tsx');
  const siteContent = read('content/site.ts');

  // CONTENT-AS-DATA (CMS-ready) — copy lives in content/, not in components.
  await check('content/site.ts exists', () => exists('content/site.ts'));
  await check('content/site.ts exports nav + footer data', () =>
    /export const primaryNav/.test(siteContent) && /export const primaryCta/.test(siteContent) && /export const footerNav/.test(siteContent));
  await check('header imports nav copy from content (no hardcoded labels)', () =>
    /from "@\/content\/site"/.test(header) && !/"Product"|"How it works"|"Company"|"Request access"/.test(header));
  await check('footer imports its copy from content', () => /from "@\/content\/site"/.test(footer));

  // SKIP LINK → MAIN
  await check('layout has skip link to #main', () => /href="#main"/.test(layout) && /Skip to content/i.test(layout));
  await check('layout has <main id="main" tabIndex={-1}>', () =>
    /<main[^>]*id="main"[^>]*tabIndex=\{-1\}/.test(layout) || /<main[^>]*tabIndex=\{-1\}[^>]*id="main"/.test(layout));
  await check('layout composes SiteHeader + SiteFooter', () => /<SiteHeader/.test(layout) && /<SiteFooter/.test(layout));

  // STICKY NAV + CLS-SAFE HAIRLINE
  await check('header is sticky top-0', () => /sticky/.test(header) && /top-0/.test(header));
  await check('hairline animates transparent → --border (height never changes)', () =>
    /border-transparent/.test(header) && /data-\[scrolled\]:border-border/.test(header));
  await check('header transition uses 180ms / design easing', () =>
    /duration-\[180ms\]/.test(header) && /cubic-bezier\(\.2,0,0,1\)/.test(header));

  // SCROLL DETECTION: IntersectionObserver sentinel, not per-frame React state (protects INP)
  await check('header-scroll is a client component', () => /^"use client"/.test(scroll));
  await check('uses IntersectionObserver (off-main-thread), no scroll listener', () =>
    /IntersectionObserver/.test(scroll) && !/addEventListener\(\s*["']scroll/.test(scroll));
  await check('toggles DOM attribute directly — no useState for scroll', () =>
    /toggleAttribute\(/.test(scroll) && !/useState/.test(scroll));
  await check('layout renders the HeaderScroll sentinel', () => /<HeaderScroll/.test(layout));

  // CLIENT LEAVES ONLY: nav-links (aria-current) + mobile-nav
  await check('nav-links is client + sets aria-current via usePathname', () =>
    /^"use client"/.test(navLinks) && /usePathname/.test(navLinks) && /aria-current/.test(navLinks));
  await check('mobile-nav is client + has accessible open/close labels', () =>
    /^"use client"/.test(mobileNav) && /aria-label="Open menu"/.test(mobileNav) && /aria-label="Close menu"/.test(mobileNav));
  await check('site-header / site-footer are Server Components (no "use client")', () =>
    !/use client/.test(header) && !/use client/.test(footer));

  // FOOTER: legal + accessibility, no fabricated/dead destinations
  await check('footer links to the /accessibility statement', () => /\/accessibility/.test(footer) || /\/accessibility/.test(siteContent));
  await check('sign-off items are gated, not fabricated', () =>
    /SIGN_OFF/.test(siteContent) && /pending/.test(footer));

  // ACCESSIBILITY STATEMENT PAGE
  await check('app/accessibility/page.tsx exists', () => exists('app/accessibility/page.tsx'));
  const a11yPage = exists('app/accessibility/page.tsx') ? read('app/accessibility/page.tsx') : '';
  await check('a11y page exports metadata with canonical', () =>
    /export const metadata/.test(a11yPage) && /alternates:\s*\{\s*canonical/.test(a11yPage));
  await check('a11y page has its own <h1> and names WCAG 2.2 AA', () =>
    /<h1/.test(a11yPage) && /(WCAG 2\.2|2\.2 Level AA)/.test(read('content/accessibility.ts')));

  // GUARDRAILS over the new shell files: tokens only, no dead anchors, single shell <main>
  const shellFiles = [
    'app/layout.tsx', 'app/page.tsx', 'app/accessibility/page.tsx',
    'components/site-header.tsx', 'components/site-footer.tsx', 'components/header-scroll.tsx',
    'components/nav-links.tsx', 'components/mobile-nav.tsx', 'content/site.ts', 'content/accessibility.ts',
  ].filter(exists);
  await check('no dead `#` anchors (href="#")', () => !shellFiles.some((f) => /href=["']#["']/.test(read(f))));
  await check('no inline hex in shell files', () => !shellFiles.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities in shell files', () =>
    !shellFiles.some((f) => /\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('shell page bodies render no nested <main> (layout owns the only one)', () =>
    !/<main\b/.test(read('app/page.tsx')) && !/<main\b/.test(read('app/accessibility/page.tsx')));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
