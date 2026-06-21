# Rule: Accessibility (applies to app/**, components/**)

Target: **WCAG 2.2 AA** (confirm current version in the "verify latest" pass).

- Contrast ≥ 4.5:1 body / 3:1 large text and UI; verify the teal accent on near-black and on white.
- Full keyboard operability: logical tab order, visible focus rings (never `outline: none` without a
  replacement), skip-to-content link, no keyboard traps.
- Semantic elements first; ARIA only to fill gaps. Forms have associated `<label>`s, error text tied
  via `aria-describedby`, and inline validation that's announced.
- Respect `prefers-reduced-motion`; provide non-motion equivalents.
- Images: meaningful `alt` or empty for decorative. Icons that convey meaning have accessible names.
- Run `accessibility-review` as a gate before merge; fix all AA findings.
