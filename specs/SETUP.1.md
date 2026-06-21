# PRD: Run "verify latest" pass; pin Next.js / shadcn / model / WCAG versions in CLAUDE.md

**Status**: Ready for Dev
**Priority**: P0
**Effort**: S (2–3 hrs)
**Last Updated**: 2026-06-21
**Backlog Reference**: SETUP.1

## Problem Statement
The brief was written June 2026 and pins no concrete versions; every downstream story (scaffold, tokens, shell, sections) inherits whatever majors we assume here. If we scaffold against a stale Next.js major or a deprecated shadcn style, we eat a migration mid-build. This story freezes the verified current versions into `CLAUDE.md` so Claude Code builds against a known-good target and every later PRD can reference pinned numbers instead of guessing. Hit: the whole build; cost: silent drift, rework, and a site that fails its own "would this feel at home next to linear.app" bar on fundamentals.

## Verified findings (live check, 2026-06-21)
| Item | Finding | Decision |
|---|---|---|
| **Next.js** | Stable major is **16** (GA Oct 2025). Current stable **16.2.7**; **16.2.9 LTS** (June 2026). Turbopack default for dev+build, React 19.2, Cache Components, min **Node 20**, App Router unchanged. | Pin **Next.js 16** (track 16.2.x LTS). Node ≥ 20. |
| **shadcn/ui** | **New York** style current. Feb 2026: New York imports the unified **`radix-ui`** package, not individual `@radix-ui/react-*`. shadcn **MCP server** works out of the box with any shadcn-compatible registry. | Pin **shadcn New York**, unified `radix-ui` dep, use shadcn MCP registry. |
| **WCAG** | **2.2** is the current W3C Recommendation (since Oct 2023). WCAG **3.0** is still an early Working Draft (Mar 2026 draft; Rec ~2028–2030). | Keep target at **WCAG 2.2 AA**. No change. |
| **Claude models** | Current: **Opus 4.8** (`claude-opus-4-8`), **Sonnet 4.6** (`claude-sonnet-4-6`), **Haiku 4.5** (`claude-haiku-4-5-20251001`). | Record for reference. Only binds if a story adds live model calls — none currently do (HOME.3 mock uses sample data). |
| **Core Web Vitals** | Google "good" thresholds stable: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms. | Repo budgets (**LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms**) are stricter — keep them. No conflict. |

## Success Metrics
| Metric | Target |
|---|---|
| Versions pinned in CLAUDE.md (Next major, shadcn style, WCAG, Node) | 4/4 present |
| One-line changelog of what changed vs. June-2026 brief | Present |
| Downstream PRDs can cite a pinned number without re-verifying | Yes |
| `pnpm verify src/scripts/verify-setup-1.ts` | Passes |

## User Stories
- As **Claude Code**, I want exact pinned majors in CLAUDE.md so that I scaffold against a known-good target with no mid-build migration.
- As **Joe**, I want a recorded verified-versions block so that later PRDs reference pinned numbers instead of re-deriving them.
- As **Nicolas**, I want a one-line "what changed" note so that I can trust the brief is current without re-checking sources.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Add a `## Verified stack (pinned YYYY-MM-DD)` block to CLAUDE.md with the table above's decisions | P0 | Single source other PRDs cite |
| R2 | Update the Tech-stack section: Next.js → "Next.js 16 (App Router, Turbopack default, Node ≥ 20)" | P0 | Replace "pin majors at build" hand-wave |
| R3 | Note shadcn New York + unified `radix-ui` package + shadcn MCP registry | P0 | Prevents per-package radix drift |
| R4 | Confirm WCAG 2.2 AA stays (no bump to 3.0); leave rules files unchanged | P0 | 3.0 not a Recommendation |
| R5 | Record current model strings as reference-only; note they bind only on stories with live calls | P1 | No demo currently calls a model |
| R6 | Add a one-line changelog entry noting the verify pass date + what changed | P0 | Auditability |
| R7 | No code scaffolding in this story | P0 | Pure docs; scaffold is SETUP.2 |

## Acceptance Criteria
- [ ] CLAUDE.md contains a `## Verified stack (pinned 2026-06-21)` block naming Next.js 16, shadcn New York + `radix-ui`, WCAG 2.2 AA, Node ≥ 20.
- [ ] Tech-stack line for Next.js no longer says "pin majors at build" unqualified — it names 16.
- [ ] A one-line changelog records the pass and that nothing in the stack needed a major correction.
- [ ] Model strings recorded with the "binds only on live-call stories" caveat.
- [ ] No new dependencies installed, no app code created.
- [ ] `pnpm verify src/scripts/verify-setup-1.ts` passes.
- [ ] `docs/manual-checks.md` updated with the SETUP.1 block.

## Technical Requirements
- **Edit only:** `CLAUDE.md` (workspace root). Add the verified-stack block near the existing "Tech stack" section; add the changelog line at the bottom (create a `## Changelog` section if absent).
- **Create:** `src/scripts/verify-setup-1.ts` (the verification script below). This is the first file in `src/scripts/`; create the dir.
- **Create/append:** `docs/manual-checks.md` (create if absent) with the SETUP.1 block.
- **No** `package.json`, no installs, no `app/` or `components/` changes. `pnpm verify` is assumed to run a TS file via tsx/ts-node — if the runner isn't wired yet, the script must still be executable with `npx tsx src/scripts/verify-setup-1.ts`; document that in the PR.
- This story is intentionally docs-only so SETUP.2 scaffolds against frozen targets.

## UX Flow
```
Claude Code reads SETUP.1
        │
        ▼
Open CLAUDE.md ──► add "Verified stack (pinned 2026-06-21)" block
        │
        ▼
Update Next.js tech-stack line (→ 16) ──► note shadcn NY + radix-ui ──► confirm WCAG 2.2 AA
        │
        ▼
Append one-line changelog ──► record model strings (reference-only)
        │
        ├─ versions already current? ──► changelog notes "no major correction"
        └─ a version drifted?        ──► update the line + changelog notes the delta
        │
        ▼
Create src/scripts/verify-setup-1.ts ──► append docs/manual-checks.md
        │
        ▼
pnpm verify ──► PASS ──► done
```

## Edge Cases
| Case | Handling |
|---|---|
| Next.js patch ticks past 16.2.9 before scaffold | Fine — we pin the **major** (16), not the patch. SETUP.2 takes latest 16.x. |
| `pnpm verify` runner not yet configured (no package.json) | Script must run via `npx tsx`; note the fallback in the PR. Don't add a package.json in this story. |
| WCAG 3.0 promoted to Recommendation later | Out of scope now; revisit only on a future verify pass. Rules stay 2.2 AA. |
| A later story adds a live model call (e.g., a real demo) | The recorded model strings become binding then; that story pins the exact string. |
| Someone edits CLAUDE.md concurrently | Block is additive (new section), low merge-conflict risk; rebase if needed. |

## Out of Scope
- Scaffolding Next.js, installing shadcn, or any dependency install (that's SETUP.2).
- Encoding tokens / Tailwind theme (SETUP.3).
- Any `app/`, `components/`, or `content/` files.
- Bumping rules files to WCAG 3.0.
- Wiring a live model call or demo backend.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| Live web access to confirm versions | Done (verified 2026-06-21, findings above) | This story's findings |
| `src/scripts/` runner (tsx/ts-node) | Deferred | Only the `pnpm verify` alias; `npx tsx` works regardless |

## Implementation Plan
**Single session (~2–3 hrs):**
1. Add `## Verified stack (pinned 2026-06-21)` block to CLAUDE.md from the findings table.
2. Edit the Next.js tech-stack line → "Next.js 16 (App Router, Turbopack default, Node ≥ 20)".
3. Add shadcn New York + `radix-ui` + shadcn MCP note; confirm WCAG 2.2 AA unchanged.
4. Record model strings (reference-only) + add the one-line changelog.
5. Create `src/scripts/verify-setup-1.ts`; run it; fix until green.
6. Append SETUP.1 block to `docs/manual-checks.md`.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-setup-1.ts   (or: npx tsx src/scripts/verify-setup-1.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.1 — verify-latest pass / pinned versions\n');
  const fs = await import('fs');
  const claude = fs.readFileSync('CLAUDE.md', 'utf8');

  // VERIFIED-STACK BLOCK
  await check('CLAUDE.md has a "Verified stack (pinned" block', () => /##\s*Verified stack \(pinned/i.test(claude));
  await check('Pins Next.js 16', () => /Next\.js\s*16\b/.test(claude));
  await check('Notes Turbopack default', () => /Turbopack/i.test(claude));
  await check('Pins Node >= 20', () => /Node\s*(>=|≥)\s*20/.test(claude));
  await check('Pins shadcn New York', () => /New York/i.test(claude) && /shadcn/i.test(claude));
  await check('Notes unified radix-ui package', () => /radix-ui/i.test(claude));
  await check('Confirms WCAG 2.2 AA', () => /WCAG\s*2\.2\s*AA/i.test(claude));
  await check('Records a current model string', () => /claude-(opus-4-8|sonnet-4-6|haiku-4-5)/i.test(claude));

  // CHANGELOG
  await check('Has a Changelog entry dated 2026-06-21', () => /##\s*Changelog/i.test(claude) && /2026-06-21/.test(claude));

  // MANUAL CHECKS
  const manual = fs.existsSync('docs/manual-checks.md') ? fs.readFileSync('docs/manual-checks.md', 'utf8') : '';
  await check('docs/manual-checks.md has SETUP.1 block', () => /##\s*SETUP\.1/i.test(manual));

  // NEGATIVE: no premature scaffolding
  await check('No package.json created by this story', () => !fs.existsSync('package.json'));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## SETUP.1 — verify-latest pass / pinned versions
- [ ] CLAUDE.md "Verified stack (pinned 2026-06-21)" block reads cleanly and names Next 16, shadcn New York + radix-ui, WCAG 2.2 AA, Node ≥ 20.
- [ ] Changelog one-liner is present and dated.
- [ ] No package.json / app code was added in this story (docs-only).
- [ ] Spot-check one source link still resolves (Next.js releases, shadcn changelog, or W3C WCAG).
```

## Common Mistakes to Avoid
- **Scaffolding anyway.** This story is docs-only. Do not run `create-next-app` or `shadcn init` — that's SETUP.2. Adding a package.json fails the verify script on purpose.
- **Pinning a patch instead of a major.** Pin Next.js **16**, not 16.2.7 — patches will move before SETUP.2 runs.
- **Reintroducing per-package radix.** New York now uses the unified `radix-ui` package; don't write `@radix-ui/react-*` into the brief.
- **Bumping to WCAG 3.0.** It's a Working Draft, not a Recommendation. Target stays 2.2 AA across all rules files.
- **Making model strings binding.** Record them reference-only. The marketing site has no live model call yet (HOME.3 is sample data); don't add an AI SDK dependency here.
- **Editing rules files.** Nothing in `.claude/rules/*` needs changing — the verify pass confirmed current targets. Leave them.

## Build Rules for This Story
- Marketing-site flavor: Joe's generic SaaS defaults (org_id scoping, requireRole, server-action mutations, Inngest) **do not apply** — this story adds no auth/DB/jobs. Omitting them by design.
- Tokens/SEO/CWV/a11y build rules don't bind here — no `app/` or `components/` output. They bind from SETUP.2 onward.
- Source of truth precedence holds: where this PRD and Joe's defaults differ, this PRD wins.
- Content integrity: the verified-stack block states facts only; no invented version claims — every pinned number traces to the 2026-06-21 sources below.

## Rollback Plan
Revert the CLAUDE.md edits (verified-stack block + changelog line), delete `src/scripts/verify-setup-1.ts`, and remove the SETUP.1 block from `docs/manual-checks.md`. No dependencies installed, no app code, no schema. **Zero data risk.**
