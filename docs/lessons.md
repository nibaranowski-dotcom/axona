# Lessons (append-only). When a Claude Code run does something wrong and we fix it, add the durable rule here.
## 2026-06-21 — SETUP.3: dependency added but not installed
Builder added next-themes to package.json without installing → gate failed (tsc TS2307). Rules: Builder adds deps with `pnpm add <pkg>`, never hand-edits package.json; runner runs `pnpm install` before the gate; pnpm must be on PATH in non-interactive shells (~/.zshenv). (Fixed in PR #3.)
## 2026-06-21 — SETUP.3: radix-vega relabeled, not re-initialized
`shadcn init --preset radix-vega` couldn't run in-sandbox (no network), so components.json was relabeled vega while the one existing component was generated under nova. Follow-up: when network is available, run the real `shadcn init --preset radix-vega --force` and regenerate components so they're truly vega.
## Open follow-up — shadcn rsc flag
components.json has rsc:false; for this SSG-first App Router site, rsc:true keeps components server-by-default. Revisit.
