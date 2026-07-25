# 0004 — Page tests render shipping Astro components via the Container API

**Status:** accepted · **Date:** 2026-07-25

## Context

Homepage and project-page tests previously rendered hand-maintained React fixtures (`tests/helpers/ProjectPageFixture.tsx`, 548 lines; `HomePageFixture.tsx` + section fixtures) that re-implemented `ProjectLayout.astro` and its sub-components branch by branch, class by class. The tests validated the parallel copy, never the shipping markup — a fixture/production divergence was invisible (and one existed: stray whitespace inside inline links that the fixtures didn't reproduce).

## Decision

Page-level tests live in `tests/pages/` and render the real `.astro` components through Astro's experimental Container API (`tests/helpers/render-astro.ts`), asserting against the SSR HTML via jsdom + Testing Library queries. They run as a separate vitest project with a `node` environment because esbuild (pulled in by the container) cannot run under the jsdom environment's foreign-realm `Uint8Array`. Interactive behavior (lightbox open/close, carousel scrolling, menu focus) stays in the island tests under the jsdom project, which render the real islands with React Testing Library.

## Consequences

- Page tests exercise the exact markup that ships, including `BaseLayout` head metadata (canonical, hreflang), which the fixtures could not cover.
- The seam is explicit: Astro owns structure (tested via container render), islands own behavior (tested via RTL). A scenario needing hydration belongs in an island test.
- The fixtures (~670 lines) are deleted and must not be reintroduced; if a page assertion is impossible against SSR output, that is a signal the markup should move server-side or the assertion belongs to an island.
