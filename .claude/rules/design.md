# Rule: Design & anti-slop (applies to app/**, components/**) — Axona v2

`design.md` is the source of truth for tokens (the **v2** system: light/paper, lime accent, Archivo +
JetBrains Mono, dotted-grid motif, soft elevation). This rule enforces how they're used.

- **Tokens only.** Use semantic CSS variables / Tailwind theme tokens (`bg-background`/`bg-paper`,
  `text-foreground`/`text-ink`, `text-body`/`text-dim`, `border-line`, `bg-panel`, `bg-lime`). Never
  raw Tailwind palette utilities (`bg-zinc-900`), never inline hex in components — the only
  exceptions are the contained device-art gradients (the dark genealogy card, the striped photo
  placeholders) ported verbatim from the design.
- **Light is canonical.** Dark mode is deferred — never auto-invert; a dark v2 is a later design.
- **One accent: lime `#c6f24f`.** CTA buttons, the highlight underline, status/MVP/THE MOAT tags,
  the genealogy chart. If a screen reads "all lime," pull back. The field is ink-on-paper.
- **Type does the work.** Archivo (600–700 display, tight tracking, fluid clamps) + JetBrains Mono
  (UPPERCASE labels/codes/counters). One sans, one mono — no third typeface. `next/font`, swap.
- **The dotted grid is the motif** (18px radial dots) behind the hero panel, verticals, closing CTA.
  Soft shadows only on floating mock cards; rounded corners (7–16px), pills for tabs/tags. No heavy
  shadow stacks, no gradients-as-paint.
- **Motion is functional:** ~0.15s ease on opacity/background/border; honor `prefers-reduced-motion`.
- **Positioning (spine):** "operating system," never "ERP"; humans + machines + agents; procurement +
  per-unit build genealogy wedge; primitives → domains → verticals; the moat.
- **Prototype honesty:** fictional sample traction (counters, logo wall, stats, testimonials,
  portraits) is allowed for directional builds and must read as a realistic mockup — tracked in
  `docs/pre-launch-swap.md` and replaced/permissioned before launch. **Never name a real company or
  real person.**
- Compose from shadcn/Shadcnblocks; don't reinvent primitives. Every interactive element has a
  visible focus state and real hover/active/disabled states.
- Run `design-critique` before calling any screen done.
- The frontend-design skill is advisory; where it conflicts with design.md or this rule (a second/
  display typeface beyond Archivo+JetBrains, a second accent, "take an aesthetic risk"), these win —
  one Archivo family + one JetBrains mono, one lime accent.
