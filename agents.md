# Agent Guidelines — David Weng Portfolio

This project serves both human visitors and AI agents. The human-visible UI and agent-visible endpoints draw from the same content sources where possible, but some agent-specific files contain hardcoded summaries that can drift out of sync. When you modify human-visible content, you MUST verify that the corresponding agent-visible content stays consistent.

## Agent-Visible Endpoints

| Endpoint | Format | Purpose | Human Equivalent |
|---|---|---|---|
| `/?mode=agent` | HTML (semantic) | Agent-optimized homepage view | `app/[locale]/page.tsx` → `HomePageView` |
| `/agent` | `application/json` | Machine-readable site data | Same as above |
| `/llms.txt` | `text/plain` | LLM discovery file (AI equivalent of robots.txt) | Homepage overview |
| `/llms-full.txt` | `text/plain` | Complete site docs in one file | Entire site |
| `/index.md` | `text/markdown` | Markdown version of homepage | Homepage |

## Content Architecture

### Single-Source Content (modify once, synced everywhere)

The following files are the **canonical source of truth**. Agent endpoints and human UI both import from them. When you modify these, the agent-visible content updates automatically — **no extra steps needed**.

| Source File | Consumed By |
|---|---|
| `content/site.ts` | `app/[locale]/page.tsx` (human UI), `components/pages/AgentView.tsx`, `app/agent/route.ts`, `app/llms-full.txt/route.ts`, `app/index.md/route.ts`, `lib/jsonld.ts` |
| `content/projects.ts` | `app/[locale]/projects/[slug]/page.tsx`, `components/pages/AgentView.tsx`, `app/agent/route.ts`, `app/llms-full.txt/route.ts`, `app/index.md/route.ts` |
| `content/film-data.ts` | Film project detail pages, archive layouts |
| `content/archives/*.ts` | Archive project pages, `AgentView` project listings |

### Dual-Maintenance Content (modify human UI AND agent files)

The following files contain **hardcoded text** that does NOT auto-sync from `content/`. When you change the corresponding human-visible content, you MUST update these manually.

| Agent File | Hardcoded Section | Human Equivalent | Drift Risk |
|---|---|---|---|
| `app/llms.txt/route.ts` | Project list (titles, URLs, descriptions) | `content/projects.ts` | **HIGH** — adding/removing/renaming a project will make `llms.txt` stale |
| `lib/jsonld.ts` | `knowsAbout` array (7 topic strings) | `content/site.ts` → `servicesContent.items` | **MEDIUM** — adding a new service category requires updating the schema |
| `lib/jsonld.ts` | `jobTitle` derived from `siteIdentity.roles` | `content/site.ts` | **LOW** — auto-synced via `getLocalizedValue`, but verify if roles change |

## Modification Checklist

Before marking any content change as complete, run through this checklist:

### When adding, removing, or renaming a project

- [ ] Update `content/projects.ts` (canonical source)
- [ ] Update `app/llms.txt/route.ts` — match the project list, URLs, descriptions, and categorization (Client Work / Film / Video / Writing)
- [ ] Verify `app/llms-full.txt/route.ts` auto-renders the new project (it pulls from `content/projects.ts` — no edit needed unless you changed field names)
- [ ] Verify `app/index.md/route.ts` auto-renders the new project (same as above)
- [ ] Verify `app/agent/route.ts` auto-includes the new project (same as above)
- [ ] Verify `components/pages/AgentView.tsx` auto-includes the new project (same as above)
- [ ] If the project has a film detail page, check `content/film-data.ts`
- [ ] If the project has an archive, check `content/archives/*.ts`

### When modifying services (What I Do)

- [ ] Update `content/site.ts` → `servicesContent.items` (canonical source)
- [ ] Verify `app/llms-full.txt/route.ts` auto-renders new services (pulls from `content/site.ts`)
- [ ] Verify `app/index.md/route.ts` auto-renders new services
- [ ] Verify `app/agent/route.ts` auto-includes new services
- [ ] Verify `lib/jsonld.ts` → `hasOfferCatalog` auto-syncs (pulls from `servicesContent.items`)
- [ ] If the service represents a **new domain** not in the existing 7 topics, update `lib/jsonld.ts` → `knowsAbout` array
- [ ] Update `app/llms.txt/route.ts` → "Overview" section if the service descriptions changed

### When modifying identity (name, roles, location, contact)

- [ ] Update `content/site.ts` → `siteIdentity`, `contactContent`, `heroContent` (canonical source)
- [ ] Verify `app/llms.txt/route.ts` → "Overview" and "Contact" sections still match
- [ ] Verify `lib/jsonld.ts` → `buildPersonSchema` and `buildOrganizationSchema` still accurate (most fields auto-sync, but `sameAs` array and `knowsAbout` are hardcoded)

### When modifying About / Background text

- [ ] Update `content/site.ts` → `aboutContent` (canonical source)
- [ ] Verify `app/llms-full.txt/route.ts` auto-renders new about text
- [ ] Verify `app/index.md/route.ts` auto-renders new about text
- [ ] Update `app/llms.txt/route.ts` → "Overview" section if the summary description changed

### When modifying navigation or external links

- [ ] Update `content/site.ts` → `navigationItems` (canonical source)
- [ ] Verify `components/pages/AgentView.tsx` auto-renders new nav (pulls from `content/site.ts`)
- [ ] Verify `app/index.md/route.ts` auto-renders new nav
- [ ] Verify `app/llms-full.txt/route.ts` auto-renders new nav

## File Inventory

### Human-Visible Pages

| File | Description |
|---|---|
| `app/[locale]/page.tsx` | Locale homepage (`/en/`, `/zh/`) — renders `HomePageView` or `AgentView` when `?mode=agent` |
| `app/page.tsx` | Root redirect to `en` |
| `app/[locale]/projects/[slug]/page.tsx` | Project detail page |
| `components/pages/HomePageView.tsx` | Human UI for homepage |

### Agent-Visible Routes

| File | Description |
|---|---|
| `components/pages/AgentView.tsx` | `?mode=agent` HTML view. Pulls from `content/site.ts` and `content/projects.ts`. |
| `app/agent/route.ts` | `/agent` JSON endpoint. Pulls from `content/site.ts` and `content/projects.ts`. |
| `app/llms.txt/route.ts` | `/llms.txt` — **hardcoded project list**. Must be manually kept in sync with `content/projects.ts`. |
| `app/llms-full.txt/route.ts` | `/llms-full.txt` — auto-generated from `content/site.ts` and `content/projects.ts`. |
| `app/index.md/route.ts` | `/index.md` — auto-generated from `content/site.ts` and `content/projects.ts`. |

### Schema & Metadata

| File | Description |
|---|---|
| `lib/jsonld.ts` | Schema.org JSON-LD builders. `buildPersonSchema`, `buildOrganizationSchema`, `buildWebSiteSchema`, `buildCreativeWorkSchema`. Partially auto-synced from `content/site.ts`, but `knowsAbout` is hardcoded. |
| `app/layout.tsx` | Injects `Person` and `WebSite` JSON-LD into `<body>`. |
| `app/sitemap.ts` | Sitemap generator. Auto-synced from `content/projects.ts`. |
| `next.config.ts` | HTTP `Link` headers pointing to agent endpoints (`/llms.txt`, `/llms-full.txt`, `/index.md`, `/agent`). |

## Red Flags (Do Not Ignore)

1. **Project count mismatch**: If `content/projects.ts` has 8 projects but `llms.txt` only lists 7, the agent file is stale.
2. **URL drift**: If a project `slug` changes in `content/projects.ts`, the hardcoded URLs in `llms.txt` will 404.
3. **Service category missing from schema**: Adding "Motion Graphics" to services but not adding it to `knowsAbout` in `lib/jsonld.ts` makes the schema incomplete.
4. **Contact info divergence**: Email or social links changed in `content/site.ts` but not reflected in `llms.txt` "Contact" or "External Profiles" sections.

## Testing Agent Content

After any content change, verify the agent endpoints locally:

```bash
# Start dev server
pnpm dev

# In another terminal:
curl -s "http://localhost:3000/agent" | jq '.projects | length'
curl -s "http://localhost:3000/llms.txt" | grep -c "https://davidweng.eu.org/projects/"
curl -s "http://localhost:3000/llms-full.txt" | head -n 20
curl -s "http://localhost:3000/index.md" | head -n 10
curl -s "http://localhost:3000/?mode=agent" | grep -o "<h3>" | wc -l  # should match service count
```

## Adding a New Agent Endpoint

If you introduce a new agent-visible route (e.g. `/feed.json`, `/api/projects`), update this file and `next.config.ts` HTTP Link headers so agents can discover it.
