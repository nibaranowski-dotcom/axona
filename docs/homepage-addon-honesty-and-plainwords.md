# Homepage Add-on — Honesty Pass + Plain Words (axonahq.com)

_For the homepage designer. Layers on top of `CLAUDE.md` + `design.md` (v2 tokens stay exactly as-is).
This is a correctness pass, not a redesign. **Priority 0 is urgent: the live site currently shows
fabricated traction for a pre-launch company with 0 customers — remove it before anyone we're courting
sees it.** Added 2026-06-26. Human-gate: Nicolas approves before deploy._

---

## Priority 0 — DELETE all invented traction (do this first)

The live homepage presents fake customers, fake metrics, and fake testimonials. We have **zero signed
customers**. This is a trust risk, not a style note: a design-partner ops lead or an investor who reads
"1,200 teams" and then learns they'd be the first will conclude Axona says untrue things — fatal for a
company that wants to be forward-deployed inside their factory. Remove every item below.

**Remove or replace (exhaustive list of what's currently fabricated):**

- Hero ticker: **"PARTS UNDER MANAGEMENT BY AXONA: 7,491,284 parts"** → remove (or replace with a clearly
  labeled _product demo_ figure: "sample data" — but simplest is remove).
- **"AGENTS AT WORK TODAY"** block — BOMS SYNCED 175.5K · AGENT ACTIONS 514 · POS DRAFTED 13,422 ·
  SHORTAGES CAUGHT 2,288 · UNITS TRACED 3,280 → **remove entirely.** These read as live production usage.
- **"Join 1,200 of the world's most ambitious hardware teams shipping 3.2× faster than the industry
  average"** + "Read the report" → **remove.** No report exists; no 1,200; no 3.2×.
- **Customer logo wall** — NORTHWIND, EIGHT, FORGE, MERIDIAN, ATLAS, VANTA, AXIOM, HELIX, ORBIT, NOVA,
  PILOT → **remove.** No real or fictional customer logos on the marketing site.
- **"40hrs saved every month, per ops lead"** + "[CUSTOMER PHOTO]" / "Lauren, Head of Ops" → **remove.**
- **"Powered by 1,200 teams that came before you"** (Procurement module section) → reword (see below).
- All **testimonial quotes** — the "VP Operations, mobility robotics" pull-quote; the entire **"We've got
  the receipts"** grid (NORTHWIND/FORGE/MERIDIAN/ATLAS/HELIX/ORBIT/NOVA/PILOT quotes) → **remove the whole
  section.** Every quote is invented.
- Any other implied count, %, "$ saved," or named/quoted person anywhere on the page.

**The rule going forward (matches `../CLAUDE.md`):** no customer logos, no usage metrics, no testimonials,
no named/quoted people, no "$ / hrs / × saved," until we have a signed partner with written permission.
Sample data _inside a product mock_ is fine **only if** visibly labeled "sample data — illustrative."

---

## What to put in their place (honest pre-launch proof — and it's stronger)

A pre-launch deep-tech company earns trust with a sharp problem, a visible product, and an obvious-fit
founder — not borrowed social proof. Replace the fabricated blocks with:

- **The product itself.** Keep and feature the real, concrete UI you already have: the **SN-2208 build-
  genealogy** widget (84%, 142 parts traced), the **BOM · work order routed-for-approval** card, the
  **propose → approve → audit** pattern, the **policy/auto-PO** examples. Label any data "sample."
- **The architecture / vision section** — the four-layers-on-one-spine, primitives, verticals. This is
  legitimately yours; let it carry weight where the fake logos were.
- **An honest status line instead of social proof:** _"Now onboarding our first founding design partners."_
  (Only this phrasing — it's true and it makes the next maker want to be early.) Optionally a real email
  capture / waitlist; if you show a waitlist count, it must be the **real** number or no number.
- **Founder credibility (real):** _"Founder-led — Nicolas Baranowski: 3× founder, ex-McKinsey, Head of AI
  at Pemo."_ No unconfirmed teammates named as "joined."
- **A founding-design-partner offer** in place of the testimonial wall: what a partner gets (forward-
  deployed build on their data, one workflow to production fast, founding-partner terms, direct line to the
  roadmap) and the soft CTA. This converts the right reader far better than fake quotes.

---

## Priority 1 — Manufacturing-led wedge (fix the stale procurement framing)

The page + meta lead with **procurement** ("Procurement and per-unit build genealogy first…"). Our wedge is
now **manufacturing-led** (work orders + per-unit build genealogy); procurement is an _expansion_.

- Update the meta description / OG copy and any "procurement first" line to **manufacturing first**.
- The hero "Build robots. Not spreadsheets." is good — keep it. In the supporting line, lead the module
  list with **manufacturing + build genealogy**, then procurement/quality/etc.
- The "A LOOK AT ONE MODULE · PROCUREMENT" deep-dive → make it **Manufacturing** (build genealogy /
  work orders), or keep procurement as a secondary example clearly downstream of manufacturing.

---

## Priority 2 — Plain words (the buyer is a hype-allergic ops leader)

Keep "operating system" (the category buyers accept). Trim investor/jargon words from the customer face:

- "AI-native" as a repeated label → use sparingly; prefer plain outcomes (hit the build date, know every
  unit, stop rebuilding records from email).
- "Intelligence & Agent Spine," "the moat" → on the marketing site, describe plainly: "specialized models +
  long-term memory that learn how your factory runs." Save "moat" for the investor deck.
- Cut filler hype anywhere it appears ("seamless," "revolutionary," "cutting-edge," "genuinely").
- Lead each section with the customer's problem/outcome, not our architecture (architecture section excepted).

---

## Keep (these are good — don't lose them in the edit)

- Hero: **"Build robots. Not spreadsheets."**
- The real product widgets (genealogy, approval, propose/approve/audit).
- The module map (Core / Value chain / Robotics / Back office) and the four-layer architecture.
- The verticals strip with **"coming soon"** honestly marked.
- v2 design system unchanged (paper/lime/ink, Archivo + JetBrains Mono, dotted grid, hairlines, no emoji).

## Definition of done

- **Zero** invented customers, logos, metrics, testimonials, or named/quoted people on the page (grep the
  build for the removed strings — NORTHWIND, 1,200, 3.2×, 7,491,284, "receipts," etc.).
- Manufacturing-led framing in copy + meta/OG.
- Plain-words pass done; v2 tokens intact; passes the existing `docs/manual-checks.md` content-integrity check.
- Honest status ("onboarding first design partners") + founder credibility + design-partner CTA in place of
  the social-proof blocks. **Nicolas signs off before deploy.**

## Kick-off line for the homepage designer (paste this)

> Apply `docs/homepage-addon-honesty-and-plainwords.md` to axonahq.com. Priority 0: remove every fabricated
> traction element listed (counts, the 1,200-teams claim, all customer logos, the "agents at work today"
> metrics, every testimonial and named/quoted person) — we are pre-launch with zero customers. Replace them
> with the honest pre-launch blocks (real product widgets, architecture, "onboarding first design partners,"
> founder credibility, design-partner CTA). Fix the wedge to manufacturing-led in copy + meta. Do a plain-
> words pass. Keep the v2 design system and the good concrete UI. Then run the content-integrity check in
> docs/manual-checks.md and list anything that needs Nicolas's sign-off before deploy.
