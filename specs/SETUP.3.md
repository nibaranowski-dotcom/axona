# PRD: Encode design.md tokens as CSS variables + Tailwind theme; light/dark + toggle

**Status**: Ready for Dev
**Priority**: P0
**Effort**: M (5–7 hrs)
**Last Updated**: 2026-06-21
**Backlog Reference**: SETUP.3

## Problem Statement
The scaffold (SETUP.2) renders with shadcn's placeholder colors on the `radix-nova` preset — neither is Axona's design system. Until `design.md`'s tokens are encoded as CSS variables and bound into the Tailwind v4 theme, every component built after this inherits the wrong palette, the wrong radius, and an un-designed dark mode, and the "tokens only, never inline hex" rule has nothing real to point at. This story makes `design.md` executable: semantic CSS variables for both themes, the electric-teal accent as the single signal color, Geist bound to the type tokens, a designed (not inverted) dark mode that is the default, and a manual theme toggle that respects `prefers-color-scheme`. It also reconciles the shadcn preset to **`radix-vega`** (New York's actual successor) per the SETUP.2 changelog correction. After this, SETUP.4 and every HOME.* section composes against a correct, themeable surface.

## Success Metrics
| Metric | Target |
|---|---|
| Every `design.md` token present as a CSS variable in both themes | 100% of the token table |
| Components read semantic tokens only (no inline hex, no raw Tailwind color utilities) | 0 violations |
| Dark is default and designed; light fully designed; `prefers-color-scheme` honored + manual toggle | Pass |
| No theme flash (FOUC) on reload; toggle has no layout shift | Pass |
| Teal contrast: on near-black ≥ 3:1 (UI/large), text pairings ≥ 4.5:1; focus ring visible | WCAG 2.2 AA |
| shadcn preset reconciled to `radix-vega`; components still import from `radix-ui` | Verified |
| `pnpm verify src/scripts/verify-setup-3.ts` + `tsc --noEmit` + `pnpm lint` | All green |

## User Stories
- As a **section author (later stories)**, I want semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `border-border`) so that I never hardcode a color and every screen themes correctly.
- As a **visitor**, I want the site to honor my OS light/dark preference and let me override it, with no flash on load.
- As **Joe**, I want `design.md` to be the literal source of the theme so that design drift between the doc and the code is impossible.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Encode all `design.md` tokens as CSS variables in `app/globals.css` — `:root` (light) and `.dark` (dark) | P0 | Values come from `design.md` table verbatim; that doc is the single source |
| R2 | Map variables into Tailwind v4 via `@theme inline` (colors, radius, fonts) so utilities like `bg-background`, `text-muted-foreground`, `rounded-lg` resolve to tokens | P0 | Tailwind v4 is CSS-first; minimal/no `tailwind.config.ts` |
| R3 | Bind Geist: `--font-sans → var(--font-geist-sans)`, `--font-mono → var(--font-geist-mono)` (wired in SETUP.2) | P0 | Type does the work; no other families |
| R4 | Electric teal as `--primary` **and** `--ring` (focus). It appears as signal only | P0 | "If a screen looks teal, it's wrong." Ring = the accessible focus signal |
| R5 | Dark mode **designed, default, not inverted**; light fully designed. `next-themes` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange` | P0 | Honors `prefers-color-scheme`; dark when no preference. No FOUC (next-themes injects the pre-hydration script) |
| R6 | `ThemeProvider` in `app/layout.tsx`; `<html suppressHydrationWarning>`; accessible `ThemeToggle` (shadcn button + lucide icon, real `aria-label`, keyboard-operable, visible focus) | P0 | Toggle is the only interactive piece here |
| R7 | Reconcile shadcn preset to `radix-vega`: `pnpm dlx shadcn@latest init --preset radix-vega --force --no-reinstall` → `components.json "style": "radix-vega"`; existing components keep importing from `radix-ui` | P0 | Per SETUP.2 changelog; `--no-reinstall` leaves components in place |
| R8 | Radius tokens: controls 8px, cards 12px, pills full; spacing on the 4px grid (Tailwind default) | P1 | `--radius` base + derived `sm/md/lg`; map to shadcn radius scale |
| R9 | Derive shadcn tokens `design.md` doesn't name (secondary, muted, accent, input, destructive) from the near-monochrome surface steps; `destructive` = a restrained desaturated red — **mark as derived**, not from `design.md` | P1 | Keep near-monochrome; don't introduce a second accent |
| R10 | Motion tokens: `--ease-out: cubic-bezier(.2,0,0,1)`; durations 120/180/240ms; respect `prefers-reduced-motion` | P1 | Functional motion only; provide reduced-motion fallback |
| R11 | Demonstrate, don't decorate: update `app/page.tsx` placeholder to a minimal token/theme proof (surface steps, text tiers, one primary button, the toggle) — clearly a scaffold, not the hero | P1 | Lets design-critique judge the system; HOME.1 replaces it |

## Acceptance Criteria
- [ ] `app/globals.css` defines every `design.md` token as a CSS variable in `:root` and `.dark`, mapped through `@theme inline`.
- [ ] `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `ring` all resolve to the right token in both themes.
- [ ] Dark is the default with no preference; OS `prefers-color-scheme` is honored; the toggle overrides and persists; **no flash** on reload.
- [ ] `ThemeToggle` is keyboard-operable, has an `aria-label`, and shows a visible (teal) focus ring; `prefers-reduced-motion` is respected.
- [ ] `components.json` reads `"style": "radix-vega"`; `pnpm dlx shadcn@latest add card` still imports from `radix-ui` (unified).
- [ ] Teal passes contrast: as a UI/large element ≥ 3:1 on `--background` (both themes); `--primary-foreground` on `--primary` ≥ 4.5:1.
- [ ] No inline hex and no raw Tailwind color utilities anywhere in `app/` or `components/`.
- [ ] `pnpm verify src/scripts/verify-setup-3.ts`, `tsc --noEmit`, and `pnpm lint` are green.
- [ ] `docs/manual-checks.md` updated with the SETUP.3 block; `design-critique` run noted for PR review.

## Technical Requirements
- **Token values — from `design.md` (the source of truth):**

  | Variable | Light (`:root`) | Dark (`.dark`) |
  |---|---|---|
  | `--background` | `#FFFFFF` | `#09090B` |
  | `--foreground` | `#16181B` | `#EDEDEF` |
  | `--card` | `#FAFAFB` | `#0F0F12` |
  | `--popover` | `#FFFFFF` | `#16181B` |
  | `--muted-foreground` | `#6B7177` | `#9A9DA3` |
  | `--border` / `--input` | `#E6E6E8` | `#1F2226` |
  | `--primary` | `hsl(199 89% 48%)` | `hsl(199 95% 55%)` |
  | `--primary-foreground` | `#FFFFFF` | `#04141A` |
  | `--ring` | `var(--primary)` | `var(--primary)` |
  | `--radius` | `0.75rem` (12px cards; controls use `calc(--radius - 4px)`) | same |

  `secondary`/`muted`/`accent` derive from surface steps (card/border range); `destructive` = a restrained desaturated red — **derived, flagged in code comments as not-from-design.md.** Keep the near-monochrome.
- **Tailwind v4 wiring** (`app/globals.css`):
  ```css
  @import "tailwindcss";
  @import "tw-animate-css";
  @custom-variant dark (&:is(.dark *));

  :root  { --background:#FFFFFF; --foreground:#16181B; /* …all light tokens… */ --radius:0.75rem; }
  .dark  { --background:#09090B; --foreground:#EDEDEF; /* …all dark tokens… */ }

  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-card: var(--card);
    --color-muted-foreground: var(--muted-foreground);
    --color-border: var(--border);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    --color-ring: var(--ring);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);
    --radius-lg: var(--radius);
    --radius-md: calc(var(--radius) - 4px);
    --radius-sm: calc(var(--radius) - 6px);
  }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
  ```
- **Files:**
  - `app/globals.css` — replace placeholder tokens with the above.
  - `components/theme-provider.tsx` — `"use client"` wrapper around `next-themes` `ThemeProvider`.
  - `components/theme-toggle.tsx` — `"use client"`; shadcn `Button` (`variant="ghost" size="icon"`), lucide `Sun`/`Moon`, `aria-label`, `useTheme()`.
  - `app/layout.tsx` — wrap children in `ThemeProvider` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`); `<html lang="en" suppressHydrationWarning>`.
  - `app/page.tsx` — minimal token proof (surfaces, text tiers, one `bg-primary` button, `ThemeToggle`). Not a hero.
  - `components.json` — `"style": "radix-vega"` via the init reconcile command.
  - Add `next-themes` dependency.
- **`src/scripts/verify-setup-3.ts`** — token/theme/contrast/preset checks (below).
- **Do not** add a second accent, drop shadows-on-everything, or any color outside the token set. One accent, near-monochrome surfaces, elevation via surface steps + 1px borders.

## UX Flow
```
shadcn init --preset radix-vega --force --no-reinstall  (components.json → radix-vega)
        │
        ▼
globals.css: design.md tokens → :root + .dark ──► @theme inline maps to Tailwind utilities
        │
        ▼
layout.tsx: ThemeProvider (attribute=class, defaultTheme=dark, enableSystem)
        │
        ├─ no stored choice + OS = light ─► light theme
        ├─ no stored choice + OS = dark/none ─► dark (default)
        └─ user clicks ThemeToggle ─► overrides + persists ─► no flash on reload
        │
        ▼
page.tsx token proof renders ──► pnpm verify + tsc + lint ──► gate
        │
        ▼  (loop: branch auto/SETUP.3 ─► push ─► PR ─► human review: design-critique + a11y ─► merge)
```

## Edge Cases
| Case | Handling |
|---|---|
| Theme flash on first paint | `next-themes` injects a pre-hydration script; `suppressHydrationWarning` on `<html>`. Verify no flash in throttled reload. |
| `prefers-reduced-motion` users | Global reduce rule kills animation/transition; toggle still works instantly. |
| Teal fails contrast in one theme | Adjust only within `design.md`'s stated hsl (light 199 89% 48% / dark 199 95% 55%); if a pairing still fails, use teal for non-text UI/large only and flag the pairing — do not invent a new shade. |
| shadcn re-init overwrites token values | `--force --no-reinstall` updates preset/config; **re-apply** the `design.md` token block after, since init may rewrite `globals.css` defaults. Order: init first, then write tokens. |
| Raw Tailwind color utility slips in (`bg-zinc-900`) | Verify script greps `app/` + `components/` and fails on raw color utilities / inline hex. |
| `next-themes` hydration mismatch warning | Expected without `suppressHydrationWarning`; add it. Don't silence other warnings. |
| Light theme treated as "auto-inverted" | Light values are authored in `design.md` independently; never derive light by inverting dark. |

## Out of Scope
- Nav, footer, app shell (**SETUP.4**).
- Any homepage section, hero, or real copy (**HOME.***).
- The "axon signal" motif / hero visual (**HOME.1**).
- Per-page metadata, OG, sitemap (**SEO.***).
- A full component library build-out — only the toggle + a token proof page here.
- Storybook / visual regression tooling.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.2 (scaffold, Geist wired, shadcn on radix base) | done | The theme to bind onto |
| `design.md` token table | done (source of truth) | All token values |
| `next-themes` | to add | Toggle + system preference + no-flash |
| Unblocks → SETUP.4 + all HOME.* + design-critique gate | — | Correct themeable surface for every later screen |

## Implementation Plan
**Single day (~5–7 hrs):**
1. **Morning — preset + tokens.** Run the `radix-vega` reconcile; then write `design.md` tokens into `globals.css` (`:root` + `.dark`) and the `@theme inline` map. Confirm utilities resolve in both themes.
2. **Midday — theming + toggle.** Add `next-themes`; `ThemeProvider` in layout; build accessible `ThemeToggle`; `suppressHydrationWarning`. Verify no-flash + system-preference behavior.
3. **Afternoon — proof + gate.** Minimal token-proof `page.tsx`; check contrast (teal both themes); grep for stray hex/raw utilities; write + pass `verify-setup-3.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/SETUP.3` → PR.

## Verification Script
```ts
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
  const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach((e: any) => {
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
```

## Append to docs/manual-checks.md
```
## SETUP.3 — design tokens + theming
- [ ] Dark is the default with no stored choice; switching OS appearance flips the site (prefers-color-scheme honored).
- [ ] Toggle overrides OS, persists across reloads, and there is NO flash of the wrong theme on reload.
- [ ] Toggle is reachable by keyboard, shows a visible teal focus ring, and has a sensible aria-label; respects reduced-motion.
- [ ] Teal reads as a single signal (CTA/focus) — no screen "looks teal"; surfaces are near-monochrome.
- [ ] Spot-check contrast (DevTools/axe): body text ≥ 4.5:1, teal UI element ≥ 3:1, in BOTH themes.
- [ ] `pnpm dlx shadcn@latest add card` pulls `radix-ui` (unified) and matches the radix-vega look.
- [ ] Run design-critique on the PR: does the themed proof page feel at home next to linear.app? Dark designed, not inverted?
```

## Common Mistakes to Avoid
- **Auto-inverting light.** Light is authored from `design.md`, not computed by flipping dark. Two designed themes, not one inverted.
- **Letting teal spread.** `--primary` + `--ring` only; if a viewport reads "teal," it's wrong. Surfaces stay near-monochrome; elevation via surface steps + 1px borders, not shadow.
- **Init order.** Run the `radix-vega` reconcile **before** writing tokens — `shadcn init --force` can rewrite `globals.css`, so re-apply the `design.md` block after.
- **Token name mismatch (Tailwind v4).** v4 maps via `@theme inline` and `--color-*` names; a wrong name silently yields no utility. Verify `bg-background`/`text-muted-foreground` actually render.
- **FOUC.** Without `suppressHydrationWarning` + the `next-themes` script you get a flash and a hydration warning. Both are required; don't silence the warning by other means.
- **Sneaking raw utilities.** `bg-zinc-900`/inline hex will pass the eye but fail the rule (and the verify grep). Tokens only — that's the whole point of this story.
- **Over-building the proof page.** `page.tsx` is a token demonstration, not a hero. Keep it boring; HOME.1 replaces it.

## Build Rules for This Story
- Tokens only, from `design.md` (the source of truth); where this PRD restates a value, `design.md` wins on any discrepancy — flag it in one line.
- Dark default and designed; light designed; one accent (electric teal) as signal; near-monochrome surfaces; elevation via surface + hairline borders.
- WCAG 2.2 AA: contrast on the teal in both themes, visible focus ring (teal), keyboard-operable toggle, `prefers-reduced-motion` respected.
- This is the loop's first live run: land on `auto/SETUP.3` → PR (never `main`); `design-critique` + a11y review happen on the PR before merge (protection requires PR + 1 approval).
- No second accent, no new dependency beyond `next-themes`, no auth/DB/jobs.

## Rollback Plan
Revert `app/globals.css` to the SETUP.2 placeholder tokens; remove `components/theme-provider.tsx`, `components/theme-toggle.tsx`, the `ThemeProvider` wrap + `suppressHydrationWarning` in `app/layout.tsx`, the `next-themes` dependency, and the token-proof edits in `app/page.tsx`; restore `components.json` to its prior style if needed; delete `src/scripts/verify-setup-3.ts` and the SETUP.3 manual-checks block. Pure presentation — no data, no schema. Since the loop lands this on `auto/SETUP.3` via PR, closing the PR unmerged reverts everything. **Zero data risk.**
