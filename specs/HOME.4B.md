# PRD: Three pillars (Primitives × Domains × Verticals) — calm three-column section

**Status**: Ready for Dev
**Priority**: P1
**Effort**: M (5–6 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.4B

## Problem Statement
HOME.4 shows *how the system is shaped* (four implementation layers); this section answers the question a model-research CTO like Julia asks next — *how does this scale into a category, not a single app?* The answer is Axona's core model, the way it is framed to Julia: build the **Primitives** once → compose them into **Domain** workflows → package per **Vertical**. Without it, the page asserts "operating system" and shows a procurement co-pilot, but never renders the combinatorial leverage that makes one wedge become a platform across an entire industry — the exact structural argument an investor and a founding CTO are scanning for. This is `content.md` §5, and HOME.4's "the four layers *implement* these pillars" note explicitly defers the pillars taxonomy to this story. The craft risk: three columns of lists is the canonical slop surface (gradient cards, drop shadows, emoji bullets, a center-everything template). This one is **calm and token-driven** — type and a 4px rhythm do the work, one teal accent marks the wedge — so it reads at the Linear/Harvey bar.

## Success Metrics
| Metric | Target |
|---|---|
| Heading, framing line, and all three pillars (label + element/function/market lists) render verbatim from `content.md` §5 | 100%, 0 banned words |
| Taxonomy reconciles to `../memory/taxonomy.md` (verticals · domains · primitives) and `../memory/idea.md` — no invented primitive, domain, vertical, metric, or claim | Passes content-integrity review |
| **Token-driven:** zero inline hex, zero raw Tailwind color utilities anywhere in the section | 0 violations |
| Section renders fully with JS disabled (Server Component; columns are HTML/CSS, no client JS) | Pass |
| Section has stable `id` and `aria-labelledby` and an `<h2>` (page keeps one `<h1>`, the hero) | Present, heading order logical |
| Teal restraint — the section reads near-monochrome; teal marks only the wedge signal (procurement / humanoids "first") | ≤ 1–2 teal elements per viewport |
| `pnpm verify src/scripts/verify-home-4b.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold, zero client JS, no CLS — column space reserved) | LCP/CLS/INP in budget |

## User Stories
- As a **prospective CTO (Julia)**, I want the Primitives × Domains × Verticals model stated plainly — build once, compose into domains, package per vertical — so that I see the combinatorial leverage and the system-of-record path, not a single workflow tool.
- As a **design-partner ops leader**, I want to see procurement marked as the wedge inside a wider map of domains (manufacturing, quality, logistics, field service) so that I understand I'm buying into a roadmap with a clear first step, not a speculative platform.
- As an **investor**, I want the "built once, composed everywhere" structure legible in one section so that the venture-scale path — one set of primitives across an entire industry's domains and verticals — is structural, not asserted.
- As a **keyboard / screen-reader user**, I want the three pillars conveyed as semantic, ordered, labeled content (three regions, each a heading + list) so that the model is readable without sight or a mouse — not an inaccessible image or `div` soup.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Section heading verbatim from `content.md` §5: "Built once. Composed everywhere." Renders as `<h2>` (page owns one `<h1>`, the hero) | P0 | Section's only top-level heading |
| R2 | Framing line verbatim from `content.md` §5: "Build the primitives once → compose them into domain workflows → package per vertical." Rendered as a lead/intro line under the `<h2>` | P0 | The "→" arrows are part of the verbatim copy; render as text, not invented iconography |
| R3 | Three pillars, label + list verbatim from `content.md` §5 — **Primitives (the elements):** "SOPs, documents, data, agents, humans, machines (fixed + mobile), inventory, meetings, integrations, interfaces. Agents are self-improving, with skills, context, memory, and multimodal, multi-cloud reach."; **Domains (the functions):** "Procurement (the wedge), then manufacturing, quality & testing, logistics, field service, R&D, IT/security, sales, marketing."; **Verticals (the markets):** "Humanoids (first), defense, logistics, manufacturing, construction, healthcare, space, automotive." | P0 | No paraphrase, no added/removed primitive/domain/vertical, no reordering of the lists |
| R4 | Copy as typed data in `content/home.ts` (`pillars` object: `{ heading, framing, columns: { id, name, kind, items }[] }` where `kind` is the parenthetical "the elements"/"the functions"/"the markets"); component consumes it — no hardcoded strings in JSX | P0 | Content rule; mirrors `hero`/`problem`/`wedge`/`howItWorks`/`thesis` modules. The Primitives "Agents are self-improving…" sentence is a trailing note on that column, modeled distinctly from the comma-list items |
| R5 | **Three-column layout** (Primitives · Domains · Verticals, left→right), each column a token-styled region: a header (pillar name in Geist weighted + the `kind` parenthetical in `text-muted-foreground`) and the items as a list. Columns sit on a 4px-grid rhythm separated by gaps/hairlines — near-monochrome, calm | P0 | Type carries hierarchy; not three gradient cards. Items may render as a tight chip/list, tokens only |
| R6 | **The one signal (token-driven):** the wedge markers — "Procurement (the wedge)" in Domains and "Humanoids (first)" in Verticals — carry the single teal accent (e.g. `text-primary` on those items, or one hairline) to show the chosen first step through the model. One accent, token-colored. If a screen reads "teal," reduce to one marker | P1 | `design.md`: one accent as signal. Marks the live wedge, the rest of the lists stay muted-monochrome |
| R7 | Section is a **Server Component** `<section id="pillars" aria-labelledby="pillars-title">`; zero `"use client"`; columns are HTML/CSS, not canvas/JS | P0 | Performance + JS-disabled render; below the fold but must not regress CWV |
| R8 | Rendered after `<HowItWorks />` (HOME.4) and before `<Thesis />` (HOME.6) inside the shell `<main>` in `app/page.tsx` | P0 | IA: hero → problem → wedge → how-it-works → **pillars** → thesis. `content.md` §5 build note slots this "between the thesis and who-it's-for," but HOME.4's note and HOME.6 R8 reconcile to pillars-above-thesis; render above the thesis. Flag if `app/page.tsx` order at build time differs |
| R9 | **Semantic structure:** the three pillars are a labeled group — each column a `<section>`/`<li>` (or `role="list"` of regions) with the pillar name as its accessible label, and each column's items a nested list — read in order by AT; not an `<img>` and not unlabeled `div`s | P0 | A11y: the taxonomy is content, conveyed in DOM order; any decorative accent is `aria-hidden` |
| R10 | Designed in **both** themes; dark default; near-monochrome surfaces; columns/items legible on near-black and on white; body/item contrast ≥ 4.5:1 both themes; the teal wedge marker ≥ 3:1 both themes | P0 | One accent; elevation via surface steps + 1px hairline, never drop shadow |
| R11 | **Token-driven, enforced:** every color, radius, border, and the wedge-accent color use semantic tokens / theme vars only — no inline hex, no raw Tailwind color utilities, no hardcoded px for values `design.md` defines | P0 | The named constraint; the verify script greps for violations |
| R12 | Responsive: at ~360px the three columns stack to one column (Primitives → Domains → Verticals) with each list keeping a readable measure, no horizontal scroll, no CLS (reserve column height) | P1 | Mobile-first; the stack is the natural mobile layout. Between ~640–1024px a 1- or 2-then-3 column reflow is acceptable if calm |
| R13 | `prefers-reduced-motion`: if any accent animates (a faint highlight on the wedge markers), it is `motion-safe:`-gated and renders static when reduced. Default is static | P1 | `design.md` motion rules; static is the default visual |
| R14 | No new dependency; compose with existing primitives + tokens only | P1 | Pure presentation |

## Acceptance Criteria
- [ ] Heading, framing line, and all three pillars (label + `kind` + verbatim item lists) render verbatim from `content.md` §5; zero banned words; no paraphrase; no added/removed/reordered primitive, domain, or vertical.
- [ ] Copy lives in `content/home.ts` as a typed `pillars` object; the component reads it, no hardcoded strings; the Primitives "Agents are self-improving…" note is modeled distinctly from the comma-list items.
- [ ] The layout is three columns (Primitives · Domains · Verticals) rendered as semantic, labeled, ordered content — readable by a screen reader as three named regions each with a list, not an `<img>` or `div` soup.
- [ ] Section is a Server Component (no `"use client"`); with JavaScript disabled the full section and all copy render.
- [ ] Section has `id="pillars"` and `aria-labelledby="pillars-title"`; heading is an `<h2>` (page keeps one `<h1>`, the hero).
- [ ] Page order in `app/page.tsx` is `<HowItWorks />` → `<Pillars />` → `<Thesis />` inside the shell `<main>`.
- [ ] **Token-driven:** no inline hex and no raw Tailwind color utilities anywhere in the section files; the wedge accent is `--primary`/`text-primary`/`border-primary` (or a token-derived value), not a hardcoded teal.
- [ ] Section reads near-monochrome (≤ 1–2 teal elements per viewport — the wedge markers only); item contrast ≥ 4.5:1 and the teal marker ≥ 3:1 in both themes; designed (not auto-inverted) in both.
- [ ] If any accent animates, it is `motion-safe:`-gated and static under `prefers-reduced-motion`.
- [ ] Mobile (~360px): columns stack to one column, lists keep a readable measure, no horizontal scroll, no CLS.
- [ ] Taxonomy reconciles to `../memory/taxonomy.md` + `../memory/idea.md`; no invented primitive, domain, vertical, metric, customer, or claim.
- [ ] `pnpm verify src/scripts/verify-home-4b.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.4B block.

## Technical Requirements
- **Files:**
  - `components/pillars.tsx` — **Server Component**. Renders `<section id="pillars" aria-labelledby="pillars-title">` with `<h2 id="pillars-title">`, the framing line, and the three-column taxonomy. Consumes `pillars` from `content/home.ts`. No `"use client"`, no state. The three columns are a labeled group (`role="list"` of three regions, or three `<section>` elements each with its own `aria-labelledby` pointing at the pillar name); each column's items are a nested semantic `<ul>`. Document the column order (Primitives → Domains → Verticals) and the `id` in comments.
  - `content/home.ts` — extend with a typed `pillars` object: `export interface Pillar { id: string; name: string; kind: string; items: string[]; note?: string }` and `export const pillars: { heading: string; framing: string; columns: Pillar[] }`. Copy verbatim from `content.md` §5; the Primitives column's `items` is the comma-list and `note` is "Agents are self-improving, with skills, context, memory, and multimodal, multi-cloud reach." Add a CMS-ready/content-integrity comment (reconciles to `../memory/taxonomy.md`; no fabrication).
  - `app/page.tsx` — render `<Pillars />` between `<HowItWorks />` and `<Thesis />` inside the shell `<main>`. Do not add a second `<h1>`, header, or footer.
  - `src/scripts/verify-home-4b.ts` — the verification script below.
- **Content discipline:** copy is verbatim from `specs/content/content.md` §5 "The three pillars — Primitives × Domains × Verticals" (canonical, supersedes `messaging.md`). The three pillars reconcile to `../memory/taxonomy.md` (verticals · domains · primitives) and `../memory/idea.md` (build the primitives once, compose into domains, package per vertical; agents self-improving with memory). **Do not** re-render the four implementation layers here — that is HOME.4 (`content.md` §4), a separate, already-shipped section; this section shows only the three pillars verbatim. Add no primitive, domain, or vertical beyond the verbatim lists; keep "Procurement (the wedge)" and "Humanoids (first)" exactly as written (they carry the wedge signal).
- **Layout / craft (token-driven):**
  - Three columns on desktop, stacking to one on mobile. Each column: a header (pillar `name` in Geist `font-[590]`/`[680]`, `tracking-[-0.01em]`; the `kind` parenthetical in `text-muted-foreground` at a smaller step) and a list of items. Items as a tight muted list or chip set — `text-foreground`/`text-muted-foreground`, hairline `border-border` if chipped, `rounded` from the controls radius token, generous 4px-grid rhythm.
  - **Elevation via surface steps + 1px hairline borders**, never drop shadow. Columns separated by gaps or thin vertical hairlines (`border-border`), not boxed gradient cards. The framing line ("Build the primitives once → …") sits as a calm lead under the `<h2>`, constrained measure.
  - **The one signal:** the wedge markers — "Procurement (the wedge)" and "Humanoids (first)" — carry the single teal accent (e.g. those items in `text-primary`, or a `border-l border-primary` tick). One accent, token-colored. If a screen reads "teal," pull back to a single marker on Procurement.
  - **No slop:** no gradient-filled cards, no drop shadows, no emoji/clip-art bullets, no center-everything template, no decorative arrows beyond the verbatim "→" in the framing line. If list icons help, at most one restrained lucide glyph and `aria-hidden` — optional and quiet (default: no icons, type only).
- **Token-driven enforcement:** all colors/borders/radius reference semantic tokens or theme CSS vars from `design.md`. The wedge accent is `var(--primary)` / `text-primary` / `border-primary` — **never** an inline `#` hex and never `text-teal-*`/`bg-cyan-*`. The verify script greps the section files for both and fails on either.
- **Perf:** below the fold, not the LCP element. Zero client JS (Server Component). Reserve column height so there is no CLS on load. No network image (the section is type + lists); if any raster were used it goes through `next/image` with explicit `sizes` (not expected here).
- **A11y:** three labeled, ordered regions, each with a nested list, so AT reads Primitives → Domains → Verticals with each pillar named; any decorative accent on the wedge markers is conveyed by the verbatim text ("(the wedge)", "(first)"), not color alone (do not rely on teal to communicate the wedge — the words carry it; teal reinforces). Item contrast ≥ 4.5:1 both themes; teal-on-surface and teal-on-white checked for the accent.

## UX Flow
```
/ (Server-rendered)
  └─ <main id="main">  (SETUP.4 shell)
       ├─ <Hero>                                   ← #hero, the <h1>, LCP
       ├─ <Problem>                                ← #problem (HOME.2)
       ├─ <Wedge>                                  ← #product, the demo mock (HOME.3)
       ├─ <HowItWorks>                             ← #how-it-works, the 4 layers (HOME.4)
       ├─ <section id="pillars" aria-labelledby="pillars-title">          ← Pillars (Server Component)
       │     ├─ <h2 id="pillars-title"> "Built once. Composed everywhere."
       │     ├─ <p> "Build the primitives once → compose them into domain workflows → package per vertical."
       │     └─ three labeled columns (semantic regions + nested lists):
       │        ┌──────────────────┬──────────────────┬──────────────────┐
       │        │ PRIMITIVES       │ DOMAINS          │ VERTICALS        │
       │        │ (the elements)   │ (the functions)  │ (the markets)    │
       │        ├──────────────────┼──────────────────┼──────────────────┤
       │        │ SOPs             │ Procurement ◂teal│ Humanoids ◂teal   │  ← the one accent: the wedge
       │        │ documents        │   (the wedge)    │   (first)        │
       │        │ data             │ manufacturing    │ defense          │
       │        │ agents           │ quality & testing│ logistics        │
       │        │ humans           │ logistics        │ manufacturing    │
       │        │ machines         │ field service    │ construction     │
       │        │ (fixed + mobile) │ R&D              │ healthcare       │
       │        │ inventory        │ IT/security      │ space            │
       │        │ meetings         │ sales            │ automotive       │
       │        │ integrations     │ marketing        │                  │
       │        │ interfaces       │                  │                  │
       │        ├──────────────────┘                  │                  │
       │        │ note: "Agents are self-improving,                      │
       │        │ with skills, context, memory, and                     │
       │        │ multimodal, multi-cloud reach."                       │
       │        └───────────────────────────────────────────────────────┘
       └─ <Thesis>                                 ← #thesis (HOME.6)

JS disabled  → full heading, framing line, all three columns + lists render from HTML/CSS
mobile ~360px → columns stack to one (Primitives → Domains → Verticals), no horizontal scroll
prefers-reduced-motion → any wedge-marker highlight renders static
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled / fails to load | Entire section is static server-rendered HTML/CSS; full render. Nothing depends on JS; any accent default state is static. |
| Reader treats the full domain/vertical lists as shipped product | Copy is verbatim and reconciles to `../memory/taxonomy.md`; the framing already marks the live wedge ("Procurement (the wedge)", "Humanoids (first)"); everything else is the roadmap model — add no metric, customer, or "we have built." |
| Section reads as slop (gradient cards / shadows / emoji bullets) | Token columns + hairlines + type hierarchy only; one teal wedge accent; no gradient fill, no drop shadow, no emoji-as-icons, no centered template. design-critique gate on the PR. |
| Section turns teal | One accent max — the wedge markers (Procurement, Humanoids "first"). If it reads teal, reduce to one marker on Procurement; the rest of the lists stay muted-monochrome. |
| Inaccessible taxonomy (image / div soup) | Three labeled regions each with a nested semantic list, read in order; decorative accent `aria-hidden`; not an `<img>`. |
| Wedge conveyed by color alone | The words "(the wedge)" and "(first)" carry the meaning; teal reinforces but is not the only signal — passes "don't rely on color alone." |
| Confusion with the 4-layer architecture (HOME.4) | This section shows the three pillars only; the four implementation layers are HOME.4 (`content.md` §4, shipped) — do not merge or re-render them here. |
| Long lists overflow on narrow mobile | Columns stack to one; each list keeps a readable measure and wraps; reserved height prevents CLS; no horizontal scroll. |
| Light theme contrast | Item `text-foreground`/`text-muted-foreground` and the teal wedge marker re-checked ≥ 4.5:1 / 3:1 against the light canvas; both themes designed, not inverted. |
| Page order drifts (pillars vs. thesis) | Render `<Pillars />` above `<Thesis />` per R8; if `app/page.tsx` at build time orders differently, flag in one line and reconcile to the HOME.4/HOME.6 contract (pillars above thesis). |

## Out of Scope
- The 4-layer architecture section (`content.md` §4, HOME.4 — shipped), even though the four layers *implement* these pillars; do not re-render it here.
- The why-now (HOME.5 per backlog), thesis (HOME.6 — present), who-it's-for (HOME.7), company (HOME.8), and final-CTA (HOME.9) sections.
- Any data, metric, chart, count, or proof point on the pillars (it's a model, not evidence).
- Any per-page metadata, OG image, canonical, or JSON-LD (SEO.1).
- A bespoke animated/canvas/WebGL diagram, parallax, particle background, or interactive filtering of the lists — at most the single token-colored wedge accent.
- Real partner/customer/vendor logos or named entities beyond the verbatim copy.
- Any new dependency or component primitive.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (app shell, `<main id="main">`, `content/` pattern, section mount points) | needed (per backlog) — confirm done at build | Where the section mounts; the `content/` model it extends |
| SETUP.3 (tokens, surfaces, themes, type scale, focus ring) | done | The token-driven columns, wedge accent, both-theme design |
| HOME.1 (`content/home.ts` exists, hero rendered, the page's one `<h1>`) | done | Extend the same content module; heading order (`<h2>` after the hero `<h1>`) |
| HOME.4 (`<HowItWorks />` / `#how-it-works` rendered) | done | Page order (`Pillars` renders after how-it-works) |
| `content.md` §5 "The three pillars" copy | done (source) | All section copy |
| `../memory/taxonomy.md` + `../memory/idea.md` | done (source) | Taxonomy reconciliation (pillars ↔ primitives/domains/verticals; build-once/compose/package) |

## Implementation Plan
**Single day (~5–6 hrs):**

**Morning — content + structure.**
1. Extend `content/home.ts` with the typed `pillars` object (`heading`, `framing`, `columns[]` of `{ id, name, kind, items, note? }`), copy verbatim from `content.md` §5; the Primitives column gets the comma-list as `items` and the "Agents are self-improving…" sentence as `note`. Add the CMS-ready/integrity comment mirroring `hero`/`problem`/`wedge`/`howItWorks`/`thesis`.
2. Build `components/pillars.tsx` (Server Component) — `<section id="pillars" aria-labelledby="pillars-title">`, `<h2 id="pillars-title">`, the framing line, and the three columns as labeled regions each with a nested semantic list. Consume `pillars` from content; tokens only. Document column order and the `id` contract in comments.

**Afternoon — column craft, wedge signal, gate.**
3. Tune the three-column layout: surface steps + hairlines, the 4px-grid rhythm, the `kind` parentheticals in `text-muted-foreground`, both themes, mobile (~360px) stack and reserved height (no CLS). Add the single token-driven wedge accent on "Procurement (the wedge)" and "Humanoids (first)" — `text-primary`/`border-primary`, `aria-hidden` if purely decorative; the words carry the meaning. `motion-safe:`-gate any animation, default static.
4. Wire `<Pillars />` between `<HowItWorks />` and `<Thesis />` in `app/page.tsx`; confirm one `<h1>`, `<h2>` heading order, JS-disabled render. Grep for stray hex/raw color utilities. Write + pass `verify-home-4b.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.4B` → PR (design-critique + a11y review on the PR).

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-4b.ts   (or: npx tsx src/scripts/verify-home-4b.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.4B — three pillars (Primitives × Domains × Verticals)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const comp = read('components/pillars.tsx');
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/pillars.tsx exists', () => !!comp);
  await check('content/home.ts has a pillars object', () => /pillars\s*[:=]/.test(content));
  await check('page renders <Pillars', () => /<Pillars\b/.test(page));
  await check('section id="pillars"', () => /id=["']pillars["']/.test(comp));
  await check('section aria-labelledby="pillars-title"', () => /aria-labelledby=["']pillars-title["']/.test(comp));

  // ORDER — Pillars sits between HowItWorks and Thesis
  await check('order: <HowItWorks> … <Pillars> … <Thesis>', () => {
    const h = page.indexOf('<HowItWorks'), p = page.indexOf('<Pillars'), t = page.indexOf('<Thesis');
    return h > -1 && p > -1 && t > -1 && h < p && p < t;
  });

  // COPY (verbatim, content.md §5)
  await check('heading verbatim ("Built once. Composed everywhere.")', () => /Built once\. Composed everywhere\./.test(all));
  await check('framing line verbatim', () => /Build the primitives once → compose them into domain workflows → package per vertical\./.test(all));
  await check('Primitives pillar verbatim', () => /Primitives/.test(all) && /SOPs, documents, data, agents, humans, machines \(fixed \+ mobile\), inventory, meetings, integrations, interfaces\./.test(all));
  await check('Primitives agents note verbatim', () => /Agents are self-improving, with skills, context, memory, and multimodal, multi-cloud reach\./.test(all));
  await check('Domains pillar verbatim', () => /Domains/.test(all) && /Procurement \(the wedge\), then manufacturing, quality & testing, logistics, field service, R&D, IT\/security, sales, marketing\./.test(all));
  await check('Verticals pillar verbatim', () => /Verticals/.test(all) && /Humanoids \(first\), defense, logistics, manufacturing, construction, healthcare, space, automotive\./.test(all));
  await check('the wedge markers present ("the wedge" + "first")', () => /\(the wedge\)/.test(all) && /Humanoids \(first\)/.test(all));
  await check('exactly three pillar columns, not more (no fourth pillar name)', () => {
    const m = content.match(/name\s*:/g) || [];
    return m.length === 3;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('pillars is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('pillars rendered as semantic lists (<ul>/<ol> or role="list")', () => /<ul\b/.test(comp) || /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('not an <img> of the taxonomy (it is content, not an image)', () => !/<img\b/.test(comp) && !/\bImage\b/.test(comp));

  // TOKEN-DRIVEN — the named constraint of this story
  const files = ['components/pillars.tsx','content/home.ts'].filter((f) => exists(f));
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('the wedge accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // MOTION — any accent animation respects reduced motion
  await check('reduced-motion respected if accent animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in pillars copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.4B — three pillars (Primitives × Domains × Verticals)
- [ ] Heading, framing line, and all three pillars (Primitives, Domains, Verticals) with their full item lists read verbatim from content.md §5; no banned words, no added/removed/reordered item, no fourth pillar.
- [ ] The section reads as a calm three-column model (built once → composed everywhere), not gradient cards, drop shadows, emoji bullets, or a centered template.
- [ ] Disable JS in DevTools → reload: the full heading, framing line, and all three columns with their lists render.
- [ ] Section sits between how-it-works and the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the three pillars are announced in order as named regions, each with a list; the wedge is conveyed by the words "(the wedge)" / "(first)", not color alone.
- [ ] Token-driven: inspect element — colors/borders/radius/wedge-accent come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; the teal wedge markers read correctly on both; items pass AA; section reads near-monochrome (one accent on the wedge).
- [ ] prefers-reduced-motion on: any wedge-marker highlight renders static.
- [ ] Mobile (~360px): columns stack to one (Primitives → Domains → Verticals), lists keep a readable measure, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does Julia read this and see "built once, composed everywhere" — combinatorial leverage across an industry — at the linear/harvey bar?
```

## Common Mistakes to Avoid
- **Three-card slop.** Three columns of lists is a canonical slop surface: gradient-filled cards, a drop shadow per card, emoji or check-circle bullets, a center-everything template. Use token columns + hairlines + type hierarchy + one teal wedge accent. If it doesn't look like it belongs next to linear.app, it isn't done.
- **Hardcoding the teal.** This story is token-driven — the wedge accent must be `var(--primary)`/`text-primary`/`border-primary`, never `#0EA5E9` or `text-cyan-500`/`text-teal-500`. The verify grep fails on inline hex and raw color utilities.
- **Communicating the wedge with color alone.** "Procurement (the wedge)" and "Humanoids (first)" carry the meaning in words; teal reinforces. Don't let teal be the only signal — a colorblind or monochrome reader must still get it.
- **Re-rendering the four layers.** The 4-layer architecture is HOME.4 (shipped). Here, show only the three pillars from `content.md` §5 — do not merge or duplicate the layers.
- **Editing the lists.** Verbatim and in order: every primitive, domain, and vertical exactly as written; no added "automotive→aerospace", no dropped "IT/security", no reordering, no fourth pillar. Pre-launch integrity governs.
- **Turning it teal or animating it.** One accent (the wedge markers). Default any highlight to static; gate any animation on `motion-safe:`, transform/opacity only. If a viewport reads "teal," reduce to one marker on Procurement.
- **A second `<h1>` or a CLS jump.** The hero owns the page's only `<h1>`; this heading is `<h2>`. Reserve column height so the stack doesn't shift layout on load.

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §5 "The three pillars — Primitives × Domains × Verticals" (canonical, supersedes `messaging.md`), modeled as typed data in `content/home.ts`; zero banned words; no invented primitive, domain, vertical, metric, customer, or traction (inherited from `../CLAUDE.md`).
- Taxonomy reconciles to `../memory/taxonomy.md` (verticals · domains · primitives) + `../memory/idea.md` (build once → compose → package; agents self-improving with memory) — flag any conflict in one line; do not ship a claim that contradicts memory.
- **Token-driven (the named constraint):** every color, border, radius, and the wedge-accent color comes from `design.md` tokens / theme CSS vars — no inline hex, no raw Tailwind color utilities. Dark default and designed; light designed, not inverted; near-monochrome; one accent (teal) as the wedge signal only; elevation via surface steps + 1px hairline, not shadow; type carries hierarchy.
- Server Component, zero client JS (any optional `motion-safe:` leaf is the only exception); the columns are HTML/CSS, render fully with JS disabled; below the fold but must not regress LCP/CLS/INP (reserve column height; no CLS).
- Semantic + a11y (WCAG 2.2 AA): one `<h2>` after the hero `<h1>`, `<section aria-labelledby>`, three labeled ordered regions each with a nested list, decorative accent `aria-hidden`, the wedge conveyed by text not color alone, item contrast ≥ 4.5:1 and the teal accent ≥ 3:1 in both themes, `prefers-reduced-motion` honored.
- SEO/semantics: this section adds no per-page metadata (that's SEO.1); it provides the `#pillars` anchor for in-page reference — never a dead link if linked.
- Marketing-site flavor: no auth/DB/jobs — no Clerk/Supabase/Stripe/Inngest; no live model call / no AI-SDK dependency (this section is static taxonomy copy). No new dependency.
- Loop convention: build on `auto/HOME.4B`, open a PR, merge via `gh` after review — never direct to `main`; design-critique + accessibility-review on the PR.
- Precedence: where this PRD and `content.md`/`design.md`/`../memory/` differ, those sources win — flag in one line. Per `content.md` §5's build note the slot is "between the thesis and who-it's-for," but the HOME.4/HOME.6 contracts place pillars above the thesis; render above the thesis and flag if `app/page.tsx` order differs.

## Rollback Plan
Revert `app/page.tsx` to remove `<Pillars />`, delete `components/pillars.tsx`, the `pillars` object and its `Pillar` interface in `content/home.ts`, `src/scripts/verify-home-4b.ts`, and the HOME.4B manual-checks block. No nav link depends on `#pillars` today (it is an in-page anchor only), so removal degrades nothing — never a 404. Pure presentation — static text + CSS, no data, no schema, no model call, no migration. The loop lands this on `auto/HOME.4B`; closing the PR unmerged reverts everything. **Zero data risk.**
