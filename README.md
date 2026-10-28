# David Weng Portfolio

Portfolio site of David, focused on visual storytelling, design, content operations, and AI-integrated creative workflows.

## Stack

- Astro 7 (static output)
- React 19 islands (Projects carousel, project media gallery + `yet-another-react-lightbox` zoom preview)
- Static Astro header, ⌘K command palette, and light/dark theme via small scripts in `src/scripts/`
- TypeScript
- Cloudflare Workers Static Assets (`cf deploy`, assets-only — no Worker script)
- Vitest + Testing Library

## Local Development

```bash
pnpm install
pnpm dev
```

## Verification

Tests exercise rendered pages, interactions, and generated responses. Verify deployment routing with `pnpm verify:zone` after deploys.

```bash
pnpm test
pnpm lint:check
pnpm typecheck
pnpm build
```

## Deploy

```bash
pnpm deploy
```
