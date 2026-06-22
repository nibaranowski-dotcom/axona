# PRD: Product / wedge — 3 cards + propose→approve→audit mock (sample data)

**Status**: Ready for Dev
**Priority**: P0
**Effort**: L (1–1.5 days)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.3

## Problem Statement
After the hero states the category, the visitor needs to see the **wedge** — what Axona actually does first — and believe it's real product, not a vision deck. This section has to do two jobs at once: explain the agentic procurement & build co-pilot in three tight value cards, and *show* the Harvey-style trust pattern (the AI proposes, a human approves, every action is audited) as a concrete, dense, credible UI. The hard constraint: it must read as real product while being unmistakably **sample/illustrative data** — pre-launch, we invent no customers, suppliers, metrics, or traction. Get the mock wrong and we either look like vaporware (too vague) or imply traction we don't have (too real). This is the second P0 "wow," and the one that earns a design partner's and Julia's trust.

## Success Metrics
| Metric | Target |
|---|---|
| Three value cards render, copy verbatim from `content.md` | 3/3, 0 banned words |
| Propose→approve→audit mock present with a visible audit trail (inputs · output · model · confidence · approver) | Present, all 5 fields |
| Mock is unmistakably labeled sample/illustrative; zero real or implied customer/supplier/metric | 100% — passes content-integrity review |
| No live model call / no AI-SDK dependency added (sample data only) | 0 new AI deps |
| Section is keyboard-accessible; renders fully with JS disabled | Pass |
| `pnpm verify src/scripts/verify-home-3.ts` + `tsc --noEmit` + `pnpm lint` | All green |
| CWV unaffected (below-the-fold; no CLS, no heavy client JS) | LCP/CLS/INP in budget |

## User Stories
- As a **design-partner ops leader**, I want to see how Axona sources parts and tracks units so that I can judge whether it fits how my line actually runs.
- As a **prospective CTO (Julia)**, I want to see the propose→approve→audit paper trail so that the "human-approved, auditable" claim is shown, not just asserted.
- As any **visitor**, I want the demo to be honest so that I trust the company — clearly sample data, nothing faked as real.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Section heading + three cards, copy verbatim from `content.md` §"The product / wedge" | P0 | Heading: "An agentic procurement & build co-pilot. You approve; it remembers." |
| R2 | Card 1 "Source without the grind", Card 2 "Know every unit", Card 3 "It compounds" — each title + body verbatim | P0 | From `content.md`; restrained icons (lucide) allowed, one per card, as quiet support — not emoji |
| R3 | Trust line verbatim: "The AI proposes; a human approves; every action is auditable — inputs, output, model, confidence, approver." | P0 | Anchors the mock conceptually |
| R4 | **Propose→approve→audit mock** — a Harvey-style agent-action panel on **sample data**: a proposed procurement action (e.g., a drafted PO/RFQ for a long-lead component with a flagged lead-time risk), an approve/decline affordance, and a visible **audit trail** row: inputs · output · model · confidence · approver | P0 | Hebbia/Legora density that still feels light; surface steps + 1px borders, not shadows |
| R5 | **Sample-data labeling** — a persistent, visible "Sample data — illustrative" marker on the mock; no real or plausible-as-real company, customer, supplier, person, or metric anywhere | P0 | Content integrity is the #1 risk. Use obviously-generic names (e.g. "Supplier A", "Actuator HD-17"); never a real vendor |
| R6 | The mock renders the **paper trail** statically (server-rendered) so the trust story is visible with **no JS**; any stepping between propose/approve/audit is a progressive-enhancement `"use client"` leaf, defaulting to a fully-readable state | P1 | No live model call; sample data is a typed const. Degrades to the full audit view without JS |
| R7 | Section id `#product` (the nav "Product" link target from SETUP.4) | P0 | Stable anchor contract; nav already links here |
| R8 | Copy as typed data in `content/` (extend `content/home.ts` with a `wedge` object: heading, cards[], trustLine, and the sample mock data) | P1 | Content rule; components consume data, no hardcoded strings |
| R9 | Confidence shown as a calm, labeled value (e.g. "Confidence: High" or a small token-driven meter) — **not** a teal splash; teal stays the one signal | P1 | Avoid making the panel "look teal"; teal at most on the primary approve affordance or the active step |
| R10 | Designed in both themes; dark default; dense table/rows legible on near-black and white | P0 | One accent; near-monochrome; elevation via surface + hairline |
| R11 | Accessible: the mock is semantic (lists/definition lists or a table with headers for the audit trail), keyboard-operable if interactive, decorative icons `aria-hidden`, sample-label announced (not color-only) | P0 | WCAG 2.2 AA |

## Acceptance Criteria
- [ ] Heading, three cards, and trust line render verbatim from `content.md`; zero banned words.
- [ ] The mock shows a proposed procurement action, an approve/decline affordance, and an audit trail exposing all five fields (inputs, output, model, confidence, approver).
- [ ] A persistent "Sample data — illustrative" label is visible on the mock; a content-integrity scan finds no real/implied customer, supplier, person, or metric.
- [ ] No `ai`/model-SDK dependency added; the mock data is a typed constant.
- [ ] With JavaScript disabled, the cards, trust line, and the full audit trail are all readable; any stepper degrades to a complete static view.
- [ ] Section has `id="product"`; the SETUP.4 nav "Product" link scrolls to it.
- [ ] No inline hex, no raw Tailwind color utilities; teal appears at most as the approve action / active step — the panel does not read as "teal."
- [ ] Keyboard-operable and screen-reader-sane; decorative icons `aria-hidden`; designed in both themes; no CLS.
- [ ] `pnpm verify src/scripts/verify-home-3.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated with the HOME.3 block.

## Technical Requirements
- **Files:**
  - `components/wedge.tsx` — **Server Component** `<section id="product" aria-labelledby="wedge-title">`: heading, the three cards (a `WedgeCard` subcomponent or inline), the trust line, and `<AgentActionMock />`. No `"use client"` here.
  - `components/agent-action-mock.tsx` — the propose→approve→audit panel. Default export renders the **full** paper trail statically (Server Component). If a stepper is added, isolate it as a small `"use client"` child that defaults to showing everything; the server markup must already contain the audit trail so no-JS users see it. Carries the persistent "Sample data — illustrative" badge.
  - `content/home.ts` — extend with a `wedge` object: `{ heading, cards: {title, body, icon}[], trustLine, mock: {...sample data...} }`. The mock sample data (proposed action, inputs, output, model label, confidence, approver) lives here as a typed const — clearly generic.
  - `app/page.tsx` — render `<Wedge />` after `<Hero />`, inside the shell `<main>`.
  - `src/scripts/verify-home-3.ts` — verification script below.
- **Sample data discipline:** invent nothing that could be read as real. Use placeholder identifiers — e.g. proposed action "Draft PO — 24× Actuator HD-17, Supplier A; lead time 14 wks (flagged)", model "axona-procure (sample)", confidence "High", approver "—" or "you". No real OEM/vendor names, no humanoid-company names, no dollar figures presented as real. The "(sample)" / "illustrative" framing is mandatory and visible.
- **Density aesthetic:** Hebbia/Legora — a compact rows/grid for the audit trail using `text-sm`/`text-xs`, `border-border` hairlines, `bg-card`/surface steps; Geist Mono for field-keys / part numbers / model id (per `design.md`). Light, not cramped; no shadow stacks.
- **No live AI:** this is sample data only. Do not add an AI SDK or any model call (`CLAUDE.md`: the story that adds a live call pins the model then — not this one).
- **Perf:** below the fold, so not LCP — but keep client JS minimal (a stepper, if any, is a tiny leaf), reserve space to avoid CLS, icons inline SVG (lucide).

## UX Flow
```
#product  (Server-rendered section)
  ├─ Heading: "An agentic procurement & build co-pilot. You approve; it remembers."
  ├─ 3 cards:  [Source without the grind] [Know every unit] [It compounds]
  ├─ Trust line: "The AI proposes; a human approves; every action is auditable — …"
  └─ <AgentActionMock>   ┌───────────────────────────────────────────────┐ "Sample data — illustrative"
                         │ PROPOSE  Draft PO — 24× Actuator HD-17          │
                         │          Supplier A · lead time 14 wks (flagged)│
                         │ APPROVE  [ Approve ]  [ Decline ]   ← human gate│
                         │ AUDIT    inputs · output · model · confidence · approver
                         └───────────────────────────────────────────────┘
   no JS  → the panel shows propose + approve affordance + full audit trail (static)
   with JS→ optional: subtle step highlight propose→approve→audit (progressive enhancement only)
```

## Edge Cases
| Case | Handling |
|---|---|
| JS disabled | Cards, trust line, and the complete audit trail all render server-side; any stepper degrades to the full static view. |
| Reader thinks the mock is live/real | Persistent "Sample data — illustrative" badge + generic identifiers; never a real name or metric. Content-integrity scan in the verify script. |
| Confidence/active-step turns the panel teal | Teal limited to the approve action / one active accent; everything else near-monochrome. If it reads teal, pull back. |
| Dense audit trail wraps badly on mobile | Stack the audit fields into labeled rows below `sm`; keep Geist Mono keys aligned; no overflow, no CLS. |
| Icons read as decoration vs meaning | One quiet lucide icon per card, `aria-hidden`; meaning carried by the text, not the icon. |
| Future live demo | Out of scope; when a real demo lands it's a separate story that pins the model and adds the SDK. This stays sample data. |

## Out of Scope
- A live, model-backed demo or any AI-SDK integration (separate future story).
- The 4-layer architecture diagram (**HOME.4**) and the Three Pillars section (**HOME.4B**).
- The problem section (**HOME.2**), why-now, thesis, who-it's-for, company, final CTA.
- The request-access form (**CONV.1**) — the section may reference "Request access" but owns no form.
- Real per-unit genealogy data or any real procurement integration.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.4 (shell, `content/` pattern, `#product` nav link) | done | Where the section mounts; the anchor |
| SETUP.3 (tokens, surfaces, Geist Mono, themes) | done | The dense-panel aesthetic |
| HOME.1 (`content/home.ts` exists, hero pattern) | done | Extend the same content module |
| `content.md` wedge copy + trust line | done (source) | All section copy |

## Implementation Plan
**Day 1 — cards + copy + mock structure.**
- Morning: extend `content/home.ts` with the `wedge` object (cards, trust line, sample mock data — all generic). Build `components/wedge.tsx` (heading + 3 cards + trust line), wire into `app/page.tsx` after the hero. Confirm copy verbatim, `#product` anchor, JS-disabled render.
- Afternoon: `components/agent-action-mock.tsx` — the static propose→approve→audit panel with the full audit trail and the persistent sample badge; Hebbia-style density with tokens + Geist Mono.

**Day 2 (half) — polish + gate.**
- Optional progressive-enhancement step highlight (tiny client leaf, defaults to full view). Both themes; mobile stacking; teal restraint pass; a11y (semantics, keyboard, aria-hidden icons). Write + pass `verify-home-3.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.3` → PR.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-3.ts   (or: npx tsx src/scripts/verify-home-3.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.3 — product / wedge\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const wedge = fs.existsSync('components/wedge.tsx') ? read('components/wedge.tsx') : '';
  const mock = fs.existsSync('components/agent-action-mock.tsx') ? read('components/agent-action-mock.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = wedge + mock + content;
  const pkg = JSON.parse(read('package.json'));
  const deps = { ...(pkg.dependencies||{}), ...(pkg.devDependencies||{}) };

  // FILES + WIRING
  await check('components/wedge.tsx exists', () => !!wedge);
  await check('components/agent-action-mock.tsx exists', () => !!mock);
  await check('content/home.ts has a wedge object', () => /wedge\s*[:=]/.test(content));
  await check('page renders <Wedge', () => /<Wedge\b/.test(page));
  await check('section id="product"', () => /id=["']product["']/.test(wedge));

  // COPY (traces to content.md)
  await check('heading verbatim', () => /An agentic procurement & build co-pilot\. You approve; it remembers\./.test(all));
  await check('card 1 title', () => /Source without the grind/.test(all));
  await check('card 2 title', () => /Know every unit/.test(all));
  await check('card 3 title', () => /It compounds/.test(all));
  await check('trust line verbatim', () => /The AI proposes; a human approves; every action is auditable/.test(all));

  // MOCK — paper trail + sample labeling
  await check('audit trail names all 5 fields', () => ['inputs','output','model','confidence','approver'].every((f)=> new RegExp(f,'i').test(mock)));
  await check('propose + approve states present', () => /propose/i.test(mock) && /approve/i.test(mock));
  await check('persistent sample-data label', () => /sample/i.test(mock) && /(illustrative|sample data)/i.test(mock));

  // CONTENT INTEGRITY — no live AI, no obvious real entities
  await check('no AI-SDK dependency added', () => !deps['ai'] && !Object.keys(deps).some((d)=>/^@ai-sdk\//.test(d)));
  await check('mock data declared in content (typed const, not fetched)', () => /mock\s*[:=]/.test(content) && !/fetch\(|generateObject|generateText/.test(mock));

  // GUARDRAILS
  const files = ['components/wedge.tsx','components/agent-action-mock.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words in wedge copy', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.3 — product / wedge
- [ ] Heading, three cards, and trust line read verbatim from content.md; no banned words.
- [ ] The mock shows propose → approve → audit with all five audit fields (inputs, output, model, confidence, approver).
- [ ] "Sample data — illustrative" is clearly visible on the mock; no real/implied customer, supplier, person, or metric anywhere (content-integrity check).
- [ ] Disable JS → cards, trust line, and the full audit trail still render; any stepper degrades gracefully.
- [ ] Keyboard: any interactive element in the mock is reachable with a visible teal focus ring; decorative icons are aria-hidden.
- [ ] Both themes: the dense panel is legible on near-black and white; teal appears only as the approve action / active step — the panel does not read "teal."
- [ ] Mobile (~360px): audit fields stack into labeled rows, no overflow, no layout shift.
- [ ] design-critique on the PR: does this hit the Harvey/Hebbia trust-and-density bar?
```

## Common Mistakes to Avoid
- **Implying traction.** The single biggest risk. No real customer, supplier, OEM, person, or dollar metric — even as a "realistic" example. Generic identifiers only ("Supplier A", "Actuator HD-17"), and a persistent visible "Sample data — illustrative" label. When in doubt, make it more obviously sample.
- **Adding a live model call.** This is sample data. No `ai` SDK, no `generateObject`/`generateText`, no fetch — the mock data is a typed const. The verify script fails on an AI dep.
- **Burying the audit trail behind JS.** The paper trail must render server-side and be readable with JS off; a stepper is enhancement only, defaulting to the full view.
- **Teal panel.** Confidence meters, active steps, and highlights tend to attract teal — keep it to the one approve action / active accent. If the mock reads teal, it's wrong.
- **Emoji or loud icons.** One quiet lucide icon per card, `aria-hidden`; meaning lives in the text. No emoji-as-icons.
- **CLS / heavy JS below the fold.** Reserve the panel's space; keep any client leaf tiny. This section must not regress CWV.
- **Inventing copy.** Cards, heading, and trust line are verbatim from `content.md`; don't paraphrase.

## Build Rules for This Story
- Content integrity is the governing rule: clearly-marked sample/illustrative data, no invented traction, customers, suppliers, people, or metrics (inherited from `../CLAUDE.md`). Any real name needs sign-off — none here.
- Copy verbatim from `specs/content/content.md`, modeled as typed data in `content/home.ts`; zero banned words.
- Tokens only; dark default and designed; one accent (teal) as signal; near-monochrome dense surfaces; elevation via surface steps + 1px borders; Geist Mono for field-keys/part numbers/model id.
- No new dependency; no AI SDK / live model call (sample data only).
- a11y (WCAG 2.2 AA) and CWV budgets hold; section is below the fold but must not regress LCP/CLS/INP.
- Loop convention: build on `auto/HOME.3`, open a PR, merge via `gh` after review; design-critique + manual checks on the PR.
- Precedence: where this PRD and `content.md`/`design.md` differ, those sources win — flag in one line.

## Rollback Plan
Revert `app/page.tsx` to remove `<Wedge />`, delete `components/wedge.tsx`, `components/agent-action-mock.tsx`, the `wedge` object in `content/home.ts`, `src/scripts/verify-home-3.ts`, and the HOME.3 manual-checks block. Pure presentation with static sample data — no real data, no schema, no model call. The loop lands this on `auto/HOME.3`; closing the PR unmerged reverts everything. **Zero data risk.**
