# 0007 — Configure and deploy the Worker with `cf`, not Wrangler

**Status:** accepted · **Date:** 2026-10-01

## Context

The Worker was described twice: `wrangler.jsonc` for Wrangler and `cloudflare.config.ts` for the `cf` CLI. Production already deployed with `pnpm exec cf deploy`, but non-production Workers Builds ran `pnpm exec wrangler preview`, because `cf previews deploy` failed on this assets-only Worker. For assets-only projects `cf` delegates the build to Wrangler, and through 1.0.0-beta.8 that build wrote `buildContext.isPreview: false` to `.cloudflare/output/v0/config.json`, which the preview deploy rejects with "Build Output was not created by a Preview build." `cf` 1.0.0-beta.9 writes `isPreview: true`.

## Decision

- `cloudflare.config.ts` is the only Worker configuration. It stays assets-only: no `entrypoint`, no `routes`, no `runWorkerFirst`. A Worker in front of the static files would bill every request; assets-only requests are free and unlimited.
- The bundler is `@cloudflare/vite-plugin` 2.0 beta, invoked by `@astrojs/cloudflare` during `astro build`. `wrangler`, `wrangler.config.ts`, and `wrangler.jsonc` are not part of the project.
- `pnpm deploy` is `pnpm build && cf deploy --prebuilt`. `cf deploy` without `--prebuilt` delegates to Vite and fails, because this pnpm workspace makes `cf` drop the detected `astro build` command. The dashboard Workers Builds commands are not in the repo; they have to be updated to the same `--prebuilt` form.
- `cf` must stay at 1.0.0-beta.24 or later.

## Consequences

- Adding an `entrypoint` or bringing Wrangler back puts a Worker in front of static files and changes the bill.
- `scripts/verify-dist.mjs` and `tests/www-redirect.test.ts` pin the assets-only constraints in `cloudflare.config.ts` and the absence of Wrangler config.

## Update — 2026-10-27

The configuration source-text test was removed. `pnpm verify:dist` remains available to inspect build output.

## Update — 2026-10-28

`cf` 1.0.0-beta.24 does not use Wrangler. The project declares one bundler, `@cloudflare/vite-plugin` 2.0 beta, and `@astrojs/cloudflare` runs that plugin during `astro build`. Static output stays assets-only: `cloudflare.config.ts` has no `entrypoint`, no `routes`, and no `runWorkerFirst`. A Worker script in front of these files would bill every request against the Workers free quota; assets-only requests stay free and unlimited. `wrangler`, `wrangler.config.ts`, and `wrangler.jsonc` are gone. The adapter is configured with `session: false`, `imageService: "passthrough"`, and `prerenderEnvironment: "node"` so the build does not add a KV or Images binding and does not prerender in workerd. `astro.config.mjs` omits the adapter when `VITEST=true`: the adapter's Vite plugin loads `workerd` into Vitest's runner and throws `module is not defined`. `tests/www-redirect.test.ts` fails if the config grows an entrypoint or Worker. The static files land in `.cloudflare/output/v0/workers/default/assets/`; `scripts/write-headers.mjs` writes `_headers` and the `sitemap.xml` alias there after `astro build`. `cf deploy --dry-run --prebuilt` reads 619 files and uploads 0.00 KiB (no Worker script). `worker.config.json` also records `env.ASSETS` with type `assets`, and `config.json` records `buildContext.mode: "production"`. `cf dev` starts the Vite plugin on port 5173 and returns 404; `astro preview` serves the built assets with the managed `_headers`. Non-production builds must set `CLOUDFLARE_PREVIEW_BUILD=true` so `buildContext.isPreview` is true, then run `cf previews deploy --prebuilt`.
