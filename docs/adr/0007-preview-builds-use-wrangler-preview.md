# 0007 — Non-production Workers Builds use `wrangler preview`

**Status:** accepted · **Date:** 2026-09-30

## Context

The non-production Workers Builds trigger ran `pnpm exec cf previews deploy`. That command is supposed to build with `isPreview: true`, then upload a Worker Preview. For this assets-only project, `cf` delegates the build to Wrangler and writes `.cloudflare/output/v0/config.json` with `"isPreview": false`. Deploy then fails with `Build Output was not created by a Preview build.` Reproduced locally on `cf` 1.0.0-beta.5 and 1.0.0-beta.8. Production stays on `pnpm exec cf deploy`, which succeeds.

## Decision

- Set the non-production trigger deploy command to `pnpm exec wrangler preview`.
- Keep `pnpm build` as the build command and `wrangler.jsonc` as the assets-only source of truth for that path.
- Leave local `pnpm preview` as `pnpm build && cf dev` for interactive work.

## Consequences

- Preview URLs come from Wrangler Previews, not `cf previews deploy`.
- When `cf previews deploy` starts writing `isPreview: true` for assets-only builds, the trigger can move back to it.
