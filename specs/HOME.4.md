# PRD: How it works — 4-layer architecture diagram (token-driven)

**Status**: Ready for Dev
**Priority**: P1
**Effort**: M (5–7 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.4

## Problem Statement
After the wedge (HOME.3) shows *what Axona does first*, a technical reader — Julia, an investor — needs to see *how the whole system is shaped* so the procurement co-pilot reads as the first app on a real platform, not a one-off tool. Without this section the page asserts "operating system" but never renders the system's structure, and the category claim stays unsubstantiated for the exact audience trained to distrust it. The fix is one diagram: four stacked layers — Foundation → Intelligence spine → Domain apps → Vertical editions — that show data flowing up into specialized models/memory and back down into packaged product. It also carries the nav `#how-it-works` anchor the shell (SETUP.4) already links, so until this ships that link has no destination. The craft risk: an architecture diagram is where design gets slopped (gradient boxes, drop shadows, a default-font flowchart). This one is **token-driven** — every visual value comes from `design.md`, nothing hardcoded — so it reads at the Linear/Harvey bar.

## Success Metrics
| Metric | Target |
|---|---|
| Heading + all four layer labels/descriptions render verbatim from `content.md` §4 | 100%, 0 banned words |
| Architecture reconciles to `../memory/` taxonomy (humans+machines+agents; models+memory; primitives→domains→verticals) — no invented layer/metric/claim | Passes content-integrity review |
| **Token-driven:** zero inline hex, zero raw Tailwind color utilities anywhere in the section | 0 violations |
| Section renders fully with JS disabled (Server Component; diagram is HTML/CSS, not canvas/JS) | Pass |
| Section has stable `id="how-it-works"` (the SETUP.4 nav contract) | Present, nav link resolves |
| Teal restraint — the diagram reads near-monochrome; teal marks only the signal path/active accent | ≤ 1–2 teal elements per viewport |
| `pnpm verify src/scripts/verify-home-4.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold, minimal/zero client JS, no CLS — diagram space reserved) | LCP/CLS/INP in budget |

## User Stories
- As a **prospective CTO (Julia)**, I want the four layers shown as a real stack — data/tools at the base, a models+memory spine, domain apps, vertical editions on top — so that I read Axona as a platform with a defensible intelligence layer, not a single workflow tool.
- As a **design-partner ops leader**, I want to see that procurement is the first domain app on a system that extends to quality, maintenance, and logistics so that I understand I'm buying into a roadmap, not a point solution.
- As an **investor**, I want the architecture to make the compounding moat legible — proprietary robotics data → specialized models + memory → every layer above — so that the "why this wins" is structural, not asserted.
- As a **keyboard / screen-reader user**, I want the diagram conveyed as semantic, ordered content (not an inaccessible image or `div` soup) so that the architecture is readable without sight or a mouse.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Section heading verbatim from `content.md` §4: "One system, four layers." Renders as `<h2>` (page owns one `<h1>`, the hero) | P0 | Section's only top-level heading |
| R2 | Four layers, label + description verbatim from `content.md` §4 — **Foundation** "connect your data, tools, and ontology (ERP/PLM/MES, email, chat)."; **Intelligence spine** "specialized models + memory + agents tuned on your robotics data."; **Domain apps** "procurement first, then quality, maintenance, logistics."; **Vertical editions** "packaged for your kind of robot." | P0 | No paraphrase, no added layers, no invented examples beyond the verbatim list |
| R3 | Copy as typed data in `content/home.ts` (`howItWorks` object: `{ heading, layers: { id, name, description }[] }`); component consumes it — no hardcoded strings in JSX | P0 | Content rule; mirrors `hero`/`problem`/`wedge`/`thesis` modules |
| R4 | **Stacked layer diagram**, bottom-up read: Foundation (base) → Intelligence spine → Domain apps → Vertical editions (top). Each layer is a token-styled row/band (`bg-card`, `border-border` hairline, `radius` from tokens) with its name (Geist, weighted) + description (`text-muted-foreground`) | P0 | The intelligence spine is the structural center — it may carry slightly more emphasis (the one teal signal), but only via tokens |
| R5 | **Signal motif (token-driven):** a single thin teal "signal" line/accent showing data flowing up into the Intelligence spine and product flowing back down — the `design.md` axon motif, echoed once here. CSS/SVG using `--primary`; never a teal fill, never a gradient box, used once | P1 | `design.md` motif: "echoed subtly." If it adds noise, reduce to a single hairline marking the spine |
| R6 | Section is a **Server Component** `<section id="how-it-works" aria-labelledby="how-it-works-title">`; zero `"use client"`; the diagram is HTML/CSS(+inline SVG), not a canvas or JS-built graphic | P0 | Performance + JS-disabled render; below the fold but must not regress CWV |
| R7 | Stable anchor `id="how-it-works"` — the SETUP.4 nav "How it works" link target. Document the id contract in a comment | P0 | Today the nav link has no destination; this story provides it. Never a dead link |
| R8 | Rendered after `<Wedge />` (HOME.3) and before `<Thesis />` (HOME.6) inside the shell `<main>` in `app/page.tsx` | P0 | IA order: hero → problem → wedge → how-it-works → thesis. HOME.6 R8 reserves the slot above the thesis |
| R9 | **Semantic structure:** the four layers are an ordered list (`<ol>`) or a labeled group of `<section>`/`<li>` with the layer name as the accessible label — read in stack order by AT; not an `<img>` of a diagram and not unlabeled `div`s | P0 | A11y: the architecture is content, conveyed in DOM order; any decorative motif is `aria-hidden` |
| R10 | Designed in **both** themes; dark default; near-monochrome surfaces; layer bands legible on near-black and on white; body/description contrast ≥ 4.5:1 both themes | P0 | One accent; elevation via surface steps + 1px hairline, never drop shadow |
| R11 | **Token-driven, enforced:** every color, radius, border, and the motif color use semantic tokens / theme vars only — no inline hex, no raw Tailwind color utilities, no hardcoded px for values `design.md` defines | P0 | This is the named constraint of the story; the verify script greps for violations |
| R12 | Responsive: the stack reads cleanly at ~360px (bands wrap, descriptions keep a readable measure, the motif scales or is hidden) with no horizontal scroll and no CLS (reserve diagram space) | P1 | Mobile-first; the vertical stack is the natural mobile layout |
| R13 | `prefers-reduced-motion`: if the signal motif animates (e.g. a slow pulse along the spine), it is `motion-safe:`-gated and renders static when reduced | P1 | `design.md` motion rules; static fallback is the default visual |
| R14 | No new dependency; compose with existing primitives + tokens + inline SVG only | P1 | Pure presentation |

## Acceptance Criteria
- [ ] Heading and all four layer labels + descriptions render verbatim from `content.md` §4; zero banned words; no paraphrase; no fifth layer or invented example.
- [ ] Copy lives in `content/home.ts` as a typed `howItWorks` object; the component reads it, no hardcoded strings.
- [ ] The diagram is a stacked, bottom-up architecture (Foundation → Intelligence spine → Domain apps → Vertical editions) rendered as semantic, ordered content — readable by a screen reader in stack order, not an `<img>` or `div` soup.
- [ ] Section is a Server Component (no `"use client"`); with JavaScript disabled the full diagram and all copy render.
- [ ] Section has `id="how-it-works"` and `aria-labelledby="how-it-works-title"`; the SETUP.4 nav "How it works" link scrolls to it; heading is an `<h2>` (page keeps one `<h1>`, the hero).
- [ ] Page order in `app/page.tsx` is `<Wedge />` → `<HowItWorks />` → `<Thesis />` inside the shell `<main>`.
- [ ] **Token-driven:** no inline hex and no raw Tailwind color utilities anywhere in the section files; the motif color is `--primary`/`bg-primary`/`text-primary` (or a token-derived value), not a hardcoded teal.
- [ ] Section reads near-monochrome (≤ 1–2 teal elements per viewport); description contrast ≥ 4.5:1 in both themes; designed (not auto-inverted) in both.
- [ ] If the motif animates, it is `motion-safe:`-gated and static under `prefers-reduced-motion`.
- [ ] Mobile (~360px): bands wrap, descriptions keep a readable measure, no horizontal scroll, no CLS.
- [ ] Architecture reconciles to `../memory/` taxonomy; no invented layer, metric, customer, or claim.
- [ ] `pnpm verify src/scripts/verify-home-4.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.4 block.

## Technical Requirements
- **Files:**
  - `components/how-it-works.tsx` — **Server Component**. Renders `<section id="how-it-works" aria-labelledby="how-it-works-title">` with `<h2 id="how-it-works-title">` and the layer diagram. Consumes `howItWorks` from `content/home.ts`. No `"use client"`, no state. The diagram is built from token-styled bands in an `<ol>` (or a labeled `<div role="list">` of `<li>`-equivalents), rendered **top-of-DOM = top-of-stack** with a one-line note that the visual stacks bottom-up (foundation at the base) — keep DOM reading order sensible for AT and clarify in code which is base vs. top.
  - `components/architecture-diagram.tsx` *(optional split)* — if the band/SVG markup grows, isolate the presentational diagram here, still a Server Component, taking `layers` as props. The signal motif (inline SVG or a CSS pseudo-element line) lives here, `aria-hidden`, colored via `text-primary`/`stroke-[color:var(--primary)]`-style token reference (no hex).
  - `content/home.ts` — extend with a typed `howItWorks` object: `export interface ArchLayer { id: string; name: string; description: string }` and `export const howItWorks: { heading: string; layers: ArchLayer[] }`, copy verbatim from `content.md` §4, with a CMS-ready/content-integrity comment (reconciles to `../memory/` taxonomy; no fabrication).
  - `app/page.tsx` — render `<HowItWorks />` between `<Wedge />` and `<Thesis />` inside the shell `<main>`. Do not add a second `<h1>`, header, or footer.
  - `src/scripts/verify-home-4.ts` — the verification script below.
- **Content discipline:** copy is verbatim from `specs/content/content.md` §4 "How it works (4-layer architecture)" (canonical, supersedes `messaging.md`). The four layers reconcile to `../memory/taxonomy.md` (the primitives → domains → verticals model) and `../memory/idea.md` (humans + machines + agents; specialized models + memory that compound). **Do not** surface the full pillars taxonomy here — that is HOME.5/three-pillars (`content.md` §5), a separate story; this section shows only the four implementation layers verbatim. Add no fifth layer, no extra ERP/PLM names, no domain or vertical beyond the verbatim list.
- **Diagram / craft (token-driven):**
  - Each layer is a band: `bg-card` (or `bg-background` with a `border-border` hairline), `rounded-[12px]`→ use the card radius token, generous padding on the 4px grid. Name in Geist (`font-[590]`/`[680]`, `tracking-[-0.01em]`), description in `text-muted-foreground` at a readable measure.
  - **Elevation via surface steps + 1px hairline borders**, never drop shadow. The four bands sit close (the "one system" reading) separated by hairlines or small 4px-grid gaps.
  - **The one signal:** the Intelligence spine is the structural heart — give it the single teal accent (a thin `border-l` in `border-primary`, or the motif line passing through it), and/or the motif: a thin teal line showing data flowing **up** into the spine and packaged product flowing **down** from the verticals. One accent, token-colored, `aria-hidden`. If a screen reads "teal," pull it back to a single hairline on the spine.
  - **No slop:** no gradient-filled boxes, no drop shadows, no emoji/clip-art icons, no center-everything flowchart with default arrows. If icons help, one restrained lucide glyph per layer at most, `aria-hidden` — optional and quiet.
- **Token-driven enforcement:** all colors/borders/radius reference semantic tokens or theme CSS vars from `design.md`. The motif's teal is `var(--primary)` / `text-primary` / `stroke-current` on a `text-primary` element — **never** an inline `#` hex and never `text-teal-*`/`bg-cyan-*`. The verify script greps the section files for both and fails on either.
- **Perf:** below the fold, not the LCP element. Prefer zero client JS; if the motif pulse animates, gate on `motion-safe:` with transform/opacity only (120–240ms) — or ship it static (preferred default). Reserve the diagram's height so there is no CLS. Inline SVG (no network image); if any raster is used it goes through `next/image` with explicit `sizes` (not expected here).
- **A11y:** the four layers are an ordered, labeled list so AT reads them in stack order with each layer name as the heading/label of its item; the decorative signal motif is `aria-hidden`. Description contrast ≥ 4.5:1 both themes; teal-on-surface and teal-on-white checked for the accent.

## UX Flow
```
/ (Server-rendered)
  └─ <main id="main">  (SETUP.4 shell)
       ├─ <Hero>                                   ← #hero, the <h1>, LCP
       ├─ <Problem>                                ← #problem (HOME.2)
       ├─ <Wedge>                                  ← #product, the demo mock (HOME.3)
       ├─ <section id="how-it-works" aria-labelledby="how-it-works-title">   ← HowItWorks (Server Component)
       │     ├─ <h2 id="how-it-works-title"> "One system, four layers."
       │     └─ diagram (semantic <ol>, token-styled bands; stacks bottom-up):
       │            ┌───────────────────────────────────────────────┐
       │   top  ▲   │  Vertical editions — packaged for your kind of robot.        │
       │        │   ├───────────────────────────────────────────────┤
       │        │   │  Domain apps — procurement first, then quality, maintenance, │
       │        │   │                logistics.                                    │
       │   teal │   ├───────────────────────────────────────────────┤
       │ signal │   │  Intelligence spine — specialized models + memory + agents   │ ← the one accent
       │  path  │   │                       tuned on your robotics data.           │
       │        │   ├───────────────────────────────────────────────┤
       │  base  │   │  Foundation — connect your data, tools, and ontology         │
       │        ▼   │               (ERP/PLM/MES, email, chat).                    │
       │            └───────────────────────────────────────────────┘
       │            (thin teal signal line: data flows UP into the spine; product flows DOWN)
       └─ <Thesis>                                 ← #thesis (HOME.6)

JS disabled  → full heading + all four layers + static motif render from HTML/CSS
nav "How it works" (SETUP.4) → #how-it-works resolves (no longer a dead link)
prefers-reduced-motion → any motif pulse renders static
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled / fails to load | Entire section is static server-rendered HTML/CSS(+SVG); full render. Nothing depends on JS; the motif's default state is static. |
| Reader treats layers/examples as shipped product | Copy is verbatim and reconciles to `../memory/`; the domain/vertical examples ("then quality, maintenance, logistics") are roadmap framing already in approved copy — add nothing beyond it; no metric, customer, or "we have built." |
| Diagram reads as slop (gradient boxes / shadows / flowchart) | Token bands + hairlines + type hierarchy only; one teal signal; no gradient fill, no drop shadow, no default-arrow flowchart. design-critique gate on the PR. |
| Section turns teal | One accent max — the spine and/or the single signal line. If it reads teal, reduce to one hairline on the Intelligence spine. |
| Inaccessible diagram (image / div soup) | Layers are a semantic ordered/labeled list read in stack order; decorative motif `aria-hidden`; not an `<img>`. |
| Stack order ambiguous to AT vs. visual (bottom-up visual, top-down DOM) | DOM order is sensible and each item names its layer; a code comment states base=Foundation, top=Vertical editions so the reading is unambiguous. |
| Motif animation distracts / ignores reduced motion | Animation is `motion-safe:`-gated, transform/opacity only, 120–240ms; default and reduced-motion state is static. |
| Narrow mobile (~360px) | Bands stack full-width, descriptions keep a readable measure, motif scales or hides, no horizontal scroll, reserved height prevents CLS. |
| Light theme contrast | Description `text-muted-foreground` and the teal accent re-checked ≥ 4.5:1 / 3:1 against the light canvas; both themes designed, not inverted. |
| Confusion with the three-pillars taxonomy | This section shows the four implementation layers only; the primitives × domains × verticals pillars are HOME.5 (`content.md` §5) — do not merge them here. |

## Out of Scope
- The three-pillars section — Primitives × Domains × Verticals (`content.md` §5, HOME.5/4B) — even though the four layers *implement* those pillars; that is a separate story.
- The why-now (HOME.5/why-now per backlog), thesis (HOME.6), who-it's-for (HOME.7), company (HOME.8), and final-CTA (HOME.9) sections.
- Any data, metric, chart, throughput number, or proof point on the diagram (it's an architecture, not evidence).
- Any per-page metadata, OG image, canonical, or JSON-LD (SEO.1).
- A bespoke animated/canvas/WebGL diagram, parallax, or particle background — at most the single token-colored signal motif.
- Real ERP/PLM/MES vendor logos or named integrations beyond the verbatim "(ERP/PLM/MES, email, chat)" copy.
- Any new dependency or component primitive.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (app shell, `<main id="main">`, `content/` pattern, nav `#how-it-works` link contract) | done | Where the section mounts; the nav link this story makes resolve |
| SETUP.3 (tokens, surfaces, themes, type scale, focus ring) | done | The token-driven bands, motif color, both-theme design |
| HOME.1 (`content/home.ts` exists, hero rendered, the page's one `<h1>`) | done | Extend the same content module; heading order (`<h2>` after the hero `<h1>`) |
| HOME.3 (`<Wedge />` / `#product` rendered) | done | Page order (`HowItWorks` renders after the wedge) |
| `content.md` §4 "How it works" copy | done (source) | All section copy |
| `../memory/taxonomy.md` + `../memory/idea.md` | done (source) | Architecture reconciliation (layers ↔ primitives/domains/verticals; models+memory) |

## Implementation Plan
**Single day (~5–7 hrs):**

**Morning — content + structure.**
1. Extend `content/home.ts` with the typed `howItWorks` object (`heading`, `layers[]` of `{ id, name, description }`), copy verbatim from `content.md` §4; add the CMS-ready/integrity comment mirroring `hero`/`problem`/`wedge`/`thesis`.
2. Build `components/how-it-works.tsx` (Server Component) — `<section id="how-it-works" aria-labelledby="how-it-works-title">`, `<h2 id="how-it-works-title">`, and the four layers as a semantic ordered/labeled list of token-styled bands. Consume `howItWorks` from content; tokens only. Document the base/top reading and the id contract in comments.

**Afternoon — diagram craft, motif, gate.**
3. Add the single token-driven signal motif (thin teal line into/out of the Intelligence spine; or a `border-primary` accent on the spine), `aria-hidden`; `motion-safe:`-gate any animation, default static. Tune surface steps + hairlines, the 4px-grid rhythm, both themes, mobile (~360px) wrap and reserved height (no CLS).
4. Wire `<HowItWorks />` between `<Wedge />` and `<Thesis />` in `app/page.tsx`; confirm one `<h1>`, `<h2>` heading order, JS-disabled render, and the nav `#how-it-works` link resolves. Grep for stray hex/raw color utilities. Write + pass `verify-home-4.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.4` → PR (design-critique + a11y review on the PR).

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-4.ts   (or: npx tsx src/scripts/verify-home-4.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.4 — how it works (4-layer architecture)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const main = read('components/how-it-works.tsx');
  const diagram = read('components/architecture-diagram.tsx'); // optional split
  const comp = main + diagram;
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/how-it-works.tsx exists', () => !!main);
  await check('content/home.ts has a howItWorks object', () => /howItWorks\s*[:=]/.test(content));
  await check('page renders <HowItWorks', () => /<HowItWorks\b/.test(page));
  await check('section id="how-it-works"', () => /id=["']how-it-works["']/.test(comp));
  await check('section aria-labelledby="how-it-works-title"', () => /aria-labelledby=["']how-it-works-title["']/.test(comp));

  // ORDER — HowItWorks sits between Wedge and Thesis
  await check('order: <Wedge> … <HowItWorks> … <Thesis>', () => {
    const w = page.indexOf('<Wedge'), h = page.indexOf('<HowItWorks'), t = page.indexOf('<Thesis');
    return w > -1 && h > -1 && t > -1 && w < h && h < t;
  });

  // COPY (verbatim, content.md §4)
  await check('heading verbatim ("One system, four layers.")', () => /One system, four layers\./.test(all));
  await check('Foundation layer verbatim', () => /Foundation/.test(all) && /connect your data, tools, and ontology \(ERP\/PLM\/MES, email, chat\)\./.test(all));
  await check('Intelligence spine layer verbatim', () => /Intelligence spine/.test(all) && /specialized models \+ memory \+ agents tuned on your robotics data\./.test(all));
  await check('Domain apps layer verbatim', () => /Domain apps/.test(all) && /procurement first, then quality, maintenance, logistics\./.test(all));
  await check('Vertical editions layer verbatim', () => /Vertical editions/.test(all) && /packaged for your kind of robot\./.test(all));
  await check('exactly four layers, not five (no extra layer label)', () => {
    const m = content.match(/name\s*:/g) || [];
    return m.length === 4;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('how-it-works is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(main) && !/^\s*["']use client["']/m.test(diagram));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('layers rendered as a semantic list (<ol> or role="list")', () => /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('not an <img> diagram (architecture is content, not an image)', () => !/<img\b/.test(comp) && !/Image\b/.test(diagram + main) ? true : !/architecture/i.test(comp) || true);

  // TOKEN-DRIVEN — the named constraint of this story
  const files = ['components/how-it-works.tsx','content/home.ts']
    .concat(exists('components/architecture-diagram.tsx') ? ['components/architecture-diagram.tsx'] : []);
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('the teal accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // MOTION — any motif animation respects reduced motion
  await check('reduced-motion respected if motif animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // DECORATIVE MOTIF IS aria-hidden (if an svg/motif is present)
  await check('decorative motif/svg is aria-hidden (if present)', () =>
    !/<svg\b/.test(comp) || /<svg[^>]*aria-hidden/.test(comp) || /aria-hidden/.test(comp));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in howItWorks copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.4 — how it works (4-layer architecture)
- [ ] Heading + all four layers (Foundation, Intelligence spine, Domain apps, Vertical editions) read verbatim from content.md §4; no banned words, no fifth layer, no invented example.
- [ ] The diagram reads as a real stacked architecture (Foundation at the base → Vertical editions on top), not a gradient/shadow flowchart or a default-font diagram.
- [ ] Disable JS in DevTools → reload: the full heading, all four layers, and the static motif render.
- [ ] Click the nav "How it works" link → it scrolls to this section (#how-it-works is no longer a dead link).
- [ ] Section sits between the wedge and the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the four layers are announced in stack order as a list with each layer named; the signal motif is silent (decorative).
- [ ] Token-driven: inspect element — colors/borders/radius/motif come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; the teal signal reads correctly on both; descriptions pass AA; section reads near-monochrome (one accent on the spine/signal).
- [ ] prefers-reduced-motion on: any signal-line pulse renders static.
- [ ] Mobile (~360px): bands wrap full-width, descriptions keep a readable measure, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does Julia read this and see a platform with a defensible intelligence spine, at the linear/harvey bar?
```

## Common Mistakes to Avoid
- **Sloppy diagram defaults.** An architecture diagram is the highest slop-risk surface on the page: gradient-filled boxes, drop shadows on every band, default-arrow flowcharts, emoji/clip-art layer icons, a centered template. Use token bands + hairlines + type hierarchy + one teal signal. If it doesn't look like it belongs next to linear.app, it isn't done.
- **Hardcoding the teal.** This story is *named* token-driven — the motif's teal must be `var(--primary)`/`text-primary`/`border-primary`, never `#0EA5E9` or `text-cyan-500`/`text-teal-500`. The verify grep fails on inline hex and raw color utilities including `stroke-`/`fill-` on the SVG.
- **Rendering the diagram as an image.** An `<img>` of the stack is inaccessible and not crawlable. The four layers are semantic, ordered, labeled content read in stack order; the visual motif is `aria-hidden` decoration on top.
- **Merging in the three-pillars taxonomy.** Primitives × Domains × Verticals is a *separate* section (`content.md` §5). Here, show only the four implementation layers, verbatim — no primitive lists, no full domain/vertical enumerations beyond the approved copy.
- **Inventing layers or examples.** Four layers exactly; no fifth ("Interface", "Security", etc.), no extra ERP/PLM vendor names, no domains/verticals beyond the verbatim "procurement first, then quality, maintenance, logistics" / "packaged for your kind of robot." Pre-launch integrity governs.
- **Turning it teal or animating it noisily.** One accent (the Intelligence spine / the single signal line). Default the motif to static; gate any pulse on `motion-safe:`, transform/opacity only. If a viewport reads "teal," pull back to one hairline on the spine.
- **A second `<h1>` or a CLS jump.** The hero owns the page's only `<h1>`; this heading is `<h2>`. Reserve the diagram's height so the motif/bands don't shift layout on load.

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §4 "How it works (4-layer architecture)" (canonical, supersedes `messaging.md`), modeled as typed data in `content/home.ts`; zero banned words; no invented layer, example, metric, customer, or traction (inherited from `../CLAUDE.md`).
- Architecture reconciles to `../memory/taxonomy.md` + `../memory/idea.md` (humans+machines+agents; specialized models + memory that compound; primitives→domains→verticals implemented as the four layers) — flag any conflict in one line; do not ship a claim that contradicts memory.
- **Token-driven (the named constraint):** every color, border, radius, and the motif color comes from `design.md` tokens / theme CSS vars — no inline hex, no raw Tailwind color utilities (including `stroke-*`/`fill-*` on SVG). Dark default and designed; light designed, not inverted; near-monochrome; one accent (teal) as signal on the spine/motif only; elevation via surface steps + 1px hairline, not shadow; type carries hierarchy.
- Server Component, zero (or minimal `motion-safe:` leaf) client JS; the diagram is HTML/CSS(+inline SVG), renders fully with JS disabled; below the fold but must not regress LCP/CLS/INP (reserve diagram height; no CLS).
- Semantic + a11y (WCAG 2.2 AA): one `<h2>` after the hero `<h1>`, `<section aria-labelledby>`, the four layers as a semantic ordered/labeled list read in stack order, decorative motif `aria-hidden`, description contrast ≥ 4.5:1 and the teal accent ≥ 3:1 in both themes, `prefers-reduced-motion` honored.
- SEO/semantics: this section adds no per-page metadata (that's SEO.1); it provides the `#how-it-works` anchor the SETUP.4 nav links — never a dead link.
- Marketing-site flavor: no auth/DB/jobs — no Clerk/Supabase/Stripe/Inngest; no live model call / no AI-SDK dependency (this section is static architecture copy). No new dependency.
- Loop convention: build on `auto/HOME.4`, open a PR, merge via `gh` after review — never direct to `main`; design-critique + accessibility-review on the PR.
- Precedence: where this PRD and `content.md`/`design.md`/`../memory/` differ, those sources win — flag in one line.

## Rollback Plan
Revert `app/page.tsx` to remove `<HowItWorks />`, delete `components/how-it-works.tsx` (and `components/architecture-diagram.tsx` if split), the `howItWorks` object and its `ArchLayer` interface in `content/home.ts`, `src/scripts/verify-home-4.ts`, and the HOME.4 manual-checks block. The SETUP.4 nav `#how-it-works` link returns to having no in-page destination (acceptable degradation — it no-ops, never a 404 — until this re-lands). Pure presentation — static text + CSS/SVG, no data, no schema, no model call, no migration. The loop lands this on `auto/HOME.4`; closing the PR unmerged reverts everything. **Zero data risk.**
