# Design System — David Weng Portfolio

## Concept: The Screening Room

The site merges two earlier designs: the calm, readable software homepage and the cult-film poster portfolio. The rule that holds them together: **the room is quiet, the screen is loud.**

- **The room** (chrome, reading text, controls) comes from the software homepage: Mona Sans, generous spacing, a 80rem column, pill controls, a status pill, indexed section heads, soft surfaces, and a spotlight on hover.
- **The screen** (what is being shown) comes from the portfolio: Outfit 900 uppercase poster titles, square frames, the horizontal project rail with full-bleed covers, mono indices, and the red corner bracket.
- **Red is a signal, not a fill.** It marks the REC square in the header, section indices, the status dot, the corner bracket, hover states, and the second line of the contact title. Large red surfaces are not used.

## Aesthetic Direction

- **Visual Tone:** Editorial and precise with moments of drama. Poster type carries the drama; everything around it stays calm so the poster reads.
- **Palette:** Warm neutral black or off-white, near-black or near-white ink, one red. Grays sit between them for lines and secondary text.
- **Typography & Scale:** One poster title per page (PORTFOLIO, SOFTWARE, 404, the contact title), sized to the column width. Everything else is set in Mona Sans at reading sizes.
- **Motion:** Short, quiet transitions (`cubic-bezier(0.2, 0, 0, 1)`). The hero rises in once; the status dot pulses; the terminal caret blinks.

## Shape Rules

| Element | Shape |
|---|---|
| Frames: project covers, cards (`.frame-card`), monitor, terminal, media | Square (0 radius) |
| Controls: buttons, filter chips, nav links, header controls, social links, status pill | Pill (`--radius-pill: 999px`) |
| Signals: REC mark, status dot, legend swatches | Square |

A frame shows work; a pill is something you press. Do not mix them on one element.

## Signature Components

| Component | Class | Notes |
|---|---|---|
| Poster title | `.poster` | Outfit 900, uppercase, `line-height: 0.84`. Size with `calc(var(--container) / N)` so the word fills the column. |
| Status pill | `.status-pill` | Square red dot plus live text (latest GitHub push). Links to `/software/` on the homepage. |
| Section head | `SectionHead.astro` / `.section-head` | Red mono index `(NN)`, title, optional intro in the second column. |
| Frame card | `.frame-card` inside `.frame-grid[data-spotlight]` | Square card with a pointer spotlight (`--mx`/`--my`, set by `initSpotlight()` in `src/scripts/ui.ts`) and a red corner bracket on hover. |
| Buttons | `.button`, `.button--signal`, `.button--small` | `--signal` is filled with ink and turns red on hover. Only one signal button per group. |
| Screens | `.monitor`, `.terminal`, project covers | Always `color-scheme: dark`, in both themes. |

## Color Tokens

All colors are CSS custom properties in `:root` of `src/styles/global.css`, declared with `light-dark()`. Neutrals are tinted toward the brand hue (~25° in OKLCH), never pure black or white.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--bg` | `oklch(0.988 0.002 25)` | `oklch(0.165 0.004 25)` | Page background |
| `--bg-deep` | `oklch(0.955 0.003 25)` | `oklch(0.13 0.004 25)` | Terminal, deepest surfaces |
| `--bg-raised` | `oklch(0.965 0.003 25)` | `oklch(0.215 0.005 25)` | Current nav item, hover rows |
| `--surface` | `oklch(1 0 0)` | `oklch(0.19 0.005 25)` | Cards, buttons, palette |
| `--line` / `--line-strong` | `oklch(0.915 …)` / `oklch(0.86 …)` | `oklch(0.265 …)` / `oklch(0.33 …)` | Solid hairlines |
| `--text` (`--ink`) | `oklch(0.2 0.006 25)` | `oklch(0.95 0.004 25)` | Primary text |
| `--text-soft` / `--text-faint` | | | Secondary and tertiary text |
| `--accent` | `oklch(0.55 0.22 27)` | `oklch(0.64 0.21 27)` | Brand red (signal only) |
| `--spot` | `color-mix(in srgb, var(--accent) 7%, transparent)` | | Spotlight gradient on frame cards |
| `--shadow-1` / `--shadow-2` | | | Small lift on hover; palette dialog |

The header toggle and the ⌘K palette set `data-theme` on `<html>`; without a stored choice the site follows the OS. `--paper` is the fixed light color for text on red. See `docs/adr/0008` and `docs/adr/0009`.

### Rules

- **Never** use hard-coded hex values in component CSS. Always reference tokens.
- Project cover gradients (`coverPalette`) in `content/projects.ts` are the only exception.

## Typography

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Outfit (100-900, `font-display: optional`) | Poster titles, project titles |
| `--font-body` | Mona Sans (200-900, `font-display: optional`) | Body copy, UI text, section titles |
| `--font-home-zh` | Noto Sans SC (400/700/900, `font-display: optional`) | Chinese text |
| `--font-mono` | IBM Plex Mono (400/500/600, `font-display: swap`) | Indices, metadata, terminal |

All fonts are self-hosted as woff2 in `assets/fonts/`. CJK fonts are subsetted via `scripts/subset-cjk-fonts.mjs`.

## Spacing & Layout

- `--gutter: clamp(1.25rem, 5vw, 2.5rem)`; `--container: min(80rem, calc(100vw - 2 * var(--gutter)))`
- The project rail bleeds past the column to the right edge of the viewport.
- Breakpoints: 760px (mobile header, single-column cards), 1120px
- `env(safe-area-inset-*)` used in header, gutter (left/right), footer, lightbox, film rails
- On `(pointer: coarse)` every standalone control is at least 44px tall; inline text links are exempt

## Motion

| Token | Value | Usage |
|---|---|---|
| `--ease` | `220ms cubic-bezier(0.2, 0, 0, 1)` | Standard transitions |
| `--ease-slow` | `600ms cubic-bezier(0.2, 0, 0, 1)` | Slow transitions |

- All hover styles wrapped in `@media (hover: hover)`.
- `prefers-reduced-motion` disables all animations and transitions globally.
- Animate `transform` and `opacity` only.

## Copy Rules

- **No em dashes** (`—`) in user-visible copy.
- For Chinese text, use full-width punctuation (，、：；。).
- Metadata labels use indexing: `(01)`, `[01]`, `©`.
- No AI copywriting voice ("not just X, it's Y", "seamless", "powerful", etc.).

## Anti-Patterns (Banned)

- Glassmorphism (`backdrop-filter: blur()` on permanent UI elements)
- Gradient text (`background-clip: text`)
- Rounded cards or rounded media frames
- Large red fills or red backgrounds behind text blocks
- More than one poster title per viewport
- Tag and pill spam: tags belong in cards, not in headings
- Indigo-to-violet gradients, pastel icon tiles
- Serif-italic emphasis on single words
- Glows around status dots; the dot pulses with opacity and scale only
- Oversized drop shadows
