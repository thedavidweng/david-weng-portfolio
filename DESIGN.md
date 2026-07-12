# Design System — David Weng Portfolio

## Brand Personality

1. **Cult/Industrial** — intense, confident, avant-garde
2. **Trendy/High-Impact** — boundary-pushing, memorable
3. **Dark & Dramatic** — high contrast, editorial boldness

## Aesthetic Direction

- **Visual Tone:** Extreme contrast, dramatic, bold. Archival, brutalist structural elements like prominent indexing (`[01]`, `(01)`), copyright marks (`©`), and metadata used stylistically.
- **Palette:** Strict Black and Red pairing. Cult aesthetic relying on intense reds against deep blacks. Grays relegated to subtle structural elements or muted text, never competing with the red/black dichotomy.
- **Typography & Scale:** Massive, impactful typography as the primary graphic element. Small touches extremely precise.
- **Motion:** Dramatic staggered entrances. Sharp transitions, no soft easing.

## Design Principles

1. **Unapologetic Contrast:** Scale (massive type vs micro copy) and color (deep black vs aggressive red) create tension and drama.
2. **Industrial Precision:** No soft AI styles (glassmorphism, glowing purple gradients). Sharp edges, solid blocks, rigid grid breaking.
3. **Dramatic Pacing:** Motion and staggered entrances create striking first impressions.
4. **Cult Minimalism:** Restrain palette to Black and Red. Let emptiness do the heavy lifting.

## Color Tokens

All colors defined as CSS custom properties in `:root` of `src/styles/global.css`. Values use OKLCH for perceptual uniformity. Neutrals are tinted toward the brand hue (red, ~25° in OKLCH) — never pure #000 or #fff.

| Token | OKLCH | Usage |
|---|---|---|
| `--bg` | `oklch(0.012 0.008 25)` | Page background |
| `--bg-deep` | `oklch(0.005 0.008 25)` | Deepest black (footer, overlays) |
| `--bg-raised` | `oklch(0.025 0.008 25)` | Raised surfaces |
| `--text` | `oklch(0.995 0.004 25)` | Primary text |
| `--text-soft` | `oklch(0.656 0.005 25)` | Secondary text |
| `--text-faint` | `oklch(0.626 0.005 25)` | Tertiary text |
| `--text-on-accent` | `oklch(0.005 0.008 25)` | Text on red accent |
| `--accent` | `oklch(0.58 0.24 27)` | Brand red |
| `--accent-rgb` | `225, 29, 37` | RGB triplet for rgba() |
| `--accent-soft` | `rgba(225, 29, 37, 0.72)` | Soft red for borders/focus |
| `--accent-glow` | `rgba(225, 29, 37, 0.15)` | Red glow for backgrounds |
| `--line` | `rgba(255, 255, 255, 0.15)` | Hairline borders |
| `--line-strong` | `rgba(255, 255, 255, 0.3)` | Emphasized borders |

### Rules

- **Never** use hard-coded hex values (`#fff`, `#000`, etc.) in component CSS. Always reference tokens.
- **Never** use pure `#000000` or `#ffffff`. All neutrals are tinted toward the brand hue.
- Project cover gradients (`coverPalette`) are the only exception — they are per-project custom colors defined in `content/projects.ts`.

## Typography

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Outfit (100-900, `font-display: optional`) | Headlines, hero text |
| `--font-body` | Manrope (100-900, `font-display: optional`) | Body copy, UI text |
| `--font-home-zh` | Noto Sans SC (400/700/900, `font-display: optional`) | Chinese homepage |
| `--font-mono` | IBM Plex Mono (400/500/600, `font-display: swap`) | Metadata, code, labels |

All fonts are self-hosted as woff2 in `assets/fonts/`. CJK fonts are subsetted via `scripts/subset-cjk-fonts.mjs`.

## Spacing & Layout

- `--container: min(1440px, calc(100vw - 4rem))` — max content width
- Breakpoints: 360px, 520px, 760px, 1120px, 1260px
- All major text sizes use `clamp()` for fluid responsiveness
- `env(safe-area-inset-*)` used in header, mobile menu, lightbox, film rails

## Motion

| Token | Value | Usage |
|---|---|---|
| `--ease` | `220ms cubic-bezier(0.19, 1, 0.22, 1)` | Standard transitions |
| `--ease-slow` | `600ms cubic-bezier(0.19, 1, 0.22, 1)` | Slow, dramatic transitions |

### Rules

- All hover styles wrapped in `@media (hover: hover)` to prevent sticky hover on touch.
- `prefers-reduced-motion` disables all animations and transitions globally.
- `scroll-behavior: smooth` on `html`, disabled under `prefers-reduced-motion`.
- Animate `transform` and `opacity` only. Never animate layout properties (`width`, `height`, `top`, `left`).
- `filter: blur()` may be used statically but never animated (causes per-frame re-rasterization).

## Borders & Radius

- `--radius-xl: 0`, `--radius-lg: 0`, `--radius-md: 0`, `--radius-pill: 0`
- All corners are sharp (0px). This is intentional for the industrial aesthetic.
- The `.signal-panel::after` corner bracket is the only decorative border element, visible on focus/hover.

## Copy Rules

- **No em dashes** (`—`) in user-visible copy. Use commas, colons, semicolons, periods, or parentheses.
- For Chinese text, use full-width punctuation (，、：；。).
- Metadata labels use bracketed indexing: `[01]`, `(01)`, `©`.
- No AI copywriting voice ("not just X — it's Y", "seamless", "powerful", etc.).

## Anti-Patterns (Banned)

- Glassmorphism (`backdrop-filter: blur()` on permanent UI elements)
- Gradient text (`background-clip: text`)
- Colored side-stripe borders (rounded left-border callouts)
- Pastel rounded-square icon tiles
- Badge and pill spam
- All-caps card grids with identical styling
- Warm amber/stone "cozy" palettes
- Indigo-to-violet gradients
- Serif-italic emphasis on single words
- Decorative highlights and strikes on keywords
- Glowing status dots
- Oversized drop shadows
