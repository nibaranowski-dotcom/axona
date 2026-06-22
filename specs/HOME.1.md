# PRD: Hero — H1 + subhead + dual CTA + "axon signal" motif (LCP-safe)

**Status**: Ready for Dev
**Priority**: P0
**Effort**: M (5–7 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.1

## Problem Statement
The homepage has a shell but no content — the first screen a design partner or a prospective CTO (Julia) sees is a placeholder. The hero is the 30-second test: it has to state the category, the wedge, and the seriousness of the company before anyone scrolls. It must read as belonging next to linear.app and harvey.ai, hit the performance budget on a mid-tier phone (the headline is the LCP element), and carry the one restrained brand motif — the "axon signal" — without sliding into stock-AI decoration. Get this wrong and the rest of the page never gets read.

## Success Metrics
| Metric | Target |
|---|---|
| LCP element = the H1, from static HTML/CSS | LCP ≤ 2.0s on throttled mid-tier mobile |
| CLS from the hero (incl. motif) | ≤ 0.05 (no layout shift) |
| Render-blocking JS in the hero critical path | 0 bytes |
| Hero readable + CTAs operable with JS disabled | Pass |
| Copy traces verbatim to `specs/content/messaging.md` | 100%, 0 banned words |
| Teal appears only as the motif pulse + primary CTA (+ focus rings) | ≤ 2 teal elements per viewport |
| `pnpm verify src/scripts/verify-home-1.ts` + `tsc --noEmit` + `pnpm lint` | All green |

## User Stories
- As a **design-partner ops leader**, I want to grasp what Axona is and the wedge (procurement & build co-pilot) in one screen so that I know whether to read on or request access.
- As a **prospective CTO (Julia)**, I want the hero to feel like a category-defining company with real craft so that Axona reads as worth joining.
- As a **mobile visitor on a slow connection**, I want the headline and CTAs to appear instantly so that the page is usable before any JS loads.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | `<h1>` = **"The operating system for robotics companies."** — the page's only `<h1>` (the shell owns none) | P0 | Verbatim from `messaging.md`. The LCP element. Geist, tight tracking, large weight |
| R2 | Subhead (verbatim from `messaging.md`): "Robotics companies run on humans, machines, and agents. Axona is the AI-native system that unifies all three — starting with an agentic procurement & build co-pilot that gets your line the parts it needs, on time, with a record of every unit you ship." | P0 | `text-muted-foreground`, readable measure (~60–70ch max-width) |
| R3 | Dual CTA: **primary "Request access"** → `#request-access`; **secondary "See how it works"** → `#how-it-works` | P0 | Primary = shadcn Button (teal); secondary = ghost/outline. Stable anchor contract from SETUP.4 R8/R9 — never a dead link |
| R4 | Micro-trust line (verbatim): "Working with a first cohort of design partners in humanoid and defense robotics." | P0 | **Labeled as access, not signed customers** (per content integrity). Small, muted, below CTAs |
| R5 | **Axon-signal motif** — one teal pulse traveling a near-monochrome node graph, rendered once. Decorative SVG, `aria-hidden="true"`, CSS-animated (transform/opacity or stroke only), **not** the LCP element | P0 | `design.md` motif. No literal robots, no particle soup, no stock AI imagery. Teal = `--primary`; graph lines = `--border`/`--muted-foreground` |
| R6 | **LCP-safe:** the hero is a Server Component; the headline/subhead/CTAs render from static HTML/CSS with **zero** render-blocking JS. The motif animates via **CSS only** (no JS), or is a `"use client"` leaf that never blocks the headline | P0 | Performance rule. Prefer pure-CSS motif so the entire hero ships zero client JS |
| R7 | `prefers-reduced-motion`: the pulse does not animate — show the static "signal at rest" (a still graph with the pulse positioned, not moving) | P0 | a11y + `design.md` motion rule; globals already kills transitions, but the SVG keyframe must also be gated |
| R8 | **No CLS:** reserve the motif's space (explicit dimensions / aspect-ratio box); fonts already `swap` via Geist (SETUP.2). Hero height stable from first paint | P0 | CLS ≤ 0.05 |
| R9 | Copy as typed data in `content/` (e.g. `content/home.ts` `hero` object), consumed by the component — not hardcoded JSX strings | P1 | Content rule (CMS-ready). Follows SETUP.4's `content/site.ts` pattern |
| R10 | Designed in **both** themes; dark default. The motif and CTAs read correctly on near-black and on white | P0 | One accent; near-monochrome surfaces |
| R11 | Responsive: on mobile the headline stays the LCP and legible; motif scales or repositions gracefully (may sit below/behind text), never causing overflow or CLS | P1 | Mobile-first; the message survives without the motif |

## Acceptance Criteria
- [ ] Exactly one `<h1>` on `/`, with the messaging headline verbatim; it is the measured LCP element.
- [ ] Subhead, dual CTA, and micro-trust line render verbatim from `messaging.md`; zero banned words.
- [ ] "Request access" → `#request-access`, "See how it works" → `#how-it-works`; both keyboard-operable with a visible teal focus ring; neither 404s if the target section isn't built yet.
- [ ] With JavaScript disabled, the headline, subhead, CTAs, and a (static) motif all render and the CTAs are clickable.
- [ ] The axon-signal motif is `aria-hidden`, token-driven (no inline hex), and animates via CSS; under `prefers-reduced-motion` it is static.
- [ ] No render-blocking JS in the hero; Lighthouse mobile LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms on the page.
- [ ] No inline hex, no raw Tailwind color utilities; teal appears at most twice in the viewport (motif pulse + primary CTA).
- [ ] Designed and correct in both light and dark.
- [ ] `pnpm verify src/scripts/verify-home-1.ts`, `tsc --noEmit`, and `pnpm lint` are green; `docs/manual-checks.md` updated with the HOME.1 block.

## Technical Requirements
- **Files:**
  - `components/hero.tsx` — **Server Component**. Renders `<section aria-labelledby="hero-title">` containing the `<h1 id="hero-title">`, subhead, the CTA pair (shadcn `Button` — primary `asChild` wrapping a `<Link href="#request-access">`, secondary variant `ghost`/`outline` → `#how-it-works`), the micro-trust line, and `<AxonSignal />`. No `"use client"` here.
  - `components/axon-signal.tsx` — the motif. **Prefer a Server Component with a pure-CSS-animated inline SVG** (a teal dot/pulse traveling a path via `@keyframes`, or an animated `stroke-dashoffset`). `aria-hidden="true"`, `focusable="false"`. Colors from tokens (`text-primary` for the pulse, `text-border`/`text-muted-foreground` for the graph). Keyframes defined in `globals.css` and gated by the existing `prefers-reduced-motion` block so the pulse rests when motion is reduced.
  - `content/home.ts` — typed `hero` object: `{ h1, subhead, primaryCta:{label,href}, secondaryCta:{label,href}, microTrust }`. Single source for the copy.
  - `app/page.tsx` — replace the SETUP.3 token-proof body with `<Hero />` inside the shell's `<main>` (the shell from SETUP.4 stays; do not add a second header/footer/h1). Remove leftover proof scaffolding.
  - `src/scripts/verify-home-1.ts` — the verification script below.
- **LCP discipline:** the `<h1>` must be plain server-rendered text styled with CSS — no client component wrapping it, no webfont blocking (Geist is `next/font`, already non-blocking). The motif must not be a larger paint than the headline; if needed, constrain its rendered size / position so the browser's LCP candidate is the headline.
- **Motif craft:** one continuous near-monochrome node/circuit path; a single teal pulse travels it once on load then loops slowly (e.g. 4–6s, `ease-[cubic-bezier(.2,0,0,1)]`), or rests if reduced-motion. Restraint — it should read as "signal," not as a screensaver. No box-shadow glow stacks; at most a soft token-based highlight.
- **Anchors:** `#request-access` and `#how-it-works` are forward contracts (CONV.1 / HOME.4). Until those exist, the links resolve to no-op in-page anchors (never 404). Document the ids in a comment so later stories adopt them.
- **No new dependencies.** SVG + CSS only; shadcn `Button` already present.

## UX Flow
```
/ (Server-rendered)
  └─ <main id="main">  (from SETUP.4 shell)
       └─ <section aria-labelledby="hero-title">         ← Hero (Server Component, zero blocking JS)
            ├─ <h1 id="hero-title"> The operating system for robotics companies.   ← LCP element
            ├─ subhead (muted, ~65ch)
            ├─ [ Request access ]  ( See how it works )   → #request-access / #how-it-works
            ├─ micro-trust: "Working with a first cohort of design partners…"
            └─ <AxonSignal aria-hidden>  ← one teal pulse on a near-monochrome graph
                   ├─ default: pulse travels the path (CSS @keyframes, ~5s loop)
                   └─ prefers-reduced-motion: static "signal at rest" (no animation)

JS disabled  → headline + subhead + CTAs + static motif all render; CTAs clickable
Slow network → headline paints from static HTML before any JS; LCP = headline
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled / fails to load | Entire hero is static HTML/CSS; motif is CSS-only → full render, CTAs work. |
| `prefers-reduced-motion` | Pulse animation disabled; motif renders as a static composition. |
| Very narrow mobile | Headline wraps and stays LCP; motif scales down / sits behind or below text; no horizontal scroll, no CLS. |
| `#how-it-works` / `#request-access` not built yet | Anchors resolve in-page (smooth-scroll if present, no-op if not) — never a 404 or dead `/`. |
| Motif becomes the LCP candidate | Constrain its size/position so the `<h1>` is the largest contentful paint; verify in Lighthouse. |
| Light theme | Teal shifts to the light token (`hsl(199 89% 48%)`); graph lines use light `--border`; contrast re-checked. |
| Reduced-motion + dark + mobile combined | All three honored simultaneously; static motif, dark tokens, no overflow. |

## Out of Scope
- The propose→approve→audit product mock / sample-data UI (**HOME.3**).
- The problem, wedge, how-it-works, why-now, thesis, who-it's-for, company, final-CTA sections (their own HOME.* / stories).
- The working request-access form and its destination (**CONV.1** owns `#request-access`).
- Per-page metadata, OG image, canonical, JSON-LD (**SEO.1**).
- Analytics events on the CTAs (**CONV.2**).
- Any new dependency or animation library.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (app shell, `<main id="main">`, content/ pattern) | done | Where the hero mounts; the skip target |
| SETUP.3 (tokens, themes, motion vars, reduced-motion block) | done | Motif + CTA theming |
| `messaging.md` hero copy | done (source) | All hero text |
| `#request-access` (CONV.1), `#how-it-works` (HOME.4) | not built | CTA destinations (forward contract; no 404 meanwhile) |

## Implementation Plan
**Single day (~5–7 hrs):**
1. **Morning — structure + copy.** `content/home.ts` hero object; `components/hero.tsx` (Server Component) with h1/subhead/CTAs/micro-trust; wire into `app/page.tsx` inside the shell; remove the SETUP.3 proof body. Confirm one h1, JS-disabled render, CTA anchors.
2. **Midday — the motif.** `components/axon-signal.tsx` inline SVG + `globals.css` keyframes (gated by reduced-motion); token colors only; reserve space (no CLS). Tune to "restraint, not screensaver."
3. **Afternoon — perf + gate.** Lighthouse mobile (LCP = headline ≤ 2.0s, CLS ≤ 0.05); both themes; reduced-motion check; write + pass `verify-home-1.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.1` → PR.

## Verification Script
```ts
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
```

## Append to docs/manual-checks.md
```
## HOME.1 — hero
- [ ] Lighthouse (mobile, throttled): LCP element is the H1, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms.
- [ ] Disable JS in DevTools → reload: headline, subhead, CTAs, and a static motif all render; CTAs are clickable.
- [ ] Toggle prefers-reduced-motion → the axon pulse stops animating (renders at rest); everything else intact.
- [ ] Tab order: skip-link → header → hero CTAs, each with a visible teal focus ring; "Request access" and "See how it works" scroll to their anchors (no 404).
- [ ] Both themes: dark (near-black) and light are designed; teal appears only as the motif pulse + primary CTA.
- [ ] Mobile width (~360px): no horizontal scroll, no layout shift; headline remains the dominant element.
- [ ] design-critique on the PR: does the hero feel at home next to linear.app / harvey.ai? Is the motif restraint, not decoration?
```

## Common Mistakes to Avoid
- **Making the hero a client component.** The headline must be static server-rendered HTML for LCP. Keep `"use client"` out of `hero.tsx`; if the motif needs JS at all, isolate it — but prefer pure CSS so the hero ships zero client JS.
- **Letting the motif win LCP.** A large animated SVG can become the LCP candidate and miss budget. Constrain its size/position so the `<h1>` is the largest paint; verify in Lighthouse, don't assume.
- **Motif as decoration.** No stock-AI imagery, no particle soup, no literal robots, no glow-shadow stacks. One teal pulse on a near-monochrome graph — signal, not screensaver. If it looks busy, it's wrong.
- **Teal spreading.** Teal is the pulse + the primary CTA (+ focus rings) only. If the hero reads "teal," pull it back.
- **Dead CTA links.** `#request-access`/`#how-it-works` are forward contracts — resolve them as in-page anchors now (no-op if the section doesn't exist), never `/` or a 404.
- **Inventing copy or trust.** Use `messaging.md` verbatim; the micro-trust line is design-partner *access*, not signed customers. No metrics, no logos.
- **CLS from the motif.** Reserve its space with explicit dimensions / aspect-ratio; never let it pop in and shove the headline.

## Build Rules for This Story
- Copy is verbatim from `specs/content/messaging.md`, modeled as typed data in `content/`; zero banned words; pre-launch trust claims labeled as access, not customers.
- Tokens only (`design.md`); dark default and designed; one accent (teal) as signal; near-monochrome surfaces; motion 120–240ms `cubic-bezier(.2,0,0,1)`, reduced-motion honored.
- Performance is a hard gate: no render-blocking JS on the hero; LCP = the headline ≤ 2.0s; CLS ≤ 0.05; INP ≤ 200ms on a throttled mid-tier phone.
- Semantic + a11y: one `<h1>`, `<section aria-labelledby>`, decorative motif `aria-hidden`, visible focus rings, keyboard-operable CTAs.
- Loop convention: build on `auto/HOME.1`, open a PR, merge via `gh` after review — never direct to `main`. design-critique + the manual checks run on the PR before merge.
- Precedence: where this PRD and `design.md`/`messaging.md` differ, those sources win — flag in one line.

## Rollback Plan
Revert `app/page.tsx` to the SETUP.3/4 state, delete `components/hero.tsx`, `components/axon-signal.tsx`, the `hero` object in `content/home.ts`, the motif keyframes in `app/globals.css`, `src/scripts/verify-home-1.ts`, and the HOME.1 manual-checks block. Pure presentation — no data, no schema. The loop lands this on `auto/HOME.1`; closing the PR unmerged reverts everything. **Zero data risk.**
