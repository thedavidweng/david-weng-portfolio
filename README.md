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
bun install
bun run dev
```

## Verification

```bash
bun run test
bun run lint:check
bun run typecheck
bun run build
```

## Deploy

```bash
bun run deploy
```
