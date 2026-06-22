# PRD: Why now (3 points) — calm token-driven timing section

**Status**: Ready for Dev
**Priority**: P2
**Effort**: S (3–4 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.5

## Problem Statement
The page argues *what* Axona is (hero), *what hurts* (problem), *what ships first* (wedge), *how it's shaped* (how-it-works), and *how it scales into a category* (pillars) — but never answers the first question a diligence-trained reader asks: **why now, and not three years ago or three years from now?** Without a "Why now" section the timing thesis is implicit, and an investor (a16z American Dynamism) or a model-frontier CTO (Julia) has to infer the inflection instead of reading it. The fix is three calm points — robotics is inflecting, the AI substrate to build an operating layer now exists, and forward-deployed delivery is the right go-to-market for this moment — sourced verbatim from `content.md` §6 and reconciled to `../memory/market.md`, `../memory/idea.md`, and `../memory/decisions.md`. The craft risk: a "why now" block is a slop magnet (three gradient cards, big numbers nobody verified, emoji bullets). This one is **calm and token-driven** — type and a 4px rhythm do the work, no fabricated metric — so it reads at the Linear/Harvey bar.

## Success Metrics
| Metric | Target |
|---|---|
| Heading + all three points render verbatim from `content.md` §6 | 100%, 0 banned words |
| Timing thesis reconciles to `../memory/market.md` (why-now / inflection), `../memory/idea.md` (specialized models + agent infra; forward-deployed), `../memory/decisions.md` — no invented metric, date, market-size number, or claim | Passes content-integrity review |
| **Token-driven:** zero inline hex, zero raw Tailwind color utilities anywhere in the section | 0 violations |
| Section renders fully with JS disabled (Server Component; points are HTML/CSS, no client JS) | Pass |
| Section has stable `id="why-now"` and `aria-labelledby` and an `<h2>` (page keeps one `<h1>`, the hero) | Present, heading order logical |
| Teal restraint — the section reads near-monochrome; teal marks at most one signal (an index marker or the third "now is the moment" point) | ≤ 1–2 teal elements per viewport |
| `pnpm verify src/scripts/verify-home-5.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold, zero client JS, no CLS — point space reserved) | LCP/CLS/INP in budget |

## User Stories
- As an **investor**, I want the timing thesis stated in three points — robotics inflecting, the AI substrate now buildable, forward-deployed as the right wedge — so that "why now" is legible in one scan and reads as a deliberate market call, not luck.
- As a **prospective CTO (Julia)**, I want the second point (specialized small models + agent infrastructure make an AI-native operating layer buildable today) stated plainly so that I read a technical why-now, not just a market one — the layer is buildable now, and that's the bet.
- As a **design-partner ops leader**, I want the third point (forward-deployed delivery ships to production with you and compounds into product) so that I understand how Axona actually engages and why the timing favors a partner, not a vendor.
- As a **keyboard / screen-reader user**, I want the three points conveyed as semantic, ordered, labeled content (a list of three items) so that the timing thesis is readable without sight or a mouse — not an inaccessible image or `div` soup.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Section heading verbatim from `content.md` §6: "Why now." Renders as `<h2>` (page owns one `<h1>`, the hero) | P0 | Section's only top-level heading; the trailing period is part of the verbatim copy |
| R2 | Three points, verbatim from `content.md` §6 — **(1)** "Robotics is inflecting — AI-accelerated R&D, robots building robots, capital flooding humanoids, defense, and space."; **(2)** "Specialized small models + agent infrastructure make an AI-native operating layer buildable today."; **(3)** "Forward-deployed delivery lets us ship to production with you and compound the work into product." | P0 | No paraphrase, no added/removed point, no invented metric, date, or market-size number beyond the verbatim copy |
| R3 | Copy as typed data in `content/home.ts` (`whyNow` object: `{ heading, points: { id, text }[] }`); component consumes it — no hardcoded strings in JSX | P0 | Content rule; mirrors `hero`/`problem`/`wedge`/`howItWorks`/`pillars`/`thesis` modules |
| R4 | **Three points as a calm, ordered list** (top→bottom, or three columns on wide viewports), each a token-styled item: a quiet index/marker (1·2·3 or a hairline tick) and the point text in `text-foreground`/`text-muted-foreground`. Type carries hierarchy; a 4px-grid rhythm; near-monochrome | P0 | Not three gradient cards. The points are equal weight; no point gets a card, shadow, or fill |
| R5 | **The one signal (token-driven):** at most one teal accent — e.g. the index markers, or a single hairline/tick — used as signal only, `text-primary`/`border-primary`. If the section reads "teal," reduce to a single marker. There is no big-number stat here to color (no metric exists) | P1 | `design.md`: one accent as signal. No fabricated stat to highlight; the accent is structural, not a number |
| R6 | Section is a **Server Component** `<section id="why-now" aria-labelledby="why-now-title">`; zero `"use client"`; the points are HTML/CSS, not canvas/JS | P0 | Performance + JS-disabled render; below the fold but must not regress CWV |
| R7 | Rendered after `<Pillars />` (HOME.4B) and before `<Thesis />` (HOME.6) inside the shell `<main>` in `app/page.tsx` | P0 | IA: hero → problem → wedge → how-it-works → pillars → **why-now** → thesis. `content.md` orders §6 Why-now between §5 pillars and §7 thesis; `app/page.tsx` comment ("HOME.5 inserts later") reserves this slot. Flag if order at build time differs |
| R8 | **Semantic structure:** the three points are an ordered list (`<ol>`) — or a labeled group read in order by AT — not an `<img>` and not unlabeled `div`s. Any index marker that is purely decorative is `aria-hidden`; the ordinal meaning is carried by the `<ol>` semantics, not by a colored number alone | P0 | A11y: the timing thesis is content, conveyed in DOM order |
| R9 | Designed in **both** themes; dark default; near-monochrome surfaces; points legible on near-black and on white; point-text contrast ≥ 4.5:1 both themes; any teal marker ≥ 3:1 both themes | P0 | One accent; elevation via surface steps + 1px hairline, never drop shadow |
| R10 | **Token-driven, enforced:** every color, radius, border, and the accent color use semantic tokens / theme vars only — no inline hex, no raw Tailwind color utilities, no hardcoded px for values `design.md` defines | P0 | The named constraint; the verify script greps for violations |
| R11 | Responsive: at ~360px the points stack to one column (1 → 2 → 3) with each keeping a readable measure, no horizontal scroll, no CLS (reserve height). On wide viewports a 3-column or stacked-list layout is acceptable if calm | P1 | Mobile-first; the stack is the natural mobile layout |
| R12 | `prefers-reduced-motion`: if any accent or item animates (a faint stagger/fade-in), it is `motion-safe:`-gated and renders static when reduced. Default is static | P1 | `design.md` motion rules; static is the default visual |
| R13 | No new dependency; compose with existing primitives + tokens only | P1 | Pure presentation |

## Acceptance Criteria
- [ ] Heading and all three points render verbatim from `content.md` §6; zero banned words; no paraphrase; no added/removed/reordered point; no invented metric, date, or market-size number.
- [ ] Copy lives in `content/home.ts` as a typed `whyNow` object; the component reads it, no hardcoded strings.
- [ ] The three points render as a semantic, ordered list (`<ol>` or a labeled group read in order) — readable by a screen reader as three ordered items, not an `<img>` or `div` soup.
- [ ] Section is a Server Component (no `"use client"`); with JavaScript disabled the full section and all copy render.
- [ ] Section has `id="why-now"` and `aria-labelledby="why-now-title"`; heading is an `<h2>` (page keeps one `<h1>`, the hero).
- [ ] Page order in `app/page.tsx` is `<Pillars />` → `<WhyNow />` → `<Thesis />` inside the shell `<main>`.
- [ ] **Token-driven:** no inline hex and no raw Tailwind color utilities anywhere in the section files; any accent is `--primary`/`text-primary`/`border-primary` (or a token-derived value), not a hardcoded teal.
- [ ] Section reads near-monochrome (≤ 1–2 teal elements per viewport); point-text contrast ≥ 4.5:1 and any teal marker ≥ 3:1 in both themes; designed (not auto-inverted) in both.
- [ ] If any item/accent animates, it is `motion-safe:`-gated and static under `prefers-reduced-motion`.
- [ ] Mobile (~360px): points stack to one column, each keeps a readable measure, no horizontal scroll, no CLS.
- [ ] Timing thesis reconciles to `../memory/market.md` + `../memory/idea.md` + `../memory/decisions.md`; no invented metric, customer, date, or claim.
- [ ] `pnpm verify src/scripts/verify-home-5.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.5 block.

## Technical Requirements
- **Files:**
  - `components/why-now.tsx` — **Server Component**. Renders `<section id="why-now" aria-labelledby="why-now-title">` with `<h2 id="why-now-title">` and the three points as a semantic `<ol>` of token-styled items. Consumes `whyNow` from `content/home.ts`. No `"use client"`, no state. Each `<li>` carries the point text; any visual index marker (1·2·3) is decorative (`aria-hidden`) since the `<ol>` already conveys order. Document the order contract and the `id` in comments.
  - `content/home.ts` — extend with a typed `whyNow` object: `export interface WhyNowPoint { id: string; text: string }` and `export const whyNow: { heading: string; points: WhyNowPoint[] }`. Copy verbatim from `content.md` §6 (three points). Add a CMS-ready/content-integrity comment (reconciles to `../memory/market.md` + `../memory/idea.md` + `../memory/decisions.md`; no fabrication).
  - `app/page.tsx` — render `<WhyNow />` between `<Pillars />` and `<Thesis />` inside the shell `<main>`. Do not add a second `<h1>`, header, or footer.
  - `src/scripts/verify-home-5.ts` — the verification script below.
- **Content discipline:** copy is verbatim from `specs/content/content.md` §6 "Why now" (canonical, supersedes `messaging.md`). The three points reconcile to `../memory/market.md` (the why-now / inflection thesis: AI-accelerated R&D, robots building robots, capital into humanoids/defense/space), `../memory/idea.md` (specialized small models + agent infrastructure; forward-deployed delivery that compounds into product), and `../memory/decisions.md` (the forward-deployed go-to-market decision). **Do not** add a fourth point, a market-size dollar figure, a funding stat, a date, or any named fund/company beyond the verbatim copy — these are durable [assumption]-grade claims and the section ships only what `content.md` §6 states.
- **Layout / craft (token-driven):**
  - Three points as a calm ordered list (stacked) or a 3-column grid on wide viewports. Each item: a quiet index/marker (a small `text-muted-foreground` ordinal or a `border-l` hairline tick) and the point text in `text-foreground` (lead) / `text-muted-foreground` (supporting), Geist, a readable measure on the 4px grid.
  - **Elevation via surface steps + 1px hairline borders**, never drop shadow. Points separated by gaps or thin hairlines (`border-border`), not boxed gradient cards. The heading "Why now." sits calm above the list, constrained measure.
  - **The one signal:** at most one teal accent — the index markers as `text-primary`, or a single `border-primary` tick. One accent, token-colored. If a screen reads "teal," pull back to a single marker. There is no statistic to color (no metric exists in the copy).
  - **No slop:** no gradient-filled cards, no drop shadows, no emoji/clip-art bullets, no big invented numbers, no center-everything template. If a list glyph helps, at most one restrained lucide glyph, `aria-hidden` — optional and quiet (default: ordinals or no icons, type only).
- **Token-driven enforcement:** all colors/borders/radius reference semantic tokens or theme CSS vars from `design.md`. Any accent is `var(--primary)` / `text-primary` / `border-primary` — **never** an inline `#` hex and never `text-teal-*`/`bg-cyan-*`. The verify script greps the section files for both and fails on either.
- **Perf:** below the fold, not the LCP element. Zero client JS (Server Component). Reserve point height so there is no CLS on load. No network image (the section is type + a list); if any raster were used it goes through `next/image` with explicit `sizes` (not expected here).
- **A11y:** the three points are a semantic ordered list read in order; any decorative index marker is `aria-hidden` (order comes from `<ol>`, not from a colored number). Point-text contrast ≥ 4.5:1 both themes; any teal accent checked on near-black and on white (≥ 3:1).

## UX Flow
```
/ (Server-rendered)
  └─ <main id="main">  (SETUP.4 shell)
       ├─ <Hero>                                   ← #hero, the <h1>, LCP
       ├─ <Problem>                                ← #problem (HOME.2)
       ├─ <Wedge>                                  ← #product, the demo mock (HOME.3)
       ├─ <HowItWorks>                             ← #how-it-works, the 4 layers (HOME.4)
       ├─ <Pillars>                                ← #pillars, primitives × domains × verticals (HOME.4B)
       ├─ <section id="why-now" aria-labelledby="why-now-title">          ← WhyNow (Server Component)
       │     ├─ <h2 id="why-now-title"> "Why now."
       │     └─ three points (semantic <ol>, token-styled items, read in order):
       │        ┌──────────────────────────────────────────────────────────┐
       │     1  │ Robotics is inflecting — AI-accelerated R&D, robots        │
       │        │ building robots, capital flooding humanoids, defense,      │
       │        │ and space.                                                 │
       │        ├──────────────────────────────────────────────────────────┤
       │     2  │ Specialized small models + agent infrastructure make an    │
       │        │ AI-native operating layer buildable today.                 │
       │        ├──────────────────────────────────────────────────────────┤
       │     3  │ Forward-deployed delivery lets us ship to production with  │
       │        │ you and compound the work into product.                    │
       │        └──────────────────────────────────────────────────────────┘
       │        (the one accent: a single teal index marker or hairline tick — signal only)
       └─ <Thesis>                                 ← #thesis (HOME.6)

JS disabled  → full heading + all three points render from HTML/CSS
mobile ~360px → points stack to one column (1 → 2 → 3), no horizontal scroll
prefers-reduced-motion → any stagger/fade renders static
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled / fails to load | Entire section is static server-rendered HTML/CSS; full render. Nothing depends on JS; any accent default state is static. |
| Reader expects a metric / market-size number | The copy is verbatim and carries no number by design (pre-launch, no verified figure ships). Add no dollar figure, funding stat, TAM, or date beyond the verbatim points; reconciles to `../memory/`. |
| Section reads as slop (gradient cards / shadows / big fake stats / emoji bullets) | Token list + hairlines + type hierarchy only; one teal accent at most; no gradient fill, no drop shadow, no invented number, no emoji-as-icons, no centered template. design-critique gate on the PR. |
| Section turns teal | One accent max — a single index marker or hairline tick. If it reads teal, reduce to one marker; the points stay muted-monochrome. |
| Inaccessible points (image / div soup) | Three points are a semantic `<ol>` read in order; decorative index marker `aria-hidden`; not an `<img>`. |
| Order conveyed by color alone | The `<ol>` carries the ordinal meaning; a colored "1/2/3" reinforces but is not the only signal — passes "don't rely on color alone." |
| Long points overflow on narrow mobile | Points stack to one column; each keeps a readable measure and wraps; reserved height prevents CLS; no horizontal scroll. |
| Light theme contrast | Point `text-foreground`/`text-muted-foreground` and any teal marker re-checked ≥ 4.5:1 / 3:1 against the light canvas; both themes designed, not inverted. |
| Page order drifts (why-now vs. thesis) | Render `<WhyNow />` above `<Thesis />` per R7; if `app/page.tsx` at build time orders differently, flag in one line and reconcile to the `content.md` §6→§7 order (why-now above thesis). |

## Out of Scope
- The three-pillars section (`content.md` §5, HOME.4B — shipped) and the 4-layer architecture (`content.md` §4, HOME.4 — shipped) — do not re-render or merge them here.
- The thesis (HOME.6 — present), who-it's-for (HOME.7), company (HOME.8), and final-CTA (HOME.9) sections.
- Any metric, market-size figure, funding stat, chart, count, date, or named fund/company on the points (the section is a qualitative timing thesis, not evidence).
- Any per-page metadata, OG image, canonical, or JSON-LD (SEO.1).
- A bespoke animated/canvas/WebGL graphic, parallax, particle background, or scroll-driven reveal — at most a single token-colored accent and an optional `motion-safe:` stagger.
- Real partner/customer/vendor logos or named entities beyond the verbatim copy.
- Any new dependency or component primitive.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (app shell, `<main id="main">`, `content/` pattern, section mount points) | needed (per backlog) — confirm done at build | Where the section mounts; the `content/` model it extends |
| SETUP.3 (tokens, surfaces, themes, type scale, focus ring) | done | The token-driven list, accent, both-theme design |
| HOME.1 (`content/home.ts` exists, hero rendered, the page's one `<h1>`) | done | Extend the same content module; heading order (`<h2>` after the hero `<h1>`) |
| HOME.4B (`<Pillars />` / `#pillars` rendered) | done | Page order (`WhyNow` renders after the pillars) |
| `content.md` §6 "Why now" copy | done (source) | All section copy |
| `../memory/market.md` + `../memory/idea.md` + `../memory/decisions.md` | done (source) | Timing-thesis reconciliation (inflection · buildable substrate · forward-deployed) |

## Implementation Plan
**Single day (~3–4 hrs):**

1. Extend `content/home.ts` with the typed `whyNow` object (`heading`, `points[]` of `{ id, text }`), copy verbatim from `content.md` §6 (three points). Add the CMS-ready/integrity comment mirroring `hero`/`problem`/`wedge`/`howItWorks`/`pillars`/`thesis`.
2. Build `components/why-now.tsx` (Server Component) — `<section id="why-now" aria-labelledby="why-now-title">`, `<h2 id="why-now-title">`, and the three points as a semantic `<ol>` of token-styled items. Consume `whyNow` from content; tokens only. Document the order and the `id` contract in comments.
3. Tune the list layout: surface steps + hairlines, the 4px-grid rhythm, any index marker in `text-muted-foreground`/`text-primary`, both themes, mobile (~360px) stack and reserved height (no CLS). Add at most a single token-driven accent; `aria-hidden` if decorative; `motion-safe:`-gate any animation, default static.
4. Wire `<WhyNow />` between `<Pillars />` and `<Thesis />` in `app/page.tsx`; confirm one `<h1>`, `<h2>` heading order, JS-disabled render. Grep for stray hex/raw color utilities. Write + pass `verify-home-5.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.5` → PR (design-critique + a11y review on the PR).

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-5.ts   (or: npx tsx src/scripts/verify-home-5.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.5 — why now (3 points)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const comp = read('components/why-now.tsx');
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/why-now.tsx exists', () => !!comp);
  await check('content/home.ts has a whyNow object', () => /whyNow\s*[:=]/.test(content));
  await check('page renders <WhyNow', () => /<WhyNow\b/.test(page));
  await check('section id="why-now"', () => /id=["']why-now["']/.test(comp));
  await check('section aria-labelledby="why-now-title"', () => /aria-labelledby=["']why-now-title["']/.test(comp));

  // ORDER — WhyNow sits between Pillars and Thesis
  await check('order: <Pillars> … <WhyNow> … <Thesis>', () => {
    const p = page.indexOf('<Pillars'), w = page.indexOf('<WhyNow'), t = page.indexOf('<Thesis');
    return p > -1 && w > -1 && t > -1 && p < w && w < t;
  });

  // COPY (verbatim, content.md §6)
  await check('heading verbatim ("Why now.")', () => /Why now\./.test(all));
  await check('point 1 verbatim (robotics inflecting)', () =>
    /Robotics is inflecting — AI-accelerated R&D, robots building robots, capital flooding humanoids, defense, and space\./.test(all));
  await check('point 2 verbatim (buildable today)', () =>
    /Specialized small models \+ agent infrastructure make an AI-native operating layer buildable today\./.test(all));
  await check('point 3 verbatim (forward-deployed)', () =>
    /Forward-deployed delivery lets us ship to production with you and compound the work into product\./.test(all));
  await check('exactly three points, not four (no extra point entry)', () => {
    const m = content.match(/\btext\s*:/g) || [];
    // whyNow points each carry a `text:` field; allow other content modules to also use `text:`
    // so assert the whyNow block specifically has three.
    const block = (content.match(/whyNow[\s\S]*?\]/) || [''])[0];
    const n = (block.match(/\btext\s*:/g) || []).length;
    return n === 3;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('why-now is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('points rendered as a semantic list (<ol> or role="list")', () => /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('not an <img> of the points (it is content, not an image)', () => !/<img\b/.test(comp) && !/\bImage\b/.test(comp));

  // TOKEN-DRIVEN — the named constraint of this story
  const files = ['components/why-now.tsx','content/home.ts'].filter((f) => exists(f));
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('any accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    !/(animate-|bg-primary|text-primary|border-primary|var\(--primary\))/.test(comp) ||
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // INTEGRITY — no fabricated metric/market-size/date snuck into the section copy
  await check('no fabricated stat (no %, $, or "billion" in the points)', () => {
    const block = (content.match(/whyNow[\s\S]*?\]/) || [''])[0];
    return !/[\$£€]\s?\d|\d+\s?%|\bbillion\b|\btrillion\b/i.test(block);
  });

  // MOTION — any animation respects reduced motion
  await check('reduced-motion respected if anything animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in whyNow copy', () => {
    const block = (content.match(/whyNow[\s\S]*?\]/) || [''])[0];
    return !banned.test(block);
  });

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.5 — why now (3 points)
- [ ] Heading + all three points (robotics inflecting · buildable substrate today · forward-deployed) read verbatim from content.md §6; no banned words, no added/removed/reordered point, no invented metric, date, or market-size number.
- [ ] The section reads as a calm three-point timing thesis, not gradient cards, drop shadows, big fake stats, emoji bullets, or a centered template.
- [ ] Disable JS in DevTools → reload: the full heading and all three points render.
- [ ] Section sits between the pillars and the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the three points are announced in order as an ordered list; any "1/2/3" marker is decorative (order comes from the list, not color alone).
- [ ] Token-driven: inspect element — colors/borders/radius/any accent come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; any teal accent reads correctly on both; points pass AA; section reads near-monochrome (one accent at most).
- [ ] prefers-reduced-motion on: any stagger/fade renders static.
- [ ] Mobile (~360px): points stack to one column, each keeps a readable measure, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does an a16z partner read this and see a deliberate "why now," at the linear/harvey bar?
```

## Common Mistakes to Avoid
- **Inventing a stat to fill the space.** A "why now" block tempts a big number — a TAM, a funding figure, a growth %, a date. The copy carries none and none ships: pre-launch integrity (`../CLAUDE.md`) bans fabricated metrics. The points are qualitative and verbatim; add no `$`, `%`, "billion," or year.
- **Three-card slop.** Three points is a canonical slop surface: gradient-filled cards, a drop shadow per card, emoji/check-circle bullets, a center-everything template. Use a token list + hairlines + type hierarchy + at most one teal accent. If it doesn't look like it belongs next to linear.app, it isn't done.
- **Hardcoding the teal.** Any accent must be `var(--primary)`/`text-primary`/`border-primary`, never `#0EA5E9` or `text-cyan-500`/`text-teal-500`. The verify grep fails on inline hex and raw color utilities.
- **Order by color alone.** The `<ol>` carries the ordinal meaning; a colored "1/2/3" reinforces but must not be the only signal — a colorblind or monochrome reader still gets the order from the list.
- **Editing the points.** Verbatim and in order: each of the three exactly as written; no added fourth point, no dropped clause ("defense, and space"), no reordering. Pre-launch integrity governs.
- **A second `<h1>` or a CLS jump.** The hero owns the page's only `<h1>`; this heading is `<h2>`. Reserve point height so the list doesn't shift layout on load.

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §6 "Why now" (canonical, supersedes `messaging.md`), modeled as typed data in `content/home.ts`; zero banned words; no invented metric, date, market-size figure, customer, or traction (inherited from `../CLAUDE.md`).
- Timing thesis reconciles to `../memory/market.md` (inflection / why-now), `../memory/idea.md` (specialized small models + agent infrastructure; forward-deployed delivery that compounds into product), and `../memory/decisions.md` (the forward-deployed go-to-market decision) — flag any conflict in one line; do not ship a claim that contradicts memory.
- **Token-driven (the named constraint):** every color, border, radius, and any accent color comes from `design.md` tokens / theme CSS vars — no inline hex, no raw Tailwind color utilities. Dark default and designed; light designed, not inverted; near-monochrome; one accent (teal) as signal only; elevation via surface steps + 1px hairline, not shadow; type carries hierarchy.
- Server Component, zero client JS (any optional `motion-safe:` leaf is the only exception); the points are HTML/CSS, render fully with JS disabled; below the fold but must not regress LCP/CLS/INP (reserve height; no CLS).
- Semantic + a11y (WCAG 2.2 AA): one `<h2>` after the hero `<h1>`, `<section aria-labelledby>`, the three points as a semantic ordered list read in order, decorative index marker `aria-hidden`, order not conveyed by color alone, point-text contrast ≥ 4.5:1 and any teal accent ≥ 3:1 in both themes, `prefers-reduced-motion` honored.
- SEO/semantics: this section adds no per-page metadata (that's SEO.1); it provides the `#why-now` anchor for in-page reference — never a dead link if linked.
- Marketing-site flavor: no auth/DB/jobs — no Clerk/Supabase/Stripe/Inngest; no live model call / no AI-SDK dependency (this section is static timing copy). No new dependency.
- Loop convention: build on `auto/HOME.5`, open a PR, merge via `gh` after review — never direct to `main`; design-critique + accessibility-review on the PR.
- Precedence: where this PRD and `content.md`/`design.md`/`../memory/` differ, those sources win — flag in one line. `content.md` orders §6 Why-now between §5 pillars and §7 thesis and `app/page.tsx` reserves the slot ("HOME.5 inserts later"); render `<WhyNow />` between `<Pillars />` and `<Thesis />` and flag if `app/page.tsx` order at build time differs.

## Rollback Plan
Revert `app/page.tsx` to remove `<WhyNow />`, delete `components/why-now.tsx`, the `whyNow` object and its `WhyNowPoint` interface in `content/home.ts`, `src/scripts/verify-home-5.ts`, and the HOME.5 manual-checks block. No nav link depends on `#why-now` today (it is an in-page anchor only), so removal degrades nothing — never a 404. Pure presentation — static text + CSS, no data, no schema, no model call, no migration. The loop lands this on `auto/HOME.5`; closing the PR unmerged reverts everything. **Zero data risk.**
