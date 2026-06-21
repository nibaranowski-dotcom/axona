# PRD: Scaffold Next.js (App Router) + Tailwind + shadcn (New York); Geist via next/font

**Status**: Ready for Dev
**Priority**: P0
**Effort**: M (4–6 hrs)
**Last Updated**: 2026-06-21
**Backlog Reference**: SETUP.2

## Problem Statement
There is no application yet — only docs, specs, and the build-loop tooling. Nothing renders, `pnpm build` doesn't exist, and the gate every story depends on (`pnpm verify` + `tsc --noEmit`) can't actually run. Until the project is scaffolded against the SETUP.1-pinned stack, every downstream story (tokens, shell, hero, sections) is blocked and the autonomous loop is dormant. This story stands up a minimal, production-grade Next.js 16 App Router app with Tailwind, shadcn (New York), and self-hosted Geist — and wires the `pnpm` scripts so the gate runs end-to-end. It deliberately ships **no design tokens and no real content** (those are SETUP.3 and the HOME.* stories); the bar here is "a clean, typed, building skeleton that the rest of the repo can grow into."

## Success Metrics
| Metric | Target |
|---|---|
| `pnpm install` completes clean (no peer/engine errors) | Pass |
| `pnpm dev` boots; `pnpm build` succeeds (Turbopack) | Pass |
| `tsc --noEmit` clean; `pnpm lint` clean | 0 errors |
| `pnpm verify src/scripts/verify-setup-2.ts` runs and passes | Pass |
| shadcn initialized New York + unified `radix-ui` on first component add | Verified |
| Geist + Geist Mono self-hosted via `next/font`, no layout shift from fonts | Verified |
| Existing repo files (CLAUDE.md, specs/, .claude/, src/scripts/, loop tooling) preserved | 100% |

## User Stories
- As **Claude Code**, I want a typed, building Next.js skeleton so that every later story has a place to add routes, components, and content.
- As the **build loop**, I want `pnpm verify` and `tsc --noEmit` to exist and run so that the gate is real, not theoretical.
- As **Joe**, I want shadcn (New York) and Geist wired the way `design.md` assumes so that SETUP.3 only has to drop in tokens, not re-plumb the toolchain.

## Detailed Requirements
| ID | Requirement | Priority | Notes |
|---|---|---|---|
| R1 | Next.js **16** App Router, TypeScript (strict), Tailwind, ESLint; **`app/` at repo root** (not `src/app`) | P0 | Matches CLAUDE.md "Structure"; keep `src/scripts/` for verify scripts |
| R2 | `pnpm` as package manager; `packageManager` field + `.nvmrc`/`engines` Node ≥ 20 | P0 | SETUP.1 pinned Node ≥ 20 |
| R3 | Scripts: `dev`, `build`, `start`, `lint`, `typecheck` (`tsc --noEmit`), `verify` (runs a `.ts` via `tsx`) | P0 | `pnpm verify <path>` must work — `"verify": "tsx"` + `tsx` devDep |
| R4 | shadcn init **New York** style, CSS variables on, base color neutral; via shadcn MCP registry/CLI | P0 | Adding a component must pull unified `radix-ui`, not `@radix-ui/react-*` |
| R5 | Self-host **Geist** + **Geist Mono** via `next/font` (the `geist` package), exposing `--font-geist-sans` / `--font-geist-mono`; `display: swap` | P0 | Wired in `app/layout.tsx`; no FOUT/CLS |
| R6 | Minimal `app/layout.tsx` + `app/page.tsx` placeholder; semantic `<html lang="en">`, one `<main>`, a single non-slop placeholder | P0 | Real hero is HOME.1; keep it boring but clean, tokens-agnostic |
| R7 | Path alias `@/*`; `lib/utils.ts` (`cn`) from shadcn init | P1 | Standard shadcn wiring |
| R8 | **Do not** add Clerk, Supabase, Stripe, Inngest, an AI SDK, or any analytics/CMS yet | P0 | Out of scope per CLAUDE.md; re-add only when a story needs them |
| R9 | Preserve all existing files; reconcile (don't clobber) `README.md`, `.gitignore`, `tsconfig` if the scaffolder wants to overwrite | P0 | Repo is non-empty — this is the main hazard |
| R10 | No design tokens, no theme colors, no dark-mode work here | P0 | That's SETUP.3 — leave shadcn's default globals as a placeholder, clearly a placeholder |

## Acceptance Criteria
- [ ] `pnpm install` is clean; `pnpm dev` serves a page at `/`; `pnpm build` completes with Turbopack; `pnpm start` serves the build.
- [ ] `pnpm typecheck` (`tsc --noEmit`) and `pnpm lint` both pass with zero errors.
- [ ] `pnpm verify src/scripts/verify-setup-2.ts` passes (and the existing `verify-setup-1.ts` / `verify-setup-5.ts` still run under the new `verify` script).
- [ ] `components.json` exists with `"style": "new-york"`; adding `button` brings in `radix-ui` (unified), and `lib/utils.ts` exports `cn`.
- [ ] `app/layout.tsx` imports Geist + Geist Mono via `next/font`/`geist`, sets the font CSS variables on `<html>`/`<body>`, and `display: swap` is in effect.
- [ ] `app/` is at the repo root; `src/scripts/` is intact; `package.json` declares Node ≥ 20 and `pnpm`.
- [ ] None of Clerk/Supabase/Stripe/Inngest/AI-SDK/analytics packages are in `package.json`.
- [ ] `CLAUDE.md`, `design.md`, `specs/`, `.claude/`, `docs/`, `loop.config.json`, `scripts/build-loop.mjs` are unchanged by the scaffold.
- [ ] `docs/manual-checks.md` updated with the SETUP.2 block.

## Technical Requirements
- **Scaffold into the existing repo without clobbering it.** The repo already contains `CLAUDE.md`, `design.md`, `README.md`, `.claude/`, `specs/`, `docs/`, `src/scripts/`, `scripts/build-loop.mjs`, `loop.config.json`. `create-next-app` refuses non-empty dirs / will overwrite `README.md` + `.gitignore`. Approach: run `pnpm create next-app@latest` in a temp dir with the flags below, then **copy the generated app files in**, manually merging `.gitignore` and **never** overwriting existing docs/specs/tooling. Verify `git status` before committing.
  ```bash
  pnpm create next-app@latest .axona-scaffold \
    --ts --app --tailwind --eslint --no-src-dir \
    --import-alias "@/*" --use-pnpm --turbopack
  # then merge: app/, next.config, tsconfig, postcss, eslint, package.json deps & scripts,
  # tailwind wiring, .gitignore (append) — preserving all existing repo files.
  ```
- **`package.json` scripts:**
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "typecheck": "tsc --noEmit",
      "verify": "tsx"
    },
    "engines": { "node": ">=20" },
    "packageManager": "pnpm@9"
  }
  ```
  Add `tsx` to `devDependencies` so `pnpm verify src/scripts/<file>.ts` resolves to `tsx src/scripts/<file>.ts`. Confirm `verify-setup-1.ts` and `verify-setup-5.ts` still pass under it.
- **shadcn init:**
  ```bash
  pnpm dlx shadcn@latest init   # New York, CSS variables: yes, base color: neutral
  pnpm dlx shadcn@latest add button   # smoke test — confirms unified radix-ui import
  ```
  Leave `components.json` and `lib/utils.ts`. Do **not** theme yet — SETUP.3 owns tokens.
- **Geist via `next/font`:** add the `geist` package; in `app/layout.tsx`:
  ```tsx
  import { GeistSans } from "geist/font/sans";
  import { GeistMono } from "geist/font/mono";
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>{children}</body>
      </html>
    );
  }
  ```
  (`geist/font/*` self-hosts with `display: swap` and exposes `--font-geist-sans` / `--font-geist-mono`; Tailwind theme binding to those vars is SETUP.3.)
- **`app/page.tsx`:** a single `<main>` with one neutral placeholder line (e.g. "Axona — scaffold"). No tokens, no teal, no hero. Real content is HOME.*.
- **Minimal `metadata`** in `app/layout.tsx` (a placeholder `title`) so the page isn't "Untitled" — full per-page metadata/OG/canonical is SEO.1, not here.
- **`src/scripts/verify-setup-2.ts`:** the verification script below.
- **No `.mcp.json` keys, no env values** committed. If `.mcp.json` is referenced, leave placeholders.

## UX Flow
```
pnpm create next-app (temp) ──► merge into repo (preserve docs/specs/tooling)
        │
        ▼
pnpm install ──► add tsx, geist ──► wire package.json scripts
        │
        ▼
shadcn init (New York, CSS vars) ──► add button (smoke test: unified radix-ui)
        │
        ▼
app/layout.tsx: Geist + Geist Mono via next/font (--font vars, swap)
app/page.tsx: neutral placeholder (no tokens)
        │
        ▼
pnpm typecheck ─┬─ clean ─► pnpm build (Turbopack) ─┬─ ok ─► pnpm verify setup-2 ─► PASS
                └─ error ─► fix                       └─ fail ─► fix
        │
        ▼
git status: confirm no existing doc/spec/tooling file changed ──► commit on branch ──► PR
```

## Edge Cases
| Case | Handling |
|---|---|
| `create-next-app` refuses non-empty dir / overwrites README | Scaffold in a temp dir, then merge selectively. Never overwrite existing `README.md`, `CLAUDE.md`, `design.md`, `specs/`, `.claude/`, `docs/`, `loop.config.json`, `scripts/`. |
| Generated `.gitignore` differs from repo's | Append/merge — don't replace. Ensure `node_modules`, `.next`, `logs/build-loop/*.log` are ignored (keep `.gitkeep`). |
| shadcn writes default token colors into `globals.css` | Acceptable as a **placeholder**; SETUP.3 overwrites with `design.md` tokens. Mark it clearly as placeholder; don't build UI against these colors. |
| Turbopack build error on a dependency | Next 16 Turbopack build is stable; if a specific dep breaks, document it and fall back per Next's guidance — but do not silently switch bundlers without noting it. |
| `geist` package vs `next/font/google` Geist | Use the `geist` package (self-hosted, exposes the CSS vars). Don't mix both. |
| Node < 20 in the environment | `engines` + `.nvmrc` should surface it; fail fast with a clear message. |
| Existing `src/scripts/*.ts` won't run under new `verify` | Confirm `tsx` resolves them; fix `tsconfig`/`module` settings if needed without breaking Next. |

## Out of Scope
- Design tokens, Tailwind theme variables, dark mode, theme toggle (**SETUP.3**).
- Nav, footer, app shell (**SETUP.4**).
- Any homepage section or real copy (**HOME.***).
- Per-page metadata, OG image, sitemap, structured data (**SEO.1/SEO.2**).
- Forms, Resend, analytics, consent (**CONV.***).
- Clerk, Supabase, Stripe, Inngest, AI SDK, CMS — not added until a story needs them.

## Dependencies
| Dependency | Status | Blocks What |
|---|---|---|
| SETUP.1 (pinned stack) | done | Which Next major / Node / shadcn style to scaffold |
| `pnpm` + Node ≥ 20 available | external | Install/build |
| shadcn MCP registry / `shadcn@latest` CLI | external | Component init |
| Unblocks → SETUP.3, SETUP.4, all HOME.*, SEO.*, CONV.*, and the live build-loop gate | — | This is the keystone scaffold |

## Implementation Plan
**Single day (~4–6 hrs):**
1. **Morning — scaffold + merge.** `create-next-app` in temp; merge into repo preserving all existing files; `pnpm install`; add `tsx` + `geist`; wire `package.json` scripts (`typecheck`, `verify`) + `engines`/`packageManager`. Confirm `verify-setup-1/5.ts` still run.
2. **Midday — shadcn + fonts.** `shadcn init` (New York); `add button` smoke test (confirm unified `radix-ui`); wire Geist + Geist Mono in `app/layout.tsx`; minimal `app/page.tsx` placeholder + placeholder `metadata`.
3. **Afternoon — gate + prove.** `pnpm typecheck`, `pnpm lint`, `pnpm build` (Turbopack), `pnpm dev` smoke; write + pass `verify-setup-2.ts`; `git status` audit that no doc/spec/tooling file changed; append manual-checks; commit on `auto/SETUP.2` branch + PR.

## Verification Script
```ts
// Run: pnpm verify src/scripts/verify-setup-2.ts   (or: npx tsx src/scripts/verify-setup-2.ts)
async function run() {
  let passed = 0, failed = 0;
  async function check(label: string, fn: () => boolean | Promise<boolean>) {
    try { const ok = await fn(); ok ? (console.log(`  PASS ${label}`), passed++) : (console.log(`  FAIL ${label}`), failed++); }
    catch (e) { console.log(`  FAIL ${label} — ${(e as Error).message}`); failed++; }
  }
  console.log('\nVerifying SETUP.2 — Next.js scaffold\n');
  const fs = await import('fs');
  const exists = (p: string) => fs.existsSync(p);
  const read = (p: string) => fs.readFileSync(p, 'utf8');
  const pkg = JSON.parse(read('package.json'));
  const deps = { ...(pkg.dependencies||{}), ...(pkg.devDependencies||{}) };

  // CORE
  await check('Next.js 16.x pinned', () => /(^|[^\d])16\./.test(String(deps.next||'')) );
  await check('React present', () => !!deps.react);
  await check('TypeScript + tsx present', () => !!deps.typescript && !!deps.tsx);
  await check('Tailwind present', () => !!deps.tailwindcss);
  await check('geist font package present', () => !!deps.geist);

  // SCRIPTS
  await check('typecheck = tsc --noEmit', () => /tsc\s+--noEmit/.test(pkg.scripts?.typecheck||''));
  await check('verify script runs tsx', () => /tsx/.test(pkg.scripts?.verify||''));
  await check('build + dev scripts exist', () => !!pkg.scripts?.build && !!pkg.scripts?.dev);
  await check('Node >= 20 in engines', () => /(>=)?\s*20/.test(pkg.engines?.node||''));

  // STRUCTURE
  await check('app/ at repo root', () => exists('app/layout.tsx') && exists('app/page.tsx'));
  await check('src/scripts preserved', () => exists('src/scripts/verify-setup-1.ts') && exists('src/scripts/verify-setup-5.ts'));
  await check('tsconfig has @/* alias', () => /"@\/\*"/.test(read('tsconfig.json')));

  // SHADCN
  await check('components.json New York', () => exists('components.json') && /"style"\s*:\s*"new-york"/.test(read('components.json')));
  await check('lib/utils cn present', () => exists('lib/utils.ts') && /export\s+function\s+cn/.test(read('lib/utils.ts')));

  // FONTS
  await check('Geist wired in layout', () => /geist\/font\/(sans|mono)/.test(read('app/layout.tsx')));
  await check('html lang set', () => /<html[^>]*lang=/.test(read('app/layout.tsx')));

  // GUARDRAILS — forbidden deps not added yet
  for (const bad of ['@clerk','@supabase','stripe','inngest','ai'])
    await check(`no ${bad} dependency`, () => !Object.keys(deps).some(d => d === bad || d.startsWith(bad+'/') || d.startsWith(bad)));

  // PRESERVATION — tooling/docs intact
  for (const f of ['CLAUDE.md','design.md','specs/backlog.md','.claude/agents/joe.md','scripts/build-loop.mjs','loop.config.json'])
    await check(`preserved: ${f}`, () => exists(f));

  if (failed === 0) { console.log(`\nPASSED — ${passed} checks`); console.log('See docs/manual-checks.md for browser verification.'); }
  else { console.log(`\nFAILED — ${failed} check(s) failed`); process.exit(1); }
}
run();
```

## Append to docs/manual-checks.md
```
## SETUP.2 — Next.js scaffold
- [ ] `pnpm dev` serves `/` with the placeholder; no console errors.
- [ ] `pnpm build` completes with Turbopack; `pnpm start` serves the production build.
- [ ] `pnpm typecheck` and `pnpm lint` are clean.
- [ ] `pnpm verify src/scripts/verify-setup-2.ts` passes; verify-setup-1 and -5 still run under the new `verify` script.
- [ ] View source: Geist is applied (not a system fallback); no visible font swap/CLS on reload.
- [ ] `pnpm dlx shadcn@latest add card` pulls `radix-ui` (unified), not `@radix-ui/react-*`.
- [ ] `git status` confirms no existing doc/spec/tooling file was modified by the scaffold.
```

## Common Mistakes to Avoid
- **Clobbering the repo.** `create-next-app` will overwrite `README.md`/`.gitignore` and refuse a non-empty dir. Scaffold in a temp dir and merge selectively — auditing `git status` before commit. Losing `CLAUDE.md`/`specs/`/tooling is the worst-case failure here.
- **Using `src/app`.** CLAUDE.md puts `app/` at the **root**. Use `--no-src-dir`; keep `src/scripts/` only for verify scripts.
- **Theming now.** Do not encode `design.md` tokens, teal, or dark mode — that's SETUP.3. shadcn's default colors are a temporary placeholder; don't build UI against them.
- **Per-package radix.** Confirm New York pulls the unified `radix-ui` package; if `add` writes `@radix-ui/react-*`, the style/registry is wrong.
- **Mixing font sources.** Use the `geist` package only; don't also import Geist via `next/font/google`. Bind Tailwind to the CSS vars in SETUP.3, not here.
- **Breaking the existing verify scripts.** After wiring `"verify": "tsx"`, re-run `verify-setup-1.ts` and `verify-setup-5.ts` — a bad `tsconfig`/`module` setting can build the app but break standalone `tsx`.
- **Adding scope.** No nav, no footer, no sections, no metadata beyond a placeholder title, no analytics. Keep the skeleton boring.

## Build Rules for This Story
- Marketing-site flavor: no auth/DB/jobs — Clerk/Supabase/Stripe/Inngest stay out (CLAUDE.md). Say so by their absence.
- Tokens-only / dark-designed / one-accent rules bind from SETUP.3; here, ship a deliberately neutral placeholder, not a styled page.
- Performance/SEO rules apply in spirit (SSG default, semantic `<html lang>`), but full CWV/metadata gates land with the hero (HOME.1) and SEO.1.
- This is a `git`-tracked scaffold: build on `auto/SETUP.2`, open a PR — never commit the scaffold straight to `main` (per SETUP.5 convention).
- Precedence: where this PRD and Joe's generic defaults differ, this PRD + CLAUDE.md win.

## Rollback Plan
The scaffold is additive (new app files, deps, scripts) and touches no existing doc/spec/tooling file. To revert: delete the generated app files (`app/`, `components/`, `lib/`, `next.config.*`, `postcss/tailwind/eslint` configs, `components.json`), restore the pre-scaffold `package.json`/`.gitignore`/`tsconfig.json`, remove `node_modules`, and drop `src/scripts/verify-setup-2.ts` + the SETUP.2 manual-checks block. No application data, no schema, no migrations. Since work lands on `auto/SETUP.2` via PR, closing the PR unmerged reverts everything. **Zero data risk.**
