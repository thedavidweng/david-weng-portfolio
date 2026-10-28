# 0007 — Configure and deploy the Worker with `cf`, not Wrangler

**Status:** accepted · **Date:** 2026-10-01

## Context

The Worker was described twice: `wrangler.jsonc` for Wrangler and `cloudflare.config.ts` for the `cf` CLI. Production already deployed with `pnpm exec cf deploy`, but non-production Workers Builds ran `pnpm exec wrangler preview`, because `cf previews deploy` failed on this assets-only Worker. For assets-only projects `cf` delegates the build to Wrangler, and through 1.0.0-beta.8 that build wrote `buildContext.isPreview: false` to `.cloudflare/output/v0/config.json`, which the preview deploy rejects with "Build Output was not created by a Preview build." `cf` 1.0.0-beta.9 writes `isPreview: true`.

## Decision

- `cloudflare.config.ts` is the only Worker configuration. `wrangler.jsonc` is deleted.
- `wrangler.config.ts` stays, holding only `assetsDirectory: "./dist"`, because the delegated Wrangler build needs it to find the Astro output. `wrangler` stays a dev dependency for the same reason.
- Workers Builds runs `pnpm build`, then `pnpm exec cf deploy` on `main` and `pnpm exec cf previews deploy` on every other branch. The deploy commands live in the Cloudflare dashboard (or `cf builds triggers`), not in the repo.
- `cf` must stay at 1.0.0-beta.9 or later.

## Consequences

- Downgrading `cf` below beta.9, or adding Wrangler-only config back, breaks preview deploys.
- `scripts/verify-dist.mjs` and `tests/www-redirect.test.ts` pin the assets-only constraints in `cloudflare.config.ts` and the absence of `wrangler.jsonc`.

## Update — 2026-10-27

The configuration source-text test was removed. `pnpm verify:dist` remains available to inspect build output.
