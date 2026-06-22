Joe wrote the PRD. Here's the summary:

**File:** `specs/SETUP.4.md`

**What it specs** — the global app shell, composed once in `app/layout.tsx`:
- Sticky `<header>` Nav with Linear-style **hairline-on-scroll**
- Skip-to-content link → `<main id="main" tabIndex={-1}>`
- `<footer>` with legal + accessibility links
- A real `/accessibility` statement page (WCAG 2.2 AA conformance, known limitations, contact)

**Key engineering decisions:**
- **CLS-safe hairline** — border animates `transparent → --border` (never adds height); scroll detected via an IntersectionObserver sentinel (off-main-thread), not per-frame React state, to protect INP.
- **Server-first** — header/footer are Server Components; only `header-scroll`, `mobile-nav`, and `nav-links` (for `aria-current`) are `"use client"`. No render-blocking JS on the future hero.
- **Content-as-props** — all nav/footer copy lives in `content/site.ts` (CMS-ready); verify script greps for hardcoded labels and dead `#` anchors.
- **Tokens from `design.md`** — hairline `--border`, accent `--primary` on CTA + focus only, motion 180ms / `cubic-bezier(.2,0,0,1)`. Verify bans inline hex + raw Tailwind colors.

**Needs your sign-off** (rendered as `TODO[sign-off]`, not fabricated):
- Legal entity name + registered address
- Real Privacy Policy / Terms URLs (Legal links stay disabled until they exist)
- Public accessibility contact email
- Any social links

Every nav/footer destination maps to a real backlog story (HOME.3/4/8, CONV.1) or this PRD — nothing invented. Correctly gated on SETUP.3, and the filename/conventions match the existing SETUP PRDs.

One scope note Joe flagged: the shell ships **no `<h1>`** (assigned to HOME.1) to preserve the one-per-page rule; the `/accessibility` page carries its own.

Want me to open `specs/SETUP.4.md` for review, or hand it to Claude Code to implement?