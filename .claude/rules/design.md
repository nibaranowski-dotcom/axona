# Rule: Design & anti-slop (applies to app/**, components/**) — Blueprint

`design.md` is the source of truth for tokens (the **Blueprint** system: light/paper, signature
orange, Hanken Grotesk + JetBrains Mono). This rule enforces how they're used.

- **Tokens only.** Use semantic CSS variables / Tailwind theme tokens (`bg-background`/`bg-paper`,
  `text-foreground`/`text-ink`, `text-muted-foreground`, `border-border`/`border-line`,
  `bg-primary`/`bg-orange`, `text-orange-ink`). Never raw Tailwind color utilities (`bg-zinc-900`,
  `text-blue-500`), never inline hex in components.
- **Light is canonical.** The Blueprint is designed light (ink on paper). **Dark mode is deferred** —
  keep the toggle infra, but never auto-invert; a dark Blueprint is a later, deliberate design.
- **One accent: signature orange (`#fa3c00`).** The single brand signal — logo mark, highlighter,
  primary CTA, hover, the kicker tick. If a screen reads "all orange," pull back. The field is
  ink-on-paper; orange is signal.
- **Flat & sharp. Depth from hairlines + color blocks, never shadows.** No drop shadows, no gradients.
  Rectangles by default — **radius 0** on cards/blocks/placeholders; **pills (`999px`) only for
  buttons**; the logo mark is a square.
- **Type does the work.** Hanken Grotesk (800 display, tight tracking, fluid clamp headlines) + body
  400–600/18px; JetBrains Mono for labels/kickers/codes (UPPERCASE, `.12em` tracking). One sans, one
  mono — **no third typeface**. Self-host both via `next/font`, `display: swap`.
- **Signature devices (the only expressive moves):** the highlighter (`.hl` solid block behind a key
  phrase — orange for the signal phrase, pastels rarely), the mono kicker (with orange square tick),
  the 96px engineering grid, numbered spec rows / mono codes (`M.01`, `IND.01`), pill buttons with a
  `›` chevron, striped placeholders. **Don't stack devices** — the highlighter is the one flourish.
- **Motion is functional:** 0.15–0.2s ease on transform/background/border; `translateY(-1px)` button
  hover only. Honor `prefers-reduced-motion`.
- **Anti-slop bans:** no shadows, no rounded cards, no gradients, no purple-gradient-on-white, no
  center-everything template, no emoji-as-icons, no third typeface. One accent (orange), flat & sharp.
- **Prototype honesty:** illustrative stats/logos/module copy are allowed for directional builds, but
  must read as a realistic mockup and be tracked in `docs/pre-launch-swap.md` and replaced before
  launch (esp. real-company logos — trademark + implied endorsement).
- Compose from shadcn/Shadcnblocks; don't reinvent primitives. Every interactive element has a
  visible focus state and real hover/active/disabled states.
- Run `design-critique` before calling any screen done.
- The frontend-design skill is advisory; where it conflicts with design.md or this rule (gradients, a
  second/display typeface beyond Hanken+JetBrains, "take an aesthetic risk"), these win — one Hanken
  family + one JetBrains mono, one orange accent, flat/sharp restraint.