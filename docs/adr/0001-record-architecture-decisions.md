# 0001 — Record architecture decisions as ADRs

**Status:** accepted · **Date:** 2026-07-25

## Context

The codebase follows three conventions (see `AGENTS.md` → Coding Conventions): no comments unless absolutely necessary, rationale recorded outside the code, minimal line count without hurting readability. Inline comments explaining *why* a decision was made rot silently — this repo already accumulated file headers with factually wrong paths. Rationale needs one durable, reviewable home.

## Decision

Design decisions and their rationale are recorded here in `docs/adr/`, one file per decision, sequentially numbered `NNNN-slug.md`, using this format (context / decision / consequences). Operational knowledge agents need day-to-day stays in `AGENTS.md`; ADRs hold the *why* behind non-obvious choices.

## Consequences

- A comment explaining rationale is a signal to write an ADR instead.
- `tests/comment-policy.test.ts` enforces the comment policy in CI; the few permitted inline comments state constraints code cannot express.
- ADRs are immutable history: supersede with a new ADR rather than editing an accepted one.

## Update — 2026-10-27

The comment allowlist test was removed; oxlint continues to enforce its configured comment rules.
