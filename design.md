# design.md — Axona Website Design System · **v2** (redesign, supersedes v1)

Authoritative token source for the Axona v2 direction (ported from the "Axona v2" design project,
`Homepage.dc.html` + its tokens). **Replaces the prior dark / electric-teal / Geist system** and the
Blueprint experiment. Where this file and any skill (e.g. frontend-design) differ, **this file wins**.

## What changed (one line)
Dark→**light**, teal→**lime `#c6f24f`**, Geist→**Archivo + JetBrains Mono**, near-monochrome→light
paper with a **dotted-grid motif** and **soft elevation** (subtle shadows are allowed in v2, unlike
the flat Blueprint). Dark mode deferred (light-canonical; never auto-invert).

## Seven principles
1. **Technical-but-warm.** Archivo display + JetBrains Mono labels; reads like a precise product, not a brochure.
2. **One accent: lime `#c6f24f`.** The single brand signal — CTA buttons (lime on ink text), highlight underline, status/"THE MOAT"/"MVP" tags, the in-build genealogy chart. Never floods a viewport.
3. **Light paper field.** `#fff` canvas, `#f4f3ef` panels, `#0a0a0a` ink for the announce bar + footer + primary text on lime.
4. **The dotted grid is the motif.** A `radial-gradient` dot grid (18px) behind the hero panel, verticals, and closing CTA — the v2 signature texture. Don't add competing motifs.
5. **Type does the work.** Archivo 600–700 display, fluid clamps, tight tracking (−0.03 to −0.045em on big headings); JetBrains Mono UPPERCASE labels/codes/counters.
6. **Soft elevation, rounded forms.** Subtle shadows on floating mock cards; rounded corners (7–16px) on cards/panels; pills for tabs/tags. Depth is gentle, not heavy.
7. **Directional prototype now; honest at launch.** This build evaluates the look — fictional sample traction (a parts counter, logo wall, agent stats, testimonials/portraits, "40hrs") is allowed and must read as a realistic mockup. **Hard line: no real company or real person named** (v2's samples are fictional, so fine). Track every fabricated item in `docs/pre-launch-swap.md` and replace/permission before launch.

## Tokens (from the v2 design project)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0a0a0a` | Announce bar, footer, primary text on lime, marks |
| `--paper` | `#ffffff` | Default surface |
| `--panel` | `#f4f3ef` | Panels / cards / dotgrid bands |
| `--chip` | `#f2f2ee` | Mono chips (counters, stat values) |
| **`--lime`** | **`#c6f24f`** (hover `#bce83f`) | **The one accent** |
| `--text` / `--body` / `--dim` | `#111` / `#6b6b63` / `#9a9a90` | Heading / body / secondary text |
| `--line` / `--line2` | `#ededed` / `#e7e7e1` | Hairline borders |
| `--ok` / `--okbg` | `#1f9e6f` / `#e9f7f0` | "Auto-applied" / approved status |
| Font (sans) | **Archivo** 400–700 | Display + body |
| Font (mono) | **JetBrains Mono** 400/500 | Labels, codes, counters — UPPERCASE, `.06–.08em` |
| Max width | `1180px`, 28px gutters | `.wrap` |
| Dotgrid | `radial-gradient(#d9d8d2 1.1px, transparent 1.1px)` @ 18px | The motif |
| Motion | 0.15s ease on opacity/background/border; honor `prefers-reduced-motion` | — |

Self-host both fonts via `next/font`, `display: swap`.

## Positioning (the spine — non-negotiable)
**"Operating system,"** never "ERP," as the primary descriptor. Lead with **humans + machines +
agents**; the wedge is **procurement + per-unit build genealogy**; keep **primitives → domains →
verticals** and **the moat** (intelligence & agent spine on proprietary data). Reconciled from the
design copy (which said "ERP") per the handoff PRD.

## Anti-slop (v2)
- One accent (lime). If a screen reads "all lime," pull back — lime is signal, the field is ink-on-paper.
- One sans (Archivo) + one mono (JetBrains). No third typeface.
- The dotted grid is the one texture; soft shadows only on floating cards. No heavy shadow stacks, no gradients-as-paint (the two dark mock gradients are deliberate, contained device art).
- Prototype mode: fictional sample traction allowed, tracked on the pre-launch-swap list; never a real named company/person.

## Benchmark
Same craft bar (Linear / Harvey / Ramp-class marketing), in a **light, lime-accented, dotted-grid**
idiom. The test is unchanged: would this sit next to linear.app / harvey.ai?
