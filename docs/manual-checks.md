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
