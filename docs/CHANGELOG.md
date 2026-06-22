# Changelog — Axona Commercial Website

Moved out of `CLAUDE.md` to keep the brief lean. Newest at the bottom; one entry per story.

- **2026-06-21 (SETUP.1):** Ran the "verify latest" pass and pinned the stack — Next.js 16
  (Turbopack default, Node ≥ 20), shadcn New York + unified `radix-ui` via MCP registry, WCAG 2.2
  AA, current Claude model strings (reference-only). Nothing in the stack needed a major correction
  vs. the June-2026 brief; the Next.js line was tightened from "pin majors at build" to a concrete 16.
- **2026-06-21 (SETUP.2):** Scaffolded the app and corrected one drift surfaced at build: the shadcn
  CLI moved to `{base}-{style}` **presets** (no more `--style new-york`). New York's successor is
  **`radix-vega`** (classic look) — **not** `radix-nova` (a compact variant). Pin updated to
  `radix-vega`. Landed: Next 16.2.9 + React 19.2.4, Tailwind v4, ESLint 9 (`eslint`, not `next lint`),
  Geist via the `geist` package, `app/` at repo root, `verify` script via `tsx`. The SETUP.2 build
  initialized `radix-nova`; reconcile to `radix-vega` in SETUP.3 (theming) via
  `shadcn init --preset radix-vega --force --no-reinstall`.
- **2026-06-21 (SETUP.3):** Made `design.md` executable — encoded every token as a CSS variable in
  `app/globals.css` (`:root` light + `.dark` dark, each authored independently; light is not an
  inversion), mapped through `@theme inline` to Tailwind v4 utilities. Electric teal is `--primary`
  **and** `--ring` (the only accent); surfaces stay near-monochrome; `secondary/muted/accent/
  destructive` are derived from the surface steps and flagged in-code as not-from-`design.md`. Added
  `next-themes` (only new dep): `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`,
  `suppressHydrationWarning` on `<html>` (no FOUC), plus an accessible `ThemeToggle`. `components.json`
  reconciled to `"style": "radix-vega"`. **Drift flagged:** the `shadcn init --preset radix-vega`
  network command could not run under the sandbox (install/network approval unavailable), so
  `components.json` was edited directly to `radix-vega`; since SETUP.3 overwrites `globals.css` with
  the `design.md` tokens, the preset's CSS defaults were irrelevant — only the style label and the
  unified `radix-ui` import lineage (unchanged) matter. `next-themes` still needs a `pnpm install` to
  land in `node_modules`.
- **2026-06-22 (SETUP.4):** Built the global app shell, composed once in `app/layout.tsx`: a
  sticky `SiteHeader` with a **CLS-safe hairline-on-scroll** (border animates transparent →
  `--border` — height never changes), a skip-to-content link → `<main id="main" tabIndex={-1}>`,
  and a `SiteFooter` with legal + accessibility links. Header/footer are **Server Components**;
  only the leaves that need it are client — `header-scroll` (an IntersectionObserver sentinel that
  toggles `data-scrolled` on the header via a direct DOM write, **no React state**, to protect
  INP), `nav-links` (`aria-current` via `usePathname`), and `mobile-nav` (Radix Dialog sheet).
  All shell copy/destinations live in `content/site.ts` (CMS-ready); every link maps to a real
  backlog story (HOME.3/4/8, CONV.1) or this PRD — no dead `#`. Added a real `/accessibility`
  statement page (own `<h1>`, WCAG 2.2 AA conformance, measures, known limitations, contact) with
  full per-page metadata + canonical. **Sign-off pending (rendered as marked placeholders, never
  fabricated):** legal entity + registered address, Privacy/Terms URLs, public accessibility
  email, social links. The SETUP.3 token-proof `page.tsx` was reparented under the shell (its own
  `<main>`/toggle removed; the layout now owns the single `<main>` and the toggle lives in the
  nav). Gate: `src/scripts/verify-setup-4.ts`.
- **2026-06-22 (HOME.3):** Built the product / wedge section (`#product`), mounted after the hero in
  `app/page.tsx`. `components/wedge.tsx` (Server Component) renders the heading, three value cards
  (one quiet `aria-hidden` lucide icon each — meaning lives in the text), and the trust line —
  copy verbatim from `content.md` via a new `wedge` object in `content/home.ts` (pure data; icon
  keys map to components in the section, keeping the module CMS-ready). `components/agent-action-mock.tsx`
  (also a Server Component) is the propose→approve→audit panel: the **full** paper trail renders
  statically so all five auditable fields (inputs · output · model · confidence · approver) and the
  human gate are readable with **JS disabled** — no stepper, no client leaf, no CLS. **Content
  integrity:** sample data only — a persistent, announced "Sample data — illustrative" badge, generic
  identifiers ("Supplier A", "Actuator HD-17"), model id "axona-procure (sample)"; no real/implied
  customer, supplier, person, or metric, and **no AI SDK / live model call** (the data is a typed
  const). Tokens only (no hex, no raw color utilities); teal reserved for the single Approve action;
  the risk flag is monochrome (meaning in text). Audit trail is a semantic `<dl>` that stacks into
  labeled rows below `sm`. Gate: `src/scripts/verify-home-3.ts`.
