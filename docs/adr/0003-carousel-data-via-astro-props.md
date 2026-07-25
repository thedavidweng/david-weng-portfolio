# 0003 — Homepage carousel data flows through Astro props, not a generated module

**Status:** accepted · **Date:** 2026-07-25

## Context

`ProjectsSection` (a client island) needs cover-image widths, which come from `getImageWidth` (`node:fs` + `image-size`) and therefore cannot run in the browser bundle. The island originally imported a pre-baked snapshot, `content/carousel-projects.ts`, kept in sync by `pnpm generate:carousel` plus a CI staleness test — a 265-line generated file, a generation ritual, and a failure mode (stale file) that existed only because the island imported content directly instead of receiving it.

## Decision

Islands that need server-derived data receive it as props from the rendering Astro component. `src/layouts/HomeLayout.astro` computes `buildCarouselProjects(projects)` at build time and passes it to `<ProjectsSection projects={...} />`. `lib/project-carousel.ts` stays browser-safe (pure functions over `CarouselProjectItem[]`); `lib/build-carousel-projects.ts` stays server-only (fs-bound width measurement). The generated file, the `generate:carousel` script, and the staleness test are deleted.

## Consequences

- Adding or editing a project no longer requires a regeneration step; `content/projects.ts` is the only touch point.
- The seam between server-derived data and client islands is the Astro prop boundary. New islands should follow it rather than importing fs-bound modules.
- Carousel data now ships in the island's serialized props in the HTML instead of the JS bundle; total bytes transferred are equivalent.
