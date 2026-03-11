# Homepage IA Cleanup Design

**Date:** 2026-03-11

**Scope**
- Remove the `David's Blog` project from the homepage project system.
- Add a top-level `Blog` navigation link pointing to `https://blog.davidweng.eu.org/`.
- Reframe the `Transcending Barriers` detail page as an article landing page instead of a poster-style project page.
- Remove the duplicate `Available on` section from film/video detail pages when the same links already appear in the hero.

**Problem Summary**
- `David's Blog` behaves more like a persistent site destination than a portfolio project, so showing it in the project reel duplicates site navigation.
- The `external-handoff` project layout currently reuses the oversized poster-style project title, which is visually awkward for long-form article titles.
- Film/video pages duplicate external link affordances in both the hero and the lower `Available on` section.

**Approved Direction**
- Keep portfolio projects focused on archival, film, research, and client work. Move blog access to the header.
- Treat article-style projects as editorial landing pages with a normal reading-scale title, clearer publication metadata, and a single primary CTA.
- For film/video projects, keep the hero CTA row as the canonical external link area and remove the repeated lower section.

**Implementation Notes**
- The header navigation needs to support both internal anchors and external absolute URLs.
- Tests should lock the new information architecture so the blog project cannot reappear accidentally.
- The article landing page refinement should be implemented with specific `external-handoff` CSS overrides rather than changing all project hero pages.
