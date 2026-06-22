# Axona Website — Backlog (Joe's CPRD source)

Each row → feed Joe as `CPRD "<row>"` to get a Claude Code-ready PRD; save it to `specs/<StoryID>.md`,
then have Claude Code implement. Build top-down; respect dependencies. Status: todo / wip / done.

Field order (Joe's trigger): **position · Epic · Track · StoryID · Title · Priority · Size · Status · Effort · Dependencies**

## Epics
- **E0 Foundation** (Setup) — repo, stack verify, tokens, layout shell, theming.
- **E1 Homepage** (Web) — the sections from `website-brief.md`.
- **E2 Content & SEO** (Web) — metadata, OG, sitemap, structured data, MDX content model.
- **E3 Conversion** (Web) — request-access form, analytics, consent.
- **E4 Launch** (Web) — a11y, performance/CWV, design-critique gate, deploy.

## Backlog (readable)

| # | Epic | StoryID | Title | Pri | Size | Status | Deps |
|---|---|---|---|---|---|---|---|
| 1 | E0 | SETUP.1 | Run "verify latest" pass; pin Next.js/shadcn/model/WCAG versions in CLAUDE.md | P0 | S | done | — |
| 2 | E0 | SETUP.2 | Scaffold Next.js (App Router) + Tailwind + shadcn (New York); Geist via next/font | P0 | M | done | SETUP.1 |
| 3 | E0 | SETUP.3 | Encode design.md tokens as CSS variables + Tailwind theme; light/dark + toggle | P0 | M | done | SETUP.2 |
| 4 | E0 | SETUP.4 | App shell: Nav (sticky, hairline-on-scroll) + Footer (legal, a11y statement) | P0 | M | done | SETUP.3 |
| 4b | E0 | SETUP.5 | Autonomous build loop: Builder subagent + headless runner + gate hooks (planner⇄builder handoff) | P1 | L | done | SETUP.2 |
| 5 | E1 | HOME.1 | Hero: H1 + subhead + dual CTA + "axon signal" motif; LCP-safe, no blocking JS | P0 | M | done | SETUP.4 |
| 6 | E1 | HOME.2 | The problem section | P1 | S | done | SETUP.4 |
| 7 | E1 | HOME.3 | Product/wedge: 3 cards + Harvey-style propose→approve→audit mock (sample data) | P0 | L | done | SETUP.4 |
| 8 | E1 | HOME.4 | How it works: 4-layer architecture diagram (calm, token-driven) | P1 | M | done | SETUP.4 |
| 8b | E1 | HOME.4B | Three pillars (Primitives × Domains × Verticals): calm three-column section | P1 | S | done | SETUP.4 |
| 9 | E1 | HOME.5 | Why now (3 points) | P2 | S | todo | SETUP.4 |
| 10 | E1 | HOME.6 | The thesis / "our secret" section | P1 | S | done | SETUP.4 |
| 11 | E1 | HOME.7 | Who it's for: verticals strip + buyer/champion framing | P2 | S | todo | SETUP.4 |
| 12 | E1 | HOME.8 | Company / join-us section (Julia surface); bios gated until confirmed [human-gate] | P1 | M | todo | SETUP.4 |
| 13 | E1 | HOME.9 | Final CTA band | P1 | S | todo | HOME.1 |
| 14 | E2 | SEO.1 | Per-page metadata + OG image gen + canonical; Organization JSON-LD | P0 | M | todo | SETUP.2 |
| 15 | E2 | SEO.2 | sitemap.ts + robots.ts; MDX content model (CMS-ready) | P1 | M | todo | SEO.1 |
| 16 | E3 | CONV.1 | Request-access form → server action → Resend; honeypot, consent, success/error states | P0 | L | todo | SETUP.4 |
| 17 | E3 | CONV.2 | Analytics (GA4/Plausible) + GDPR/CCPA consent banner; gate events on consent | P1 | M | todo | SETUP.4 |
| 18 | E4 | LAUNCH.1 | A11y pass (WCAG 2.2 AA) + accessibility-review gate [human-gate] | P0 | M | todo | HOME.* |
| 19 | E4 | LAUNCH.2 | Performance/CWV pass to budget (Lighthouse mobile green) [human-gate] | P0 | M | todo | HOME.* |
| 20 | E4 | LAUNCH.3 | design-critique gate vs linear/harvey bar; anti-slop check; Vercel deploy [human-gate] | P0 | M | todo | LAUNCH.1, LAUNCH.2 |

## Copy-paste CPRD triggers
Paste any one of these to Joe verbatim:

```
CPRD "1E0SetupSETUP.1Run verify-latest pass; pin Next.js/shadcn/model/WCAG versions in CLAUDE.mdP0Stodo1—"
CPRD "2E0SetupSETUP.2Scaffold Next.js App Router + Tailwind + shadcn New York; Geist via next/fontP0Mdone3Needs SETUP.1"
CPRD "3E0SetupSETUP.3Encode design.md tokens as CSS variables + Tailwind theme; light/dark + toggleP0Mtodo3Needs SETUP.2"
CPRD "4E0SetupSETUP.4App shell: sticky Nav (hairline-on-scroll) + Footer (legal, a11y statement)P0Mtodo3Needs SETUP.3"
CPRD "4bE0SetupSETUP.5Autonomous build loop: Builder subagent + headless runner + gate hooks (planner-builder handoff)P1Ldone8Needs SETUP.2"
CPRD "5E1WebHOME.1Hero: H1 + subhead + dual CTA + axon-signal motif; LCP-safe, no blocking JSP0Mtodo3Needs SETUP.4"
CPRD "6E1WebHOME.2The problem sectionP1Stodo1Needs SETUP.4"
CPRD "7E1WebHOME.3Product/wedge: 3 cards + Harvey-style propose-approve-audit mock (sample data)P0Ltodo5Needs SETUP.4"
CPRD "8E1WebHOME.4How it works: 4-layer architecture diagram (token-driven)P1Mtodo3Needs SETUP.4"
CPRD "8bE1WebHOME.4BThree pillars (Primitives x Domains x Verticals): calm three-column sectionP1Stodo2Needs SETUP.4"
CPRD "9E1WebHOME.5Why now (3 points)P2Stodo1Needs SETUP.4"
CPRD "10E1WebHOME.6The thesis / our-secret sectionP1Stodo1Needs SETUP.4"
CPRD "11E1WebHOME.7Who it's for: verticals strip + buyer/champion framingP2Stodo1Needs SETUP.4"
CPRD "12E1WebHOME.8Company / join-us section (Julia surface); bios gated until confirmedP1Mtodo3Needs SETUP.4"
CPRD "13E1WebHOME.9Final CTA bandP1Stodo1Needs HOME.1"
CPRD "14E2WebSEO.1Per-page metadata + OG image gen + canonical; Organization JSON-LDP0Mtodo3Needs SETUP.2"
CPRD "15E2WebSEO.2sitemap.ts + robots.ts; MDX content model (CMS-ready)P1Mtodo3Needs SEO.1"
CPRD "16E3WebCONV.1Request-access form -> server action -> Resend; honeypot, consent, statesP0Ltodo5Needs SETUP.4"
CPRD "17E3WebCONV.2Analytics + GDPR/CCPA consent banner; gate events on consentP1Mtodo3Needs SETUP.4"
CPRD "18E4WebLAUNCH.1A11y pass WCAG 2.2 AA + accessibility-review gateP0Mtodo3Needs HOME.*"
CPRD "19E4WebLAUNCH.2Performance/CWV pass to budget (Lighthouse mobile green)P0Mtodo3Needs HOME.*"
CPRD "20E4WebLAUNCH.3design-critique gate vs linear/harvey bar; anti-slop; Vercel deployP0Mtodo3Needs LAUNCH.1+2"
```

## Suggested first sprint (to a sendable site for Julia)
SETUP.1 → SETUP.2 → SETUP.3 → SETUP.4 → HOME.1 → HOME.3 → HOME.6 → HOME.8 → SEO.1 → LAUNCH.2 →
LAUNCH.3. That yields a hero, the wedge, the thesis, and the join-us surface — the four things that
make Axona land with a prospective CTO — deployed and fast. Fill the remaining sections next.
