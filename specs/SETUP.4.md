# PRD: App shell — sticky Nav (hairline-on-scroll) + Footer (legal, a11y statement)

**Status**: Ready for Dev
**Priority**: P0
**Effort**: M (5–7 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: SETUP.4

## Problem Statement
After SETUP.3 the site has a correct themeable surface but no chrome: there is no persistent navigation, no footer, no place for the global CTA, the theme toggle, legal links, or the accessibility statement. Every HOME.* section (HOME.1–HOME.9) and both conversion stories (CONV.1 request-access, CONV.2 consent) depend on a shell that wraps `app/page.tsx` and gives them a sticky `Nav` with the primary "Request access" CTA and a `Footer` to land legal/privacy/a11y links. Without it, sections are built into a vacuum, the skip-to-content link and landmark structure (`header`/`main`/`footer`) the a11y rule requires don't exist, and the page reads as a fragment, not a company. This story ships the production app shell: a sticky `Nav` that gains a 1px hairline border only on scroll (no layout shift), a designed `Footer` with legal + accessibility statement, the existing `ThemeToggle` relocated into the nav, a mobile menu, and the landmark + skip-link scaffolding every later screen inherits.

## Success Metrics
| Metric | Target |
|---|---|
| `Nav` + `Footer` wrap every route via `app/layout.tsx`; `app/page.tsx` content sits in one `<main id="main">` | Pass |
| Sticky nav gains a 1px hairline border + subtle surface only after scroll; zero CLS from the transition | CLS contribution = 0 |
| Skip-to-content link present, first in tab order, visible on focus, jumps to `#main` | Pass |
| Landmarks correct: one `<header>`, one `<nav aria-label>`, one `<main>`, one `<footer>`; no `div` soup | Pass |
| Keyboard: nav links, CTA, toggle, mobile menu all operable; visible teal focus ring; mobile menu traps + restores focus | WCAG 2.2 AA |
| Tokens only — no inline hex, no raw Tailwind color utilities | 0 violations |
| Copy sourced from `specs/content/messaging.md`; no invented links/claims | Pass |
| `pnpm verify src/scripts/verify-setup-4.ts` + `tsc --noEmit` + `pnpm lint` | All green |

## User Stories
- As a **prospective design partner**, I want a persistent "Request access" CTA in the nav so that I can convert from any scroll position without hunting.
- As a **prospective CTO (Julia)**, I want a footer that reads like a real company — legal, privacy, an accessibility statement, careers — so that the site signals seriousness and craft.
- As a **keyboard / screen-reader user**, I want a skip-to-content link, correct landmarks, and an operable mobile menu so that I can navigate without a mouse and skip repeated chrome.
- As a **section author (HOME.*, CONV.*)**, I want the shell to wrap every route so that I only build the section body and inherit nav, footer, landmarks, and the global CTA.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | `components/site-header.tsx` — sticky `<header>` with `<nav aria-label="Primary">`: wordmark (links to `/`), in-page section links, `ThemeToggle`, primary "Request access" CTA | P0 | Wordmark "Axona" as text (Geist), not an image yet — no logo asset in scope |
| R2 | Hairline-on-scroll: nav is transparent/borderless at top; on scroll past a small threshold it gains `border-b border-border` + a subtle `bg-background/80` backdrop. Transition opacity/border only — **no height/layout change** | P0 | Use an IntersectionObserver sentinel or scroll listener in a `"use client"` leaf; honor `prefers-reduced-motion` (snap, don't animate) |
| R3 | `components/site-footer.tsx` — designed `<footer>`: wordmark + tagline, link columns (Product/Company/Legal), legal line (© + entity), privacy + terms + **accessibility statement** links, secondary "Request access" / "Build it with us" CTA | P0 | Copy from `specs/content/messaging.md`; pre-launch — no invented social/customer links |
| R4 | Skip-to-content link as the **first focusable element**: visually hidden until focused, then visible (token styles), targets `#main` | P0 | a11y rule: "skip-to-content link, no keyboard traps" |
| R5 | Landmarks in `app/layout.tsx`: `<SiteHeader />`, `<main id="main">{children}</main>`, `<SiteFooter />`; exactly one of each landmark; one `<h1>` stays owned by the page (HOME.1), not the shell | P0 | Shell must not introduce a second `h1`; wordmark is a link, not a heading |
| R6 | Mobile nav: below `md`, collapse links into an accessible disclosure (shadcn `Sheet` or `DropdownMenu`) with an icon trigger (lucide `Menu`/`X`), `aria-expanded`, `aria-controls`; focus moves into the panel on open and returns to the trigger on close; `Esc` closes | P0 | Compose from shadcn primitives; do not hand-roll the dialog |
| R7 | Relocate `ThemeToggle` (from SETUP.3) into the nav (desktop) and the mobile panel; remove it from the SETUP.3 token-proof `page.tsx` if still there | P1 | Single toggle instance per breakpoint; keeps the proof page clean |
| R8 | Nav links are **in-page anchors** to HOME.* section ids (`#product`, `#how-it-works`, `#company`) using stable ids the HOME.* stories will adopt; degrade gracefully if a section isn't built yet (link still scrolls/no-op, never a 404) | P1 | Document the id contract in code comments so HOME.* stories match; smooth-scroll respects `prefers-reduced-motion` |
| R9 | Primary CTA "Request access" routes to the conversion target. Until CONV.1 ships the form/anchor, point it at `#request-access` (a stable id reserved for the final CTA band / form) — never a dead `/` link | P1 | Mark the contract; CONV.1 owns the destination |
| R10 | Content as props/MDX-friendly: nav items + footer columns defined as typed data (e.g. `content/navigation.ts` or co-located typed const), not hardcoded JSX strings scattered in components | P1 | content rule: copy modeled so a CMS can own it later; components take content as data |
| R11 | Designed in **both** themes; dark default; the hairline + backdrop read correctly on near-black and on white; teal appears at most as the CTA + focus ring | P0 | design rule: one accent, near-monochrome, elevation via surface + hairline |

## Acceptance Criteria
- [ ] `app/layout.tsx` renders `<SiteHeader />`, `<main id="main">{children}</main>`, `<SiteFooter />`; the page provides the only `<h1>`.
- [ ] Exactly one `<header>`, one `<nav aria-label="...">`, one `<main>`, one `<footer>` in the rendered DOM; no landmark duplication.
- [ ] Nav is borderless/transparent at scroll top; after scrolling it shows `border-b border-border` + subtle backdrop, with **no layout shift** (measure CLS contribution = 0).
- [ ] Skip-to-content is the first Tab stop, hidden until focused, visible on focus, and moves focus to `#main` when activated.
- [ ] Every nav/footer interactive element (links, CTA, toggle, mobile trigger) is keyboard-operable with a visible teal focus ring.
- [ ] Mobile menu: opens via keyboard + pointer, `aria-expanded`/`aria-controls` correct, focus enters the panel and returns to the trigger on close, `Esc` closes; no scroll bleed behind it.
- [ ] `prefers-reduced-motion`: the hairline transition and any smooth-scroll snap instead of animating.
- [ ] No inline hex and no raw Tailwind color utilities in `components/site-header.tsx`, `components/site-footer.tsx`, or supporting files.
- [ ] All copy traces to `specs/content/messaging.md`; no invented links (no fake social, no unconfirmed customer/partner names); accessibility statement link present (target page can be a stub owned by a later story — note it).
- [ ] `pnpm verify src/scripts/verify-setup-4.ts`, `tsc --noEmit`, and `pnpm lint` are green; `docs/manual-checks.md` updated with the SETUP.4 block.

## Technical Requirements
- **Files:**
  - `components/site-header.tsx` — Server Component shell rendering the header markup + landmarks; imports a small `"use client"` child for the scroll-state and mobile menu. Renders wordmark, desktop nav links, `ThemeToggle`, primary CTA.
  - `components/nav-scroll-state.tsx` (or co-located) — `"use client"` leaf: an IntersectionObserver on a 1px sentinel at the top of `<main>` (preferred over a scroll listener — cheaper, no jank) that toggles a `scrolled` class/data-attribute driving `border-b` + backdrop. Honor `prefers-reduced-motion`.
  - `components/mobile-nav.tsx` — `"use client"`; shadcn `Sheet` (or `DropdownMenu`) with `Menu`/`X` trigger, `aria-expanded`/`aria-controls`, focus management, `Esc`-to-close.
  - `components/site-footer.tsx` — Server Component; wordmark + tagline, link columns, legal line, privacy/terms/accessibility links, secondary CTA.
  - `content/navigation.ts` — typed nav items + footer columns (label + href), single source for both header and footer to consume.
  - `app/layout.tsx` — insert `SiteHeader`/`main#main`/`SiteFooter`; add the skip link as the first child of `<body>`. Keep the SETUP.3 `ThemeProvider` wrap and `suppressHydrationWarning` intact.
  - `app/page.tsx` — wrap the proof content so it sits inside the shell (no second header/footer/`h1`); remove the standalone `ThemeToggle` if SETUP.3 left one there.
  - `src/scripts/verify-setup-4.ts` — the verification script below.
- **Sticky + hairline-on-scroll pattern (no CLS):**
  - Header: `sticky top-0 z-50` with a fixed height; border + backdrop are **additive** (a class toggle), never a height/padding change, so nothing reflows.
  - Sentinel approach: render a `<div data-scroll-sentinel aria-hidden="true" />` of height 1px just inside `<main>`; observe it — when it leaves the viewport, set `scrolled`. Avoids a scroll-event listener and keeps work off the main thread.
  - Reduced motion: gate the `transition` on `motion-safe:` (or a media query); when reduced, the border/backdrop apply without a fade.
- **Tokens / design:** `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`; backdrop via `bg-background/80` + `backdrop-blur-sm` (token-based opacity, not a hex). CTA = `bg-primary text-primary-foreground`; focus ring = `ring`/`--ring` (teal, inherited from SETUP.3). One accent — teal only on the CTA and focus.
- **Landmarks / a11y:** `<nav aria-label="Primary">` in the header; `<nav aria-label="Footer">` in the footer (two navs are fine when each is labeled). Skip link: `<a href="#main" class="sr-only focus:not-sr-only ...">Skip to content</a>` styled with tokens when focused; `<main id="main" tabIndex={-1}>` so focus lands.
- **Content model:** `content/navigation.ts` exports `navItems` and `footerColumns` typed arrays; header/footer map over them. Copy strings come from `specs/content/messaging.md` (tagline "The operating system for robotics companies."; CTAs "Request access" / "Build it with us"). No invented destinations — legal/privacy/terms/accessibility hrefs point at reserved routes (`/privacy`, `/terms`, `/accessibility`) that later stories fill; note the stubs in code + manual-checks. Do **not** add social links or customer logos.
- **Out:** no logo image asset (text wordmark), no real `/privacy` etc. page bodies (reserved routes), no analytics, no form. Those are owned by SEO.*, CONV.*, and dedicated legal-page stories.

## UX Flow
```
app/layout.tsx
  └─ <body> (ThemeProvider from SETUP.3)
       ├─ <a href="#main"> Skip to content   ← first Tab stop, sr-only until focused
       ├─ <SiteHeader> (sticky top-0)
       │     ├─ wordmark "Axona" → "/"
       │     ├─ desktop: nav links (#product, #how-it-works, #company) · ThemeToggle · [Request access]
       │     └─ mobile (<md): [Menu] ──► Sheet ──► links + ThemeToggle + [Request access]
       │                                   │  focus enters panel; Esc / X closes ──► focus returns to trigger
       │     scroll state:
       │       at top ───────────────► transparent, no border
       │       scrolled past sentinel ─► border-b + bg-background/80 backdrop  (no layout shift)
       │       prefers-reduced-motion ─► border/backdrop snap on, no fade
       ├─ <main id="main" tabIndex=-1>{children}</main>   ← page owns the single <h1>
       └─ <SiteFooter>
             ├─ wordmark + tagline
             ├─ columns: Product · Company · Legal   (from content/navigation.ts)
             ├─ legal line: © Axona · Privacy · Terms · Accessibility statement
             └─ secondary CTA: [Request access] · [Build it with us]

Primary CTA "Request access" → #request-access (reserved; CONV.1 owns final destination, never a dead link)
```

## Edge Cases
| Case | Handling |
|---|---|
| Layout shift when the nav border/backdrop appears | Border + backdrop are additive class toggles on a fixed-height header; never change height/padding. Verify CLS contribution = 0 on scroll. |
| Anchor links to sections not yet built (HOME.* pending) | Stable id contract documented in `content/navigation.ts`; a missing target scrolls to nearest/no-ops — never a 404. Build ids match what HOME.* will adopt. |
| Primary CTA before CONV.1 exists | Points at reserved `#request-access`; never `/` or a dead route. CONV.1 repoints to the form. |
| Mobile menu focus escape / scroll bleed | shadcn `Sheet` traps focus, restores to trigger on close, `Esc` closes, and locks body scroll while open. |
| Skip link invisible or not first | Skip link is the first child of `<body>`, `sr-only` until `:focus`, then token-styled and visible; activating moves focus to `#main` (`tabIndex=-1`). |
| Reduced-motion users | Hairline transition + smooth-scroll gated on `motion-safe:`; reduced = instant border/backdrop, instant jump. |
| Two `<nav>` elements (header + footer) flagged | Both are valid because each has a distinct `aria-label` ("Primary" / "Footer"). |
| Theme toggle duplicated (SETUP.3 proof page) | Toggle now lives in the nav; remove any standalone instance from `app/page.tsx`. One per breakpoint. |
| Backdrop blur unsupported / low-end device | `bg-background/80` carries the contrast even without blur; blur is progressive enhancement, not load-bearing. |
| Wordmark mistaken for the page `h1` | Wordmark is an `<a>` (link), not a heading. The page keeps the only `<h1>` (HOME.1). |

## Out of Scope
- Real homepage sections, hero, and the single `<h1>` (**HOME.1–HOME.9**).
- Request-access form, server action, Resend, success/error states (**CONV.1**) — shell only links to the reserved anchor.
- Analytics + consent banner (**CONV.2**).
- Per-page metadata, OG image, sitemap, structured data (**SEO.1 / SEO.2**) — shell adds no metadata.
- Bodies of `/privacy`, `/terms`, `/accessibility` — reserved routes only; content owned by later legal/SEO stories.
- A logo image asset / brand mark (text wordmark only here).
- Command palette, search, locale switcher, megamenus.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.3 (tokens, `ThemeProvider`, `ThemeToggle`, focus ring) | done | The themeable surface + toggle the shell composes; relocating the toggle |
| `design.md` tokens | done (source of truth) | All shell colors, radius, motion |
| `specs/content/messaging.md` | done | Tagline + CTA copy; legal/footer labels |
| shadcn `Sheet`/`DropdownMenu` + lucide icons | add via shadcn MCP | Accessible mobile menu |
| Unblocks → HOME.1–HOME.9, CONV.1, CONV.2 | — | Every section/page renders inside this shell with landmarks + global CTA |

## Implementation Plan
**Single day (~5–7 hrs):**
1. **Morning — landmarks + header.** Add the skip link + `<main id="main">` in `app/layout.tsx` (preserve the SETUP.3 `ThemeProvider`/`suppressHydrationWarning`). Build `components/site-header.tsx` (Server) + the `"use client"` scroll-state leaf using a sentinel/IntersectionObserver. Wire the wordmark, desktop links, relocated `ThemeToggle`, and the primary CTA → `#request-access`. Define `content/navigation.ts`.
2. **Midday — mobile menu + footer.** Add shadcn `Sheet`; build `components/mobile-nav.tsx` with `aria-expanded`/`aria-controls`, focus trap/restore, `Esc`-to-close. Build `components/site-footer.tsx` from `content/navigation.ts` (columns, legal line, accessibility-statement link, secondary CTA). Reserve `/privacy` `/terms` `/accessibility` hrefs.
3. **Afternoon — gate.** Verify both themes; confirm hairline-on-scroll has zero CLS and reduced-motion snaps; keyboard-walk skip link → nav → CTA → toggle → mobile menu. Grep for stray hex/raw utilities. Write + pass `verify-setup-4.ts`; `tsc`/`lint`; append manual-checks; land on `auto/SETUP.4` → PR (design-critique + a11y review on the PR).

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-setup-4.ts   (or: npx tsx src/scripts/verify-setup-4.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.4 — app shell (nav + footer)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => fs.readFileSync(p, 'utf8');

  // FILES PRESENT
  await check('site-header.tsx exists', () => exists('components/site-header.tsx'));
  await check('site-footer.tsx exists', () => exists('components/site-footer.tsx'));
  await check('mobile-nav present', () => exists('components/mobile-nav.tsx') || /Sheet|DropdownMenu/.test(read('components/site-header.tsx')));
  await check('content/navigation.ts exists (typed nav data)', () => exists('content/navigation.ts'));

  const layout = read('app/layout.tsx');
  const header = read('components/site-header.tsx');
  const footer = read('components/site-footer.tsx');

  // LANDMARKS + SHELL WIRING
  await check('layout renders SiteHeader + SiteFooter', () => /SiteHeader/.test(layout) && /SiteFooter/.test(layout));
  await check('main has id="main"', () => /<main[^>]*id=["']main["']/.test(layout));
  await check('skip-to-content link to #main', () => /href=["']#main["']/.test(layout));
  await check('header is sticky', () => /sticky/.test(header) && /top-0/.test(header));
  await check('header uses <header> + labeled <nav>', () => /<header/.test(header) && /<nav[^>]*aria-label=/.test(header));
  await check('footer uses <footer> + labeled <nav>', () => /<footer/.test(footer) && /<nav[^>]*aria-label=/.test(footer));

  // HAIRLINE-ON-SCROLL (additive, not layout)
  await check('scrolled state toggles border-border', () => /border-border/.test(header));
  await check('uses sentinel/IntersectionObserver or scroll state leaf', () =>
    /IntersectionObserver/.test(header) || exists('components/nav-scroll-state.tsx') || /scroll/i.test(header));

  // MOBILE MENU A11Y
  const mobile = exists('components/mobile-nav.tsx') ? read('components/mobile-nav.tsx') : header;
  await check('mobile trigger has aria-expanded/aria-controls', () => /aria-expanded/.test(mobile) && /aria-controls/.test(mobile));

  // CTA NOT A DEAD LINK
  await check('primary CTA targets reserved anchor/route, not "/"', () =>
    /#request-access/.test(header) || /\/request-access/.test(header));

  // CONTENT INTEGRITY
  await check('tagline from messaging.md present in footer', () =>
    /operating system for robotics companies/i.test(footer));
  await check('accessibility statement link present', () =>
    /accessibility/i.test(footer));

  // MOTION
  await check('reduced-motion respected (motion-safe or media query)', () =>
    /motion-safe|prefers-reduced-motion/.test(header) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // GUARDRAILS — tokens only
  const files = ['components/site-header.tsx','components/site-footer.tsx','content/navigation.ts']
    .concat(exists('components/mobile-nav.tsx') ? ['components/mobile-nav.tsx'] : [])
    .concat(exists('components/nav-scroll-state.tsx') ? ['components/nav-scroll-state.tsx'] : []);
  await check('no inline hex in shell files', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities in shell files', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));

  // SINGLE H1 OWNERSHIP — shell must not add an <h1>
  await check('shell adds no <h1> (page owns it)', () => !/<h1/.test(header) && !/<h1/.test(footer));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## SETUP.4 — app shell (nav + footer)
- [ ] Nav is borderless/transparent at the top; after scrolling it gains a 1px hairline + subtle backdrop with NO jump/CLS.
- [ ] Tab from page load: the first stop is "Skip to content" (visible on focus); activating it moves focus into the content.
- [ ] Keyboard-walk nav links, the Request access CTA, and the theme toggle — each shows a visible teal focus ring.
- [ ] Mobile (<md): the menu opens by keyboard + tap, traps focus, closes on Esc/X, and returns focus to the trigger; no background scroll.
- [ ] Footer shows tagline, link columns, legal line, and an Accessibility statement link; no fake social/customer links.
- [ ] Both themes: hairline + backdrop read correctly on near-black AND white; teal appears only on the CTA + focus ring.
- [ ] prefers-reduced-motion on: the hairline/backdrop snap in (no fade) and anchor jumps are instant.
- [ ] Exactly one header, one main, one footer; the page (not the nav) still owns the single <h1>.
- [ ] Run design-critique on the PR: does the shell feel at home next to linear.app / harvey.ai?
```

## Common Mistakes to Avoid
- **CLS from the scroll border.** Toggling border/padding/height on scroll reflows the page. Keep the header a fixed height; make border + backdrop purely additive class toggles. Prefer an IntersectionObserver sentinel over a scroll listener to avoid main-thread jank.
- **A second `<h1>` in the chrome.** The wordmark is a link, not a heading; the footer has no `h1`. The page (HOME.1) owns the only `<h1>` — adding one in the shell breaks heading hierarchy on every route.
- **Dead CTA / dead anchors.** "Request access" must point at the reserved `#request-access`, never `/`. Section links use the documented id contract so HOME.* can match them — no 404s, no `href="#"`.
- **Hand-rolling the mobile menu.** Compose from shadcn `Sheet`/`DropdownMenu` so focus trap, `Esc`, `aria-expanded`/`aria-controls`, and focus restore come for free. A custom dialog will leak focus and fail a11y review.
- **Sneaking color in via opacity hex.** The backdrop is `bg-background/80`, not `#09090Bcc`. No inline hex, no raw `bg-zinc-*` — the verify grep fails on both, and it's the whole point of the tokens rule.
- **Inventing footer links.** No social icons, no customer logos, no unconfirmed entity name beyond what `messaging.md`/`../memory/` support. Legal/privacy/terms/accessibility are reserved routes filled by later stories — link them, don't fake their content.
- **Forgetting reduced motion.** The hairline fade and smooth-scroll must gate on `motion-safe:`; reduced-motion users get instant state changes.

## Build Rules for This Story
- Tokens only, from `design.md` (the source of truth); where this PRD restates a value, `design.md` wins — flag any discrepancy in one line.
- Dark default and designed; light designed; one accent (electric teal) as signal on the CTA + focus ring only; near-monochrome surfaces; elevation via surface + 1px hairline borders, not shadow.
- WCAG 2.2 AA: skip-to-content link, correct landmarks, full keyboard operability, visible teal focus rings, accessible mobile disclosure (focus trap/restore, `aria-expanded`/`aria-controls`, `Esc`), `prefers-reduced-motion` honored.
- SEO/semantics: semantic `header`/`nav`/`main`/`footer`; the page keeps the single `<h1>`. Shell adds **no** per-page metadata — that's SEO.1.
- Performance: header chrome ships as a Server Component with a minimal `"use client"` leaf for scroll-state/menu only; no render-blocking JS; scroll work via IntersectionObserver, not a scroll listener.
- Content integrity (inherited from `../CLAUDE.md`): copy from `specs/content/messaging.md`; no invented links, customers, logos, or metrics; reserved legal routes noted, not faked.
- Marketing-site flavor: no auth/DB/jobs — no Clerk/Supabase/Stripe/Inngest; the only new deps are shadcn `Sheet`/`DropdownMenu` + lucide icons.
- This lands on `auto/SETUP.4` → PR (never `main`); design-critique + accessibility-review run on the PR before merge.

## Rollback Plan
Pure presentation, additive. To revert: delete `components/site-header.tsx`, `components/site-footer.tsx`, `components/mobile-nav.tsx`, `components/nav-scroll-state.tsx`, and `content/navigation.ts`; remove the `SiteHeader`/`SiteFooter` wrap, the skip link, and the `<main id="main">` edits from `app/layout.tsx` (restoring the SETUP.3 layout, keeping `ThemeProvider` + `suppressHydrationWarning`); restore the standalone `ThemeToggle` in `app/page.tsx` if it was removed; remove any shadcn `Sheet`/`DropdownMenu` files added solely for this story; delete `src/scripts/verify-setup-4.ts` and the SETUP.4 manual-checks block. No application data, no schema, no migrations. Since the loop lands this on `auto/SETUP.4` via PR, closing the PR unmerged reverts everything. **Zero data risk.**
