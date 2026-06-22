# PRD: Who it's for — verticals strip + buyer/champion framing

**Status**: Ready for Dev
**Priority**: P2
**Effort**: S (3–4 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.7

## Problem Statement
The page argues the category (hero), the pain (problem), the wedge (product), the shape (how-it-works), the scaling model (pillars), the timing (why-now), and why Axona wins (thesis) — but never tells a reader *whether the page is addressed to them*. A VP of Operations at a humanoid maker scanning the site has to infer "is this for a company like mine, and who buys it?" instead of reading it. This section closes that gap: a calm **verticals strip** (Now: humanoids · Next: defense · Then: logistics, industrial, space) that sequences the addressable market, plus an explicit **buyer/champion** line (buyer = VP/Head of Operations, COO, Head of Supply Chain; champion = procurement/ops lead) so the economic buyer self-identifies and the champion knows they're the wedge in. This is `content.md` §8, sourced verbatim and reconciled to `../memory/icp.md` (buyer/champion roles) and `../memory/taxonomy.md` (vertical sequence). The craft risk: a "who it's for" block is a slop magnet — a row of industry logos we don't have, emoji-as-icons, gradient persona cards, a centered template. This one is **calm and token-driven** — type and a 4px rhythm do the work, one teal accent marks the live "Now" vertical — so it reads at the Linear/Harvey bar and ships zero fabricated logo or customer.

## Success Metrics
| Metric | Target |
|---|---|
| Heading, the Now/Next/Then verticals sequence, and the buyer/champion line render verbatim from `content.md` §8 | 100%, 0 banned words |
| Roles + vertical sequence reconcile to `../memory/icp.md` (buyer/champion) and `../memory/taxonomy.md` (vertical order) — no invented role, vertical, metric, customer, or logo | Passes content-integrity review |
| **Token-driven:** zero inline hex, zero raw Tailwind color utilities anywhere in the section | 0 violations |
| Section renders fully with JS disabled (Server Component; the strip is HTML/CSS, no client JS) | Pass |
| Section has stable `id="who-its-for"` and `aria-labelledby` and an `<h2>` (page keeps one `<h1>`, the hero) | Present, heading order logical |
| Teal restraint — the section reads near-monochrome; teal marks only the live "Now" vertical (humanoids) | ≤ 1–2 teal elements per viewport |
| Zero fabricated customer logo, partner name, count, or metric — only the verbatim verticals + roles ship | 0 violations |
| `pnpm verify src/scripts/verify-home-7.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold, zero client JS, no CLS — strip space reserved) | LCP/CLS/INP in budget |

## User Stories
- As a **design-partner ops leader (the economic buyer)**, I want to see my role named explicitly — VP/Head of Operations, COO, Head of Supply Chain — and my kind of company (humanoid maker scaling production) marked as the live "Now" vertical, so that I self-identify in one scan and know the page is addressed to me.
- As a **procurement / ops lead (the champion)**, I want to read that I'm the champion so that I understand I'm the wedge in — the person who brings Axona to the buyer — not an afterthought.
- As an **investor (a16z American Dynamism)**, I want the addressable market sequenced Now → Next → Then (humanoids → defense → logistics/industrial/space) so that the go-to-market sequencing reads as a deliberate beachhead strategy, not "we sell to everyone."
- As a **keyboard / screen-reader user**, I want the verticals sequence and the buyer/champion framing conveyed as semantic, ordered, labeled content (a labeled list of stages, an explicit roles line) so that "who it's for" is readable without sight or a mouse — not an inaccessible logo strip or `div` soup.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Section heading verbatim from `content.md` §8: "Built for robotics makers scaling production." Renders as `<h2>` (page owns one `<h1>`, the hero) | P0 | Section's only top-level heading |
| R2 | The verticals strip verbatim from `content.md` §8 — three stages: **Now:** "Humanoid robotics makers."; **Next:** "Defense."; **Then:** "Logistics, industrial, space." Each stage labeled with its verbatim stage word (Now / Next / Then) | P0 | No paraphrase, no added/removed/reordered vertical or stage; the "Now/Next/Then" labels are part of the verbatim copy |
| R3 | The buyer/champion line verbatim from `content.md` §8 — **Buyer:** "VP/Head of Operations, COO, Head of Supply Chain." **Champion:** "procurement / ops lead." rendered as a distinct line/row under the strip | P0 | No paraphrase, no added/removed role; "Buyer"/"Champion" labels are verbatim |
| R4 | Copy as typed data in `content/home.ts` (`whoItsFor` object: `{ heading, stages: { id, label, items }[], buyer, champion }` where `label` is "Now"/"Next"/"Then" and `buyer`/`champion` carry the role labels + text); component consumes it — no hardcoded strings in JSX | P0 | Content rule; mirrors `hero`/`problem`/`wedge`/`howItWorks`/`pillars`/`whyNow`/`thesis` modules |
| R5 | **Verticals as a calm horizontal strip** (Now → Next → Then, left→right on wide viewports), each stage a token-styled item: a quiet stage label (Now/Next/Then) and the vertical(s) in `text-foreground`/`text-muted-foreground`, separated by gaps or hairlines on a 4px-grid rhythm — near-monochrome. Below it, the buyer/champion line as a quiet two-part row (Buyer · Champion) | P0 | Type carries hierarchy; not a logo strip, not gradient persona cards. The stages are sequenced, not equal-weight badges |
| R6 | **The one signal (token-driven):** the live "Now" stage (Humanoid robotics makers) carries the single teal accent (e.g. the "Now" label or that item in `text-primary`, or one hairline tick) to show the chosen beachhead. "Next"/"Then" stay muted-monochrome. If a screen reads "teal," reduce to a single marker on Now | P1 | `design.md`: one accent as signal. Marks the live vertical; the future verticals stay muted — also signals honest sequencing (we are on humanoids *now*) |
| R7 | Section is a **Server Component** `<section id="who-its-for" aria-labelledby="who-its-for-title">`; zero `"use client"`; the strip is HTML/CSS, not canvas/JS | P0 | Performance + JS-disabled render; below the fold but must not regress CWV |
| R8 | Rendered after `<Thesis />` (HOME.6) inside the shell `<main>` in `app/page.tsx`; HOME.8 (company) and HOME.9 (final CTA) insert after it later | P0 | IA: … → why-now → thesis → **who-its-for** → (company) → (final CTA). `content.md` orders §8 Who-it's-for after §7 thesis. Flag if `app/page.tsx` order at build time differs |
| R9 | **Semantic structure:** the three stages are a labeled, ordered list (`<ol>`) — each `<li>` carrying its stage label + vertical(s) — read in order by AT; the buyer/champion line is a labeled pair (e.g. a `<dl>` of Buyer/Champion or two labeled rows); not an `<img>`, not a logo strip, not unlabeled `div`s. Any decorative accent is `aria-hidden` | P0 | A11y: the audience map is content, conveyed in DOM order; the sequence meaning comes from the `<ol>` + the verbatim Now/Next/Then words, not color alone |
| R10 | Designed in **both** themes; dark default; near-monochrome surfaces; stages/roles legible on near-black and on white; body contrast ≥ 4.5:1 both themes; the teal "Now" marker ≥ 3:1 both themes | P0 | One accent; elevation via surface steps + 1px hairline, never drop shadow |
| R11 | **Token-driven, enforced:** every color, radius, border, and the accent color use semantic tokens / theme vars only — no inline hex, no raw Tailwind color utilities, no hardcoded px for values `design.md` defines | P0 | The named constraint; the verify script greps for violations |
| R12 | Responsive: at ~360px the three stages stack to one column (Now → Next → Then) and the buyer/champion line wraps to two stacked rows, each keeping a readable measure, no horizontal scroll, no CLS (reserve height) | P1 | Mobile-first; the stack is the natural mobile layout. A horizontal strip is acceptable on wide viewports if calm |
| R13 | `prefers-reduced-motion`: if any accent or item animates (a faint highlight on the Now marker), it is `motion-safe:`-gated and renders static when reduced. Default is static | P1 | `design.md` motion rules; static is the default visual |
| R14 | **No customer/partner logos, names, counts, or metrics** — only the verbatim verticals and roles ship. No logo strip, no "trusted by," no fabricated count of partners | P0 | Pre-launch integrity (`../CLAUDE.md`): the micro-trust line about a "first cohort of design partners" is the hero's (HOME.1), unnamed; this section names no entity |
| R15 | No new dependency; compose with existing primitives + tokens only | P1 | Pure presentation |

## Acceptance Criteria
- [ ] Heading, the Now/Next/Then verticals strip, and the buyer/champion line render verbatim from `content.md` §8; zero banned words; no paraphrase; no added/removed/reordered vertical, stage, or role.
- [ ] Copy lives in `content/home.ts` as a typed `whoItsFor` object; the component reads it, no hardcoded strings.
- [ ] The three stages render as a semantic, ordered list (`<ol>`) read in order; the buyer/champion line renders as a labeled pair (Buyer · Champion) — readable by a screen reader, not an `<img>`, logo strip, or `div` soup.
- [ ] Section is a Server Component (no `"use client"`); with JavaScript disabled the full section and all copy render.
- [ ] Section has `id="who-its-for"` and `aria-labelledby="who-its-for-title"`; heading is an `<h2>` (page keeps one `<h1>`, the hero).
- [ ] Page order in `app/page.tsx` is `<Thesis />` → `<WhoItsFor />` inside the shell `<main>` (HOME.8/HOME.9 insert after it later).
- [ ] **Token-driven:** no inline hex and no raw Tailwind color utilities anywhere in the section files; the "Now" accent is `--primary`/`text-primary`/`border-primary` (or a token-derived value), not a hardcoded teal.
- [ ] Section reads near-monochrome (≤ 1–2 teal elements per viewport — the live "Now" vertical only); body contrast ≥ 4.5:1 and the teal marker ≥ 3:1 in both themes; designed (not auto-inverted) in both.
- [ ] No customer/partner logo, named entity, count, or metric anywhere in the section — only the verbatim verticals and roles.
- [ ] If any item/accent animates, it is `motion-safe:`-gated and static under `prefers-reduced-motion`.
- [ ] Mobile (~360px): stages stack to one column, the buyer/champion line wraps, each keeps a readable measure, no horizontal scroll, no CLS.
- [ ] Roles + vertical sequence reconcile to `../memory/icp.md` + `../memory/taxonomy.md`; no invented role, vertical, customer, or claim.
- [ ] `pnpm verify src/scripts/verify-home-7.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.7 block.

## Technical Requirements
- **Files:**
  - `components/who-its-for.tsx` — **Server Component**. Renders `<section id="who-its-for" aria-labelledby="who-its-for-title">` with `<h2 id="who-its-for-title">`, the verticals strip (a semantic `<ol>` of three stages), and the buyer/champion line (a `<dl>` or labeled rows). Consumes `whoItsFor` from `content/home.ts`. No `"use client"`, no state. Each stage `<li>` carries its verbatim "Now"/"Next"/"Then" label and the vertical(s); the live "Now" marker is the single accent (and is reinforced by the verbatim word "Now", not color alone). Document the stage order and the `id` contract in comments.
  - `content/home.ts` — extend with a typed `whoItsFor` object: `export interface AudienceStage { id: string; label: string; items: string }` and `export const whoItsFor: { heading: string; stages: AudienceStage[]; buyer: { label: string; roles: string }; champion: { label: string; roles: string } }`. Copy verbatim from `content.md` §8. Add a CMS-ready/content-integrity comment (reconciles to `../memory/icp.md` + `../memory/taxonomy.md`; no fabrication).
  - `app/page.tsx` — render `<WhoItsFor />` after `<Thesis />` inside the shell `<main>`. Do not add a second `<h1>`, header, or footer.
  - `src/scripts/verify-home-7.ts` — the verification script below.
- **Content discipline:** copy is verbatim from `specs/content/content.md` §8 "Who it's for" (canonical, supersedes `messaging.md`). The roles reconcile to `../memory/icp.md` (economic buyer = VP/Head of Operations, COO, Head of Supply Chain; champion = procurement/ops lead) and the vertical sequence to `../memory/taxonomy.md` (humanoids first, then defense, then logistics/industrial/space). **Do not** re-render the full Verticals pillar list from HOME.4B (`content.md` §5) here — this section ships only the §8 Now/Next/Then sequence (a focused go-to-market view, not the full eight-vertical map). Add no vertical, role, count, or named entity beyond the verbatim copy; keep "Now"/"Next"/"Then" and "Buyer"/"Champion" exactly as written.
- **Layout / craft (token-driven):**
  - Verticals as a calm horizontal strip on wide viewports (three stages left→right), stacking to one column on mobile. Each stage: a quiet stage label ("Now"/"Next"/"Then" in `text-muted-foreground` at a smaller step, or weighted Geist) and the vertical(s) in `text-foreground`. Stages separated by gaps or thin vertical hairlines (`border-border`), generous 4px-grid rhythm.
  - The buyer/champion line below the strip as a quiet two-part row: a "Buyer" label + roles and a "Champion" label + roles, the labels in `text-muted-foreground`, the roles in `text-foreground`. A `<dl>` (`<dt>`/`<dd>`) is the natural semantic.
  - **Elevation via surface steps + 1px hairline borders**, never drop shadow. No boxed gradient persona cards, no logo strip, no "trusted by" rail.
  - **The one signal:** the live "Now" stage (Humanoid robotics makers) carries the single teal accent — the "Now" label or item in `text-primary`, or a `border-l border-primary` tick. One accent, token-colored. If a screen reads "teal," pull back to a single marker on Now.
  - **No slop:** no industry/customer logos (we have none and name none), no emoji/clip-art icons, no gradient persona cards, no drop shadows, no center-everything template. If a stage glyph helps, at most one restrained lucide glyph, `aria-hidden` — optional and quiet (default: the Now/Next/Then words, type only).
- **Token-driven enforcement:** all colors/borders/radius reference semantic tokens or theme CSS vars from `design.md`. The "Now" accent is `var(--primary)` / `text-primary` / `border-primary` — **never** an inline `#` hex and never `text-teal-*`/`bg-cyan-*`. The verify script greps the section files for both and fails on either.
- **Perf:** below the fold, not the LCP element. Zero client JS (Server Component). Reserve strip/line height so there is no CLS on load. No network image (the section is type + a strip); if any raster were used it goes through `next/image` with explicit `sizes` (not expected here — and no logos ship regardless).
- **A11y:** the three stages are a semantic ordered list read in order; the buyer/champion line is a labeled pair (`<dl>`); the live "Now" is conveyed by the verbatim word "Now", not color alone (teal reinforces). Any decorative accent is `aria-hidden`. Body contrast ≥ 4.5:1 both themes; any teal accent checked on near-black and on white (≥ 3:1).

## UX Flow
```
/ (Server-rendered)
  └─ <main id="main">  (SETUP.4 shell)
       ├─ <Hero>          ← #hero, the <h1>, LCP
       ├─ <Problem>       ← #problem (HOME.2)
       ├─ <Wedge>         ← #product, the demo mock (HOME.3)
       ├─ <HowItWorks>    ← #how-it-works, the 4 layers (HOME.4)
       ├─ <Pillars>       ← #pillars (HOME.4B)
       ├─ <WhyNow>        ← #why-now (HOME.5)
       ├─ <Thesis>        ← #thesis (HOME.6)
       ├─ <section id="who-its-for" aria-labelledby="who-its-for-title">       ← WhoItsFor (Server Component)
       │     ├─ <h2 id="who-its-for-title"> "Built for robotics makers scaling production."
       │     ├─ verticals strip (semantic <ol>, read in order):
       │     │   ┌───────────────────┬───────────────────┬───────────────────────────────┐
       │     │   │ Now  ◂teal         │ Next              │ Then                          │
       │     │   │ Humanoid robotics  │ Defense.          │ Logistics, industrial, space. │
       │     │   │ makers.            │                   │                               │
       │     │   └───────────────────┴───────────────────┴───────────────────────────────┘
       │     │        (the one accent: the live "Now" vertical — signal only, the word carries it)
       │     └─ buyer/champion line (<dl>, labeled pair):
       │         Buyer    — VP/Head of Operations, COO, Head of Supply Chain.
       │         Champion — procurement / ops lead.
       └─ (later) <Company> (HOME.8) → <FinalCTA> (HOME.9)

JS disabled  → full heading, strip, and buyer/champion line render from HTML/CSS
mobile ~360px → stages stack to one column (Now → Next → Then); buyer/champion wraps to two rows; no horizontal scroll
prefers-reduced-motion → any Now-marker highlight renders static
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled / fails to load | Entire section is static server-rendered HTML/CSS; full render. Nothing depends on JS; the Now accent default state is static. |
| Reader expects customer logos / a "trusted by" rail | None ship — pre-launch, no named customer or partner (`../CLAUDE.md`). The section is the verticals sequence + roles only; the unnamed "first cohort of design partners" line lives in the hero (HOME.1), not here. |
| Reader treats Next/Then verticals as live markets | The verbatim "Now/Next/Then" labels sequence them; only "Now" (humanoids) carries the live accent; Next/Then stay muted — the words and the single accent communicate honest sequencing. Add no "we serve" claim. |
| Section reads as slop (logo strip / persona cards / emoji icons) | Token strip + hairlines + type hierarchy only; one teal accent on Now; no logos, no gradient cards, no emoji-as-icons, no centered template. design-critique gate on the PR. |
| Section turns teal | One accent max — the live "Now" vertical. If it reads teal, reduce to a single marker on Now; Next/Then and the roles stay muted-monochrome. |
| Inaccessible audience map (image / div soup) | Stages are a semantic `<ol>` read in order; the buyer/champion line is a labeled `<dl>`; decorative accent `aria-hidden`; not an `<img>`. |
| Sequence/buyer conveyed by color alone | The `<ol>` + the verbatim "Now/Next/Then" words carry the sequence; "Buyer"/"Champion" labels carry the roles; teal reinforces "Now" but is not the only signal — passes "don't rely on color alone." |
| Confusion with the Verticals pillar (HOME.4B §5) | This section ships only the §8 Now/Next/Then go-to-market sequence; the full eight-vertical pillar list is HOME.4B (`content.md` §5, shipped) — do not merge or re-render it here. |
| Long role list overflows on narrow mobile | The buyer/champion line wraps; each role string keeps a readable measure; reserved height prevents CLS; no horizontal scroll. |
| Light theme contrast | Stage/role `text-foreground`/`text-muted-foreground` and the teal "Now" marker re-checked ≥ 4.5:1 / 3:1 against the light canvas; both themes designed, not inverted. |
| Page order drifts (who-its-for vs. company/final-CTA) | Render `<WhoItsFor />` after `<Thesis />` per R8; HOME.8/HOME.9 insert after it. If `app/page.tsx` at build time orders differently, flag in one line and reconcile to the `content.md` §7→§8→§9→§10 order. |

## Out of Scope
- The full Verticals pillar list (`content.md` §5, HOME.4B — shipped) — do not re-render or merge the eight-vertical map here; this section ships only the §8 Now/Next/Then sequence.
- The company / join-us recruiting section (`content.md` §9, HOME.8) and the final-CTA section (`content.md` §10, HOME.9).
- Any customer/partner logo, named entity, partner count, metric, chart, or proof point (pre-launch integrity — none ships).
- Any per-page metadata, OG image, canonical, or JSON-LD (SEO.1).
- A bespoke animated/canvas/WebGL graphic, parallax, particle background, scroll-driven reveal, or interactive filtering of the verticals — at most a single token-colored accent and an optional `motion-safe:` highlight.
- Any new dependency or component primitive.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (app shell, `<main id="main">`, `content/` pattern, section mount points) | needed (per backlog row) — confirm done at build | Where the section mounts; the `content/` model it extends |
| SETUP.3 (tokens, surfaces, themes, type scale, focus ring) | done | The token-driven strip, "Now" accent, both-theme design |
| HOME.1 (`content/home.ts` exists, hero rendered, the page's one `<h1>`) | done | Extend the same content module; heading order (`<h2>` after the hero `<h1>`) |
| HOME.6 (`<Thesis />` / `#thesis` rendered) | done | Page order (`WhoItsFor` renders after the thesis) |
| `content.md` §8 "Who it's for" copy | done (source) | All section copy |
| `../memory/icp.md` + `../memory/taxonomy.md` | done (source) | Roles + vertical-sequence reconciliation (buyer/champion; humanoids → defense → logistics/industrial/space) |

## Implementation Plan
**Single day (~3–4 hrs):**

1. Extend `content/home.ts` with the typed `whoItsFor` object (`heading`, `stages[]` of `{ id, label, items }`, `buyer`, `champion`), copy verbatim from `content.md` §8. Add the CMS-ready/integrity comment mirroring `hero`/`problem`/`wedge`/`howItWorks`/`pillars`/`whyNow`/`thesis` (reconciles to `../memory/icp.md` + `../memory/taxonomy.md`; no fabrication).
2. Build `components/who-its-for.tsx` (Server Component) — `<section id="who-its-for" aria-labelledby="who-its-for-title">`, `<h2 id="who-its-for-title">`, the verticals strip as a semantic `<ol>` of three stages, and the buyer/champion line as a labeled `<dl>`. Consume `whoItsFor` from content; tokens only. Document stage order and the `id` contract in comments.
3. Tune the strip layout: surface steps + hairlines, the 4px-grid rhythm, the Now/Next/Then labels in `text-muted-foreground`, both themes, mobile (~360px) stack and reserved height (no CLS). Add the single token-driven accent on the live "Now" vertical — `text-primary`/`border-primary`, `aria-hidden` if decorative; the word "Now" carries the meaning. `motion-safe:`-gate any animation, default static. Confirm zero logos/named entities.
4. Wire `<WhoItsFor />` after `<Thesis />` in `app/page.tsx`; confirm one `<h1>`, `<h2>` heading order, JS-disabled render. Grep for stray hex/raw color utilities and any logo/img. Write + pass `verify-home-7.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.7` → PR (design-critique + a11y review on the PR).

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-7.ts   (or: npx tsx src/scripts/verify-home-7.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.7 — who it\'s for (verticals strip + buyer/champion framing)\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
  const comp = read('components/who-its-for.tsx');
  const content = read('content/home.ts');
  const page = read('app/page.tsx');
  const all = comp + content;

  // FILES + WIRING
  await check('components/who-its-for.tsx exists', () => !!comp);
  await check('content/home.ts has a whoItsFor object', () => /whoItsFor\s*[:=]/.test(content));
  await check('page renders <WhoItsFor', () => /<WhoItsFor\b/.test(page));
  await check('section id="who-its-for"', () => /id=["']who-its-for["']/.test(comp));
  await check('section aria-labelledby="who-its-for-title"', () => /aria-labelledby=["']who-its-for-title["']/.test(comp));

  // ORDER — WhoItsFor sits after Thesis
  await check('order: <Thesis> … <WhoItsFor>', () => {
    const t = page.indexOf('<Thesis'), w = page.indexOf('<WhoItsFor');
    return t > -1 && w > -1 && t < w;
  });

  // COPY (verbatim, content.md §8)
  await check('heading verbatim ("Built for robotics makers scaling production.")', () =>
    /Built for robotics makers scaling production\./.test(all));
  await check('Now vertical verbatim ("Humanoid robotics makers.")', () => /Humanoid robotics makers\./.test(all));
  await check('Next vertical verbatim ("Defense.")', () => /\bDefense\.?/.test(all));
  await check('Then verticals verbatim ("Logistics, industrial, space.")', () => /Logistics, industrial, space\./.test(all));
  await check('stage labels present (Now / Next / Then)', () =>
    /\bNow\b/.test(all) && /\bNext\b/.test(all) && /\bThen\b/.test(all));
  await check('buyer roles verbatim', () =>
    /VP\/Head of Operations, COO, Head of Supply Chain\./.test(all));
  await check('champion role verbatim ("procurement / ops lead")', () => /procurement \/ ops lead\.?/.test(all));
  await check('Buyer + Champion labels present', () => /\bBuyer\b/.test(all) && /\bChampion\b/.test(all));
  await check('exactly three stages, not more (no fourth stage label)', () => {
    const block = (content.match(/whoItsFor[\s\S]*?champion/) || [''])[0];
    const n = (block.match(/\blabel\s*:/g) || []).length;
    return n === 3;
  });

  // SERVER-COMPONENT + SEMANTICS
  await check('who-its-for is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('exactly one <h2> in the section', () => (comp.match(/<h2\b/g) || []).length === 1);
  await check('no <h1> in the section (page owns it)', () => !/<h1\b/.test(comp));
  await check('stages rendered as a semantic list (<ol> or role="list")', () => /<ol\b/.test(comp) || /role=["']list["']/.test(comp));
  await check('buyer/champion as a labeled pair (<dl> or labeled rows)', () => /<dl\b/.test(comp) || /<dt\b/.test(comp) || /aria-label/.test(comp));
  await check('not an <img>/logo strip (it is content, not images)', () => !/<img\b/.test(comp) && !/\bImage\b/.test(comp));

  // TOKEN-DRIVEN — the named constraint
  const files = ['components/who-its-for.tsx','content/home.ts'].filter((f) => exists(f));
  await check('no inline hex (token-driven)', () => !files.some((f) => /#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities (token-driven)', () =>
    !files.some((f) => /\b(bg|text|border|ring|from|to|via|stroke|fill)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  await check('the Now accent uses a token (primary / var(--primary)), not a hardcoded teal', () =>
    /(\bbg-primary\b|\btext-primary\b|\bborder-primary\b|var\(--primary\)|--primary)/.test(comp));

  // INTEGRITY — no fabricated customer/logo/count/metric snuck into the section copy
  await check('no fabricated stat (no %, $, or "billion" in the section copy)', () => {
    const block = (content.match(/whoItsFor[\s\S]*?\}\s*;?/) || [''])[0];
    return !/[\$£€]\s?\d|\d+\s?%|\bbillion\b|\btrillion\b/i.test(block);
  });
  await check('no "trusted by" / logo-wall language', () => !/trusted by|our customers|logos?\b/i.test(all));

  // MOTION — any animation respects reduced motion
  await check('reduced-motion respected if anything animates (motion-safe or media query)', () =>
    !/(animate-|transition|@keyframes)/.test(comp) || /motion-safe|prefers-reduced-motion/.test(comp) || /motion-safe|prefers-reduced-motion/.test(read('app/globals.css')));

  // CONTENT INTEGRITY — no banned words in section copy
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in whoItsFor copy', () => {
    const block = (content.match(/whoItsFor[\s\S]*?\}\s*;?/) || [''])[0];
    return !banned.test(block);
  });

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.7 — who it's for (verticals strip + buyer/champion framing)
- [ ] Heading, the Now/Next/Then verticals strip (humanoids · defense · logistics, industrial, space), and the buyer/champion line read verbatim from content.md §8; no banned words, no added/removed/reordered vertical, stage, or role.
- [ ] The section reads as a calm verticals strip + roles line, not a customer-logo wall, gradient persona cards, emoji icons, or a centered template.
- [ ] Disable JS in DevTools → reload: the full heading, strip, and buyer/champion line render.
- [ ] Section sits after the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the three stages are announced in order as an ordered list; the buyer/champion line is announced as a labeled pair; the live "Now" is conveyed by the word "Now", not color alone.
- [ ] Token-driven: inspect element — colors/borders/radius/Now-accent come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; the teal "Now" marker reads correctly on both; copy passes AA; section reads near-monochrome (one accent on Now).
- [ ] No customer/partner logo, named entity, count, or metric appears anywhere in the section.
- [ ] prefers-reduced-motion on: any Now-marker highlight renders static.
- [ ] Mobile (~360px): stages stack to one column (Now → Next → Then), the buyer/champion line wraps, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does a VP of Ops at a humanoid maker self-identify in one scan, and does an a16z partner read a deliberate beachhead sequence — at the linear/harvey bar?
```

## Common Mistakes to Avoid
- **Reaching for customer logos.** "Who it's for" tempts a logo wall or a "trusted by" rail. We are pre-launch and name no customer or partner (`../CLAUDE.md`); ship zero logos and zero named entities. The strip is verticals + roles only; the unnamed design-partner line stays in the hero.
- **Persona-card slop.** A row of gradient persona cards with emoji-as-icons and drop shadows is the default failure here. Use a token strip + hairlines + type hierarchy + one teal accent on the live "Now" vertical. If it doesn't look like it belongs next to linear.app, it isn't done.
- **Communicating the sequence/wedge with color alone.** The verbatim "Now/Next/Then" words and the `<ol>` order carry the sequence; "Buyer"/"Champion" labels carry the roles. Teal only reinforces "Now" — a colorblind or monochrome reader must still get it.
- **Re-rendering the eight-vertical pillar list.** The full Verticals pillar is HOME.4B (`content.md` §5, shipped). Here, ship only the §8 Now/Next/Then go-to-market sequence — do not merge or duplicate the eight-vertical map.
- **Editing the roles or verticals.** Verbatim and in order: "VP/Head of Operations, COO, Head of Supply Chain." and "procurement / ops lead." exactly; "Humanoid robotics makers." / "Defense." / "Logistics, industrial, space." exactly — no added role, no dropped vertical, no reordering. Pre-launch integrity governs.
- **A second `<h1>` or a CLS jump.** The hero owns the page's only `<h1>`; this heading is `<h2>`. Reserve strip/line height so the stack doesn't shift layout on load.

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §8 "Who it's for" (canonical, supersedes `messaging.md`), modeled as typed data in `content/home.ts`; zero banned words; no invented role, vertical, metric, customer, logo, or traction (inherited from `../CLAUDE.md`).
- Roles + vertical sequence reconcile to `../memory/icp.md` (buyer = VP/Head of Operations, COO, Head of Supply Chain; champion = procurement/ops lead) and `../memory/taxonomy.md` (humanoids first → defense → logistics/industrial/space) — flag any conflict in one line; do not ship a claim that contradicts memory.
- **Token-driven (the named constraint):** every color, border, radius, and the accent color comes from `design.md` tokens / theme CSS vars — no inline hex, no raw Tailwind color utilities. Dark default and designed; light designed, not inverted; near-monochrome; one accent (teal) on the live "Now" vertical only; elevation via surface steps + 1px hairline, not shadow; type carries hierarchy.
- Server Component, zero client JS (any optional `motion-safe:` leaf is the only exception); the strip + line are HTML/CSS, render fully with JS disabled; below the fold but must not regress LCP/CLS/INP (reserve height; no CLS).
- Semantic + a11y (WCAG 2.2 AA): one `<h2>` after the hero `<h1>`, `<section aria-labelledby>`, the stages as a semantic ordered list read in order, the buyer/champion line as a labeled pair (`<dl>`), the live "Now" conveyed by text not color alone, decorative accent `aria-hidden`, body contrast ≥ 4.5:1 and the teal accent ≥ 3:1 in both themes, `prefers-reduced-motion` honored.
- Content integrity: no customer/partner logo, named entity, partner count, or metric anywhere in the section — only the verbatim verticals and roles. No "trusted by" rail.
- SEO/semantics: this section adds no per-page metadata (that's SEO.1); it provides the `#who-its-for` anchor for in-page reference — never a dead link if linked.
- Marketing-site flavor: no auth/DB/jobs — no Clerk/Supabase/Stripe/Inngest; no live model call / no AI-SDK dependency (this section is static audience copy). No new dependency.
- Loop convention: build on `auto/HOME.7`, open a PR, merge via `gh` after review — never direct to `main`; design-critique + accessibility-review on the PR.
- Precedence: where this PRD and `content.md`/`design.md`/`../memory/` differ, those sources win — flag in one line. `content.md` orders §8 Who-it's-for after §7 thesis; render `<WhoItsFor />` after `<Thesis />` (HOME.8/HOME.9 insert after it) and flag if `app/page.tsx` order at build time differs.

## Rollback Plan
Revert `app/page.tsx` to remove `<WhoItsFor />`, delete `components/who-its-for.tsx`, the `whoItsFor` object and its `AudienceStage` interface in `content/home.ts`, `src/scripts/verify-home-7.ts`, and the HOME.7 manual-checks block. No nav link depends on `#who-its-for` today (it is an in-page anchor only), so removal degrades nothing — never a 404. Pure presentation — static text + CSS, no data, no schema, no model call, no migration. The loop lands this on `auto/HOME.7`; closing the PR unmerged reverts everything. **Zero data risk.**
