# Axona v2 — Launch backlog (active)

Supersedes the old `backlog.md` HOME.\* sprint (that was the v1 dark/teal design, now pruned). The
v2 homepage (lime · Archivo · dotted-grid) is built and on `main` as a **directional prototype**.
This backlog is the path from prototype → a site you'd actually launch. Source of fabricated items to
fix: `docs/pre-launch-swap.md`. Status: todo / wip / done.

## Epic E5 — v2 → launchable

| #   | StoryID | Title                                                                                                                                                               | Pri | Size | Status | Notes                                                                                |
| --- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ---- | ------ | ------------------------------------------------------------------------------------ |
| 1   | V2.1    | **Request-access form → server action → Resend** (wire the hero + closing email captures; validation, honeypot, consent, success/error)                             | P0  | L    | todo   | The site has no working conversion today — forms are visual-only. Highest-value gap. |
| 2   | V2.2    | **SEO.1** — per-page metadata + OG image + canonical (`axonahq.com`) + Organization JSON-LD; `sitemap.ts` + `robots.ts`                                             | P0  | M    | todo   | `NEXT_PUBLIC_SITE_URL=https://axonahq.com`                                           |
| 3   | V2.3    | **Traction reconcile** — work `pre-launch-swap.md`: reframe/cut the fabricated counters & stats (7.4M parts, 1,200 teams, 3.2×, 40hrs) to honest pre-launch framing | P0  | M    | todo   | Required before public launch; OK to leave illustrative while private                |
| 4   | V2.4    | **Chrome → stage** — dial Sign in / Pricing / See a demo / Customers to our pre-launch reality (Request access; drop product chrome we can't back)                  | P1  | S    | todo   | Decide how aspirational to stay                                                      |
| 5   | V2.5    | **Real art** — replace striped placeholders / `[CUSTOMER PHOTO]` / logo wall with real/dithered art or designed empty states                                        | P1  | M    | todo   | Never ship a broken/placeholder image live                                           |
| 6   | V2.6    | **CONV.2** — analytics (GA4/Plausible) + GDPR/CCPA consent banner; gate events on consent                                                                           | P1  | M    | todo   | —                                                                                    |
| 7   | V2.7    | **A11y pass** (WCAG 2.2 AA) — contrast on lime, focus, keyboard, landmarks, reduced-motion; accessibility-review gate                                               | P0  | M    | todo   | v2 was a fast build; needs the audit                                                 |
| 8   | V2.8    | **Perf / CWV pass** — Lighthouse mobile green; hero headline = LCP; no CLS                                                                                          | P0  | M    | todo   | —                                                                                    |
| 9   | V2.9    | **Deploy on Railway (auto-deploys from main)** + `axonahq.com` + Namecheap DNS; PR previews → production                                                            | P0  | M    | todo   | Railway watches `main`; point `axonahq.com` at Railway via Namecheap DNS             |
| 10  | V2.10   | **Legal/launch gate** — trademark clearance (Axona vs Axon), legal entity name, Privacy/Terms, accessibility contact                                                | P0  | S    | todo   | The `[SIGN-OFF]` items; do before public                                             |

## Suggested order (to a privately-shippable, then public site)

**Private-shippable (send the link to a partner/Julia):** V2.1 form → V2.2 SEO → V2.7 a11y → V2.8 perf → V2.9 deploy.
**Then public:** V2.3 traction reconcile → V2.4 chrome → V2.5 real art → V2.6 analytics → V2.10 legal.

Rationale: a working form + clean metadata + a11y/perf + a real URL gets you a link you can send _now_
(fabricated traction is fine while it's a private/direct share). The honest-traction + legal pass is
what's required before it's _public_.
