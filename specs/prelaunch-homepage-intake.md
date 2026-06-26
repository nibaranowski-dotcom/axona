# Build Intake — Pre-launch Homepage (for Joe, Head of Product)

_Joe: turn this into two CPRDs (PRELAUNCH.0, then PRELAUNCH.1), save each to `specs/<ID>.md`, then hand to
Claude Code per the README loop. Inherit `CLAUDE.md` + `design.md`. Honesty source of truth:
`docs/homepage-addon-honesty-and-plainwords.md`. Both stories are **[human-gate]** — Nicolas signs off before
anything merges to `main` / deploys. Written by CoS 2026-06-26._

## Why

The current axonahq.com homepage was a **moodboard** — it shipped fabricated traction (invented "1,200 teams /
3.2× faster," 7.49M parts, fake logos, invented testimonials). We're pre-launch with **0 customers**. We're
building a **calmer, honest pre-launch homepage** and **keeping the mock as a backup** (not deleting it).
Decision: **one project, one codebase** — no second site to maintain. The mock is preserved via git; the new
homepage is built on a branch and becomes `main` only when Nicolas approves.

---

## STORY PRELAUNCH.0 — Preserve the mock + set up the branch (mechanical; [human-gate] on merge)

**Goal:** the mocked homepage is recoverable forever, and new work happens on an isolated branch.

**Claude Code instructions (exact):**

1. From an up-to-date `main`, create an annotated tag of the current mock:
   `git tag -a homepage-v1-mock -m "Mocked moodboard homepage (fabricated traction) — backup before pre-launch rebuild"` then `git push origin homepage-v1-mock`.
2. Also create a backup branch: `git switch -c backup/homepage-v1-mock origin/main && git push -u origin backup/homepage-v1-mock`.
3. Create the working branch off `main`: `git switch -C prelaunch origin/main`.
4. (Optional, if cheap) keep the mock viewable for reference at a non-indexed route `/_mock` (add `noindex`),
   so Nicolas can compare side by side. If it adds risk or time, skip — the tag is the real backup.
5. Do **not** modify `main`. Open the PR for PRELAUNCH.1 from `prelaunch`.

**Done when:** tag + backup branch exist on origin; `prelaunch` is checked out; `main` untouched.

---

## STORY PRELAUNCH.1 — Build the toned-down pre-launch homepage (on `prelaunch`; [human-gate])

**Design intent:** calmer and more confident than the mock. ~5–6 sections (not ~12), more whitespace, less
density, zero borrowed social proof. Manufacturing-led. Plain words for a hype-allergic ops buyer. Keep the
v2 design system exactly (paper `#fff` / panel `#f4f3ef` / ink `#0a0a0a`, single lime `#c6f24f`, Archivo +
JetBrains Mono, dotted-grid motif, hairlines over shadows, no emoji).

**HARD content rules (from the honesty addon + `../CLAUDE.md`):**

- **No** customer logos, usage metrics, testimonials, named/quoted people, or "$ / hrs / × saved" — anywhere.
- Sample data only inside a product mock, visibly labeled "sample data — illustrative."
- Team: only Nicolas, real bio. No unconfirmed teammates as "joined."
- Manufacturing-led: build genealogy + work orders lead; procurement is an expansion, not the headline. Fix
  copy **and** meta/OG description.

**Section-by-section spec (the toned-down page):**

1. **Hero.** Keep "Build robots. Not spreadsheets." Subhead, plain + manufacturing-first: e.g. _"The operating
   system for robotics makers — manufacturing and per-unit build genealogy first, then your whole operation.
   Humans, machines, and agents on one system."_ One CTA ("Request access" / "Book a demo"). An honest status
   chip: _"Onboarding our first founding design partners."_ One real product visual (the SN-2208 build-
   genealogy widget, labeled sample). **Remove** the parts-under-management ticker.
2. **The problem.** _"The line changes weekly. The records don't keep up."_ 3 short, concrete points (BOMs in
   flux; no reliable per-unit record; tools that never spoke). No unsourced stat.
3. **What it is / the wedge.** Agentic manufacturing co-pilot + per-unit build genealogy; the loop
   **propose → approve → audit**, a human approves every step. One line: _"An operating system, not another
   point tool — one spine, your whole operation."_ One real product screen.
4. **The platform (condensed).** A calm version of the module map (Core / Value chain / Robotics / Back office)
   **or** the four-layers-on-one-spine — pick one, not both, kept light. Verticals strip with **"coming soon"**
   honestly marked (humanoids first). Describe the intelligence layer plainly ("specialized models + long-term
   memory that learn how your factory runs") — **drop "the moat"** on the marketing site.
5. **Founding design partner.** Replace the testimonial wall with the real offer: what a partner gets
   (forward-deployed build on their data; one workflow to production fast; founding-partner terms; direct line
   to the roadmap) + soft CTA. Plus founder credibility: _"Founder-led — Nicolas Baranowski: 3× founder,
   ex-McKinsey, Head of AI at Pemo."_
6. **Footer / final CTA.** "Hit every build date." form. Trim dead nav: any link that 404s (Customers,
   Pricing, Docs, blog) renders as muted "coming soon," not a live link to nothing.

**Explicitly REMOVE from the mock** (grep the build to confirm gone): the "AGENTS AT WORK TODAY" metrics block,
"Join 1,200 … 3.2× faster," the logo wall (NORTHWIND/EIGHT/FORGE/MERIDIAN/ATLAS/VANTA/AXIOM/HELIX/ORBIT/NOVA/
PILOT), "40hrs saved," all "[CUSTOMER PHOTO]"/"Lauren", the "We've got the receipts" testimonial grid, "Powered
by 1,200 teams," and every pull-quote.

**Keep (don't lose in the edit):** the hero line, the real product widgets (genealogy, approval,
propose/approve/audit), the architecture/primitives concept, the verticals "coming soon" strip, the v2 tokens.

**Definition of done:** zero fabricated traction (grep clean); manufacturing-led copy + meta; plain-words pass;
v2 tokens intact; passes `docs/manual-checks.md` content-integrity; built on `prelaunch`; PR to `main`
(not merged by the loop). **Gate:** design-critique (does it sit next to linear.app/harvey.ai, calm not
busy?) + accessibility-review + content-integrity. **Human-gate: Nicolas approves the PR before merge/deploy.**

---

## Joe's handoff sequence (how this flows)

1. **Joe:** `CPRD "PRELAUNCH.0 — preserve mock + branch setup"` → save `specs/PRELAUNCH.0.md`.
2. **Joe:** `CPRD "PRELAUNCH.1 — toned-down pre-launch homepage"` (pull content from this intake +
   `docs/homepage-addon-honesty-and-plainwords.md` + `design.md`) → save `specs/PRELAUNCH.1.md`.
3. **Claude Code:** implement PRELAUNCH.0, then PRELAUNCH.1 on `prelaunch`; run the gate; open a PR to `main`.
   Do **not** auto-merge (both are human-gate).
4. **Nicolas:** review the PR (and `/_mock` vs the new page if kept), approve, then `gh pr merge`. Railway deploys.
5. Add both rows to `specs/backlog.md` so the loop/tracking sees them; tag both `[human-gate]`.

## One paste-line for Joe to start

> Author PRELAUNCH.0 and PRELAUNCH.1 from `specs/prelaunch-homepage-intake.md`. Follow the honesty rules in
> `docs/homepage-addon-honesty-and-plainwords.md` and the v2 tokens in `design.md`. Emit each as a full
> Claude-Code-ready PRD (no preamble), save to `specs/PRELAUNCH.0.md` and `specs/PRELAUNCH.1.md`, and end each
> with "stop after <ID> and show me the diff / PR before continuing." Both are [human-gate]: never auto-merge.
