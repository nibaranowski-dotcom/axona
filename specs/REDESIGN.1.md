# PRD: Blueprint redesign — full design adaptation (Option B → Axona)

**Status**: Ready for Dev
**Priority**: P0
**Effort**: XL (3–4 days)
**Last Updated**: 2026-06-22
**Backlog Reference**: REDESIGN.1 (epic E5 — Blueprint)

> Supersedes the v1 dark/teal/Geist homepage. The prototype (PR #23) proved the direction; **this is
> the complete spec of record** to take it to a coherent, production-grade Axona site: full design
> system, every section, content reconciled (thesis spine + ERP concreteness) and dialed to our
> *pre-launch* stage, real a11y/SEO/performance, and honest gating of placeholder traction.
> Visual source of truth: `design_handoff_axona_landing/designs/Option B - Blueprint.html` +
> `assets/base.css`. Token source of truth: `design.md` (Blueprint). Copy source: `content.md`.

## Problem Statement
The v1 site (dark, electric-teal, Geist) was structurally complete but undifferentiated, and several sections read as flat text. The chosen direction is **Option B "Blueprint"** — a light, technical-editorial system (ink-on-paper, one signature orange, Hanken Grotesk + JetBrains Mono, a 96px engineering grid, highlighter text, mono spec-rows) that makes Axona look like a real, opinionated, fundable robotics-OS company. The prototype confirmed it lands. What's missing for a coherent site: the content must be reconciled so it keeps **Axona's thesis** (AI-native OS, agentic procurement wedge, humans + machines + agents, the compounding moat) rather than the handoff's generic ERP framing; the SaaS chrome (Get a demo / Log in / Docs-API-Status) must be dialed to our **pre-launch, design-partner** reality; the Julia/recruiting surface and the request-access form must exist in the Blueprint language; and all placeholder traction must be honestly gated. This PRD specifies all of that, section by section.

## Success Metrics
| Metric | Target |
|---|---|
| Blueprint design system encoded (tokens, Hanken + JetBrains, grid/highlighter/kicker/pill/placeholder primitives) per `design.md` | 100% |
| Every section rebuilt in Blueprint; page reads as one coherent, high-craft site (no v1 remnants) | Passes design-critique vs linear/harvey bar |
| Content keeps the thesis spine (wedge = M.01; thesis = About band; humans+machines+agents throughout) | Verified |
| Chrome dialed to our stage: primary CTA "Request access", no fake "Log in"/product Docs unless gated | Verified |
| All placeholder traction (stats, logos) is striped/illustrative and listed in `docs/pre-launch-swap.md`; **zero real company named** as a customer | 0 violations |
| `Forge → Axona` everywhere; logo mark `A` (orange square) | 0 "Forge" in shipped output |
| Hero LCP = headline ≤ 2.0s; CLS ≤ 0.05; INP ≤ 200ms (throttled mobile) | In budget |
| WCAG 2.2 AA (contrast on orange + ink, focus, keyboard, semantic landmarks) | Pass |
| `pnpm build` + `tsc --noEmit` + `pnpm lint` + the verify script | All green |

## User Stories
- As a **design-partner ops leader**, I want a page that looks like a serious, specific robotics-OS company and tells me what it does (modules) and that it's for me (industries), so I request access.
- As a **prospective CTO (Julia)**, I want the thesis stated with conviction and a "build it with us" surface, so the company reads as worth joining.
- As an **investor**, I want the spec-sheet precision (modules, industries, the moat) to signal a category bet, not a tool.
- As any **visitor**, I want honesty — no fabricated customer claims masquerading as real — even in a sharp-looking site.

## Detailed Requirements — design system
| ID | Requirement | Priority |
|---|---|---|
| D1 | Encode `design.md` (Blueprint) tokens in `globals.css`: `--ink #0c0c0d`, `--paper #fff`, `--bg #fbfbf9`, `--paper-2 #f7f6f2`, `--orange #fa3c00`, `--orange-ink #c52e00`, `--line #d7d7d2`, `--line-blue #c4cae6`, pastels (pink/lilac/sky/butter). Map onto the shadcn semantic tokens. | P0 |
| D2 | Fonts via `next/font` (self-hosted, `swap`): **Hanken Grotesk** (sans, 400–900) + **JetBrains Mono** (labels). Remove Geist. Bind Tailwind `font-sans`/`font-mono`. | P0 |
| D3 | Primitives (Tailwind components / CSS): `.hl` highlighter (orange + butter/sky/lilac/pink variants), `.kicker` (mono + 9px orange square tick), `.blue-grid` (96px line grid), `.ph` striped placeholder, pill `.btn` variants (ink/orange/outline/ghost) with `›` chevron + `translateY(-1px)` hover. | P0 |
| D4 | Sharp by default (radius 0 on cards/blocks); pills only on buttons (999px); logo mark a 34px orange square. No shadows anywhere — depth via hairlines + color blocks. | P0 |
| D5 | Light is canonical; **dark mode deferred** (keep `next-themes` infra but force light; a designed-dark Blueprint is a later story — never auto-invert). | P0 |
| D6 | Type: Hanken 800 display (`-0.02em`, `line-height .98`, `text-wrap: balance`); body 18px/1.5; JetBrains Mono labels UPPERCASE `.12em` 11–13px. Heading scale per `design.md`. | P0 |
| D7 | Layout: `--maxw 1320px`, 32px gutters, sections 100–120px, nav 76px sticky w/ bottom hairline. Motion 0.15–0.2s ease; honor `prefers-reduced-motion`. | P0 |

## Detailed Requirements — sections (top → bottom)
Each section is a Server Component composed from `content/home.ts` data. Reconciliation notes mark where we **diverge from the handoff** to keep our thesis / pre-launch honesty.

### S1 · Nav (sticky)
- 76px, hairline bottom, `--bg`/paper. Left: orange **A** square mark + "Axona" wordmark (800). Center links (in-page anchors): **Platform** (`#platform`) · **Industries** (`#industries`) · **Company** (`#company`). Right: **Request access** ink pill (the one CTA).
- **Reconcile:** drop the handoff's "Log in" and "Customers" + "Get a demo" → we have no product login or customers; the single CTA is "Request access" (→ `#request-access`).

### S2 · Hero
- 2-col `1.15fr .85fr` on the `.blue-grid`, vertical hairline divider. Left: mono kicker `// AI-NATIVE OS · ROBOTICS`; H1 **"The operating system for `robotics.`"** ("robotics." = orange highlighter on its own line, line-height loosened to ~1.12 + `margin-top:.08em`); subhead (hybrid, verbatim-spirit from `content.md` hero): "Humans, machines, and agents on one system — starting with an agentic procurement & build co-pilot, with a record of every unit you ship." CTAs: **Request access** (ink pill) + **Read the thesis** (outline → `#thesis`). Micro-trust line under CTAs: "Working with a first cohort of design partners in humanoid and defense robotics." Right: `.ph` striped placeholder captioned "schematic — humans · machines · agents" (→ real dithered art, pre-launch-swap).
- **LCP** = the H1 (static, server-rendered, no blocking JS). The placeholder must not win LCP.

### S3 · Spec strip + partner row (`#customers`)
- 4-col mono spec strip (hairline-divided): key (mono) + value (800/30px). **Prototype:** illustrative values allowed but kept honest-shaped and **gated** — prefer capability facts over fake customer metrics where possible (e.g. "Humans · Machines · Agents · one system", or "Procurement → the whole operation"). If using numeric stats, they are illustrative and listed in `docs/pre-launch-swap.md`.
- Partner row: **striped placeholder logo cells only — no real company names.** Caption: "Design partners — humanoid & defense robotics (in progress)." Gated; real/permissioned logos are a pre-launch swap.
- **Reconcile:** the handoff's "2.4M robots / Boston Dynamics…" are replaced by gated/illustrative content — **never a real named customer.**

### S4 · Platform — modules (numbered spec rows, `#platform`)
- Lead: mono kicker "Platform · modules" + H2 **"Six modules. One specification for humans, machines, and agents."** Then numbered spec rows (`M.01`…, grid `80px 1fr 1.3fr 60px`, hairline rows, "VIEW →" grey→orange on hover, top border solid ink).
- **Hybrid module set** (keeps the wedge + the compounding thesis, gains ERP concreteness):
  - **M.01 Procurement** — "Agentic sourcing, RFQs, and POs — the AI proposes, a human approves, every action audited. **The wedge.**"
  - **M.02 Build genealogy** — "Per-unit BOMs, revisions, parts, serials, and firmware tied to every robot you ship."
  - **M.03 Inventory & parts** — "Components, spares, and consumables across factories and field depots."
  - **M.04 Fleet & field** — "Live status, missions, work orders, and RMA flows for every deployed unit."
  - **M.05 Quality & compliance** — "Audit trails, certifications, and safety records ready for any regulator."
  - **M.06 Memory & audit** — "Every approval, exception, and build teaches the system — operational memory that compounds. The opposite of a static ERP."
- **Reconcile:** procurement leads (our wedge); M.06 carries the compounding-moat thesis. "VIEW →" links are forward contracts (no module sub-pages yet) — resolve to `#platform`/no-op, never 404.

### S5 · Industries (3×2 bordered card grid, `#industries`)
- Lead: kicker "Industries" + H2 **"Built for the machines you make."** 3×2 `.icard` grid, mono corner tags `IND.01`…:
  - **IND.01 Humanoids** — "General-purpose platforms entering the workforce. **Where we start.**"
  - **IND.02 Defense** — "Autonomous systems for contested, high-assurance environments."
  - **IND.03 Logistics** — "AMRs, sortation, and pick fleets across distribution networks."
  - **IND.04 Manufacturing** — "Arms, cells, and AGVs on the production line."
  - **IND.05 Construction** — "Field robots and autonomous equipment on the job site."
  - **IND.06 Space** — "Hardware programs where every part and procedure is traced."
- **Reconcile:** order = our taxonomy (humanoids now → defense next → then the rest); "Where we start" marks the beachhead (the one orange accent here, optional).

### S6 · Thesis / about band (`#thesis`)
- `.blue-grid` band, bordered top+bottom ink. Left H2 **"A robotics company's workforce is humans, machines, and agents."** Right: body (verbatim from `content.md` §7) — "Horizontal ERPs model a human-only company. Axona is the AI-native operating system for all three — running the operation on proprietary robotics data and specialized models that compound with every build. A moat no horizontal incumbent can copy." CTAs: **Read the spec / Talk to us**.
- This is our core thesis — keep it verbatim. The moat clause may carry highlighter or weight emphasis.

### S7 · Company / join-us (the Julia surface, `#company`)
- New (not in the handoff). Blueprint band: kicker "Company" + H2 **"We're building the company that runs the robotics economy."** Body from `content.md` §9 (founding team, forward-deployed, intelligence spine). CTA **"Build it with us"** (→ careers/contact). **Team bios gated** — render "founding roles open" until names are confirmed (content-integrity, `[SIGN-OFF]`).

### S8 · Final CTA + request-access (`#request-access`)
- Closing band: H2 **"Get early access to Axona."** + sub "Tell us what you're building. We work with a small number of design partners at a time." The **request-access form** (CONV.1 scope may build the server action; this PRD specifies the Blueprint-styled form UI): fields Name · Work email · Company · Your role · What are you building?; sharp inputs (radius 0), pill **Request access** submit; consent checkbox; honest success copy ("Thanks — we'll be in touch within a few days. Founders read every request."). Honeypot. Secondary: **Build it with us** (→ `#company`).
- **Reconcile:** this replaces the handoff's "Get a demo" everywhere — Request access is the real conversion.

### S9 · Footer
- Full-bleed **orange**, white text, giant white **A**. Columns: **Platform** (the 6 modules) · **Industries** · **Company** (About, Careers, Contact). **Reconcile:** drop the handoff's "Developers / Docs / API / Status / Changelog" (no product yet) — or gate them. Bottom bar: "Axona, Inc. — 2026" (legal entity `[SIGN-OFF]`, gated) + "Request access ›". Legal (Privacy/Terms) + Accessibility links gated/present per current state.

## Acceptance Criteria
- [ ] Blueprint tokens + Hanken/JetBrains fonts + all primitives encoded; no Geist, no teal, no dark-default.
- [ ] All nine sections (S1–S9) built in Blueprint from `content/home.ts`; page is one coherent site; no v1 components rendered.
- [ ] Thesis spine intact: M.01 = the agentic procurement wedge; M.06 = compounding memory; About band = the thesis verbatim; "humans, machines, and agents" present in hero + modules + thesis.
- [ ] Chrome dialed to stage: primary CTA "Request access"; no "Log in"; no product Docs/API/Status unless gated; "Get a demo" appears nowhere.
- [ ] Zero real company named as a customer; stats/logos are striped/illustrative and listed in `docs/pre-launch-swap.md`; team bios gated.
- [ ] `Forge` appears nowhere in shipped output; logo is the orange `A`.
- [ ] One `<h1>` (hero); sections use `<h2>`/`<h3>`, semantic landmarks, `aria-labelledby`; spec-rows + module/industry lists are semantic lists; highlighter/grid/placeholders `aria-hidden` where decorative.
- [ ] Hero LCP = headline; Lighthouse mobile LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms; orange-on-paper + ink contrast pass AA.
- [ ] `pnpm build`, `tsc --noEmit`, `pnpm lint`, `pnpm verify src/scripts/verify-redesign-1.ts` all green; `docs/manual-checks.md` updated.

## Technical Requirements
- **Files (new Blueprint components):** `components/blueprint/site-nav.tsx`, `hero.tsx`, `spec-strip.tsx`, `partner-row.tsx`, `platform-modules.tsx`, `industries.tsx`, `thesis.tsx`, `company.tsx`, `request-access.tsx` (+ form), `site-footer.tsx`. Compose in `app/page.tsx`. Shared primitives in `components/blueprint/ui/` (Highlighter, Kicker, Pill button, StripedPlaceholder, BlueGrid wrapper) or as Tailwind classes in `globals.css`.
- **`content/home.ts`** — restructure to the Blueprint sections (nav, hero, specStrip, partners, modules[6], industries[6], thesis, company, finalCta/form, footer) with all copy; `lead`/gated flags where needed.
- **`design.md`** — already replaced with Blueprint (this PRD assumes it). `.claude/rules/design.md` updated to Blueprint (light, orange, Hanken+JetBrains, devices, dark deferred, frontend-design advisory).
- **Fonts:** add `@fontsource` or `next/font/local` for Hanken Grotesk + JetBrains Mono self-hosted; or `next/font/google` then self-host for prod. Remove `geist`.
- **`docs/pre-launch-swap.md`** — list every placeholder: hero/industry art (dithered renders), spec-strip stats, partner logos, legal entity, team bios, any module sub-page link.
- **Prune v1:** remove the dead v1 components (old hero/wedge/problem/etc.) and their verify scripts in this PR or a same-branch cleanup commit, so the repo has one design system.
- **No new heavy deps**; the form may use the existing server-action pattern (CONV.1) — if CONV.1 isn't built, the form posts to a stub/`#` and is wired in CONV.1. Mark the contract.
- **SEO:** keep per-page `metadata` (title/description/OG) — full OG image is SEO.1; ensure the placeholder title/description reflect Axona.

## UX Flow
```
Nav (Axona · Platform · Industries · Company · [Request access])
  └─ Hero (grid; "The operating system for [robotics.]"; Request access / Read the thesis; micro-trust)
       → Spec strip + striped partner row (illustrative/gated — no real customers)
       → Platform: M.01 Procurement(wedge) … M.06 Memory & audit (compounding)
       → Industries: IND.01 Humanoids(where we start) … IND.06 Space
       → Thesis band: "humans, machines, and agents … a moat no incumbent can copy"
       → Company / join-us (Julia surface; bios gated → "founding roles open")
       → Final CTA + request-access form (#request-access; Build it with us → #company)
       → Orange footer (giant A; Platform/Industries/Company; legal gated)
JS off → full page renders (static); forms degrade to a mailto/stub until CONV.1
```

## Edge Cases
| Case | Handling |
|---|---|
| Real-company logos / fabricated stats | Never ship real names; stats illustrative + gated in pre-launch-swap. |
| "Get a demo"/"Log in" chrome implies a product | Reconciled to "Request access"; no login; product Docs/API gated or dropped. |
| Module "VIEW →" / footer links with no destination | Forward contracts — resolve in-page/no-op, never 404. |
| Hero placeholder art wins LCP | Constrain it; the H1 is the LCP element (verify in Lighthouse). |
| Orange reads as "flood" (footer + CTAs + highlighter) | Orange = signal; the footer block is the one large orange moment by design; elsewhere keep it to CTA + highlighter + ticks. |
| Team bios not confirmed | Render "founding roles open"; never a fabricated name. |
| Dark-mode toggle present but Blueprint is light | Force light; keep infra; a designed-dark is a later story. |
| `prefers-reduced-motion` | Disable the 1px hover lifts / transitions; static render intact. |

## Out of Scope
- Real dithered/halftone imagery (placeholders now; art is a pre-launch swap).
- Module sub-pages, Docs/API/Status, customer case studies, pricing.
- The request-access **server action / Resend** wiring (CONV.1) — this PRD builds the form UI + contract; CONV.1 wires the backend.
- Full OG image generation + sitemap/JSON-LD (SEO.1/SEO.2).
- A designed dark Blueprint theme (deferred).
- Real legal entity, team bios, partner logos (gated `[SIGN-OFF]`).

## Dependencies
| Dependency | Status | Blocks |
|---|---|---|
| `design.md` (Blueprint) + `.claude/rules/design.md` | done (this redesign) | Tokens/rules |
| Hanken Grotesk + JetBrains Mono (next/font) | to add | All type |
| `content.md` (hybrid copy) | done (source) | All copy |
| Prototype PR #23 | open (reference) | Starting point — fold its work in or rebuild cleanly |
| CONV.1 (request-access backend) | todo | Form submission (UI ships now with a stub contract) |
| Real art / logos / legal / bios | `[SIGN-OFF]` | pre-launch swap (not blocking the prototype) |

## Implementation Plan
**Day 1 — system + shell.** Encode Blueprint tokens + fonts in `globals.css`; build the primitives (highlighter, kicker, grid, pill, placeholder); Site Nav + Footer; `Forge→Axona`, `A` mark. Prune v1 component imports from `app/page.tsx`.
**Day 2 — hero + platform + industries.** Hero (grid, highlighter, CTAs, LCP-safe); the 6 module spec-rows (hybrid copy); the 3×2 industries grid. `content/home.ts` restructured.
**Day 3 — thesis + company + spec strip + request-access.** Thesis band (verbatim); Company/join-us (bios gated); spec strip + striped partner row (gated); request-access form (Blueprint inputs + consent + honest states; stub contract).
**Day 4 — reconcile + gate.** `docs/pre-launch-swap.md`; remove dead v1 files + old verify scripts; a11y (contrast, focus, landmarks, reduced-motion); Lighthouse (LCP/CLS/INP); `verify-redesign-1.ts`; `tsc`/`lint`/`build`; manual-checks. Build on `redesign/blueprint` → PR; Joe reviews rendered.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-redesign-1.ts   (or: npx tsx src/scripts/verify-redesign-1.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying REDESIGN.1 — Blueprint adaptation\n');
  const fs = await import('fs');
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const css = fs.existsSync('app/globals.css') ? read('app/globals.css') : '';
  const content = fs.existsSync('content/home.ts') ? read('content/home.ts') : '';
  const page = fs.existsSync('app/page.tsx') ? read('app/page.tsx') : '';

  // DESIGN SYSTEM
  await check('orange token #fa3c00 present', () => /#fa3c00/i.test(css));
  await check('ink/paper tokens present', () => /#0c0c0d/i.test(css) && /#fbfbf9/i.test(css));
  await check('Hanken Grotesk wired', () => /Hanken/i.test(css + content + page) || /hanken/i.test(read('app/layout.tsx')));
  await check('JetBrains Mono wired', () => /JetBrains/i.test(css + page) || /jetbrains/i.test(read('app/layout.tsx')));
  await check('no Geist remnants', () => !/geist/i.test(css + page + read('app/layout.tsx')));
  await check('highlighter + grid primitives', () => /\.hl|highlight/i.test(css) && /blue-grid|96px/i.test(css));

  // CONTENT — thesis spine + reconciliation
  const all = content + page;
  await check('hero headline (operating system for robotics)', () => /operating system for/i.test(all) && /robotics/i.test(all));
  await check('humans, machines, and agents present', () => /humans, machines, and agents/i.test(all));
  await check('M.01 procurement = the wedge', () => /procurement/i.test(all) && /wedge/i.test(all));
  await check('compounding / moat thesis present', () => /compound/i.test(all) && /moat/i.test(all));
  await check('Request access CTA (not Get a demo / Log in)', () => /request access/i.test(all) && !/get a demo/i.test(all) && !/\blog in\b/i.test(all));

  // INTEGRITY
  await check('no real customer names', () => !/(Boston Dynamics|Figure|Agility|Locus|Symbotic|Zipline)/i.test(all));
  await check('no "Forge"', () => !/\bForge\b/.test(all));
  await check('pre-launch-swap doc exists', () => fs.existsSync('docs/pre-launch-swap.md'));

  // STRUCTURE
  await check('one <h1> on the page', () => ((page + Object.keys({})).match(/<h1\b/g) || (read('components/blueprint/hero.tsx')||'').match(/<h1\b/g) || []).length >= 1);
  await check('sections wired in page', () => /#platform|Platform/i.test(page) && /#industries|Industries/i.test(page));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## REDESIGN.1 — Blueprint adaptation
- [ ] Whole page reads as one coherent Blueprint site at the linear/harvey bar (design-critique).
- [ ] Thesis intact: M.01 = agentic procurement wedge; About band = the thesis; M.06 = compounding memory.
- [ ] CTAs are "Request access" everywhere; no "Get a demo"/"Log in"; no product Docs/API unless gated.
- [ ] No real company named as customer; stats/logos striped/illustrative + in pre-launch-swap; bios gated.
- [ ] "Forge" appears nowhere; logo is the orange A.
- [ ] Lighthouse mobile: LCP element = hero headline, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms.
- [ ] AA contrast on orange (CTA, highlighter, footer) + ink/paper, both confirmed.
- [ ] Keyboard: skip link, focus rings, nav + form operable; reduced-motion respected.
- [ ] Mobile ~360px: hero stacks, spec-rows collapse, module/industry grids reflow, footer 2-col; no overflow.
- [ ] JS off: full page renders; request-access form degrades gracefully (stub until CONV.1).
```

## Common Mistakes to Avoid
- **Reverting to generic ERP positioning.** Keep the thesis spine: procurement is the *wedge* (M.01), the moat/compounding is explicit (M.06 + thesis band), "humans, machines, and agents" runs through. The handoff's plain ERP copy is the starting structure, not the message.
- **Shipping real customer names or fabricated metrics as real.** Striped placeholders + illustrative-and-gated only; the verify script fails on Boston Dynamics/Figure/etc.
- **Leaving SaaS chrome that implies a live product.** No "Log in", no "Get a demo", no Docs/API/Status unless gated. Primary CTA is "Request access".
- **"Forge" leaks.** Global rename to Axona; `A` logo. Verify the rendered HTML.
- **Orange flood.** Orange is signal: CTA, highlighter, ticks, the one footer block. If a viewport reads all-orange, pull back.
- **Letting the placeholder art win LCP.** The hero `<h1>` is the LCP element — constrain the striped placeholder; verify in Lighthouse.
- **Leaving v1 components in the tree.** Prune them so there's one design system; stale components confuse future work and the gate.
- **Forgetting the gates.** Light-canonical but still WCAG 2.2 AA (orange contrast!), CWV in budget, semantic landmarks, reduced-motion.

## Build Rules for This Story
- `design.md` (Blueprint) + `.claude/rules/design.md` are authoritative; the frontend-design skill is advisory and loses on any conflict (one Hanken family + one JetBrains mono, one orange accent, flat/sharp, no gradients/second-font/"aesthetic risk").
- Content keeps Axona's thesis spine; copy verbatim from `content.md` where it exists; zero banned words; pre-launch honesty (gated traction, design-partner framing, bios gated).
- Tokens only; no inline hex in components (only in `globals.css` token definitions); no raw Tailwind color utilities.
- Performance + a11y + SEO gates hold (LCP=headline, AA contrast on orange, semantic landmarks, per-page metadata).
- Build on `redesign/blueprint`; **do not auto-merge** — Joe reviews rendered, then merge via `gh`. Prune v1 in the same PR or an immediate follow-up.
- Precedence: where this PRD and `design.md`/`content.md` differ, those sources win — flag in one line.

## Rollback Plan
The redesign lives on `redesign/blueprint`; `main` keeps v1 until merge. To revert post-merge: `git revert` the merge (v1 components are pruned in this PR, so a revert restores them) or re-merge a `main@v1` tag. Pure presentation + content — no data, no schema, no migrations. **Zero data risk.**
