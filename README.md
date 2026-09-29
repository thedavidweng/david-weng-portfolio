# David Weng Portfolio

Portfolio site of David, focused on visual storytelling, design, content operations, and AI-integrated creative workflows.

## Stack

- Astro 7 (static output)
- React 19 islands (Header, Projects carousel, project media gallery + `yet-another-react-lightbox` zoom preview)
- TypeScript
- Cloudflare Workers Static Assets (`cf deploy`, assets-only — no Worker script)
- Vitest + Testing Library

## Local Development

```bash
pnpm install
pnpm dev
```

## Verification

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
