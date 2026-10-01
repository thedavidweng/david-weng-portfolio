# 0002 — Redirects live at the Cloudflare Zone layer; deploy is assets-only

**Status:** accepted · **Date:** 2026-07-25

## Context

Production needs `http→https` and `www→apex` (301) redirects for `davidweng.eu.org`. They could run in a Worker script fronting the static assets, or at the Cloudflare Zone layer. A Worker with a `main` script bills every request; assets-only Workers Static Assets requests are free and unlimited.

## Decision

- `cloudflare.config.ts` stays **assets-only**: no `entrypoint`, no `routes`, no `runWorkerFirst` (`wrangler.config.ts` only supplies `assetsDirectory` to the bundler). `tests/www-redirect.test.ts` pins this.
- Redirects are Zone configuration: `always_use_https` plus a `www→apex` Redirect Rule, applied by `pnpm apply:zone` (`scripts/apply-cf-zone-free-tier.mjs`) and checked post-deploy by `pnpm verify:zone`.
- `assets.htmlHandling` must stay `"auto-trailing-slash"` (the default): Astro emits directory-style output, and `"none"` 404s every clean URL.

## Consequences

- The former `workers/site.mjs` redirect worker (never invoked in production) is deleted; this ADR is its replacement as documentation of the redirect behavior.
- Redirect changes are made in the Zone apply script, not in application code, and verified with `pnpm verify:zone` after deploys.
