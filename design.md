# design.md — Axona Website Design System (single source of truth)

This file is authoritative for tokens. `CLAUDE.md` and `.claude/agents/joe.md` defer to it. Put
these in code as CSS variables / Tailwind theme — **never hardcode hex in components**. Confirm
`prefers-color-scheme` support from day one. Aligned with Joe's Design System Defaults so the two
never drift (accent = electric teal, font = Geist).

## Seven principles
1. **Restraint over decoration.** One accent used as signal (status, focus, primary action), never as paint. Near-monochrome surfaces.
2. **Typography is the interface.** Hierarchy from weight + size, not color or boxes. Geist variable, intentional weights, tight tracking on headings.
3. **Density with air.** High information density on a consistent 4px rhythm with generous line-height.
4. **Dark mode is designed, not inverted.** True near-black canvas, layered elevation via surface steps + 1px hairline borders, not heavy shadows.
5. **Motion is functional.** 120–240ms, custom easing; transitions clarify state. No decorative bounce. Honor `prefers-reduced-motion`.
6. **Make the complex feel effortless.** Remove friction; keyboard-friendly; command palette where it fits.
7. **Design with intention.** Every element deliberate. Where trust matters (agent actions), show the reasoning — citations, sources, a visible paper trail.

## Tokens

| Token | Dark | Light | Notes |
|---|---|---|---|
| Font (body) | Geist Variable | Geist Variable | One family. Geist Mono for code / field-keys / part numbers. |
| Optional editorial serif | — | — | A quality serif allowed for large editorial headings only. |
| Type scale (px) | 12 · 13 · 14 · 16 · 20 · 24 · 32 · 48 | same | Body 14–16. Headings tracking −0.01 to −0.02em. |
| Weights | 400 · 510 · 590 · 680 | same | Hierarchy via weight, Linear-style. |
| Spacing base | 4px grid (4·8·12·16·24·32·48·64) | same | Everything snaps to it. |
| Radius | 8 controls · 12 cards · full pills | same | Consistent, restrained. |
| Canvas (`--background`) | `#09090B` | `#FFFFFF` | Dark = near-black, never pure black. |
| Surface / elevated (`--card` / `--popover`) | `#0F0F12` / `#16181B` | `#FAFAFB` / `#FFFFFF` | Elevation via surface steps, not shadow. |
| Border hairline (`--border`) | `#1F2226` | `#E6E6E8` | 1px. Borders do the work shadows would. |
| Text / muted (`--foreground` / `--muted-foreground`) | `#EDEDEF` / `#9A9DA3` | `#16181B` / `#6B7177` | Maintain ≥ 4.5:1 on body. |
| **Accent (`--primary`)** | electric teal `hsl(199 95% 55%)` | `hsl(199 89% 48%)` | **The one signal color.** CTAs, focus rings, active state, the hero signal motif. Never as fill paint. |
| Accent foreground | `#04141A` | `#FFFFFF` | Readable text on the teal. |
| Motion | 120 / 180 / 240ms · `cubic-bezier(.2,0,0,1)` | same | Spring for overlays; reduced-motion fallback. |

## Usage rules (enforced in `.claude/rules/design.md`)
- Always use semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`,
  `border-border`, `bg-primary`) — never raw Tailwind color utilities, never inline hex.
- The teal accent appears at most once or twice per viewport. If a screen looks "teal," it's wrong.
- Dark is the default theme; light is fully designed, not auto-inverted.

## Motif (Axona = *axon*, the nerve fiber that carries signal)
A single restrained "signal" idea: a thin teal line/pulse traveling a near-monochrome circuit or
node graph — used once in the hero and echoed subtly (focus rings, the active step in flows).
Never literal robots, never stock AI imagery, never particle-soup backgrounds.

## What to steal from each benchmark
Linear: near-black canvas, one accent, dense Geist type, buttery 150–250ms transitions.
Harvey: enterprise trust — visible citations/paper-trail, "complex made effortless."
Hebbia: the grid/matrix paradigm — show dense repetitive work as a spreadsheet, not a chat bubble.
Sana: calm content-first knowledge/agent surfaces. Legora: refined dense tables that still feel light.
DevRev: unified workspace + command palette. v0/V7: production-grade component craft.
