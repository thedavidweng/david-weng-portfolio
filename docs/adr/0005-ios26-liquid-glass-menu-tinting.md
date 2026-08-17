# 0005 — Mobile menu color lives on non-sampled layers to defeat iOS 26 bar tinting

**Status:** accepted · **Date:** 2026-07-25

## Context

iOS 26 Safari (Liquid Glass) tints its top status/address bar and bottom toolbar by sampling the page's CSS: a `position: fixed`/`sticky` element within 4px of the top or 3px of the bottom edge, at least ~80% of viewport width, has its own `background-color` painted across the **entire** bar. `<meta name="theme-color">` is parsed but ignored on iOS 26 (still honored on iOS 15–18.6 and Android Chrome — keep it). There is no web-facing opt-out; WebKit closed the behavior "by design" (bug 300965). Sampling exempts `position: absolute` children of the fixed element and `::before`/`::after` pseudo-elements; `opacity: 0` and `visibility: hidden` do **not** exempt, only `display: none` does.

The mobile drawer (`min(86vw, 430px)`, `top: 0`, `height: 100dvh`, solid `--accent`) qualified for both bars, so opening the menu painted full-width red strips across the status bar and toolbar plus the red right column — an ugly "]" frame. A previous attempt (PR #26: dark theme-color + PWA standalone manifest) could not work in normal Safari browsing for the reason above.

## Decision

The elements Safari samples stay visually inert; color rides on layers Safari never samples:

- `.site-header__menu-panel` (the fixed `<dialog>`) has `background: transparent`; the red plane is its `::before`. Nav content sits in `.site-header__menu-panel-content` above it.
- `.site-header__menu-backdrop` (fixed, full-viewport) has `background: transparent`; the dark scrim is its `::before`.
- With both fixed overlays transparent, the bars fall back to the near-black `.site-header` / `body { background: var(--bg) }` — the chrome stays dark before, during, and after the 380ms slide (the red only ever moves horizontally; sampling reads element background, not painted pixels).

`tests/styles.test.ts` pins these invariants: restoring a background on either fixed shell, or `height: 100dvh` padding directly on the dialog, reintroduces the "]" artifact.

The same change fixes a latent reduced-motion bug: the global `animation: none !important` stranded the panel at `translate3d(100%)`; static `--open`/`--closed` states now apply the end positions without motion.

## Consequences

- The drawer's visual design is unchanged; only layering moved. Focus trap, inert management, and `dialog.show()` semantics are untouched.
- The fix relies on reverse-engineered sampling rules (Apple publishes none). If a future iOS samples composited descendant pixels instead of element backgrounds, the artifact returns — the worst case is today's status quo, and the invariant test plus this ADR mark where to revisit. Real-device verification on iOS 26 is required for any change to these blocks; the tint cannot be reproduced in simulators or jsdom.
- Do not add a PWA standalone manifest or JS `theme-color` swapping for this problem; both are proven no-ops on iOS 26 Safari.
