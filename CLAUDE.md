# CLAUDE.md — Axona Commercial Website

## What this is
The marketing site / homepage for **Axona** — the AI-native operating system for robotics
companies (humans + machines + agents on one system). Primary near-term job: make Axona feel
like a real, category-defining company to **(a) prospective design partners** (humanoid/defense
robotics ops leaders) and **(b) a prospective CTO, Julia White**. It must look like it belongs
next to linear.app and harvey.ai.

Parent project context lives one level up in `../` (`../CLAUDE.md`, `../memory/`). This repo is
the website only. The story, ICP, competition, and team facts are sourced from `../memory/`.

## One-line value
**The operating system for robotics companies** — start with an agentic procurement & build
co-pilot; expand to run the whole operation.

## Precedence (resolve context in this order — higher wins)
1. This `CLAUDE.md` + `design.md` + `specs/`.
2. `.claude/agents/joe.md` New-Project Intake.
3. Joe's generic defaults. **Where Joe's defaults conflict with this repo, this repo wins** —
   say so in one line, then proceed. Never hardcode a value `design.md` defines.

## Tech stack (website-appropriate subset of Joe's defaults — versions pinned, see below)
- **Framework:** Next.js 16 (App Router, Turbopack default for dev+build, Node ≥ 20) — SSG/ISR-first.
  Track the 16.2.x LTS line; SETUP.2 takes the latest 16.x patch.
- **UI:** shadcn/ui (New York style) + Tailwind, via the shadcn MCP registry. New York imports the
  unified `radix-ui` package (not individual `@radix-ui/react-*`). Components composed from
  shadcn/Shadcnblocks, not hand-rolled.
- **Content:** MDX in-repo to start; design the content model so a CMS (Sanity/Contentful/Notion)
  can own copy later without code changes.
- **Lead capture:** "Request access" form → server action → Resend (React Email). No auth/DB
  unless a real need appears. **Not used:** Clerk, Supabase, Stripe, Inngest (Joe defaults that
  this marketing site does not need — re-add only if scope grows).
- **Analytics:** GA4 or Plausible + consent banner. **Deploy:** Vercel.

## Verified stack (pinned 2026-06-21)
Single source other PRDs cite. Every number traces to a live check on 2026-06-21; pin **majors**,
not patches.

| Item | Pin | Notes |
|---|---|---|
| **Next.js** | **16** (track 16.2.x LTS) | GA Oct 2025; current stable 16.2.7, 16.2.9 LTS (June 2026). Turbopack default for dev+build, React 19.2, Cache Components, App Router unchanged. **Node ≥ 20.** |
| **shadcn/ui** | **`radix-vega`** preset (= New York successor) on the unified `radix-ui` package | Apr 2026: CLI dropped `--style new-york`/`--base-color` for `{base}-{style}` presets. **Vega** = the classic New York look; **Nova** = a *compact/reduced-padding* variant (≠ New York). Init: `shadcn init --base radix --preset radix-vega`. Components import from `radix-ui`, not per-package `@radix-ui/react-*`. Use the shadcn **MCP server** registry. |
| **WCAG** | **2.2 AA** (no change) | 2.2 is the current W3C Recommendation (Oct 2023). WCAG 3.0 is still an early Working Draft (Rec ~2028–2030) — do **not** bump rules files. |
| **Core Web Vitals** | Repo budgets stay stricter | Google "good": LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. Repo holds LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms. No conflict. |
| **Claude models** *(reference-only)* | `claude-opus-4-8` · `claude-sonnet-4-6` · `claude-haiku-4-5-20251001` | Opus 4.8 / Sonnet 4.6 / Haiku 4.5. **Binds only on stories with a live model call** — none currently do (HOME.3 demo uses sample data). The story adding a live call pins the exact string then; don't add an AI SDK dependency before that. |

## Structure
- `app/` routes (SSG/ISR). `components/` (shadcn + composed sections). `content/` MDX copy.
- `design.md` = the single source of truth for tokens. `specs/` = PRDs and backlog Claude Code reads.
- `.claude/rules/*.md` path-scoped conventions. `.claude/agents/joe.md` = the PM persona.

## Commands (confirm at build)
- `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` (`tsc --noEmit`) · `pnpm verify <script>`

## Design DNA (full tokens in `design.md` — this is the summary)
Target the craft bar of Linear / Harvey / Hebbia / Sana / Legora / DevRev / v0. Restraint over
decoration. Typography is the interface (Geist, intentional weights, tight heading tracking).
Density with air on a 4px grid. **Dark mode is designed, not inverted** (near-black #09090B, not
pure black; elevation via surface steps + 1px hairline borders, not heavy shadows). Motion is
functional (120–240ms, custom easing, honor `prefers-reduced-motion`). One accent only:
**electric teal** (signal color, never paint).

## Never / Always
- **Never** ship render-blocking JS on the hero; the LCP element must hit budget.
- **Always** set per-page `title`, meta description, Open Graph, and canonical URL.
- **Always** keep LCP / CLS / INP within budget on a throttled mid-tier phone.
- **Never** auto-invert for dark mode — design it. Ship real empty/loading/error states.
- **Never** invent traction, customers, logos, or metrics. Pre-launch claims are labeled or
  mocked-and-marked. (See `../CLAUDE.md` evidence rules.) Anything customer-named needs sign-off.
- **Anti-slop:** no purple-gradient-on-white, no center-everything template, no emoji-as-icons,
  no drop-shadow-on-everything, no default font with no intent. One type choice, one accent.

## Definition of done (gate before "done")
Lighthouse green (perf/SEO/best-practices/a11y) on mobile · per-page metadata + OG + canonical ·
structured data validates · CWV in budget · designed light **and** dark · WCAG 2.2 AA (contrast,
focus, keyboard, alt) · passes anti-slop · consent + privacy present. One-line standard: *"Would
this feel at home next to linear.app or harvey.ai? If not, it isn't done."*

## Changelog
- **2026-06-21 (SETUP.1):** Ran the "verify latest" pass and pinned the stack — Next.js 16
  (Turbopack default, Node ≥ 20), shadcn New York + unified `radix-ui` via MCP registry, WCAG 2.2
  AA, current Claude model strings (reference-only). Nothing in the stack needed a major correction
  vs. the June-2026 brief; the Next.js line was tightened from "pin majors at build" to a concrete 16.
- **2026-06-21 (SETUP.2):** Scaffolded the app and corrected one drift surfaced at build: the shadcn
  CLI moved to `{base}-{style}` **presets** (no more `--style new-york`). New York's successor is
  **`radix-vega`** (classic look) — **not** `radix-nova` (a compact variant). Pin updated to
  `radix-vega`. Landed: Next 16.2.9 + React 19.2.4, Tailwind v4, ESLint 9 (`eslint`, not `next lint`),
  Geist via the `geist` package, `app/` at repo root, `verify` script via `tsx`. The SETUP.2 build
  initialized `radix-nova`; reconcile to `radix-vega` in SETUP.3 (theming) via
  `shadcn init --preset radix-vega --force --no-reinstall`.
