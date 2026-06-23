# Axona Commercial Website

The marketing site for Axona. This repo is set up as a **stage** for two operators:

- **Joe** (`.claude/agents/joe.md`) — Head of Product persona, fully briefed on Axona. He turns a
  backlog row into a Claude Code-ready PRD on the `CPRD` trigger.
- **Claude Code** (terminal) — implements each PRD, following `CLAUDE.md` + `design.md`.

## The operating loop

1. **Pick a story** from `specs/backlog.md`.
2. **Generate the PRD:** give Joe the row — `CPRD "<row>"` — he emits a full PRD (no preamble).
   Save it to `specs/<STORY-ID>.md`.
3. **Build:** in the terminal, tell Claude Code: _"Implement `specs/<STORY-ID>.md`, follow
   CLAUDE.md and design.md."_ For non-trivial manual sessions, start in Plan Mode, approve the plan,
   then auto-accept edits. The verify script + tsc are mandatory before "done."
4. **Gate:** run accessibility-review + design-critique before merge. Verify script passes,
   `tsc --noEmit` clean, manual checks in `docs/manual-checks.md` done.
5. **Ship:** land work on an `auto/<id>` (or `chore/…`) branch → open a PR against `main`. **Merge
   from the terminal with `gh pr merge <n> --merge --delete-branch` — never via the GitHub UI.**
   `main` is protected (PR required; direct push blocked), so merging via `gh` is the project norm
   and keeps the merged branch cleaned up. Railway auto-deploys from `main`. Move to the next story.

## Autonomous build loop (SETUP.5)

The operating loop above can run unattended for **mechanical** stories. `scripts/build-loop.mjs`
is a sequential orchestrator: it parses the backlog, picks the next eligible `todo`, invokes the
planner (Joe) to write the PRD, invokes the **Builder** subagent to implement it, runs the gate,
and only on green flips the backlog row to `done` and lands the work as a **per-story branch + a
pull request** — then repeats. The loop never merges and never touches `main`.

```bash
node scripts/build-loop.mjs --dry-run        # plan only: print next story + the exact prompts; writes nothing
node scripts/build-loop.mjs --once           # build a single eligible story, then stop
node scripts/build-loop.mjs --story SETUP.3  # force a specific story
node scripts/build-loop.mjs                   # loop until no eligible stories remain
```

**Roles.** The runner is the _only_ writer of backlog status and git history. The Builder
(`.claude/agents/builder.md`) only implements and self-gates, reporting `GATE: PASS` / `GATE: FAIL`
— it never commits or edits the backlog. Two writers would corrupt state.

**The gate is the test, not the model's word.** A story is `done` only when
`pnpm verify src/scripts/verify-<id>.ts && pnpm exec tsc --noEmit` exits 0. On FAIL the runner
re-invokes the Builder with the failure output, up to `maxRetries` (default 2), then stops, leaves
the row `todo`, and writes `logs/build-loop/<id>.fail.log`. Per-run JSONL lands in
`logs/build-loop/run-<timestamp>.jsonl`.

**Branch per story, PR for review — never direct to `main`.** Before the Builder runs, the loop
isolates the work: `git fetch origin main` then `git switch -C auto/<id> origin/main`. On a green
gate it commits `"<id>: <title>"`, pushes `auto/<id>`, and opens a PR targeting `main` (body links
the spec + run log). It **never** runs `git merge` / `gh pr merge` and **never** commits or pushes
to `main` — a human reviews and merges the PR. That PR is where design-critique, a11y, and any
customer-named sign-off happen. A push rejected by branch protection escalates (writes
`logs/build-loop/<id>.push.fail.log`, stops) — it never falls back to writing `main`.

**GitHub setup (required before a non-dry run).** Authenticate once with `gh auth login`, **or**
export a `GITHUB_TOKEN` with `repo` scope. The repo needs an `origin` remote and a `main` base
branch. If neither `gh` nor `GITHUB_TOKEN` is available — or the working tree is dirty — the loop
**fails fast before building**, so no local commit is orphaned with no path to a PR.
**Recommended:** enable **branch protection on `main`** (require a PR + review, block direct
pushes). The loop branches first by design; protection is the backstop that guarantees `main`
stays green even if something is misconfigured.

**Human gates never auto-ship.** Stories tagged `[human-gate]` (or listed in `loop.config.json`'s
`humanGate.ids`) halt the loop with a notice instead of building — currently LAUNCH.1/2/3
(a11y, performance, design-critique) and HOME.8 (bios unconfirmed). Add `[human-gate]` to **any**
customer- or partner-named story so a named claim is never shipped autonomously.

**Config-driven & portable.** No project name is hardcoded in the runner. Everything project-
specific lives in `loop.config.json` (backlog path, planner/builder agent names, gate command,
retries, human-gate ids/labels, the `git` block — remote/baseBranch/branchPrefix/push/openPr/
draftPr/`autoMerge: false`, notify hook). Drop `scripts/build-loop.mjs`, `.claude/agents/builder.md`,
and `loop.config.json` into another repo and edit only the config. `git.autoMerge` must be `false`
— the runner rejects `true` at startup.

**Optional ping.** A `SubagentStop` hook (matcher `builder`) in `.claude/settings.json` runs the
config's id-less `hookGate` (`tsc --noEmit`) when the Builder finishes and fires `notify.command`
if `notify.enabled` — so a manual Claude Code session is gated like the loop. The runner works
without it.

**Billing.** `claude -p` / Agent SDK usage draws from a **separate monthly Agent SDK credit pool**
(effective 2026-06-15), distinct from interactive limits. Long loops consume it — use `--dry-run`
to plan for free, and `--once` to trial cost before running the full loop. The gate command needs
SETUP.2 (package.json/pnpm); until then `--dry-run` still works for planning.

## How to run Joe — two options

**A. In the terminal with Claude Code (recommended for this build).** Claude Code auto-discovers
agents in `.claude/agents/`. Invoke Joe to author a CPRD, then have Claude Code implement it. This
matches the "Joe instructs Claude Code to completion" workflow.

**B. As a dedicated Cowork chat.** Connect `Axona-Commercial-Website/` as its own Cowork project
(Settings → connect folder), start a chat, and Joe loads from `.claude/agents/joe.md`. Type
`CPRD "<row>"` to get PRDs in chat, hand to Claude Code. Good for planning away from the
terminal. Either way Joe stays consistent because the intake is pre-filled and he inherits this
repo's `CLAUDE.md`/`design.md` via the precedence rule.

## Before you scaffold code — run the "verify latest" pass

This brief was written **June 2026**. Before building, confirm against live sources and update
`CLAUDE.md` if anything changed: current **Next.js** major, **shadcn** skills/registry MCP,
current **model names** (docs.claude.com), current **WCAG** version (was 2.2), and Core Web Vitals
guidance. Newer official guidance wins. Summarize what changed in one line, then build.

## Map

```
CLAUDE.md                  project brief + stack + design DNA + never/always + DoD
design.md                  token system (electric teal) — single source of truth
.claude/agents/joe.md      Head of Product persona, Axona intake pre-filled
.claude/agents/builder.md  Builder subagent — implements one spec, self-gates, reports PASS/FAIL
.claude/rules/*.md         path-scoped: seo, content, performance, design, accessibility
.claude/settings.json      model, permissions, hooks (format/lint, block force-push, builder gate)
scripts/build-loop.mjs     autonomous build-loop runner (planner -> builder -> gate -> advance)
loop.config.json           build-loop config (portability lever — no project name in the runner)
.mcp.json                  project MCP servers (github, figma, analytics, cms) — fill keys locally
specs/website-brief.md     IA, page sections, what each must achieve
specs/content/messaging.md real copy: headlines, value props, proof, CTAs (voice + tone)
specs/backlog.md           epics + stories in Joe's CPRD trigger format
docs/manual-checks.md      browser checks Joe appends to per story
```

## Source of truth for the _story_ (not the code)

Positioning, ICP, competition, team, and the evidence rules live in the parent project:
`../memory/` and `../CLAUDE.md`. Do not invent traction — reconcile every claim to those files.
