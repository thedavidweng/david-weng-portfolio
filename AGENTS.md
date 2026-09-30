# Agent Guidelines — David Weng Portfolio

This project serves both human visitors and AI agents. The human-visible UI and agent-visible endpoints draw from the same content sources where possible.

## Coding Conventions

1. **No comments unless absolutely necessary.** Code must self-explain. A comment is justified only when it states a constraint the code cannot express (the `show()`-vs-`showModal()` note in `src/islands/Header.tsx` is the bar to clear). Machine-read directives (JSDoc type annotations, `/// <reference>`, `@ts-expect-error` with reason) are not comments. Enforced in CI by `tests/comment-policy.test.ts` and oxlint (`no-inline-comments`, `no-warning-comments`).
2. **Rationale goes to `docs/adr/`, not inline.** If a comment would explain *why* a decision was made, write an ADR instead (`NNNN-slug.md`, sequential — see `docs/adr/0001-record-architecture-decisions.md`). Operational knowledge agents need day-to-day belongs in this file.
3. **Minimize line count without hurting readability.** Prefer deleting code to documenting it; inline single-use abstractions; no code golf — clarity beats brevity when they conflict.

## Agent-Visible Endpoints

| Endpoint | Format | Purpose | Human Equivalent |
|---|---|---|---|
| `/?mode=agent` | HTML (semantic, **requires JavaScript**) | Agent-optimized homepage view via `AgentModeGate` island | `src/layouts/HomeLayout.astro` (rendered at `/` and `/zh/`) |
| `/agent` | `application/json` | Machine-readable site data (en + zh in `locales`) | Same as above |
| `/llms.txt` | `text/plain` | LLM discovery file (AI equivalent of robots.txt) | Homepage overview |
| `/llms-full.txt` | `text/plain` | Complete site docs in one file | Entire site |
| `/index.md` | `text/markdown` | Markdown version of English homepage | Homepage |
| `/zh/index.md` | `text/markdown` | Markdown version of Chinese homepage | Chinese homepage |
| `/projects/:slug.md` | `text/markdown` | Markdown version of English project page | Project detail |
| `/zh/projects/:slug.md` | `text/markdown` | Markdown version of Chinese project page | Chinese project detail |

**Important:** `/?mode=agent` requires client-side JavaScript. Non-JS agents should use `/agent` (JSON), `/llms.txt`, `/index.md`, or other explicit `.md` URLs. Content negotiation via `Accept: text/markdown` headers has been removed — agents must request `.md` URLs directly.

## Content Architecture

### Single-Source Content (modify once, synced everywhere)

| Source File | Consumed By |
|---|---|
| `content/site.ts` | `src/layouts/HomeLayout.astro`, `src/islands/AgentView.tsx`, `src/pages/agent.ts`, `lib/site-markdown.ts`, `lib/llms-txt.ts`, `lib/jsonld.ts`. Includes `siteIdentity.location`, `siteIdentity.knowsAbout`, and `blogUrl` — edit here, every generator follows. |
| `content/projects.ts` | `src/pages/projects/*.astro`, `src/islands/AgentView.tsx`, `src/pages/agent.ts`, `lib/llms-txt.ts`, `lib/site-markdown.ts`, `src/layouts/HomeLayout.astro` (carousel via `buildCarouselProjects`) |
| `content/project-section.ts`, `content/project-detail.ts` | UI labels for the homepage carousel and project pages. Islands import labels from these, never from `content/projects.ts`, which drags every archive collection into the browser bundle. |
| `content/film-data.ts` | Film project detail pages, archive layouts |
| `content/archives/*.ts` | Archive project pages, agent project listings |
| `lib/site-config.ts` | `SITE_URL`, `SITEMAP_URL`, `AGENT_ENDPOINTS` — single source for URL constants and the machine-readable endpoint table (also imported by `astro.config.mjs`) |
| `lib/agent-content.ts` | Hub turning `content/*` into agent-facing data and markdown fragments (`buildAgentData`, `buildAgentEndpointPayload`, `formatServices/Projects/About/Endpoints`) |
| `lib/responsive-srcset.ts` | `RESPONSIVE_WIDTHS`, `MIN_ORIGINAL_WIDTH` — imported by both the runtime srcset builders and `scripts/generate-responsive-images.mjs` (no manual sync) |
| `lib/url.ts` | `getHostname` — defensive hostname extraction used by ProjectLayout, ArchiveMediaWall |
| `src/icons.ts` | Shared SVG path data for social/external-link/close icons (Header, Footer, ArchiveMediaWall, ProjectExternalLinkButton, ProjectMediaLightbox) |

There is no dual-maintenance content: `lib/jsonld.ts` derives `knowsAbout` and `sameAs` from `content/site.ts`, and all generators (`lib/llms-txt.ts`, `lib/site-markdown.ts`, `src/islands/AgentView.tsx`) derive services, location, blog URL, and the endpoint list from `content/site.ts` + `lib/site-config.ts`.

### Archive Collections

`content/archives/*.ts` map media files stored under `public/projects/<storage-path>` by filename; semantic metadata (titles, captions, order) lives in the collection, never in filenames. Each group's storage path comes from `archiveStoragePathMap` in `content/archives/_shared.ts` — never hardcode storage paths in comments or docs.

## Modification Checklist

### When adding, removing, or renaming a project

- [ ] Update `content/projects.ts` (canonical source — the homepage carousel, agent endpoints, and markdown generators all derive from it)
- [ ] Verify `lib/llms-txt.ts` auto-renders the new project
- [ ] Verify `lib/site-markdown.ts` auto-renders the new project (`/index.md` + `/llms-full.txt`)
- [ ] Verify `src/pages/agent.ts` auto-includes the new project
- [ ] Verify `src/islands/AgentView.tsx` auto-includes the new project
- [ ] If the project has a film detail page, check `content/film-data.ts`
- [ ] If the project has an archive, check `content/archives/*.ts`

### When modifying services (What I Do)

- [ ] Update `content/site.ts` → `servicesContent.items` (canonical source)
- [ ] Verify agent endpoints auto-render new services
- [ ] If the service represents a **new domain** not in the existing 7 topics, update `content/site.ts` → `siteIdentity.knowsAbout`

### When modifying identity (name, roles, location, contact)

- [ ] Update `content/site.ts` → `siteIdentity`, `contactContent`, `heroContent` (canonical source)
- [ ] Verify `lib/jsonld.ts` → `buildPersonSchema` and `buildOrganizationSchema` still accurate

## File Inventory

### Human-Visible Pages

| File | Description |
|---|---|
| `src/pages/index.astro` | English homepage (`/`) |
| `src/pages/zh/index.astro` | Chinese homepage (`/zh/`) |
| `src/pages/projects/[slug].astro` | English project detail |
| `src/pages/zh/projects/[slug].astro` | Chinese project detail |

### React Islands

| File | Description |
|---|---|
| `src/islands/ArchiveMediaWall.tsx` | Archive photo wall (`react-photo-album` rows layout) |
| `src/islands/FilmMediaRail.tsx` | Horizontal film stills / posters rail |
| `src/islands/ProjectMediaLightbox.tsx` | Image preview overlay via `yet-another-react-lightbox` + Zoom plugin (pinch/double-tap zoom, carousel nav) |

### Agent-Visible Routes

| File | Description |
|---|---|
| `src/islands/AgentModeGate.tsx` | `?mode=agent` client gate (requires JS) |
| `src/islands/AgentView.tsx` | Full agent HTML panel (used by `AgentModeGate`) |
| `src/pages/agent.ts` | `/agent` JSON endpoint (`lib/agent-endpoint.ts`, en + zh) |
| `src/pages/llms.txt.ts` | `/llms.txt` — `lib/llms-txt.ts`, auto-generated from `content/*` |
| `src/pages/llms-full.txt.ts` | `/llms-full.txt` — `lib/site-markdown.ts` |
| `src/pages/index.md.ts` | `/index.md` — `lib/site-markdown.ts` |
| `src/pages/zh/index.md.ts` | `/zh/index.md` — `lib/site-markdown.ts` |
| `src/pages/projects/[slug].md.ts` | `/projects/:slug.md` — `lib/project-md.ts` + `lib/project-pages.ts` |
| `src/pages/zh/projects/[slug].md.ts` | `/zh/projects/:slug.md` — same modules, zh locale |

### Schema & Metadata

| File | Description |
|---|---|
| `lib/jsonld.ts` | Schema.org JSON-LD builders |
| `src/layouts/BaseLayout.astro` | Injects Person + WebSite JSON-LD |
| `@astrojs/sitemap` | Sitemap generator (excludes `.md` and `/agent`) |
| `scripts/write-headers.mjs` | Security + agent Link headers in `dist/_headers` |

## Operational Scripts

| Command | Purpose |
|---|---|
| `pnpm generate:images` | Regenerate AVIF `srcset` variants (`@400w/@800w/@1200w/@1920w` suffix) for `public/projects/` images wider than 1200px via sharp (`quality: 55, effort: 6, chromaSubsampling: "4:2:0"` — quality matches the commit-time source quality to avoid throwing bits on already-compressed AVIF); widths are imported from `lib/responsive-srcset.ts`. `--force` regenerates all. |
| `pnpm subset:fonts` | Subset Noto CJK fonts to the glyphs used in `src`/`content`/`lib`/`tests` (runs automatically on prebuild). |
| `pnpm apply:zone` | Apply Cloudflare Zone free-tier defaults, incl. HTTPS + www→apex redirect rules. Requires `CLOUDFLARE_API_TOKEN` with Zone Settings:Edit + Zone:Edit. See `docs/adr/0002-zone-layer-redirects.md`. |
| `pnpm verify:zone` | Post-deploy Zone redirect checks via curl; add `CLOUDFLARE_API_TOKEN` to also inspect the ruleset via API. |
| `pnpm verify:dist` | Assert the build output contains required files and no foreign artifacts. |

## Testing Agent Content

```bash
pnpm dev

curl -s "http://localhost:4321/agent" | jq '.locales.en.projects | length'
curl -s "http://localhost:4321/llms.txt" | grep -c "https://davidweng.eu.org/projects/"
curl -s "http://localhost:4321/llms-full.txt" | head -n 20
curl -s "http://localhost:4321/index.md" | head -n 10
```

## Testing Layout

Vitest runs two projects (`vitest.config.ts`): `unit` (jsdom) for lib modules and React islands, and `pages` (node) for `tests/pages/`, which render the shipping `.astro` layouts through the Astro Container API via `tests/helpers/render-astro.ts` — there are no hand-maintained page fixtures (see `docs/adr/0004`). Structure belongs in page tests; hydrated behavior belongs in island tests.

## Decisions & Issues

Architecture decisions and their rationale live in `docs/adr/`. Issues are tracked in GitHub Issues (`gh` CLI); triage labels: needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix.

## Cursor Cloud specific instructions

This is a static Astro 7 + React 19 site (pnpm). Standard commands live in `README.md` (`pnpm dev`, `pnpm test`, `pnpm lint:check`, `pnpm typecheck`, `pnpm build`) and `package.json` scripts; the agent-content checks live in **Testing Agent Content** above.

- **Node version gotcha:** the project requires Node `>=24` (see `package.json` `engines`, `.node-version` / `.nvmrc`). Node is managed with **`fnm`** (default alias `24`), wired into `~/.bashrc` via `eval "$(fnm env --use-on-cd)"`. Login/interactive shells and `tmux` (`bash -l`) resolve Node 24 automatically (and `--use-on-cd` re-reads `.node-version` when entering the repo). However, non-login shells (including direct Shell tool commands) do not source `~/.bashrc` and hit `/exec-daemon/node` (Node 22) first on `PATH`, which fails the engine check. For one-off commands, run them through a login shell (e.g. `bash -lc 'pnpm ...'`) or `eval "$(fnm env)"` first. `pnpm` is provided via `corepack` and is only on `PATH` once Node 24 is active.
- **Dev server:** `pnpm dev` serves at `http://localhost:4321`. It is a static site with no database or external service dependencies, so no extra services are needed.
- The site's top-nav `HOME` link points at the production URL (`https://davidweng.eu.org`), not the local dev server — this is expected, not a bug. Use the browser back button when navigating locally.
- **Production preview / routing:** production uses **assets-only** Workers Static Assets (`wrangler.jsonc` has no `main` script — static requests are free/unlimited). HTTPS and www→apex redirects live in Cloudflare Zone settings (`scripts/apply-cf-zone-free-tier.mjs`). Verify after deploy: `pnpm verify:zone` (add `CLOUDFLARE_API_TOKEN` to also inspect the ruleset via API). Redirect architecture rationale: `docs/adr/0002-zone-layer-redirects.md`. Astro emits directory-style output (`dist/index.html`, `dist/projects/<slug>/index.html`), so `assets.html_handling` MUST stay `"auto-trailing-slash"` (the default). Setting it to `"none"` breaks clean-URL routing — `/` and `/projects/<slug>/` return 404 while only `/index.html` works. To preview production routing locally, run `pnpm build` then `npx wrangler dev`. Production deploys happen automatically via Cloudflare's Git integration on push to the production branch — no manual `wrangler deploy` / credentials needed from the agent. **PR preview URLs** are enabled via `preview_urls: true` in `wrangler.jsonc`; Cloudflare posts a per-branch `*.workers.dev` link on each pull request (production stays on `davidweng.eu.org`).