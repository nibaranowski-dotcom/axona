# PRD: Three pillars — Primitives × Domains × Verticals (redesign v2)

**Status**: Ready for Dev
**Priority**: P1
**Effort**: M (4–5 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.4B

> **Redesign.** v1 (auto-authored) shipped as three bare text columns — a flat list dump that reads
> like speaker notes, not a designed section. This v2 spec replaces it with a structured, restrained
> composition that makes the product model legible. Same copy (`content.md` §5); new visual design.

## Problem Statement
This section carries the core product model — *build primitives once, compose into domains, package per vertical* — and it's a key frame for a technical buyer and for Julia. As shipped it's three plain text columns: no structure, no relationship shown, no hierarchy beyond column headers. It reads as an outline, and on a page whose hero and wedge are crafted, that quality drop reads as unfinished. The section must *show* composition (Primitives → Domains → Verticals), present the items as deliberate elements rather than a list, and signal the wedge (Procurement) and the first vertical (Humanoids) — all in the near-monochrome, one-accent system, at the Linear/Hebbia bar.

## Success Metrics
| Metric | Target |
|---|---|
| Heading, framing line, and all pillar items render verbatim from `content.md` §5 | 100%, 0 banned words |
| Reads as a structured, designed section (panels + chips + compose flow), not a text list | Passes design-critique vs linear/harvey bar |
| The Primitives → Domains → Verticals composition is visually expressed | Present |
| Lead items (Procurement "the wedge", Humanoids "first") signalled; teal ≤ 2 marks/viewport | Pass |
| Server Component; renders with JS disabled; both themes; no CLS | Pass |
| `pnpm verify src/scripts/verify-home-4b.ts` + `tsc --noEmit` + `pnpm lint` | All green |

## User Stories
- As a **technical buyer / CTO (Julia)**, I want to see how the product scales — primitives composed into domain workflows, packaged per vertical — so that I read Axona as a platform, not a point tool.
- As a **skimming ops leader**, I want the wedge (Procurement) and the starting market (Humanoids) called out so that I immediately see where this starts for me.
- As any **visitor**, I want this to look as considered as the hero and wedge so that the company reads as finished and serious.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Heading verbatim: "Built once. Composed everywhere." (`<h2>`) + framing line verbatim: "Build the primitives once → compose them into domain workflows → package per vertical." | P0 | `content.md` §5. The framing line is the section's thesis — give it presence (lead-paragraph weight), not a footnote |
| R2 | **Three panels** — Primitives / Domains / Verticals — each a bordered surface card (`bg-card`, `border-border`, `rounded-xl`), with a pillar header: name + muted parenthetical ("the elements" / "the functions" / "the markets") | P0 | Surface steps + hairline borders, not shadow. Equal-height, equal-width on desktop |
| R2b | Within each panel, items render as **chips** — small bordered/surface pills in a wrapping flex layout — not a bare vertical text list | P0 | Geist (or Geist Mono for the element-y feel); restrained, even spacing on the 4px grid |
| R3 | Items verbatim from `content.md` §5: Primitives (SOPs · documents · data · agents · humans · machines (fixed + mobile) · inventory · meetings · integrations · interfaces); Domains (Procurement (the wedge) · manufacturing · quality & testing · logistics · field service · R&D · IT/security · sales · marketing); Verticals (Humanoids (first) · defense · logistics · manufacturing · construction · healthcare · space · automotive) | P0 | Exact list, no additions/omissions; ordering words like "then" collapse cleanly into the chip set |
| R4 | **Compose flow:** visually express Primitives → Domains → Verticals — a connective (arrow/chevron between panels on desktop; downward on mobile) reinforcing build-once → compose → package. Monochrome (`muted-foreground`), `aria-hidden` | P0 | This is what makes it read as a model, not three lists. Decorative only |
| R5 | **Signal the leads:** "Procurement (the wedge)" and "Humanoids (first)" are the emphasized chips, in teal. These are the section's one accent — **≤ 2 teal marks total**; all other chips near-monochrome | P0 | If teal on two chips reads heavy, make them teal-outlined rather than filled. Never a third teal element here |
| R6 | Per-pillar gloss (optional): the Primitives panel may carry the verbatim line "Agents are self-improving — skills, context, memory, multimodal, multi-cloud." as a small muted footnote | P2 | Only if it fits calmly; verbatim from `content.md`; never invented |
| R7 | Server Component `<section id="pillars" aria-labelledby="pillars-title">`; zero `"use client"`; below the fold, no render-blocking JS, no CLS | P0 | Keep the current placement (after How it works, before Why now) and the existing section `id` |
| R8 | Responsive: three panels side-by-side on `lg`, stack on mobile with the compose connective rotating to vertical; chips wrap; no overflow | P0 | Mobile must still read as the model |
| R9 | Copy as typed data in `content/home.ts` (refine the pillars object: `{ heading, framing, pillars: [{ label, parenthetical, items: [{ label, lead? }] }] }`) | P1 | Mark lead items with a `lead` flag so the component, not copy, drives the teal — keeps content CMS-clean |
| R10 | Designed both themes; dark default; semantic: `<h2>` + `<h3>` per pillar, items as a `<ul>`/`<li>` set, compose arrows `aria-hidden`; AA contrast on chips both themes | P0 | WCAG 2.2 AA |
| R11 | No new dependency; tokens + existing primitives only | P1 | Pure presentation |

## Acceptance Criteria
- [ ] Heading, framing line, and every pillar item render verbatim from `content.md` §5; zero banned words.
- [ ] Three bordered panels with pillar headers; items render as chips in a wrapping layout (not a vertical text list).
- [ ] The Primitives → Domains → Verticals composition is visually expressed by a connective between/through the panels.
- [ ] "Procurement (the wedge)" and "Humanoids (first)" are the emphasized teal chips; no third teal element in the section.
- [ ] Server Component; renders with JS disabled; designed in both themes; no CLS; responsive (side-by-side `lg`, stacked mobile, chips wrap).
- [ ] Semantic `<h2>`/`<h3>` + list items; compose connective `aria-hidden`; AA contrast on chips both themes.
- [ ] No inline hex, no raw Tailwind color utilities; `pnpm verify src/scripts/verify-home-4b.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` HOME.4B block updated for the redesign.

## Technical Requirements
- **Replace the v1 component** (the flat three-column section) with the structured version. Keep the same component file path and the section `id` so placement/anchors don't change. Refactor `content/home.ts`'s pillars data to the shape in R9 (label/parenthetical/items with a `lead` flag) so the teal is component-driven.
- **Panels:** a responsive grid — `grid lg:grid-cols-3 gap-4` (4px-scale gaps). Each panel: `rounded-xl border border-border bg-card p-6`, header `<h3>` (name) + `text-muted-foreground` parenthetical, then the chip set.
- **Chips:** `inline-flex` pills, e.g. `rounded-md border border-border bg-muted/40 px-2.5 py-1 text-sm text-foreground`, wrapping via `flex flex-wrap gap-2`. Lead chip: teal — `border-primary text-primary` (outlined) or `bg-primary text-primary-foreground` (filled); pick whichever keeps the section from reading "teal" with two of them.
- **Compose flow:** between panels on `lg`, render an `aria-hidden` chevron/arrow (lucide `ArrowRight`, `text-muted-foreground`) in the grid gaps or a thin connecting rule; on mobile, a downward chevron between stacked panels. Or a single labeled rail above the panels echoing the framing line — whichever reads calmest. Decorative only.
- **Framing line:** render prominently under the heading (e.g. `text-lg text-muted-foreground max-w-2xl`), with the `→` arrows kept (real arrow glyphs, not broken encoding).
- `src/scripts/verify-home-4b.ts` — update to assert the v2 structure (panels, chips, lead flags, compose connective, copy verbatim) per the script below.
- **No new dependency.**

## UX Flow
```
#pillars  (Server-rendered)
  ├─ <h2> Built once. Composed everywhere.
  ├─ framing: Build the primitives once → compose them into domain workflows → package per vertical.
  │
  └─ desktop (lg):  ┌── PRIMITIVES ──┐  →  ┌── DOMAINS ──────┐  →  ┌── VERTICALS ─────┐
                    │ [SOPs][data]…  │     │ [Procurement▸teal]│    │ [Humanoids▸teal]  │
                    │ chips wrap     │     │ [manufacturing]…  │    │ [defense][space]… │
                    └────────────────┘     └───────────────────┘    └───────────────────┘
                          (panels = bg-card + hairline; → = monochrome compose connective)
     mobile:  panels stack vertically; connective rotates to a downward chevron; chips wrap

   no JS → full section renders (static)
```

## Edge Cases
| Case | Handling |
|---|---|
| v1 failure: reads as a flat list | v2: panels + chips + compose connective give it structure (R2/R2b/R4). |
| Two teal chips read heavy | Use teal-outline rather than fill for the leads; never add a third teal mark. |
| Long chip rows wrap raggedly | `flex-wrap` with even gaps on the 4px grid; panels equal-height so the grid stays tidy. |
| Mobile: composition lost when stacked | Rotate the connective to a downward chevron between panels; framing line still states the flow. |
| Arrow glyphs render broken | Use the literal `→` from `content.md`; verify it renders (no mojibake) in the framing line. |
| Light theme chips low-contrast | Tune chip bg/border to the light tokens; AA-check chip text both themes. |

## Out of Scope
- The 4-layer architecture diagram (HOME.4 — separate, already shipped; this section complements it).
- Any new copy beyond `content.md` §5.
- Interactive/animated composition (a tasteful static connective only; no JS).
- New dependencies.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.3 (tokens, surfaces, chip styling) | done | Panels + chips |
| SETUP.4 (shell, `content/` pattern) | done | Placement |
| `content.md` §5 pillars copy | done (source) | All copy |
| Existing HOME.4B v1 component + `content/home.ts` pillars | done (to replace) | The refactor target |

## Implementation Plan
**Single day (~4–5 hrs):**
1. Refactor `content/home.ts` pillars to the R9 shape (label/parenthetical/items with `lead` flags), copy verbatim.
2. Rebuild the component: three bordered panels, chip sets, pillar headers; tune chip styling both themes.
3. Add the compose connective (desktop horizontal, mobile vertical), `aria-hidden`; render the framing line with presence.
4. Responsive + a11y + teal-restraint pass; update `verify-home-4b.ts`; `tsc`/`lint`; manual-checks; build on `auto/HOME.4B-redesign` → PR (no auto-merge — visual review first).

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-4b.ts   (or: npx tsx src/scripts/verify-home-4b.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.4B — three pillars (redesign)\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const candidates = ['components/pillars.tsx','components/three-pillars.tsx','components/composed.tsx'].filter((p)=>fs.existsSync(p));
  const comp = candidates.length ? read(candidates[0]) : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const all = comp + content;

  await check('pillars component found', () => !!comp);
  await check('content has pillars data with lead flags', () => /pillars/i.test(content) && /lead/i.test(content));

  // COPY verbatim (content.md §5)
  await check('heading verbatim', () => /Built once\. Composed everywhere\./.test(all));
  await check('framing line verbatim', () => /Build the primitives once/.test(all) && /package per vertical/.test(all));
  await check('three pillar labels present', () => /Primitives/i.test(all) && /Domains/i.test(all) && /Verticals/i.test(all));
  await check('lead items present', () => /Procurement \(the wedge\)/.test(all) && /Humanoids \(first\)/.test(all));
  await check('sample of items present', () => /SOPs/.test(all) && /manufacturing/.test(all) && /defense/.test(all));

  // STRUCTURE (the redesign — not a flat list)
  await check('renders bordered panels (border-border + bg-card)', () => /border-border/.test(comp) && /bg-card/.test(comp));
  await check('chips use flex-wrap (not a bare list)', () => /flex-wrap/.test(comp));
  await check('compose connective present + aria-hidden', () => /aria-hidden/.test(comp) && /(ArrowRight|Chevron|→)/.test(comp));
  await check('responsive grid (lg three-up)', () => /lg:grid-cols-3|grid-cols-3/.test(comp));
  await check('Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(comp));
  await check('one <h2>, has <h3> pillar headers', () => (comp.match(/<h2\b/g)||[]).length===1 && /<h3\b/.test(comp));

  // TEAL RESTRAINT — at most ~2 primary marks
  await check('teal used sparingly (lead chips only)', () => ((comp.match(/(text-primary|bg-primary|border-primary)/g)||[]).length) <= 3);

  // GUARDRAILS
  await check('no inline hex', () => !/#[0-9a-fA-F]{3,8}\b/.test(comp));
  await check('no raw tailwind color utilities', () => !/\b(bg|text|border|ring)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(comp));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.4B — three pillars (redesign v2)
- [ ] Reads as a structured section: three bordered panels, items as chips, NOT a flat text list.
- [ ] The Primitives → Domains → Verticals composition is visually clear (connective between/through panels).
- [ ] "Procurement (the wedge)" and "Humanoids (first)" are the teal-signalled chips; no third teal element; section reads near-monochrome.
- [ ] Heading + framing line + all items verbatim from content.md §5; the → arrows render correctly (no mojibake).
- [ ] Both themes designed; chips pass AA contrast; disable JS → full section renders.
- [ ] Mobile: panels stack, connective rotates downward, chips wrap, no overflow.
- [ ] design-critique: does it now sit at the same bar as the hero/wedge?
```

## Common Mistakes to Avoid
- **Shipping a list again.** The whole point of v2 is structure: panels + chips + a visible compose flow. If it still reads as three text columns, it failed.
- **Teal creep.** Exactly the two lead chips (Procurement, Humanoids) carry teal — nothing else. If it looks teal, switch the leads to teal-outline.
- **Decorative overload.** One calm monochrome connective for the compose flow; no glow, no animation, no second motif.
- **Breaking the copy.** Items, heading, and framing line are verbatim from `content.md` §5; the `→` glyphs must render correctly.
- **Losing the model on mobile.** When panels stack, keep the composition legible (downward connective + the framing line).
- **Changing placement/anchor.** Keep the section's `id` and position (after How it works, before Why now).

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §5, typed in `content/home.ts` with `lead` flags driving the teal; zero banned words; no invented items/markets.
- Tokens only; dark default and designed; near-monochrome panels with hairline borders + surface steps (no shadow stacks); one accent (teal) on ≤ 2 lead chips.
- Server Component; no render-blocking JS; CWV budgets hold; no CLS.
- a11y WCAG 2.2 AA: `<h2>`/`<h3>`, list semantics for items, `aria-hidden` connective, AA chip contrast both themes.
- **Design-critical redesign:** build on `auto/HOME.4B-redesign`, open a PR, and **do not auto-merge** — Joe reviews it rendered before merge.
- Precedence: where this PRD and `content.md`/`design.md` differ, those sources win — flag in one line.

## Rollback Plan
Replaces the v1 component in place. To revert: restore the v1 pillars component, the prior `content/home.ts` pillars shape, and `verify-home-4b.ts` from git history. Pure presentation, no data/schema. Lands on `auto/HOME.4B-redesign`; closing the PR unmerged keeps the (flat) v1 on main. **Zero data risk.**
