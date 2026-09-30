# 0006 — Agent endpoints stay reachable without a browser

**Status:** accepted · **Date:** 2026-09-30

## Context

`/agent`, `/llms.txt`, and `/index.md` exist for clients that do not run JavaScript. Bot Fight Mode on the free plan challenges those clients with a interstitial (`cf-mitigated: challenge`) and cannot be skipped per path. `robots.txt` also said `ai-input=no` while the same site publishes those URLs for model input.

## Decision

- `pnpm apply:zone` sets `bot_management.fight_mode` to `false`. Training opt-out stays in `robots.txt` as `ai-train=no`.
- `Content-Signal` allows model input: `ai-train=no, search=yes, ai-input=yes`.
- `pnpm verify:zone --curl` fails when `/agent` is not `application/json` for a non-browser client.

## Consequences

- Known-bot patterns are no longer challenged at the zone. Abuse controls that need a path exception require a plan with Super Bot Fight Mode.
- The zone change is not in git. It takes effect when `pnpm apply:zone` runs with `CLOUDFLARE_API_TOKEN`.
