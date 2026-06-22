# PRD: The thesis / "our secret" section

**Status**: Ready for Dev
**Priority**: P1
**Effort**: S (3–4 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.6

## Problem Statement
This is the section that converts a skeptical, technical reader — a model-research CTO like Julia, or an investor checking for a real wedge into a category — from "nice tool" to "this is a company worth betting on." The hero states the category and the wedge shows the product, but neither argues *why Axona wins*. The thesis does: a robotics company's workforce is humans, machines, and agents; horizontal ERPs model only humans; the company that builds the OS for all three on proprietary robotics data compounds a moat no incumbent can copy. It's pure argument, so the craft is **typography and restraint** — if it reads as a generic text block, the most important idea on the page lands flat. This section has no product UI to hide behind; the writing and the type *are* the design.

## Success Metrics
| Metric | Target |
|---|---|
| Heading + body render verbatim from `content.md` §7 "The thesis (our secret)" | 100%, 0 banned words |
| Argument reconciles to `../memory/` (idea, thesis) — no invented metric/customer/claim | Passes content-integrity review |
| Server Component; renders fully with JS disabled | Pass |
| Reads as a considered, editorial statement (type hierarchy does the work, not boxes/color) | Passes design-critique vs linear/harvey bar |
| Teal restraint — at most one subtle accent; section reads near-monochrome | ≤ 1 teal element |
| `pnpm verify src/scripts/verify-home-6.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold, zero client JS, no CLS) | In budget |

## User Stories
- As a **prospective CTO (Julia)**, I want the structural argument — humans + machines + agents, proprietary data → compounding models/memory — stated plainly so that I see the category bet, not a feature.
- As an **investor skimming for the wedge**, I want the moat articulated in one tight passage so that I grasp why this compounds and incumbents can't copy it.
- As any **reader**, I want the claim to be argued, not hyped — honest and specific, no fabricated proof.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Heading verbatim from `content.md` §7: "A robotics company's workforce is humans, machines, and agents." Renders as `<h2>` (page owns one `<h1>`, the hero) | P0 | The section's only heading; large, editorial weight |
| R2 | Body verbatim from `content.md` §7 ("Horizontal ERPs — even the AI-native ones — model a human-only company … a moat no horizontal incumbent can copy.") | P0 | No paraphrase, no added sentences, no invented stats |
| R3 | Copy as typed data in `content/home.ts` (`thesis` object: `{ heading, body }`); component consumes it | P0 | Content rule; mirrors `hero`/`problem`/`wedge` |
| R4 | **Typography-led layout.** Hierarchy from Geist weight/size + tight heading tracking (−0.02em) and a generous reading measure; the closing moat sentence may be given subtle emphasis (weight/size or a lead-in), but **only using the verbatim text** — no pull-quote that invents words | P0 | "Type does the work." This is the craft of the section |
| R5 | Server Component `<section id="thesis" aria-labelledby="thesis-title">`; zero `"use client"`, zero render-blocking JS | P0 | Below the fold; must not regress CWV |
| R6 | Generous vertical rhythm and constrained measure (~60–70ch body) so the argument breathes — distinct from the denser wedge above it | P1 | Calm, editorial; whitespace is part of the design |
| R7 | Optional **subtle motif echo** — a single thin teal hairline or a faint axon-signal accent, used once, as the section's quiet signal. If it adds noise, omit it | P2 | `design.md`: the motif is "echoed subtly." One accent max; never a teal fill or a second motif |
| R8 | Page order: render `<Thesis />` in its final IA position — after the why-now section (HOME.5) when present; until then, after the last currently-rendered section (the wedge). Later sections (HOME.4/4B/5) insert above it | P1 | Maintain the intended top-down narrative as sections land out of order |
| R9 | Designed in both themes; dark default; near-monochrome; body contrast ≥ 4.5:1 both themes | P0 | One accent; elevation via type/space, not boxes or shadow |
| R10 | Semantic + a11y: one `<h2>`, logical heading order after the hero `<h1>`, `<section aria-labelledby>`; any accent is decorative (`aria-hidden`) | P0 | WCAG 2.2 AA |
| R11 | No new dependency; tokens + existing primitives only | P1 | Pure presentation |

## Acceptance Criteria
- [ ] Heading and body render verbatim from `content.md` §7; zero banned words; zero invented metrics/claims.
- [ ] The section reads as a deliberate editorial statement — clear type hierarchy, generous measure and rhythm — not a flat paragraph or a boxed callout.
- [ ] Server Component; with JS disabled the full thesis renders.
- [ ] `id="thesis"` present; `<h2>` is the section's only heading; heading order after the hero `<h1>` is logical.
- [ ] At most one subtle teal accent; the section reads near-monochrome in both themes; body contrast ≥ 4.5:1.
- [ ] No inline hex, no raw Tailwind color utilities; copy lives in `content/home.ts`.
- [ ] `pnpm verify src/scripts/verify-home-6.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.6 block.

## Technical Requirements
- **Files:**
  - `components/thesis.tsx` — **Server Component** `<section id="thesis" aria-labelledby="thesis-title">`: the `<h2 id="thesis-title">` heading and the body. Typography-led: large heading (e.g. `text-3xl`–`text-4xl`, `font-[590]`/`[680]`, `tracking-[-0.02em]`), body at a readable measure (`max-w-[65ch]`, `text-lg`, `leading-relaxed`, `text-muted-foreground` with the key clause in `text-foreground` if emphasis helps — verbatim text only). Optional one-time subtle accent per R7.
  - `content/home.ts` — extend with `thesis: { heading, body }`, copy verbatim from `content.md` §7, with a content-integrity comment (reconciles to `../memory/`; no fabrication).
  - `app/page.tsx` — render `<Thesis />` in IA position (per R8).
  - `src/scripts/verify-home-6.ts` — verification script below.
- **Craft notes:** this section's quality bar is editorial. Let the heading sit large with air around it; keep the body to a single calm column. The moat sentence ("a moat no horizontal incumbent can copy") is the payoff — it may carry slightly more weight than the rest, but using only the existing words. No card, no border box around the whole thing, no background fill — the argument stands on type and space.
- **No motif overreach:** if R7's accent is used, it's one thin teal hairline or a faint single-line signal echo, `aria-hidden`, never competing with the hero's motif or turning the section teal.

## UX Flow
```
#thesis  (Server-rendered, below the fold)
  ├─ <h2> A robotics company's workforce is humans, machines, and agents.   ← large, editorial
  │        (generous space above/below; tight tracking)
  └─ <p>  Horizontal ERPs — even the AI-native ones — model a human-only company …
          … a moat no horizontal incumbent can copy.                         ← payoff clause, subtle weight
       (single calm column, ~65ch; optional one thin teal hairline as the section's quiet signal)

   no JS → full thesis renders (static)
```

## Edge Cases
| Case | Handling |
|---|---|
| Reader treats the thesis as a proven claim | It's argued, not evidenced; copy is verbatim and reconciles to `../memory/` — no metric, no customer, no "we have." Keep it as a stated thesis. |
| Section reads flat / generic | Lean on type hierarchy + space (R4/R6); give the heading scale and the moat clause subtle emphasis — without inventing words. |
| Accent turns the section teal | R7 is optional and singular; if it adds noise, omit. One hairline at most. |
| Long body wraps awkwardly on mobile | Constrain measure; scale the heading down a step below `sm`; keep rhythm; no overflow, no CLS. |
| Page order drifts as sections land | Place per R8; when HOME.4/4B/5 land they insert above the thesis to reach final IA. |

## Out of Scope
- The why-now (HOME.5), how-it-works (HOME.4), three-pillars (HOME.4B), who-it's-for (HOME.7), company (HOME.8), final-CTA (HOME.9) sections.
- Any data, metric, chart, or proof point (the thesis is argument, not evidence).
- A bespoke animated visual — at most the single subtle accent in R7.
- New dependencies.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (shell, `content/` pattern) | done | Where the section mounts |
| SETUP.3 (tokens, type scale, themes) | done | The editorial typography |
| HOME.1 (`content/home.ts` exists) | done | Extend the same content module |
| `content.md` §7 thesis copy | done (source) | All section copy |

## Implementation Plan
**Single session (~3–4 hrs):**
1. Extend `content/home.ts` with `thesis` (verbatim copy + integrity comment).
2. Build `components/thesis.tsx` — typography-led section; tune heading scale, measure, rhythm; optional single subtle accent; both themes.
3. Wire `<Thesis />` into `app/page.tsx` (IA position). a11y + reduced-motion (if any accent animates, it shouldn't). Write + pass `verify-home-6.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.6` → PR.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-6.ts   (or: npx tsx src/scripts/verify-home-6.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.6 — thesis\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const thesis = fs.existsSync('components/thesis.tsx') ? read('components/thesis.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = thesis + content;

  // FILES + WIRING
  await check('components/thesis.tsx exists', () => !!thesis);
  await check('content/home.ts has a thesis object', () => /thesis\s*[:=]/.test(content));
  await check('page renders <Thesis', () => /<Thesis\b/.test(page));
  await check('section id="thesis"', () => /id=["']thesis["']/.test(thesis));

  // COPY (verbatim, content.md §7)
  await check('heading verbatim', () => /A robotics company's workforce is humans, machines, and agents\./.test(all));
  await check('body present (horizontal ERPs argument)', () => /Horizontal ERPs/.test(all) && /human-only company/.test(all));
  await check('moat payoff clause present', () => /a moat no horizontal incumbent can copy/.test(all));

  // STRUCTURE / SERVER-COMPONENT / a11y
  await check('thesis is a Server Component (no "use client")', () => !/^\s*["']use client["']/m.test(thesis));
  await check('exactly one <h2> in thesis', () => (thesis.match(/<h2\b/g) || []).length === 1);

  // GUARDRAILS
  const files = ['components/thesis.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in thesis copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.6 — thesis
- [ ] Heading + body read verbatim from content.md §7; no banned words; no invented metric/claim.
- [ ] Reads as a deliberate editorial statement — strong type hierarchy, generous measure/rhythm — not a flat paragraph or a boxed callout.
- [ ] Disable JS → the full thesis renders.
- [ ] At most one subtle teal accent; section reads near-monochrome in both themes; body contrast passes AA.
- [ ] Mobile (~360px): heading scales down a step, measure holds, no overflow, no layout shift.
- [ ] design-critique on the PR: does this land the category argument with the weight it deserves, at the linear/harvey bar?
```

## Common Mistakes to Avoid
- **Flat text block.** This is the highest-stakes idea on the page; if it's an undifferentiated paragraph it fails. Use scale, weight, tracking, and whitespace to give it gravity — that's the whole job.
- **Inventing emphasis words.** Emphasis is allowed (weight/size on the moat clause) but only on the verbatim text. No pull-quote that rewrites or adds words; no fabricated stat to "prove" the moat.
- **Over-decorating.** No card, border box, background fill, or bespoke animation. At most one thin teal hairline (R7), `aria-hidden`. The argument stands on type and space.
- **Turning it teal.** One subtle accent maximum; if in doubt, omit it. Near-monochrome.
- **Wrong heading level.** `<h2>`, not a second `<h1>` — the hero owns the page's only `<h1>`.
- **Paraphrasing the copy.** Verbatim from `content.md` §7; the verify script checks the heading, the argument, and the moat clause.

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §7, modeled as typed data in `content/home.ts`; reconciles to `../memory/`; no invented traction, metric, or claim; zero banned words.
- Tokens only; dark default and designed; **type does the work** (Geist weight/size + tight tracking), elevation via space, not boxes/shadows; one accent (teal) used subtly at most once.
- Server Component; no render-blocking JS; CWV budgets hold (below the fold).
- a11y WCAG 2.2 AA: one `<h2>`, logical heading order, `aria-labelledby`, decorative accent `aria-hidden`, AA contrast both themes.
- Loop convention: build on `auto/HOME.6`, open a PR, merge via `gh` after review; design-critique + manual checks on the PR.
- Precedence: where this PRD and `content.md`/`design.md` differ, those sources win — flag in one line.

## Rollback Plan
Revert `app/page.tsx` to remove `<Thesis />`, delete `components/thesis.tsx`, the `thesis` object in `content/home.ts`, `src/scripts/verify-home-6.ts`, and the HOME.6 manual-checks block. Pure presentation, no data/schema. The loop lands this on `auto/HOME.6`; closing the PR unmerged reverts everything. **Zero data risk.**
