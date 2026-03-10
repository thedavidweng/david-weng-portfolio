# Personal Website Homepage Redesign Design

**Date:** 2026-03-10
**Project:** `Personal-Website`
**Owner:** David Weng
**Status:** Approved for implementation planning

## Objective

Redesign the homepage into a professional portfolio landing page for a cross-media creative practitioner. The page should quickly establish who David Weng is, what kinds of work he does, why his process is valuable, and how potential employers or collaborators can take action.

The homepage should feel editorial and cinematic rather than blog-like. It must support hiring, collaboration, and research visibility without becoming text-heavy or academically framed.

## Primary Audiences

1. Potential employers hiring for video editing, content creation, graphic design, or content production roles.
2. Potential collaborators including brands, creative teams, AI communities, and media projects.
3. Visitors interested in research-adjacent work such as AI image-making, media experimentation, and cross-cultural storytelling.

## Success Criteria

1. A first-time visitor understands David's role and value proposition within the first screen.
2. The site clearly explains four core service areas in employer-facing language.
3. Featured work is easy to scan, filter, and open in depth.
4. The About section strengthens trust without interrupting the portfolio flow.
5. Contact actions remain clear on desktop and mobile.
6. The page remains fast despite heavy visual media.

## Positioning

### Core Identity

David Weng is a versatile digital content creator working across video editing, photography, graphic design, and content operations. His differentiator is the ability to take a project from concept through production and delivery while integrating AI thoughtfully into the workflow.

### Tone

- English-first
- Clear and concise
- Professional and credible
- Visual-industry literate
- Confident without sounding inflated

## Visual Direction

### Design Goal

Create a clean, modern landing page with cinematic atmosphere. The interface should use strong image blocks, structured whitespace, restrained typography, and purposeful contrast.

### Visual Principles

1. Use large visual surfaces and bold alignment rather than decorative complexity.
2. Keep typography sharp and editorial.
3. Let imagery carry emotion; let layout carry clarity.
4. Use hover and motion sparingly, but make them feel intentional.
5. Preserve the same brand mood across desktop, tablet, and phone.

### Suggested Look and Feel

- Background: warm off-white or near-black depending on section contrast, not flat pure white everywhere
- Accent color: one restrained cinematic accent such as muted red, steel blue, or warm amber
- Type pairing: expressive serif or grotesk headline paired with a clean sans for metadata and body copy
- Motion: slow fade, lift, parallax restraint, staggered reveal, project-card deformation on hover

## Information Architecture

### 1. Hero / Positioning

Purpose:
Introduce David immediately and frame him as a visual storyteller and systems-minded creative operator.

Content:
- Name: `David Weng` or `David (Jiachen) Weng`
- Role line: `Video Editor, Photographer, Graphic Designer, ContentOps`
- Primary headline
- One supporting sentence
- Primary CTA: `View Selected Work`
- Secondary CTA: `Contact` or `View Resume`

Recommended message:
`I build visual stories, content systems, and creative workflows from concept to delivery.`

### 2. What I Do

Purpose:
Translate broad creative practice into four concrete value areas that hiring managers and collaborators can understand quickly.

Content:
- Section intro
- Four service cards

Recommended service categories:
1. Video Editing & Post-Production
2. Photography & Visual Storytelling
3. Graphic & Brand Design
4. AI-Integrated Creative Workflows

Each card should explain the outcome for collaborators rather than list tools or software.

### 3. Selected Projects

Purpose:
Act as the proof layer of the homepage. This is the main conversion surface after the hero.

Content:
- Section intro
- Filter bar
- Screen-filling project wall
- Project cards with hover states

Recommended project filters:
- All
- Film
- Client Work
- Research
- Experimental
- Design

Card behavior:
- Default: only title, type, and a short teaser are visible
- Hover: card lifts or subtly distorts, metadata expands, overlay becomes more legible
- Click: opens project detail view

### 4. Project Detail View

Purpose:
Provide depth without making the homepage itself heavy.

Format:
- Full-screen modal or dedicated route

Required content:
- Title
- Project type
- Roles and contributions
- One to two sentence summary
- One to two highlight bullets
- Media gallery or embeds
- External links

Supported media:
- Images
- Video
- PDF preview or linked case-study asset
- External platforms such as YouTube, Bilibili, IMDb, web pages, blog posts, or papers

### 5. About / Background

Purpose:
Provide credibility, context, and a fuller narrative for people evaluating fit.

Content:
- More complete biography
- Cross-disciplinary practice
- AI-integrated process
- Research or teaching interests where relevant
- Buttons: `View CV`, `View Resume`, `LinkedIn`

This section should read as a professional framing paragraph, not a memoir.

### 6. Contact / CTA

Purpose:
Turn visitor interest into inquiry.

Content:
- Strong section heading
- Short sentence about the types of work David is open to
- Primary email button
- Secondary platform links

Suggested inquiry examples:
- freelance video editing
- event recap
- campaign video
- branded content
- AI film experiments

### 7. Footer

Purpose:
Close the page cleanly and reinforce the brand.

Content:
- copyright
- optional short closing line

## Suggested Copy Framework

### Hero

- Kicker: `Visual storytelling, design, and creative systems`
- Headline: `I build visual stories, content systems, and creative workflows that move from concept to delivery.`
- Support: `I work across video production, photography, graphic design, and AI-integrated workflows for brands, teams, and independent projects.`

### What I Do

- Section intro: `Creative production with editorial clarity, visual precision, and AI-aware execution.`
- Video card: `I shape footage into clear, emotionally paced stories for campaigns, short films, and platform-native content.`
- Photography card: `I create images that carry narrative weight for editorial, event, portrait, and visual world-building work.`
- Design card: `I build visual systems that help projects look consistent, credible, and ready for release.`
- AI card: `I use AI to accelerate ideation, streamline production, and prototype new formats without giving up creative control.`

### Contact

- Lead: `I am open to freelance, contract, and collaborative projects in editing, campaign content, event recap, and AI-driven visual experimentation.`

## Interaction Model

### Desktop

- Sticky or minimally persistent top navigation
- Hover-responsive project wall
- Full-screen project details with next and previous navigation

### Mobile

- Reduced hover dependence
- Tap-first cards with clearer labels
- Filter bar collapses into chips or horizontal scroll
- Project details stack vertically and prioritize fast loading

## Content Model

Each project entry should support:

- `title`
- `slug`
- `category`
- `year`
- `summary`
- `roles[]`
- `highlights[]`
- `coverImage`
- `thumbnail`
- `media[]`
- `externalLinks[]`
- `featured`

Each media item should support:

- `type` such as `image`, `video`, `pdf`, `embed`
- `src`
- `poster`
- `alt`
- `caption`

## Performance Standards

1. Prioritize fast first paint with a static hero image or optimized poster instead of autoplay video by default.
2. Lazy-load below-the-fold images and all media-heavy detail views.
3. Use thumbnails for PDFs and deferred embeds for video.
4. Optimize image sizes by viewport and card density.
5. Avoid layout shift by locking aspect ratios for media surfaces.

## Accessibility Standards

1. Maintain strong contrast across image overlays.
2. Ensure every project card remains keyboard accessible.
3. Provide descriptive alt text for non-decorative visuals.
4. Respect reduced-motion preferences.
5. Keep CTA labels explicit rather than abstract.

## Open Content Dependencies

Implementation will require the following content from David:

1. Final biography copy or LinkedIn profile source
2. Resume and CV links
3. Contact email and chosen platform links
4. Project list with categories, roles, and external destinations
5. Cover images and thumbnails sized for grid display

## Recommendation

Implement the homepage as a polished single-page experience with separate project detail routes or modal states backed by a structured content model. This gives the site strong first-impression clarity now while leaving room to scale into a fuller portfolio later.
