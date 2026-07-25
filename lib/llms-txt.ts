import { projects } from "@/content/projects";
import { heroContent, contactContent } from "@/content/site";
import { SITE_URL } from "@/lib/site-config";
import { PROJECT_CATEGORY_SEQUENCE } from "@/lib/project-carousel";

export function generateLlmsTxt(): string {
  const projectSections = PROJECT_CATEGORY_SEQUENCE.flatMap((category) => {
    const items = projects.filter((p) => p.category.en === category);
    if (items.length === 0) return [];

    const lines = items
      .map(
        (p) =>
          `- [${p.title.en}](${SITE_URL}/projects/${p.slug}): ${p.summary.en}`
      )
      .join("\n");

    return [`### ${category}\n${lines}`];
  }).join("\n\n");

  return `# David Weng Portfolio

> ${heroContent.support.en} Based in Vancouver, working globally.

## Overview

David Weng is a visual content creator specializing in:

- Video editing and post-production (commercial campaigns, event recaps, short-form video, social-first content)
- Photography and visual storytelling (portraits, live events, editorial coverage)
- Graphic and brand system design (visual systems, content design, guidelines)
- AI-integrated experimental work (image-making, visual prototyping, content operations acceleration)

## Projects

Selected work spanning archive collections, published writing, and video projects:

${projectSections}

## Roles & Responsibilities

- Direction, writing, editing (film)
- Graphic design, editorial layout, archive curation (client work)
- Video editing, motion graphics (commissioned video)

## External Profiles

- LinkedIn: ${contactContent.linkedinHref}
- Instagram: ${contactContent.instagramHref}
- GitHub: ${contactContent.githubHref}
- Blog: https://blog.davidweng.eu.org/

## Contact

- Email: ${contactContent.emailDisplay}
- Location: Vancouver, Canada (working globally)

## Machine-Readable Endpoints

- ${SITE_URL}/agent: JSON agent view
- ${SITE_URL}/llms.txt: This file
- ${SITE_URL}/llms-full.txt: Complete site content
- ${SITE_URL}/index.md: Markdown version of homepage
- ${SITE_URL}/zh/index.md: Chinese homepage markdown
- ${SITE_URL}/sitemap.xml: XML sitemap
- ${SITE_URL}/robots.txt: Robots policy
`;
}