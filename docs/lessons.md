# Lessons (append-only). When a Claude Code run does something wrong and we fix it, add the durable rule here.
## 2026-06-21 — SETUP.3: dependency added but not installed
Builder added next-themes to package.json without installing → gate failed (tsc TS2307). Rules: Builder adds deps with `pnpm add <pkg>`, never hand-edits package.json; runner runs `pnpm install` before the gate; pnpm must be on PATH in non-interactive shells (~/.zshenv). (Fixed in PR #3.)
## 2026-06-21 — SETUP.3: radix-vega relabeled, not re-initialized
`shadcn init --preset radix-vega` couldn't run in-sandbox (no network), so components.json was relabeled vega while the one existing component was generated under nova. Follow-up: when network is available, run the real `shadcn init --preset radix-vega --force` and regenerate components so they're truly vega.
## 2026-06-22 — SETUP.4: planner output captured as a summary, not the PRD
PR #4 gave Joe the Write tool, but the runner still redirected Joe's stdout into specs/<id>.md — so the file became Joe's 26-line chat summary ("Joe wrote the PRD. Here's the summary…"), not the PRD. The Builder improvised from the summary and still passed the gate, so the bug nearly shipped a spec-of-record that was garbage. Rules: planner prompt tells Joe to WRITE the full PRD to specs/<id>.md via Write (stdout is no longer redirected into the file); the runner validates the spec before building (exists, ≥120 lines, required CPRD headers: Problem Statement, Success Metrics, Detailed Requirements, Acceptance Criteria, Technical Requirements, Verification Script, Rollback Plan) and retries the planner up to maxRetries, escalating rather than handing a malformed spec to the Builder; joe.md reinforced for headless authoring (write the complete PRD to the file, no conversational summary). (Fixed in chore/planner-capture-fix.)

## 2026-06-22 — Two agents edited the same planning docs, colliding on main
Two agents (Cowork planner + terminal Claude Code) edited the same planning docs independently, causing a surprise uncommitted collision on main. Rule: planning-doc edits go through one path — proposed in chat, landed via a single PR — never both writing loose to the working tree.

## Open follow-up — shadcn rsc flag
components.json has rsc:false; for this SSG-first App Router site, rsc:true keeps components server-by-default. Revisit.
