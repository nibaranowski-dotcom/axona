# PRELAUNCH.1 — Build the toned-down pre-launch homepage

**Type:** feature (marketing site) · **Branch:** `prelaunch` · **Gate:** `[human-gate]` · **PR target:** `main` (do **not** auto-merge)
**Source of truth:** `Pre-launch Homepage.dc.html` (Axona v2 design-system components, light-canonical).

## Goal

Replace the moodboard homepage with a calmer, honest, **manufacturing-led** pre-launch page (~5–6
sections, more whitespace, zero borrowed social proof). Implement in the real codebase
(`components/v2/*`, `content/site-v2.ts`), not a one-off.

## HARD content rules (non-negotiable)

- **No** customer logos, usage metrics, testimonials, named/quoted people, or "$ / hrs / × saved" — anywhere.
- Sample data only inside a product mock, **visibly labeled** "sample data — illustrative".
- Team: only **Nicolas Baranowski**, "Founder at Axona."
- Manufacturing-led: build genealogy + work orders lead; procurement is an expansion. Fix copy **and** `<meta>`/OG.
- Keep the v2 design system exactly (paper `#fff` / panel `#f4f3ef` / ink `#0a0a0a`, single lime `#c6f24f`,
  Archivo + JetBrains Mono, dotted-grid, hairlines over shadows, **no emoji**).

## Sections

1. **Hero** — status chip "Onboarding our first founding design partners"; h1 "Build robots. Not
   spreadsheets."; manufacturing-first subhead; one CTA ("Request access"); the SN-2208 build-genealogy
   widget (labeled sample). **Remove** the parts ticker + "agents at work today" row.
2. **The problem** — "The line changes weekly. The records don't keep up." 3 points (BOMs in flux; no
   per-unit record; tools that never spoke). No unsourced stat.
3. **What it is / wedge** — agentic manufacturing co-pilot + per-unit build genealogy; propose → approve
   → audit (human approves every step); one sample product screen (agent-drafted PO).
4. **Platform (condensed)** — four layers on one spine (L1→L4) + verticals "coming soon" (humanoids
   first). Describe the intelligence layer plainly; **drop "the moat"** on the marketing site.
5. **Founding design partner** — the real offer (forward-deployed build; one workflow fast; founding
   terms; line to roadmap); founder credibility "Founder-led — Nicolas Baranowski · Founder at Axona.";
   soft CTA (email capture). Wire the submit to a real endpoint (requestAccess server action).
6. **Footer / final CTA** — "Hit every build date." capture. Dead nav → muted "coming soon".

## Explicitly REMOVE (grep to confirm gone)

"AGENTS AT WORK TODAY"; "Join 1,200 … 3.2× faster"; the parts ticker (7,491,284); the logo wall
(NORTHWIND / EIGHT / FORGE / MERIDIAN / ATLAS / VANTA / AXIOM / HELIX / ORBIT / NOVA / PILOT); "40hrs
saved"; "[CUSTOMER PHOTO]" / "Lauren"; "We've got the receipts" grid; "Powered by 1,200 teams"; every pull-quote.

## Definition of done

Zero fabricated traction (grep clean); manufacturing-led copy + meta/OG; plain words; v2 tokens intact;
built on `prelaunch`; PR opened to `main` (not merged).

## Status — DONE 2026-06-26 (on `prelaunch`, PR open, not merged)

Implemented in `content/site-v2.ts` + `components/v2/{chrome,hero,problem,wedge,platform,partner,closing,
email-capture}.tsx`; old fabricated components removed (join/agents/architecture/request-access-form).
Email capture wired to `requestAccess`. Meta/OG updated. Gate: tsc ✓ · lint ✓ · build ✓ · grep clean.
