# PRD: The problem section

**Status**: Ready for Dev
**Priority**: P1
**Effort**: S (3–4 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.2

## Problem Statement
The hero (HOME.1) states the category; the wedge (HOME.3) shows the product. Between them the page jumps from "what Axona is" to "here's the mock" without ever naming the pain it removes — so a skimming ops leader has no reason to care about the demo that follows. The problem section is the bridge: in one tight heading + one paragraph it has to make a VP of Operations at a humanoid maker think "that's my week." Without it, the wedge reads as a solution in search of a problem, and the page loses the one moment that earns the design partner's attention before the product proof.

## Success Metrics
| Metric | Target |
|---|---|
| Heading + body render verbatim from `content.md` §2 "The problem" | 100%, 0 banned words |
| Problem narrative reconciles to `../memory/` (idea, icp) — no invented metric/customer | Passes content-integrity review |
| Section is a Server Component; renders fully with JS disabled | Pass |
| Section has stable `id="problem"` (forward-anchor contract) | Present |
| Teal restraint — section reads near-monochrome, ≤ 1 teal accent | Pass design-critique |
| `pnpm verify src/scripts/verify-home-2.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold, zero client JS, no CLS) | LCP/CLS/INP in budget |

## User Stories
- As a **design-partner ops leader (VP/Head of Ops)**, I want the page to name the exact grind I live — long-lead sourcing, weekly BOM churn, per-unit traceability, fielded-fleet uptime — so that I trust Axona understands my line before I read the demo.
- As a **prospective CTO (Julia)**, I want the problem framed as a structural gap (ERPs built for a human-only workforce) so that the wedge reads as a wedge into a category, not a point tool.
- As any **visitor**, I want the claim to be honest and specific so that nothing reads as invented pain or fabricated traction.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Section heading, copy verbatim from `content.md` §2: "Robotics scales on hardware. Operations still run on spreadsheets." | P0 | Section's only heading; renders as `<h2>` (page owns one `<h1>`, the hero) |
| R2 | Body paragraph verbatim from `content.md` §2 ("Sourcing long-lead components, absorbing weekly BOM changes … your best engineers spend their week chasing parts.") | P0 | `text-muted-foreground`, readable measure (~60–70ch). No paraphrase |
| R3 | Copy as typed data in `content/home.ts` (`problem` object: `{ heading, body }`); component consumes it — no hardcoded strings in JSX | P0 | Content rule; mirrors the existing `hero`/`wedge` pattern in `content/home.ts` |
| R4 | Section is a **Server Component** `<section id="problem" aria-labelledby="problem-title">`; zero `"use client"`, zero render-blocking JS | P0 | Performance rule; below the fold but must not regress CWV |
| R5 | Stable anchor `id="problem"` (forward contract — nav does not link here today, but the id is the section's address for future deep-links/scrollspy) | P1 | Document the id in a comment; never a dead link if later referenced |
| R6 | Rendered after `<Hero />` and before `<Wedge />` inside the shell `<main>` in `app/page.tsx` | P0 | Page order: hero → problem → wedge. Reading the page top-down tells the story |
| R7 | Designed in both themes; dark default; near-monochrome surface, no teal fill | P0 | One accent; if a single restrained accent is used (e.g. a hairline or a lead-word emphasis) it's at most one teal element |
| R8 | Optional: the four pains may render as a quiet inline structure (e.g. a restrained list/lede), but only if the verbatim body text is preserved — content wins over layout | P2 | Do not fabricate sub-bullets or copy not in `content.md`; structure is presentational only |
| R9 | Semantic + a11y: one `<h2>`, `<section aria-labelledby>`, logical heading order after the hero `<h1>`, body contrast ≥ 4.5:1 in both themes | P0 | WCAG 2.2 AA |
| R10 | No new dependency; compose with existing primitives/tokens only | P1 | Pure presentation — text + tokens |

## Acceptance Criteria
- [ ] Heading and body render verbatim from `content.md` §2; zero banned words; no paraphrase.
- [ ] Copy lives in `content/home.ts` as a typed `problem` object; the component reads it, no hardcoded strings.
- [ ] Section is a Server Component (`no "use client"`); with JavaScript disabled the heading and body fully render.
- [ ] Section has `id="problem"` and `aria-labelledby="problem-title"`; heading is an `<h2>` (page keeps exactly one `<h1>`, the hero).
- [ ] Page order in `app/page.tsx` is `<Hero />` → `<Problem />` → `<Wedge />` inside the shell `<main>`.
- [ ] No inline hex, no raw Tailwind color utilities; section reads near-monochrome (≤ 1 teal accent).
- [ ] Body contrast ≥ 4.5:1 in both light and dark; designed (not auto-inverted) in both themes.
- [ ] Problem framing reconciles to `../memory/` (idea, icp); no invented metric, customer, supplier, or traction.
- [ ] `pnpm verify src/scripts/verify-home-2.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.2 block.

## Technical Requirements
- **Files:**
  - `components/problem.tsx` — **Server Component**. Renders `<section id="problem" aria-labelledby="problem-title">` with `<h2 id="problem-title">` (heading) and the body paragraph. Consumes `problem` from `content/home.ts`. No `"use client"`, no client JS, no state.
  - `content/home.ts` — extend with a typed `problem` object: `export interface Problem { heading: string; body: string }` and `export const problem: Problem = { heading, body }`, copy verbatim from `content.md` §2. Follows the existing `hero`/`wedge` module shape and CMS-ready comment convention.
  - `app/page.tsx` — render `<Problem />` between `<Hero />` and `<Wedge />` inside the shell `<main>`. Do not add a second `<h1>`, header, or footer.
  - `src/scripts/verify-home-2.ts` — the verification script below.
- **Content discipline:** copy is verbatim from `specs/content/content.md` §2 "The problem" (the canonical content of record, which supersedes `messaging.md`). The narrative is already reconciled to `../memory/` (idea: AI-native OS for robotics; icp: VP/Head of Ops, humanoid/defense makers scaling production). Do not add pains, numbers, customer names, or sub-claims beyond the approved paragraph.
- **Layout / craft:** type does the work — heading in Geist with tight tracking (`design.md` scale: 24–32px `<h2>`), body in `text-muted-foreground` at a comfortable measure. Restraint over decoration: no boxed callout, no icon row, no center-everything template. Generous vertical rhythm on the 4px grid; a 1px `border-border` hairline above/below is acceptable elevation, never a drop shadow.
- **Teal restraint:** this section is the "pain" beat — it should read near-monochrome. At most one teal accent (e.g. a single emphasized lead phrase or a hairline), never a teal fill. If the section reads "teal," pull it back.
- **Perf:** below the fold, not the LCP element. Zero client JS, no images, reserve no special space — pure text in normal flow, so no CLS risk.

## UX Flow
```
/ (Server-rendered)
  └─ <main id="main">  (SETUP.4 shell)
       ├─ <Hero>                                         ← #hero, the <h1>, LCP
       ├─ <section id="problem" aria-labelledby="problem-title">   ← Problem (Server Component)
       │     ├─ <h2 id="problem-title">
       │     │     "Robotics scales on hardware. Operations still run on spreadsheets."
       │     └─ <p> body (muted, ~65ch):
       │           "Sourcing long-lead components, absorbing weekly BOM changes,
       │            tracking which parts and firmware went into which unit … your best
       │            engineers spend their week chasing parts."
       └─ <Wedge>                                        ← #product, the demo mock (HOME.3)

JS disabled  → heading + body render from static HTML; no interactivity needed
Top-down read → category (hero) → pain (problem) → proof (wedge): the story holds
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled / fails to load | Entire section is static server-rendered HTML/CSS; full render, nothing depends on JS. |
| Reader reads pain as fabricated | Copy is verbatim from approved `content.md`, reconciled to `../memory/`; no invented metric, customer, supplier, or traction. Verify script scans for banned words and obvious fabricated entities. |
| Section turns teal | Near-monochrome by default; at most one restrained teal accent. If it reads teal, remove the accent. |
| Heading order broken | `<h2>` follows the hero `<h1>`; no skipped levels; the page keeps exactly one `<h1>`. |
| Narrow mobile (~360px) | Heading wraps cleanly, body keeps a readable measure, no horizontal scroll, no CLS (text in normal flow). |
| Light theme contrast | Body `text-muted-foreground` re-checked ≥ 4.5:1 against the light canvas; both themes designed, not inverted. |
| Future scrollspy / deep link to the problem | `id="problem"` is the stable address; documented in a comment so later stories can target it. |

## Out of Scope
- The propose→approve→audit product mock / sample-data UI (**HOME.3**, the section immediately after).
- The how-it-works 4-layer architecture (**HOME.4**), three pillars (**HOME.4B**), why-now, thesis, who-it's-for, company, and final-CTA sections.
- Any per-page metadata, OG image, canonical, or JSON-LD (**SEO.1**).
- The request-access form (**CONV.1**) and analytics events (**CONV.2**).
- Any imagery, icon row, diagram, or animated motif — this is a typographic section.
- Any new dependency or component primitive.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (app shell, `<main id="main">`, `content/` pattern) | done | Where the section mounts |
| SETUP.3 (tokens, surfaces, themes, type scale) | done | Heading/body theming |
| HOME.1 (`content/home.ts` exists, hero rendered, the page's one `<h1>`) | done | Extend the same content module; heading order (`<h2>` after the hero `<h1>`) |
| `content.md` §2 "The problem" copy | done (source) | All section copy |
| `../memory/` (idea, icp) | done (source) | Problem framing reconciliation |

## Implementation Plan
**Single session (~3–4 hrs):**
1. **Content (~45 min).** Extend `content/home.ts` with the typed `problem` object (`heading`, `body`), copy verbatim from `content.md` §2; add the CMS-ready/integrity comment mirroring the `hero`/`wedge` blocks.
2. **Component (~1 hr).** Build `components/problem.tsx` (Server Component) — `<section id="problem" aria-labelledby="problem-title">`, `<h2 id="problem-title">`, body `<p>`. Consume `problem` from content; tokens only; near-monochrome.
3. **Wire + order (~30 min).** Render `<Problem />` between `<Hero />` and `<Wedge />` in `app/page.tsx`. Confirm one `<h1>` on the page, `<h2>` heading order, JS-disabled render.
4. **Polish + gate (~1 hr).** Both themes; mobile measure/wrap; teal restraint pass; a11y (heading order, contrast). Write + pass `verify-home-2.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.2` → PR.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-2.ts   (or: npx tsx src/scripts/verify-home-2.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.2 — the problem section\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const problem = fs.existsSync('components/problem.tsx') ? read('components/problem.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = problem + content + page;

  // FILES + WIRING
  await check('components/problem.tsx exists', () => !!problem);
  await check('content/home.ts has a problem object', () => /problem\s*[:=]/.test(content));
  await check('page renders <Problem', () => /<Problem\b/.test(page));
  await check('section id="problem"', () => /id=["']problem["']/.test(problem));
  await check('section is aria-labelledby="problem-title"', () => /aria-labelledby=["']problem-title["']/.test(problem));

  // ORDER — Problem sits between Hero and Wedge
  await check('order: <Hero> … <Problem> … <Wedge>', () => {
    const h = page.indexOf('<Hero'), p = page.indexOf('<Problem'), w = page.indexOf('<Wedge');
    return h > -1 && p > -1 && w > -1 && h < p && p < w;
  });

  // COPY (traces verbatim to content.md §2)
  await check('heading verbatim', () => /Robotics scales on hardware\. Operations still run on spreadsheets\./.test(all));
  await check('body present (BOM changes)', () => /absorbing weekly BOM changes/.test(all));
  await check('body present (chasing parts)', () => /spend their week chasing parts/.test(all));

  // SERVER-COMPONENT + SEMANTICS DISCIPLINE
  await check('problem is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(problem));
  await check('heading is an <h2> (page keeps one <h1>)', () => /<h2\b/.test(problem) && !/<h1\b/.test(problem));

  // GUARDRAILS — tokens only, no banned words
  const files = ['components/problem.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in problem copy', () => !banned.test(content.replace(/^[\s\S]*?problem\s*[:=]/m, (m)=>m).match(/problem[\s\S]*/)?.[0] ?? content) ? !banned.test(content) : false);

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.2 — the problem section
- [ ] Heading and body read verbatim from content.md §2; no banned words, no paraphrase.
- [ ] Disable JS in DevTools → reload: the heading and body fully render (no interactivity needed).
- [ ] Section sits between the hero and the wedge; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Both themes: dark (near-black) and light are designed; body contrast passes AA; the section reads near-monochrome (no teal fill).
- [ ] Mobile (~360px): heading wraps cleanly, body keeps a readable measure, no horizontal scroll, no layout shift.
- [ ] Reading the page top-down — category (hero) → pain (problem) → proof (wedge) — the narrative holds.
- [ ] design-critique on the PR: does an ops leader read this and think "that's my week"? Restraint, not decoration?
```

## Common Mistakes to Avoid
- **Inventing pain or numbers.** The body is verbatim from `content.md` §2 and reconciled to `../memory/`. Do not add ramp-slip percentages, dollar costs, named customers, or extra pains — even "realistic" ones. Pre-launch integrity governs.
- **Adding a second `<h1>`.** The hero owns the page's only `<h1>`. This section's heading is an `<h2>`; breaking heading order fails a11y and SEO.
- **Making it a client component.** There's nothing interactive here. Keep `"use client"` out of `problem.tsx` — it must render from static HTML.
- **Decorating the pain.** No icon row, no boxed callout, no center-everything template, no teal fill. Type does the work; the section is a typographic beat between two heavier sections.
- **Paraphrasing to "improve" the copy.** The approved paragraph is the source of record; rewording it (or trimming the four pains) breaks the verbatim contract and may reintroduce a banned word.
- **Putting copy in JSX.** Strings live in `content/home.ts` as a typed `problem` object (CMS-ready); the component consumes them — never hardcoded in the component.

## Build Rules for This Story
- Copy is verbatim from `specs/content/content.md` §2 "The problem" (canonical, supersedes `messaging.md`), modeled as typed data in `content/home.ts`; zero banned words; no invented pain, metric, customer, or traction (inherited from `../CLAUDE.md`).
- Problem framing reconciles to `../memory/` (idea, icp) — flag any conflict in one line; do not ship a claim that contradicts memory.
- Tokens only (`design.md`); dark default and designed; near-monochrome; at most one restrained teal accent; elevation via 1px hairline, not shadow; type carries hierarchy.
- Server Component, zero client JS; below the fold but must not regress LCP/CLS/INP; renders fully with JS disabled.
- Semantic + a11y (WCAG 2.2 AA): one `<h2>`, `<section aria-labelledby>`, correct heading order after the hero `<h1>`, body contrast ≥ 4.5:1 in both themes.
- No new dependency. Loop convention: build on `auto/HOME.2`, open a PR, merge via `gh` after review — never direct to `main`; design-critique + manual checks on the PR.
- Precedence: where this PRD and `content.md`/`design.md`/`../memory/` differ, those sources win — flag in one line.

## Rollback Plan
Revert `app/page.tsx` to remove `<Problem />`, delete `components/problem.tsx`, the `problem` object and its interface in `content/home.ts`, `src/scripts/verify-home-2.ts`, and the HOME.2 manual-checks block. Pure presentation — static text, no data, no schema, no model call, no migration. The loop lands this on `auto/HOME.2`; closing the PR unmerged reverts everything. **Zero data risk.**
