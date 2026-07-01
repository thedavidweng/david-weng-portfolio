# Agent Guidelines — David Weng Portfolio

This project serves both human visitors and AI agents. The human-visible UI and agent-visible endpoints draw from the same content sources where possible.

## Agent-Visible Endpoints

| Endpoint | Format | Purpose | Human Equivalent |
|---|---|---|---|
| `/?mode=agent` | HTML (semantic, **requires JavaScript**) | Agent-optimized homepage view via `AgentModeGate` island | `src/pages/index.astro` / `src/pages/zh/index.astro` |
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
| `content/site.ts` | `src/pages/*.astro`, `src/islands/AgentView.tsx`, `src/pages/agent.ts`, `lib/llms-full.ts`, `lib/index-md.ts`, `lib/jsonld.ts` |
| `content/projects.ts` | `src/pages/projects/*.astro`, `src/islands/AgentView.tsx`, `src/pages/agent.ts`, `lib/llms-txt.ts`, `lib/llms-full.ts`, `lib/index-md.ts` |
| `content/film-data.ts` | Film project detail pages, archive layouts |
| `content/archives/*.ts` | Archive project pages, agent project listings |

### Dual-Maintenance Content

| File | Hardcoded Section | Human Equivalent | Drift Risk |
|---|---|---|---|
| `lib/jsonld.ts` | `knowsAbout` array (7 topic strings) | `content/site.ts` → `servicesContent.items` | **MEDIUM** |
| `lib/jsonld.ts` | `sameAs` array | `content/site.ts` contact links | **LOW** |

`lib/llms-txt.ts` now auto-generates from `content/projects.ts` — no manual sync needed.

## Modification Checklist

### When adding, removing, or renaming a project

- [ ] Update `content/projects.ts` (canonical source)
- [ ] Run `pnpm generate:carousel` and commit `content/carousel-projects.ts` (CI fails if stale)
- [ ] Verify `lib/llms-txt.ts` auto-renders the new project
- [ ] Verify `lib/llms-full.ts` auto-renders the new project
- [ ] Verify `lib/index-md.ts` auto-renders the new project
- [ ] Verify `src/pages/agent.ts` auto-includes the new project
- [ ] Verify `src/islands/AgentView.tsx` auto-includes the new project
- [ ] If the project has a film detail page, check `content/film-data.ts`
- [ ] If the project has an archive, check `content/archives/*.ts`

### When modifying services (What I Do)

- [ ] Update `content/site.ts` → `servicesContent.items` (canonical source)
- [ ] Verify agent endpoints auto-render new services
- [ ] If the service represents a **new domain** not in the existing 7 topics, update `lib/jsonld.ts` → `knowsAbout` array

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
| `src/pages/llms.txt.ts` | `/llms.txt` — auto-generated from `content/projects.ts` |
| `src/pages/llms-full.txt.ts` | `/llms-full.txt` — auto-generated |
| `src/pages/index.md.ts` | `/index.md` — auto-generated |
| `src/pages/zh/index.md.ts` | `/zh/index.md` — auto-generated |
| `src/pages/projects/[slug].md.ts` | `/projects/:slug.md` — auto-generated |
| `src/pages/zh/projects/[slug].md.ts` | `/zh/projects/:slug.md` — auto-generated |

### Schema & Metadata

| File | Description |
|---|---|
| `lib/jsonld.ts` | Schema.org JSON-LD builders |
| `src/layouts/BaseLayout.astro` | Injects Person + WebSite JSON-LD |
| `@astrojs/sitemap` | Sitemap generator (excludes `.md` and `/agent`) |
| `scripts/write-headers.mjs` | Security + agent Link headers in `dist/_headers` |

## Testing Agent Content

```bash
pnpm dev

curl -s "http://localhost:4321/agent" | jq '.locales.en.projects | length'
curl -s "http://localhost:4321/llms.txt" | grep -c "https://davidweng.eu.org/projects/"
curl -s "http://localhost:4321/llms-full.txt" | head -n 20
curl -s "http://localhost:4321/index.md" | head -n 10
```

## Agent skills

### Issue tracker

GitHub Issues — skills use `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

## Cursor Cloud specific instructions

This is a static Astro 7 + React 19 site (pnpm). Standard commands live in `README.md` (`pnpm dev`, `pnpm test`, `pnpm lint:check`, `pnpm typecheck`, `pnpm build`) and `package.json` scripts; the agent-content checks live in **Testing Agent Content** above.

- **Node version gotcha:** the project requires Node `>=24` (see `package.json` `engines`, `.node-version` / `.nvmrc`). Node is managed with **`fnm`** (default alias `24`), wired into `~/.bashrc` via `eval "$(fnm env --use-on-cd)"`. Login/interactive shells and `tmux` (`bash -l`) resolve Node 24 automatically (and `--use-on-cd` re-reads `.node-version` when entering the repo). However, non-login shells (including direct Shell tool commands) do not source `~/.bashrc` and hit `/exec-daemon/node` (Node 22) first on `PATH`, which fails the engine check. For one-off commands, run them through a login shell (e.g. `bash -lc 'pnpm ...'`) or `eval "$(fnm env)"` first. `pnpm` is provided via `corepack` and is only on `PATH` once Node 24 is active.
- **Dev server:** `pnpm dev` serves at `http://localhost:4321`. It is a static site with no database or external service dependencies, so no extra services are needed.
- The site's top-nav `HOME` link points at the production URL (`https://davidweng.eu.org`), not the local dev server — this is expected, not a bug. Use the browser back button when navigating locally.
- **Production preview / routing:** production uses **assets-only** Workers Static Assets (`wrangler.jsonc` has no `main` script — static requests are free/unlimited). HTTPS and www→apex redirects live in Cloudflare Zone settings (`scripts/apply-cf-zone-free-tier.mjs`). Verify after deploy: `pnpm verify:zone` (add `CLOUDFLARE_API_TOKEN` to also inspect the ruleset via API). `workers/site.mjs` is kept as a legacy reference only. Astro emits directory-style output (`dist/index.html`, `dist/projects/<slug>/index.html`), so `assets.html_handling` MUST stay `"auto-trailing-slash"` (the default). Setting it to `"none"` breaks clean-URL routing — `/` and `/projects/<slug>/` return 404 while only `/index.html` works. To preview production routing locally, run `pnpm build` then `npx wrangler dev`. Production deploys happen automatically via Cloudflare's Git integration on push to the production branch — no manual `wrangler deploy` / credentials needed from the agent. **PR preview URLs** are enabled via `preview_urls: true` in `wrangler.jsonc`; Cloudflare posts a per-branch `*.workers.dev` link on each pull request (production stays on `davidweng.eu.org`).