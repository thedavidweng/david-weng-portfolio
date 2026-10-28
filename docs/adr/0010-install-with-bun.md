# 0010 — Install with Bun, run Astro and Vitest on Node

**Status:** accepted · **Date:** 2026-10-28 · **Supersedes:** the pnpm commands in 0002, 0006, and 0007

## Context

pnpm 12 installed this repo and ran its scripts. The install is the slow part of CI. Astro, Vitest (jsdom projects plus v8 coverage), and the `cf` CLI are Node programs. `bun test` would replace that runner, and `@types/bun` conflicts with the DOM types those tests use.

## Decision

- Bun 1.4.4 is the package manager (`bun.lock`). `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `packageManager` are gone. Catalogs, overrides, and the build-script allowlist live in `package.json`. The `vite` override is `npm:@voidzero-dev/vite-plus-core@1.0.0` directly: that catalog entry had no other reference, and knip reports an override-only catalog entry as unused. `minimumReleaseAge: 0` and its exclude list live in `bunfig.toml` (seconds).
- `bun run` launches the existing scripts. Astro, Vitest, `tsc`, `astro check`, knip, oxlint (`vp`), font subsetting, header generation, and `cf` keep their Node shebangs. `bun --bun` is not used: the build must stay byte-identical to Node.
- CI keeps `actions/setup-node` (`node-version: lts/*`) next to `oven-sh/setup-bun` (`bun-version: 1.4.4`). There is no Actions cache for the Bun install cache.
- Dependabot's package ecosystem is `bun`.

## Consequences

- pnpm `trustPolicy: no-downgrade` and `trustPolicyExclude` have no Bun equivalent. `peerDependencyRules` does not either; the catalog overrides still pin `vite` and `vitest`.
- `cf deploy` without `--prebuilt` is still not the deploy path. The root `package.json` keeps a one-package `workspaces` entry so the catalog stays where Bun's pnpm migration put it.
- Workers Builds reads `bun.lock` and still needs the dashboard build and deploy commands switched to Bun at merge. `cf` needs Node on that image.
