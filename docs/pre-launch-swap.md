# Pre-launch swap list — Axona v2 prototype (redesign/axona-v2)

This is a **directional look-evaluation prototype**. Per the handoff PRD (§3 pre-launch honesty) and
`.claude/rules/content.md`, every fabricated item below is **fictional sample data** — no real
company and no real person is named (approved for the eval on that basis). **Replace or get written
permission before the site goes live to real buyers.** Nothing here is a verified claim.

Source of all copy/data: `content/site-v2.ts`.

## Fabricated metrics / counters → REPLACE or REFRAME

| Item                      | Where               | Value (fictional)                                                                            | Action before launch                                                                                    |
| ------------------------- | ------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Parts counter             | Hero eyebrow        | `7,491,284 parts`                                                                            | Replace with a real figure, or reframe ("built for the robotics era" / design-partner program), or cut. |
| Agents-at-work strip      | Hero                | BOMs 175.5K · actions 514 · POs 13,422 · shortages 2,288 · units 3,280                       | Replace with real telemetry or cut the strip.                                                           |
| "Join 1,200… 3.2× faster" | Join headline       | `1,200` teams, `3.2×`                                                                        | Reframe honestly (e.g. "built with ambitious hardware teams") — no fabricated counts/multiples.         |
| "40hrs saved / month"     | Join photo cell     | `40hrs`                                                                                      | Replace with a measured figure from a design partner, or cut.                                           |
| "Powered by 1,200 teams"  | AI-that-learns H2   | `1,200`                                                                                      | Drop the number unless real.                                                                            |
| Module agent counts       | Platform module map | `6 agents` (Procurement), `3 active` (Fulfillment), `4 agents` (Fleet), `6 agents` (Finance) | Replace with real counts or drop the badges — implies live agents we don't run yet.                     |

## Fabricated logos → PERMISSION or REPLACE (highest legal risk)

- **Join logo grid** (`join.logos`): NORTHWIND, EIGHT, FORGE, MERIDIAN, ATLAS, VANTA, AXIOM, HELIX,
  ORBIT, NOVA, PILOT — fictional placeholder wordmarks.
- **Receipts cards** (`receipts.items[].logo`): NORTHWIND, FORGE, MERIDIAN, ATLAS, HELIX, ORBIT,
  NOVA, PILOT.
- **Action:** replace with **permissioned real-customer logos** (written sign-off per `../CLAUDE.md`)
  or anonymized/generic marks, or remove. Do not ship implying customers we don't have.

## Fabricated testimonials & portraits → REAL + PERMISSIONED, or CUT

- **Receipts** (`receipts.items`): 8 quotes attributed to roles (Director of Ops, CFO, etc.).
- **Introducing Agents** (`introAgents.quote` / `attribution`): "We turned off three legacy tools…" — "VP Operations, mobility robotics".
- **Keep-focused portrait** (`keepFocused.portrait`): "Lauren · Head of Ops, drone manufacturer" + `[ CUSTOMER PORTRAIT ]`.
- **Action:** every quote/portrait must be a real, permissioned customer before launch, or be cut.
  No fabricated endorsement ships.

## Placeholder imagery → REAL ART

- `[ CUSTOMER PHOTO ]`, `[ CUSTOMER PORTRAIT ]`, `[ BRAND LOCKUP / LOGO ]`, the hero floating-mock
  stack, and all skeleton mock panes are stand-ins. Replace with real product shots / brand art;
  never ship a placeholder or broken image — gate on real art or a designed empty state.

## Functional gaps (PRD requires before launch, out of scope for this look build)

- **Email capture / "Book a demo" forms** are visual-only (no submit wiring). Wire to CRM/waitlist
  with validation, success/error states, spam protection, confirmation.
- **Announce bar** is non-dismissible (the ✕ was dropped; dismissal needs client state + storage).
- **Nav dropdown carets** are visual only (no menus).
- **Analytics events, SEO/OG/structured data, responsive QA, a11y audit** per the PRD — follow-ups.

## Request-access email sender (V2.1) → swap after DNS

- `REQUEST_ACCESS_FROM` defaults to Resend's **`onboarding@resend.dev`** sandbox sender so sends work
  before DNS is set up. **Swap to `access@axonahq.com`** once `axonahq.com` is DNS-verified in Resend.
- `RESEND_API_KEY` + `REQUEST_ACCESS_TO` must be set in the deploy env (the form degrades gracefully
  — logs the lead, no 500 — until they are). Secrets never committed; `.env.example` documents them.

## Positioning note (already applied)

Design copy said "AI-native **ERP**"; reconciled to **"operating system"** throughout per the PRD.
Trademark on "Axona" is unverified — flag for legal before launch.
