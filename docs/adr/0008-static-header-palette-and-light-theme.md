# 0008 — Static header, command palette, and a light theme on the cult-film base

**Status:** accepted · **Date:** 2026-10-01 · **Supersedes:** 0005

## Context

The standalone GitHub homepage (`thedavidweng.github.io`) had three things the portfolio lacked: a light theme with a circular reveal, a ⌘K command palette, and a software section with live GitHub data. A first attempt moved the whole portfolio onto that page's rounded, grid-based look and lost the black and red poster style and the horizontal project rail. This decision keeps the portfolio's design and brings over only the behavior.

The portfolio header was a 572-line React island with a red full-height mobile drawer, focus management, and a CSS workaround for iOS 26 Safari sampling the drawer color into the browser bars (ADR 0005).

## Decision

- The header is static Astro (`SiteHeader`). Behavior lives in small modules under `src/scripts/` (`theme`, `palette`, `ui`, `github-live`, `stems`), wired by event delegation on `[data-theme-toggle]`, `[data-palette-open]`, and `[data-copy]`.
- There is no mobile drawer. Under 760px the nav and language link collapse into the palette button, which lists pages, sections, projects, language, and theme when the query is empty. The fixed overlay that ADR 0005 worked around no longer exists; the palette is a centered `<dialog>` whose dimming sits on `::backdrop`.
- The palette index is built on the server (`lib/search-index.ts`) and embedded as JSON per page. The browser loads only the matcher (`lib/palette-search.ts`), so `content/*` never reaches the client bundle.
- Colors use `light-dark()` tokens in `:root`. Dark stays the brand default look; light is a warm off-white with the same red. Project covers, lightbox, stems monitor, and the tools terminal force `color-scheme: dark` because they sit on photographs or read as screens.
- The theme choice is stored in `localStorage` and applied by an inline script before paint. Without JS the page follows `prefers-color-scheme` and `.js-only` controls stay hidden.
- Software gets its own page (`/software/`, `/zh/software/`, `SoftwareLayout`) in the portfolio's poster style and a closing slide in the homepage carousel (`buildSoftwareSlide`, category `Software`). Live GitHub numbers are progressive enhancement over the snapshot in `content/software.ts`.

## Consequences

- Header and palette ship no React runtime; the carousel and media islands are unchanged.
- Visible copy for new UI lives in `content/*.ts`, because `scripts/subset-cjk-fonts.mjs` does not scan `.astro` files.
- Stars and push times on `/software/` can drift from `content/software.ts` until the snapshot is refreshed; the page corrects itself at runtime.
