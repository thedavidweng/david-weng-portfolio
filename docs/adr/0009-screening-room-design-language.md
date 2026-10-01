# 0009 — Screening Room: one design language from two sites

**Status:** accepted · **Date:** 2026-10-01 · **Amends:** 0008 (visual style only)

## Context

ADR 0008 brought the standalone software homepage's behavior (theme toggle, ⌘K palette, live GitHub data) into the portfolio but kept the portfolio's black-and-red poster look everywhere. An earlier attempt did the opposite and moved everything onto the software homepage's rounded style. Both read as one site copied into the other: the imported parts looked foreign.

## Decision

One rule decides which side each element comes from: **the room is quiet, the screen is loud.**

- Chrome and reading text use the software homepage's system: Mona Sans body, 80rem column, pill controls, status pill, indexed section heads, solid hairlines, surfaces with a pointer spotlight.
- Work being shown uses the portfolio's system: Outfit 900 uppercase poster titles, square frames, the horizontal project rail, mono indices, the red corner bracket.
- Frames are always square; controls are always pills.
- Red is reserved for signals (REC mark, indices, status dot, corner bracket, hover, the contact accent line) and is never a large fill.
- Light mode is a first-class theme with warm neutrals, not an inverted dark theme. Screens (covers, monitor, terminal, lightbox) stay dark in both themes.

Manrope is replaced by Mona Sans; Outfit, Noto Sans SC, and IBM Plex Mono stay.

## Consequences

- `DESIGN.md` documents the shape rules, signature components, and the new tokens.
- The homepage, `/software/`, contact, 404, header, palette, and footer share the same components (`SectionHead`, `.frame-card`, `.button`, `.status-pill`). Project detail pages keep their layouts and pick up the new tokens and buttons.
- Legacy home selectors (`.hero`, `.site-main--home .*`, `--home-stage-gutter`) are gone, and style tests assert the new rules.
