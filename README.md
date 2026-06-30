# David Weng Portfolio

Portfolio site of David, focused on visual storytelling, design, content operations, and AI-integrated creative workflows.

## Stack

- Astro 5 (static output)
- React 19 islands (Header, Projects carousel, media lightbox)
- TypeScript
- Cloudflare static assets (`wrangler deploy`)
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