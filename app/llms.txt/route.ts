import { NextResponse } from "next/server";

const llmsTxt = `# David Weng — Portfolio

> Portfolio of David Weng — video editing, photography, graphic design, and content operations. Based in Vancouver, working globally.

## Overview

David Weng is a visual content creator specializing in:

- Video editing and post-production (commercial campaigns, event recaps, short-form video, social-first content)
- Photography and visual storytelling (portraits, live events, editorial coverage)
- Graphic and brand system design (visual systems, content design, guidelines)
- AI-integrated experimental work (image-making, visual prototyping, content operations acceleration)

## Projects

Selected work spanning archive collections, published writing, and video projects:

### Client Work
- [Beaty Biodiversity Museum Archive](https://davidweng.eu.org/projects/beaty-biodiversity-museum-annual-report-2022-2023) — Booklet, signage, report, and video work for the Beaty Biodiversity Museum (2023)
- [BC + AI Ecosystem Design](https://davidweng.eu.org/projects/designs-for-bc-ai-ecosystem) — Social graphics, slides, event photos, and design work (2026)
- [TheUpgrade.AI Visual Work](https://davidweng.eu.org/projects/designs-for-theupgrade-ai) — Posters, social graphics, and brand visuals (2026)

### Film
- [FRAÜD](https://davidweng.eu.org/projects/fraud) — Narrative short film about debt, manipulation, and fraud among international students (2024)
- [The Pills](https://davidweng.eu.org/projects/the-pills) — Horror microfilm (2023)
- [Gourd](https://davidweng.eu.org/projects/gourd) — Student short film, loosely adapted from Shiga Naoya's "The Artist" (2020)

### Video
- [Commissioned Video Work](https://davidweng.eu.org/projects/commissioned-video-work) — Event recaps, promotional content (2026)
- [Personal Video Projects](https://davidweng.eu.org/projects/personal-video-projects) — Campaign edits, short films, experiments (2026)

### Writing
- [Transcending Barriers](https://davidweng.eu.org/projects/transcending-barriers) — Published article on transnational viewing practices and media circulation (Beacon: Journal of Media Studies, 2024)

## Roles & Responsibilities

- Direction, writing, editing (film)
- Graphic design, editorial layout, archive curation (client work)
- Video editing, motion graphics (commissioned video)

## External Profiles

- LinkedIn: https://www.linkedin.com/in/thedavidweng/
- Instagram: https://www.instagram.com/davidwengpro/
- GitHub: https://github.com/thedavidweng
- Blog: https://blog.davidweng.eu.org/

## Contact

- Email: mail@davidweng.eu.org
- Location: Vancouver, Canada (working globally)

## Machine-Readable Endpoints

- https://davidweng.eu.org/agent — JSON agent view
- https://davidweng.eu.org/llms.txt — This file
- https://davidweng.eu.org/llms-full.txt — Complete site content
- https://davidweng.eu.org/index.md — Markdown version of homepage
- https://davidweng.eu.org/sitemap.xml — XML sitemap
- https://davidweng.eu.org/robots.txt — Robots policy
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
