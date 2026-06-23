# Manual checks (browser verification)

Cowork/Claude Code reads this after Claude Code implements a story, then runs the checks in a browser.
Joe appends a block per story. Keep newest at the bottom.

## SETUP.0 — repo sanity (seed)

- [ ] `pnpm dev` runs; homepage renders with no console errors.
- [ ] Dark theme is the default; light toggle works and is designed (not auto-inverted).
- [ ] No raw hex / Tailwind color utilities in components (tokens only).
- [ ] `tsc --noEmit` clean.

## SETUP.1 — verify-latest pass / pinned versions

- [ ] CLAUDE.md "Verified stack (pinned 2026-06-21)" block reads cleanly and names Next 16, shadcn New York + radix-ui, WCAG 2.2 AA, Node ≥ 20.
- [ ] Changelog one-liner is present and dated.
- [ ] No package.json / app code was added in this story (docs-only).
- [ ] Spot-check one source link still resolves (Next.js releases, shadcn changelog, or W3C WCAG).

## SETUP.2 — Next.js scaffold

- [ ] `pnpm dev` serves `/` with the placeholder ("Axona — scaffold"); no console errors.
- [ ] `pnpm build` completes with Turbopack; `pnpm start` serves the production build.
- [ ] `pnpm typecheck` and `pnpm lint` are clean (0 errors; lint emits 3 pre-existing warnings from the verify-script `check` helper).
- [ ] `pnpm verify src/scripts/verify-setup-2.ts` passes; verify-setup-1 and -5 still run under the new `verify` script.
- [ ] View source: Geist is applied (hashed `geistsans_…_variable` class on `<html>`, not a system fallback); no visible font swap/CLS on reload.
- [ ] `pnpm dlx shadcn@latest add card` pulls `radix-ui` (unified), not `@radix-ui/react-*`.
- [ ] `git status` confirms no existing doc/spec/tooling file was modified by the scaffold.
- [ ] NOTE (version drift): shadcn CLI v4 (2026) replaced named styles with presets — `components.json` reads `"style": "radix-nova"` (the Geist/Lucide Nova preset, New York's successor on the unified `radix-ui` base). CLAUDE.md still says "New York"; reconcile the label on the next verify pass / in SETUP.3.

## SETUP.5 — autonomous build loop

- [ ] `node scripts/build-loop.mjs --dry-run` prints the correct next story + the Joe/Builder prompts (and the branch/PR plan), and writes nothing.
- [ ] `--once` on a mechanical story: branch `auto/<id>` created off `main`, PRD written, implemented, gate green, row flipped to done, commit + push + PR opened.
- [ ] The PR targets `main`, its body links the spec + run log, and it is NOT merged by the loop.
- [ ] `main` has no new commits from the run — all work is on the `auto/<id>` branch / PR.
- [ ] With `gh` logged out AND no `GITHUB_TOKEN` (or a dirty working tree), the loop fails fast before building (no orphan commits).
- [ ] A push rejected by branch protection writes `logs/build-loop/<id>.push.fail.log`, stops, and never pushes `main`.
- [ ] A forced gate failure retries ≤ maxRetries, then stops with a .fail.log and leaves the row todo (branch kept, no PR).
- [ ] A [human-gate] story halts the loop without invoking the Builder.
- [ ] Drop the files into a second repo, edit only loop.config.json, and --dry-run resolves a story there too (portability).
- [ ] Branch protection on `main` is enabled (require PR + review; block direct pushes) — recommended backstop.

## SETUP.3 — design tokens + theming

- [ ] Dark is the default with no stored choice; switching OS appearance flips the site (prefers-color-scheme honored).
- [ ] Toggle overrides OS, persists across reloads, and there is NO flash of the wrong theme on reload.
- [ ] Toggle is reachable by keyboard, shows a visible teal focus ring, and has a sensible aria-label; respects reduced-motion.
- [ ] Teal reads as a single signal (CTA/focus) — no screen "looks teal"; surfaces are near-monochrome.
- [ ] Spot-check contrast (DevTools/axe): body text ≥ 4.5:1, teal UI element ≥ 3:1, in BOTH themes.
- [ ] `pnpm dlx shadcn@latest add card` pulls `radix-ui` (unified) and matches the radix-vega look.
- [ ] Run design-critique on the PR: does the themed proof page feel at home next to linear.app? Dark designed, not inverted?

## SETUP.4 — app shell (nav + footer + a11y statement)

- [ ] `pnpm dev` serves `/` inside the shell: sticky header (wordmark, Product/How it works/Company, theme toggle, "Request access"), page body, footer — no console errors.
- [ ] Scroll down: a 1px hairline fades in under the header; scroll back to top: it fades out. The header never jumps/changes height (no CLS). Confirm in DevTools Performance there's no per-frame scroll handler.
- [ ] Tab from page load: the FIRST focus is "Skip to content"; activating it moves focus into `<main>` and the next Tab lands inside the content (not back in the nav).
- [ ] Every visible nav/footer link goes somewhere real (homepage anchors or `/accessibility`). Legal links (Privacy/Terms) render as muted, non-clickable "coming soon" — no dead `#`.
- [ ] Resize to mobile (< 768px): the inline nav collapses to a menu button; opening traps focus, Escape closes, and a link tap closes the sheet. Keyboard-operable throughout.
- [ ] `/accessibility` renders its own `<h1>`, names WCAG 2.2 AA, lists measures + known limitations, and shows the "contact coming soon" placeholder (no fabricated email). View source: `<title>`, meta description, canonical, and OG tags are present.
- [ ] Both themes: teal still reads as a single signal (the one CTA + focus rings); header/footer borders are hairlines, not shadows. Contrast spot-check passes (axe) in light and dark.
- [ ] Sign-off still pending (rendered as placeholders, not invented): legal entity + registered address, Privacy/Terms URLs, public accessibility email, social links.

## HOME.1 — hero

- [ ] Lighthouse (mobile, throttled): LCP element is the H1, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms.
- [ ] Disable JS in DevTools → reload: headline, subhead, CTAs, and a static motif all render; CTAs are clickable.
- [ ] Toggle prefers-reduced-motion → the axon pulse stops animating (renders at rest); everything else intact.
- [ ] Tab order: skip-link → header → hero CTAs, each with a visible teal focus ring; "Request access" and "See how it works" scroll to their anchors (no 404).
- [ ] Both themes: dark (near-black) and light are designed; teal appears only as the motif pulse + primary CTA.
- [ ] Mobile width (~360px): no horizontal scroll, no layout shift; headline remains the dominant element.
- [ ] design-critique on the PR: does the hero feel at home next to linear.app / harvey.ai? Is the motif restraint, not decoration?

## HOME.3 — product / wedge

- [ ] Heading, three cards, and trust line read verbatim from content.md; no banned words.
- [ ] The mock shows propose → approve → audit with all five audit fields (inputs, output, model, confidence, approver).
- [ ] "Sample data — illustrative" is clearly visible on the mock; no real/implied customer, supplier, person, or metric anywhere (content-integrity check).
- [ ] Disable JS → cards, trust line, and the full audit trail still render; any stepper degrades gracefully.
- [ ] Keyboard: any interactive element in the mock is reachable with a visible teal focus ring; decorative icons are aria-hidden.
- [ ] Both themes: the dense panel is legible on near-black and white; teal appears only as the approve action / active step — the panel does not read "teal."
- [ ] Mobile (~360px): audit fields stack into labeled rows, no overflow, no layout shift.
- [ ] design-critique on the PR: does this hit the Harvey/Hebbia trust-and-density bar?

## HOME.2 — the problem section

- [ ] Heading and body read verbatim from content.md §2; no banned words, no paraphrase.
- [ ] Disable JS in DevTools → reload: the heading and body fully render (no interactivity needed).
- [ ] Section sits between the hero and the wedge; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Both themes: dark (near-black) and light are designed; body contrast passes AA; the section reads near-monochrome (no teal fill).
- [ ] Mobile (~360px): heading wraps cleanly, body keeps a readable measure, no horizontal scroll, no layout shift.
- [ ] Reading the page top-down — category (hero) → pain (problem) → proof (wedge) — the narrative holds.
- [ ] design-critique on the PR: does an ops leader read this and think "that's my week"? Restraint, not decoration?

## HOME.6 — thesis

- [ ] Heading + body read verbatim from content.md §7; no banned words; no invented metric/claim.
- [ ] Reads as a deliberate editorial statement — strong type hierarchy, generous measure/rhythm — not a flat paragraph or a boxed callout.
- [ ] Disable JS → the full thesis renders.
- [ ] At most one subtle teal accent; section reads near-monochrome in both themes; body contrast passes AA.
- [ ] Mobile (~360px): heading scales down a step, measure holds, no overflow, no layout shift.
- [ ] design-critique on the PR: does this land the category argument with the weight it deserves, at the linear/harvey bar?

## HOME.4 — how it works (4-layer architecture)

- [ ] Heading + all four layers (Foundation, Intelligence spine, Domain apps, Vertical editions) read verbatim from content.md §4; no banned words, no fifth layer, no invented example.
- [ ] The diagram reads as a real stacked architecture (Foundation at the base → Vertical editions on top), not a gradient/shadow flowchart or a default-font diagram.
- [ ] Disable JS in DevTools → reload: the full heading, all four layers, and the static motif render.
- [ ] Click the nav "How it works" link → it scrolls to this section (#how-it-works is no longer a dead link).
- [ ] Section sits between the wedge and the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the four layers are announced in stack order as a list with each layer named; the signal motif is silent (decorative).
- [ ] Token-driven: inspect element — colors/borders/radius/motif come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; the teal signal reads correctly on both; descriptions pass AA; section reads near-monochrome (one accent on the spine/signal).
- [ ] prefers-reduced-motion on: any signal-line pulse renders static.
- [ ] Mobile (~360px): bands wrap full-width, descriptions keep a readable measure, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does Julia read this and see a platform with a defensible intelligence spine, at the linear/harvey bar?

## HOME.4B — three pillars (redesign v2)

- [ ] Reads as a structured section: three bordered panels (bg-card + hairline), items as chips, NOT a flat text list.
- [ ] The Primitives → Domains → Verticals composition is visually clear (monochrome arrow connective between/through the panels).
- [ ] "Procurement (the wedge)" and "Humanoids (first)" are the teal-signalled chips (outlined); no third teal element; section reads near-monochrome.
- [ ] Heading + framing line + all items verbatim from content.md §5; the → arrows render correctly (no mojibake). (Note: the §5 prose connective "then" is dropped from the Domains chips per v2 R3 — chips are items, not prose.)
- [ ] Both themes designed; chips pass AA contrast; disable JS → full section renders.
- [ ] Mobile (~360px): panels stack, the connective rotates to a downward chevron, chips wrap, no overflow, no layout shift.
- [ ] Section keeps its place (after How it works, before Why now); page still has exactly one <h1> (the hero), heading here is <h2> with <h3> per panel.
- [ ] design-critique: does it now sit at the same bar as the hero/wedge?

## HOME.5 — why now (3 points)

- [ ] Heading + all three points (robotics inflecting · buildable substrate today · forward-deployed) read verbatim from content.md §6; no banned words, no added/removed/reordered point, no invented metric, date, or market-size number.
- [ ] The section reads as a calm three-point timing thesis, not gradient cards, drop shadows, big fake stats, emoji bullets, or a centered template.
- [ ] Disable JS in DevTools → reload: the full heading and all three points render.
- [ ] Section sits between the pillars and the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the three points are announced in order as an ordered list; any "1/2/3" marker is decorative (order comes from the list, not color alone).
- [ ] Token-driven: inspect element — colors/borders/radius/any accent come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; any teal accent reads correctly on both; points pass AA; section reads near-monochrome (one accent at most).
- [ ] prefers-reduced-motion on: any stagger/fade renders static.
- [ ] Mobile (~360px): points stack to one column, each keeps a readable measure, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does an a16z partner read this and see a deliberate "why now," at the linear/harvey bar?

## HOME.7 — who it's for (verticals strip + buyer/champion framing)

- [ ] Heading, the Now/Next/Then verticals strip (humanoids · defense · logistics, industrial, space), and the buyer/champion line read verbatim from content.md §8; no banned words, no added/removed/reordered vertical, stage, or role.
- [ ] The section reads as a calm verticals strip + roles line, not a customer-logo wall, gradient persona cards, emoji icons, or a centered template.
- [ ] Disable JS in DevTools → reload: the full heading, strip, and buyer/champion line render.
- [ ] Section sits after the thesis; page has exactly one <h1> (the hero), heading here is <h2>.
- [ ] Screen-reader / tab-walk: the three stages are announced in order as an ordered list; the buyer/champion line is announced as a labeled pair; the live "Now" is conveyed by the word "Now", not color alone.
- [ ] Token-driven: inspect element — colors/borders/radius/Now-accent come from CSS variables/tokens; no inline hex, no raw Tailwind color utilities.
- [ ] Both themes: dark (near-black) and light are designed; the teal "Now" marker reads correctly on both; copy passes AA; section reads near-monochrome (one accent on Now).
- [ ] No customer/partner logo, named entity, count, or metric appears anywhere in the section.
- [ ] prefers-reduced-motion on: any Now-marker highlight renders static.
- [ ] Mobile (~360px): stages stack to one column (Now → Next → Then), the buyer/champion line wraps, no horizontal scroll, no layout shift.
- [ ] design-critique on the PR: does a VP of Ops at a humanoid maker self-identify in one scan, and does an a16z partner read a deliberate beachhead sequence — at the linear/harvey bar?

## HOME.9 — final CTA band

- [ ] Heading + sub + button labels read verbatim from content.md §10; no banned words.
- [ ] Heading is an <h2>; the rendered page still has exactly one <h1> (the hero).
- [ ] The band is the last thing in <main>, after "Who it's for".
- [ ] hero/nav "Request access" scrolls to this band (#request-access); "Build it with us" → #company; neither 404s.
- [ ] Disable JS → band renders, buttons clickable.
- [ ] Both themes: calm, near-monochrome; teal only on the primary button; no CLS at mobile width.

## V2.1 — request-access form

- [ ] Hero email capture submits → success state + founder email + confirmation email (with a valid RESEND_API_KEY, sandbox sender OK).
- [ ] Closing form: all fields, consent required, validation errors show + focus the first error.
- [ ] Honeypot: filling the hidden field results in silent success, no email.
- [ ] Submitting state (Sending…/disabled) and a retryable error state both render; forcing a failure never dead-ends or 500s.
- [ ] RESEND_API_KEY unset → graceful message, no crash.
- [ ] Keyboard + screen reader: labelled fields, announced errors, focus management; privacy link present.
- [ ] Styled in v2 (lime submit, sharp inputs), both the hero capture and closing form.
- [ ] JS disabled → native POST still submits and returns a result.
