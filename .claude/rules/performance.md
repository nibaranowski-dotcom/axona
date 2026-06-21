# Rule: Performance / Core Web Vitals (applies to app/**, components/**)

- SSG/ISR by default. Mark interactive leaves `"use client"`; keep the tree mostly Server Components.
- **No render-blocking JS on the hero.** The LCP element (hero headline/visual) renders from static
  HTML/CSS. Defer/lazy non-critical JS.
- Budgets on a throttled mid-tier mobile: **LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms.** Fail = not done.
- Images via `next/image` with explicit `sizes`; reserve space to prevent CLS. Prefer SVG/AVIF/WebP.
- Self-host fonts (Geist) via `next/font` with `display: swap`; no FOUT/CLS from web fonts.
- No heavy client libraries for things CSS can do. Animations are transform/opacity only, 120–240ms.
- Verify with Lighthouse (mobile) + a real CWV read before merge; record numbers in the PR.
