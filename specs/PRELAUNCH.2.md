# PRELAUNCH.2 — Deploy the pre-launch homepage + full-site backup

**Type:** release / git + deploy · **Operates on:** the PRELAUNCH.1 PR (`prelaunch` → `main`) · **Gate:** `[human-gate]`
**Depends on:** PRELAUNCH.0 (backup tag/branch) + PRELAUNCH.1 (homepage built, PR open, gate green)
**Author:** CoS handoff (2026-06-26)

> Plain version: we take a fresh full snapshot of the live site, merge the approved pre-launch PR into
> `main`, let Railway deploy it, then verify the live site is honest and intact. If anything looks wrong,
> we roll back in under a minute. **Nicolas gives the explicit go before the merge step.**

---

## Preconditions (do NOT deploy until all true)

- [ ] PRELAUNCH.0 done: `homepage-v1-mock` tag **and** `backup/homepage-v1-mock` branch exist on `origin`
      (this is a full-repo snapshot of the old site — the whole website, not just the homepage).
- [ ] PRELAUNCH.1 PR is open to `main`, CI/gate green: `pnpm verify …` + `pnpm exec tsc --noEmit` exit 0.
- [ ] Reviews passed: design-critique + accessibility-review + content-integrity (grep clean).
- [ ] **Nicolas has approved the PR.** He is the only approver for a merge to `main`.

## Step 1 — Fresh full-site backup (belt and suspenders)

Tag the exact production commit _as it is right now_, so we can restore the entire current site instantly.

```
git fetch origin
DATE=$(date +%Y%m%d)
git tag -a "site-prod-backup-$DATE" origin/main -m "Full production site snapshot before pre-launch homepage deploy"
git push origin "site-prod-backup-$DATE"
git branch backup/site-prod-$DATE origin/main && git push -u origin backup/site-prod-$DATE
```

Confirm all backups exist before proceeding:

```
git ls-remote --tags origin | grep -E "homepage-v1-mock|site-prod-backup-$DATE"
git ls-remote --heads origin | grep -E "backup/homepage-v1-mock|backup/site-prod-$DATE"
```

Note: Railway also retains previous deployments, so there are **three** independent rollback paths (Railway
redeploy, git tag restore, git revert). Do not rely on only one.

## Step 2 — Final pre-merge verification on the branch

```
git switch prelaunch && git pull --ff-only
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm build
# content-integrity: every one of these MUST return no matches in the built output / src
grep -RinE "1,?200|3\.2(x|×)|7,?491,?284|NORTHWIND|FORGE|MERIDIAN|ATLAS|VANTA|AXIOM|HELIX|ORBIT|NOVA|PILOT|We've got the receipts|40 ?hrs|CUSTOMER PHOTO|Lauren|Powered by 1,200" src/ app/ content/ components/ || echo "GREP CLEAN"
```

If the grep finds anything, **stop** — fix on `prelaunch` and re-run. Do not deploy with any mock string present.

## Step 3 — Merge to main (this triggers the deploy)

`main` is protected (PR required; direct push blocked), so merge via `gh`, not the UI:

```
gh pr merge <PR#> --merge --delete-branch
```

(Use `--merge` to keep the reviewed history; `--squash` is fine if that's the repo norm. Do **not** force-push,
do **not** push to `main` directly.) Railway auto-deploys `main` on merge.

## Step 4 — Verify the live site (after Railway finishes the deploy)

```
# 1. site responds 200
curl -sS -o /dev/null -w "%{http_code}\n" https://axonahq.com/
# 2. the fabricated strings are GONE from production HTML
curl -sS https://axonahq.com/ | grep -iE "1,?200|3\.2(x|×)|7,?491,?284|NORTHWIND|receipts|40 ?hrs|Powered by 1,200" && echo "FAIL: mock string live" || echo "OK: clean"
# 3. manufacturing-led meta is live
curl -sS https://axonahq.com/ | grep -i "meta" | grep -iE "manufactur|genealogy"
```

Then eyeball in a browser: hero ("Build robots. Not spreadsheets."), the honest status chip ("onboarding our
first founding design partners"), the SN-2208 widget labeled "sample data," no logo wall, no testimonials,
dead nav shows muted "coming soon." If `/_mock` was kept, confirm it returns `noindex` and is excluded from
`/sitemap.xml`. Confirm the "Request access" form actually submits (the reference design stubbed this — see the
open production item in the handoff; if not yet wired to a real endpoint, ship with a working mailto/confirmation
and flag it).

## Step 5 — Rollback (if any verification fails) — pick the fastest available

1. **Railway (fastest):** in the Railway dashboard, redeploy the previous successful deployment. ~30s, no git.
2. **Git revert (clean history):** `git revert -m 1 <merge_sha>` on a new branch → PR → `gh pr merge`. Railway redeploys the reverted `main`.
3. **Restore from snapshot:** branch off `site-prod-backup-$DATE` (or `homepage-v1-mock`) → PR to `main` → merge.
   Then re-open `prelaunch`, fix, and re-run from Step 2.

## Definition of done

- Full-site backup verified on `origin` (mock tag + fresh `site-prod-backup-$DATE`).
- PRELAUNCH.1 PR merged to `main` via `gh`; branch deleted.
- Railway deploy succeeded; https://axonahq.com/ returns 200.
- Production HTML grep-clean of every mock string; manufacturing-led meta live; honest pre-launch page visible.
- Rollback path confirmed available (Railway prior deploy + backup tag both present).

## Gate

`[human-gate]`. Steps 1–2 may run unattended; **Step 3 (merge/deploy) requires Nicolas's explicit go.**

---

**Stop after Step 2 and show me the backup confirmation + grep result. Wait for my "go" before Step 3 (merge & deploy).**

## One paste-line for Claude Code

> Execute specs/PRELAUNCH.2.md. Run Steps 1–2 (fresh full-site backup tag + branch, then pre-merge build /
> tsc / content-integrity grep on `prelaunch`). Stop and show me the backup confirmation and grep result.
> Do NOT merge or deploy until I reply "go" — then run Step 3 (gh pr merge), Step 4 (verify live), and keep
> Step 5 rollback ready. `main` is protected; never force-push or push to main directly.
