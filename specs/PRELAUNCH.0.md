# PRELAUNCH.0 — Preserve the mock + set up the working branch

**Type:** mechanical / git-only · **Gate:** `[human-gate]` on merge · **Depends on:** nothing · **Blocks:** PRELAUNCH.1

## Goal

The mocked moodboard homepage (fabricated traction) is recoverable forever; all pre-launch work happens
on an isolated branch. `main` is never touched by the loop.

## Instructions

1. Annotated tag of the current mock: `git tag -a homepage-v1-mock origin/main -m "..."` → push.
2. Backup branch: `git branch backup/homepage-v1-mock origin/main` → push.
3. Working branch: `git switch -C prelaunch origin/main`.
4. Optional `/_mock` route (only if cheap; else skip — the tag is the real backup). **Skipped.**
5. Do **not** modify `main`.

## Definition of done

- `homepage-v1-mock` tag on `origin`; `backup/homepage-v1-mock` branch on `origin`; `prelaunch` checked
  out from current `main`; `main` unchanged.

## Status — DONE 2026-06-26

Tag `homepage-v1-mock` + branch `backup/homepage-v1-mock` pushed at `main` = e947a32. `prelaunch` created.
`/_mock` skipped (the tag is the backup). `main` untouched.
