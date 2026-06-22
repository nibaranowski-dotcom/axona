# Rule: Design & anti-slop (applies to app/**, components/**)

`design.md` is the source of truth for tokens. This rule enforces how they're used.

- **Tokens only.** Use semantic CSS variables / Tailwind theme tokens (`bg-background`,
  `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`). Never raw Tailwind
  color utilities (`bg-zinc-900`, `text-blue-500`), never inline hex.
- **One accent.** Electric teal appears at most once or twice per viewport, as signal only (primary
  CTA, focus ring, active state, the hero motif). If a screen looks "teal", it's wrong.
- **Dark is default and designed.** Light theme is fully designed, never auto-inverted. Both respect
  `prefers-color-scheme` and a manual toggle.
- **Type does the work.** Hierarchy from Geist weight/size + tight heading tracking, not color/boxes.
- **Elevation via surface steps + 1px hairline borders**, not drop shadows on everything.
- **Motion is functional:** 120/180/240ms, `cubic-bezier(.2,0,0,1)`, transform/opacity only, honor
  `prefers-reduced-motion`. No bounce, no parallax soup.
- **Anti-slop bans:** no purple-gradient-on-white, no center-everything template, no emoji-as-icons
  (use a real icon set, e.g. lucide), no shadow-on-everything, no default font with no intent.
- Compose from shadcn/Shadcnblocks; don't reinvent primitives. Every interactive element has a
  visible focus state and real hover/active/disabled states.
- Run `design-critique` before calling any screen done.
- The frontend-design skill is advisory; where it conflicts with design.md or this rule (gradients, a second/display typeface, "take an aesthetic risk"), these win — one Geist family, one teal accent, restraint.
