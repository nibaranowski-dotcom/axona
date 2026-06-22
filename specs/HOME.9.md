# PRD: Final CTA band

**Status**: Ready for Dev
**Priority**: P1
**Effort**: S (2–3 hrs)
**Last Updated**: 2026-06-22
**Backlog Reference**: HOME.9

## Problem Statement
The homepage currently ends on "Who it's for" with no closing ask — a reader who's convinced has nowhere to act. The final CTA band is the page's last impression and its primary conversion point: a calm, confident invitation to request access (design partners) or join the team (talent). It must also own the `#request-access` anchor that the hero and nav CTAs already point at, so those links land somewhere real. This is a small, structural section — the prior autonomous attempt failed the gate by using an `<h1>` (the hero owns the page's only one) and misplacing the band; this curated spec makes both constraints explicit so it lands.

## Success Metrics
| Metric | Target |
|---|---|
| Heading + sub + button labels render verbatim from `content.md` §10 "Final CTA" | 100%, 0 banned words |
| Heading is an `<h2>` (the page keeps exactly one `<h1>`, the hero) | Pass |
| Band is the **last** section in `<main>`, after `<WhoItsFor>` | Pass |
| Owns `id="request-access"` (the destination of hero/nav "Request access") | Present, no 404 |
| Server Component; renders fully with JS disabled | Pass |
| `pnpm verify src/scripts/verify-home-9.ts` + `tsc --noEmit` + `pnpm lint` | All green |

## User Stories
- As a **design-partner ops leader** who's read the page, I want a clear "Request access" at the end so that I can act without scrolling back up.
- As a **prospective hire**, I want a distinct "Build it with us" path so that talent isn't funneled through the customer CTA.
- As any **visitor**, I want the closing ask to be honest about what happens next (a small number of design partners at a time).

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Heading verbatim from `content.md` §10: "Get early access to Axona." rendered as **`<h2>`** | P0 | **Never `<h1>`** — the hero owns the page's only `<h1>`. This was the prior failure |
| R2 | Sub verbatim: "Tell us what you're building. We work with a small number of design partners at a time." | P0 | `text-muted-foreground`, readable measure |
| R3 | Two buttons, labels verbatim: **primary "Request access"**, **secondary "Build it with us"** | P0 | Primary = teal Button; secondary = ghost/outline |
| R4 | Section element `<section id="request-access" aria-labelledby="final-cta-title">` — this band **is** the `#request-access` destination for the hero + nav CTAs | P0 | Stable anchor contract; resolves those links (no 404) |
| R5 | **Placement:** render `<FinalCta />` as the **last child of `<main>`**, immediately after `<WhoItsFor />` in `app/page.tsx` | P0 | The closing band. This was the second prior failure |
| R6 | "Request access" target — forward contract: until CONV.1 ships the form, the primary button links to `#request-access` (this band; no-op self-anchor, never a dead `/` or 404). CONV.1 will wire it to the real form/anchor | P1 | Document in a comment; CONV.1 owns the form destination |
| R7 | "Build it with us" target — `#company` (HOME.8's section, forward contract). Never a 404 if HOME.8 isn't built yet | P1 | Talent path, distinct from the customer CTA |
| R8 | Copy as typed data in `content/home.ts` (`finalCta` object: `{ heading, sub, primaryCta:{label,href}, secondaryCta:{label,href} }`) | P0 | Content rule; mirrors `hero`/`wedge` |
| R9 | Server Component `<section>`; zero `"use client"`, zero render-blocking JS; below the fold, no CLS | P0 | Performance rule |
| R10 | Designed in both themes; dark default; near-monochrome; teal only on the primary button | P0 | One accent; a calm closing band, not a loud banner |
| R11 | Semantic + a11y: one `<h2>`, logical heading order, `aria-labelledby`, buttons keyboard-operable with visible teal focus ring | P0 | WCAG 2.2 AA |

## Acceptance Criteria
- [ ] Heading, sub, and both button labels render verbatim from `content.md` §10; zero banned words.
- [ ] The heading is an `<h2>`; the page still has exactly one `<h1>` (the hero) — verified across the rendered page.
- [ ] `<FinalCta />` is the last child of `<main>`, after `<WhoItsFor />`.
- [ ] The section has `id="request-access"`; the hero/nav "Request access" links scroll to it (no 404).
- [ ] "Build it with us" points at `#company`; neither button is a dead `/` link.
- [ ] Server Component; with JS disabled the band renders and buttons are clickable.
- [ ] No inline hex, no raw Tailwind color utilities; teal appears only on the primary button.
- [ ] Designed in both themes; no CLS; `pnpm verify src/scripts/verify-home-9.ts`, `tsc --noEmit`, `pnpm lint` green; `docs/manual-checks.md` updated.

## Technical Requirements
- **Files:**
  - `components/final-cta.tsx` — **Server Component** `<section id="request-access" aria-labelledby="final-cta-title">`: `<h2 id="final-cta-title">` heading, sub paragraph, and the two buttons (primary `Button asChild` → `<Link href="#request-access">`, secondary `variant="outline"`/`ghost` → `<Link href="#company">`). No `"use client"`.
  - `content/home.ts` — extend with `finalCta: { heading, sub, primaryCta, secondaryCta }`, copy verbatim from `content.md` §10.
  - `app/page.tsx` — render `<FinalCta />` as the **last** element inside `<main>`, after `<WhoItsFor />`.
  - `src/scripts/verify-home-9.ts` — verification script below.
- **Heading level:** the band's heading MUST be `<h2>`. The page's single `<h1>` lives in the hero; a second `<h1>` breaks the document outline and fails the verify script.
- **Anchor ownership:** this band is `#request-access`. The hero (HOME.1) and nav (SETUP.4) already link there; HOME.9 makes the target real. CONV.1 later places the actual request-access form inside (or wires the primary button to) this band.
- **No new dependency;** tokens + existing `Button` only.

## UX Flow
```
<main>
  … Hero (#…) → Problem → Wedge → HowItWorks → Pillars → WhyNow → Thesis → WhoItsFor
  └─ <FinalCta id="request-access">                       ← LAST child of <main>
       ├─ <h2> Get early access to Axona.                 ← h2, never h1
       ├─ <p>  Tell us what you're building. We work with a small number of design partners at a time.
       └─ [ Request access ]  ( Build it with us )         → #request-access (self; CONV.1 wires form) / #company

   hero/nav "Request access"  ──scrolls to──►  this band (#request-access)
   no JS → band renders, buttons clickable
```

## Edge Cases
| Case | Handling |
|---|---|
| Prior failure: heading as `<h1>` | R1 + verify enforce `<h2>`; the page keeps one `<h1>` (hero). |
| Prior failure: band misplaced | R5 + verify enforce it as the last child of `<main>`, after `<WhoItsFor>`. |
| CONV.1 form not built yet | Primary button → `#request-access` (this band; no-op, never 404). CONV.1 wires the real form later. |
| HOME.8 `#company` not built yet | Secondary → `#company` resolves as in-page anchor (no-op if absent), never a 404. |
| Light theme | Teal primary shifts to light token; band reads calm, near-monochrome. |
| Mobile | Buttons stack; heading scales a step; no overflow, no CLS. |

## Out of Scope
- The actual request-access **form**, server action, Resend, consent (**CONV.1** — owns the form inside this band).
- Analytics events on the buttons (**CONV.2**).
- The company/join-us section itself (**HOME.8** — owns `#company`).
- Any new copy beyond `content.md` §10.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| HOME.1 (hero owns the only `<h1>`; links to `#request-access`) | done | Heading-level constraint; the anchor contract |
| SETUP.4 (shell `<main>`, nav "Request access" → `#request-access`, `content/` pattern) | done | Placement + anchor |
| `content.md` §10 final-CTA copy | done (source) | All copy |
| CONV.1 (form), HOME.8 (`#company`) | not built | Button destinations (forward contracts; no 404 meanwhile) |

## Implementation Plan
**Single session (~2–3 hrs):**
1. Extend `content/home.ts` with `finalCta` (verbatim copy).
2. Build `components/final-cta.tsx` (Server Component, `<h2>`, sub, two buttons, `id="request-access"`), both themes.
3. Render `<FinalCta />` as the last child of `<main>` in `app/page.tsx`. Write + pass `verify-home-9.ts`; `tsc`/`lint`; append manual-checks; (loop) land on `auto/HOME.9` → PR.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-home-9.ts   (or: npx tsx src/scripts/verify-home-9.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying HOME.9 — final CTA band\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const cta = fs.existsSync('components/final-cta.tsx') ? read('components/final-cta.tsx') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';
  const all = cta + content;

  // FILES + WIRING
  await check('components/final-cta.tsx exists', () => !!cta);
  await check('content/home.ts has a finalCta object', () => /finalCta\s*[:=]/.test(content));
  await check('page renders <FinalCta', () => /<FinalCta\b/.test(page));

  // STRUCTURE — the two prior failures
  await check('heading is <h2> (not <h1>)', () => /<h2\b/.test(cta) && !/<h1\b/.test(cta));
  await check('section id="request-access"', () => /id=["']request-access["']/.test(cta));
  await check('FinalCta is the LAST section in <main>', () => {
    const m = page.match(/<main[\s\S]*?<\/main>/);
    if (!m) return false;
    const inner = m[0];
    const last = inner.lastIndexOf('<FinalCta');
    const who = inner.lastIndexOf('<WhoItsFor');
    // FinalCta present, after WhoItsFor, and no other component tag after it
    return last > -1 && last > who && !/<[A-Z][A-Za-z]+\b/.test(inner.slice(last + 1).replace(/<FinalCta[\s\S]*?\/>|<FinalCta[\s\S]*?<\/FinalCta>/, ''));
  });

  // COPY (verbatim, content.md §10)
  await check('heading verbatim', () => /Get early access to Axona\./.test(all));
  await check('sub verbatim', () => /small number of design partners at a time/.test(all));
  await check('primary "Request access" → #request-access', () => /Request access/.test(all) && /#request-access/.test(all));
  await check('secondary "Build it with us" → #company', () => /Build it with us/.test(all) && /#company/.test(all));

  // GUARDRAILS
  const files = ['components/final-cta.tsx','content/home.ts'].filter((f)=>fs.existsSync(f));
  await check('no inline hex', () => !files.some((f)=>/#[0-9a-fA-F]{3,8}\b/.test(read(f).replace(/#request-access|#company/g,''))));
  await check('no raw tailwind color utilities', () => !files.some((f)=>/\b(bg|text|border|ring|from|to|via)-(zinc|slate|gray|neutral|stone|red|blue|green|teal|cyan|sky|indigo|violet|purple)-\d{2,3}\b/.test(read(f))));
  const banned = /\b(straightforward|simply|simple|just|easily|obviously|honestly|genuinely|revolutionary|seamless|cutting-edge|game-changing)\b/i;
  await check('no banned words', () => !banned.test(content));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## HOME.9 — final CTA band
- [ ] Heading + sub + button labels read verbatim from content.md §10; no banned words.
- [ ] Heading is an <h2>; the rendered page still has exactly one <h1> (the hero).
- [ ] The band is the last thing in <main>, after "Who it's for".
- [ ] hero/nav "Request access" scrolls to this band (#request-access); "Build it with us" → #company; neither 404s.
- [ ] Disable JS → band renders, buttons clickable.
- [ ] Both themes: calm, near-monochrome; teal only on the primary button; no CLS at mobile width.
```

## Common Mistakes to Avoid
- **`<h1>` instead of `<h2>`.** The prior attempt's failure. The hero owns the page's only `<h1>`; this band is `<h2>`. The verify script fails on any `<h1>` here.
- **Wrong placement.** Must be the **last** child of `<main>`, after `<WhoItsFor>`. Don't insert it mid-page.
- **Dead buttons.** "Request access" → `#request-access` (this band, self-anchor) until CONV.1; "Build it with us" → `#company`. Never `/` or a 404.
- **Building the form here.** Out of scope — CONV.1 owns the form. HOME.9 is the band + buttons only.
- **Loud banner.** Keep it calm and near-monochrome; teal only on the primary button. It's a confident close, not a billboard.
- **Paraphrasing copy.** Verbatim from `content.md` §10.

## Build Rules for This Story
- Copy verbatim from `specs/content/content.md` §10, typed in `content/home.ts`; zero banned words; honest expectation-setting (a small number of design partners).
- Tokens only; dark default and designed; one accent (teal) on the primary button; calm closing band.
- Server Component; no render-blocking JS; CWV budgets hold; no CLS.
- a11y WCAG 2.2 AA: single `<h2>`, logical heading order, `aria-labelledby`, keyboard-operable buttons with visible teal focus ring.
- Loop convention: build on `auto/HOME.9`, open a PR, merge via `gh` after the gate is green.
- Precedence: where this PRD and `content.md`/`design.md` differ, those sources win — flag in one line.

## Rollback Plan
Revert `app/page.tsx` to remove `<FinalCta />`, delete `components/final-cta.tsx`, the `finalCta` object in `content/home.ts`, `src/scripts/verify-home-9.ts`, and the HOME.9 manual-checks block. Pure presentation, no data/schema. The loop lands this on `auto/HOME.9`; closing the PR unmerged reverts everything. **Zero data risk.**
