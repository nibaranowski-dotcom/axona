# Axona Website — Master Brief (IA + sections)

Read with `../CLAUDE.md`, `../design.md`, and `content/messaging.md`. This defines *what each page
must achieve*; Joe turns each backlog story into an implementable PRD.

## Goal & audiences
Make Axona feel like a real, category-defining company in under 30 seconds. Priority audiences:
1. **Design partners** — humanoid/defense robotics ops leaders (VP/Head of Ops, Supply Chain).
2. **Prospective CTO (Julia White)** + founding hires — credible vision, team, and a "join us" pull.
3. **Investors** skimming for craft and seriousness.

Primary conversions: **Request access** (design partners) and **secondary** "We're building the
founding team" / careers contact (talent). One sitewide CTA style; teal, used as signal only.

## Sitemap (v1)
- `/` Homepage (the priority — most stories target this)
- `/company` Vision + team + careers pull (the Julia surface)  ·  `/careers` (or anchor on /company)
- `/product` deeper wedge explainer (can start as homepage anchors, promote to page later)
- `/privacy`, `/terms`, accessibility statement (footer)
- Later: `/blog` or `/notes` (founder POV — strong recruiting + SEO asset)

## Homepage sections (top → bottom)
1. **Nav** — wordmark "Axona", links (Product, Why now, Company), `Request access` (primary).
   Sticky, hairline border on scroll. Keyboard accessible; theme toggle.
2. **Hero** — H1: *The operating system for robotics companies.* Subhead: humans + machines +
   agents on one system; the wedge is an agentic procurement & build co-pilot. Primary CTA
   `Request access`, secondary `See how it works`. The "axon signal" motif (one teal pulse along a
   node graph). No render-blocking JS; LCP = the headline. Mock product glimpse allowed, marked.
3. **The problem** — robotics makers scale ops on spreadsheets, email, and human-era ERPs: long-lead
   parts, BOM churn, per-unit traceability, fielded-fleet uptime — by hand, slowing ramps. Framed as
   the thesis (no fabricated stats; quantify with partners later).
4. **The product / wedge** — agentic procurement & build co-pilot: AI drafts POs/RFQs, flags supply
   risk, tracks per-unit build genealogy; **human approves; the system remembers and improves.**
   Visual: a Hebbia-style dense matrix OR a Harvey-style agent action with a visible citation/paper
   trail (propose → approve → audit). Clearly-marked sample data.
5. **How it works** — the 4-layer architecture: Foundation (data/connectors/ontology) → Intelligence
   spine (specialized models + memory + agents) → Domain apps → Vertical editions. Calm diagram.
6. **The three pillars** — Primitives × Domains × Verticals (the core model, "as framed to Julia").
   Build primitives once → compose into domain workflows → package per vertical. Calm three-column
   layout; the 4-layer architecture (§5) is the technical implementation, this is how it scales.
7. **Why now** — robotics inflection + cheap specialized models + forward-deployed GTM. Three tight points.
8. **The thesis / our secret** — a robotics company's workforce is humans + machines + agents; the
   OS that models all three, tuned on proprietary robotics data, wins the category. The moat: data →
   models + memory that compound per build. (This is the section that resonates with a model-research CTO.)
9. **Who it's for** — verticals strip: Humanoids (now) → Defense (next) → Logistics, Industrial,
   Space. Buyer/champion framing.
10. **Company / join us** — short vision + "founding team forming, building the category — we're
   hiring founders." This is the Julia pull. Team bios gated/mocked until confirmed (see content rule).
11. **Final CTA** — `Request access` + `Build it with us` (talent). Honest expectation-setting.
12. **Footer** — nav, legal, accessibility statement, contact, consent controls.

## Request-access form (conversion)
Fields: name, work email, company, role, what they're building (short). Server action → Resend
notification to founders + confirmation email. Honest copy on what happens next. Spam honeypot;
consent checkbox. No DB needed v1 (email only); add storage only if volume warrants.

## Out of scope (v1)
Pricing page, customer logos/case studies, live product demo/login, blog CMS, multi-language. Add as
real evidence and content arrive. No Clerk/Supabase/Stripe/Inngest unless a story requires them.

## Definition of done — see ../CLAUDE.md. The bar: *would this sit comfortably next to linear.app
or harvey.ai?* If not, it isn't done.
