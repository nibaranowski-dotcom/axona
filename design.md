# design.md — Axona Website Design System · **Blueprint** (redesign, supersedes v1)

Authoritative token source. **This replaces the prior dark / electric-teal / Geist system** with the
"Blueprint" direction from the design handoff (`design_handoff_axona_landing/`, Option B). Where this
file and any skill (e.g. frontend-design) differ, **this file wins**. Ported from the handoff's
`assets/base.css` + README, reconciled with Axona's content-integrity rules.

## What changed vs v1 (one-line)
Dark→**light**, electric-teal→**signature orange**, Geist→**Hanken Grotesk + JetBrains Mono**,
restraint-only→restraint **plus** three deliberate devices (engineering grid, highlighter text, mono
spec-labels). Dark mode is **deferred** (Blueprint is light-canonical; keep the toggle infra, design
a dark Blueprint later — never auto-invert).

## Seven principles
1. **Technical-editorial, not decorative.** The page should read like a precise spec sheet — mono labels, numbered rows, hairline grids — not a marketing brochure.
2. **One accent: signature orange.** `#fa3c00` is the single brand signal (logo, highlights, primary CTA, hover, the kicker tick). Used deliberately; never floods a viewport.
3. **Flat. Depth from hairlines + color blocks, never shadows.** No drop shadows anywhere. Structure comes from 1px lines, the grid, and solid blocks.
4. **Sharp by default.** Rectangles — no radius on cards/blocks/placeholders. Pills only for buttons (`999px`). Logo mark is a square.
5. **Type does the work.** Heavy geometric sans (Hanken Grotesk 800 display) + mono technical labels (JetBrains Mono, uppercase, tracked). Big fluid headlines; calm body.
6. **The highlighter is the one expressive move.** A solid color block behind a key phrase (`.hl`) — orange for the signal phrase, pastels used sparingly. This is the signature; don't add others.
7. **Directional prototype now; honest at launch.** This build's job is to evaluate the look — illustrative stats, a logo wall, and module copy (per the handoff) are fine here and should read as a realistic mockup. **Before it goes live to real buyers**, replace fabricated metrics and swap real-company logos for permissioned or generic ones (real named-customer logos are the one element that can actually bite — trademark + implied endorsement). Track these in a "pre-launch swap" list.

## Tokens (from handoff `base.css`)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0c0c0d` | Primary text, dark blocks, ink buttons |
| `--paper` | `#ffffff` | Default surface |
| `--paper-2` | `#f7f6f2` | Off-white panels / ghost buttons |
| `--bg` | `#fbfbf9` | Page background (Blueprint) |
| **`--orange`** | **`#fa3c00`** | **The one accent** — logo, highlight, CTA, hover |
| `--orange-ink` | `#c52e00` | Orange text on light / hover |
| `--line` | `#d7d7d2` | Hairline borders (neutral) |
| `--line-blue` | `#c4cae6` | Hairline borders on grid/placeholder fields |
| Pastel stat blocks | `--pink #fbd4dc` · `--lilac #e0e2ee` · `--sky #cfeaf8` · `--butter #f4f2cf` | Optional stat-block fills / highlighter variants — sparingly |
| Font (sans) | **Hanken Grotesk** (400–900) | Display 800 (`-0.02em`, `line-height .98`); body 400–600, 18px/1.5 |
| Font (mono) | **JetBrains Mono** (400/500/700) | Labels/kickers/codes — UPPERCASE, `letter-spacing .12em`, 11–13px |
| Max width | `1320px`, 32px gutters | `.wrap` |
| Section padding | 100–120px desktop | Generous vertical rhythm |
| Nav height | 76px, bottom hairline | Sticky |
| Radius | **0** (sharp) everywhere; **999px** pills (buttons only); logo 34×34 square | — |
| Shadows | **none** | Depth via hairlines + blocks |
| Motion | 0.15–0.2s ease on transform/background/border; `translateY(-1px)` button hover | Honor `prefers-reduced-motion` |

Self-host both fonts via `next/font` (no Google CDN in prod), `display: swap`.

## Heading scale (fluid)
Hero H1 `clamp(46px, 6vw, 90px)` (Blueprint); section H2 `clamp(34px, 4.6vw, 58px)`; card H3 21–26px;
body 18px/1.5. `text-wrap: balance` on display headings. When a highlighter span sits on its own line,
loosen `line-height` to ~1.12 and add `margin-top: .08em` so the block clears the line above.

## Signature devices (the only allowed "expressive" elements)
1. **Highlighter** `.hl` — inline solid-color block behind text, `padding: .04em .18em`, `box-decoration-break: clone`. Orange = the signal phrase; pastels (butter/sky/lilac/pink) only occasionally.
2. **Mono kicker** — uppercase JetBrains Mono label preceded by a 9px solid-orange square tick.
3. **Engineering grid** — 96×96px CSS line grid (`--line`) behind the hero and about bands.
4. **Spec rows / mono codes** — numbered module rows (`M.01`…), `IND.01` corner tags — the "spec sheet" read.
5. **Pill buttons** — `.btn--ink` / `.btn--orange` / `.btn--outline` (1px ink) / `.btn--ghost`, each with a `›` chevron; hover lifts 1px.
6. **Striped placeholders** — diagonal-hairline boxes captioned in mono, standing in for dithered/halftone robotics renders (real art replaces them; never ship a broken/placeholder image in prod — gate or use a designed empty state).

## Anti-slop (updated for Blueprint)
- One accent (orange). If a screen reads "all orange," pull back — orange is signal, the field is ink-on-paper.
- No shadows, no rounded cards, no gradients. Flat, sharp, hairline-structured.
- One sans family (Hanken Grotesk) + one mono (JetBrains Mono). No third typeface.
- Highlighter is the only expressive flourish — don't stack devices.
- Prototype mode: illustrative stats/logos/module copy are allowed for this directional build; flag them on a "pre-launch swap" list and replace before going live (esp. real-company logos).

## Brand rename
Handoff files say **"Forge"** (wordmark, `F` mark, footer). Real brand is **Axona** → global rename
`Forge → Axona`, logo mark `F → A` (square, orange).

## Benchmarks
Same craft bar (Linear / Harvey), now in a **light, technical-editorial** idiom: Stripe-docs precision,
Linear's restraint, the handoff's spec-sheet structure. The test is unchanged: *would this sit next to
linear.app / harvey.ai?* — just in the Blueprint language.

## Content (hybrid: thesis spine + ERP concreteness) + prototype traction
The hybrid content keeps Axona's thesis (AI-native OS, agentic procurement wedge, humans + machines +
agents, the compounding moat) as the **spine**, expressed through Blueprint's concrete module / industry
structure. **Prototype mode:** illustrative stats strip, logo wall, and module copy (per the handoff)
are built now to evaluate the look — kept on a `docs/pre-launch-swap.md` list and replaced/permissioned
before launch. This is a "what could it look like" build, not the production-final copy pass.
