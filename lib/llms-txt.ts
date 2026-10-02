import { projects } from "@/content/projects";
import { siteIdentity, heroContent, servicesContent, contactContent, blogUrl } from "@/content/site";
import { repoUrl, softwareProjects, softwareTools } from "@/content/software";
import { SITE_URL } from "@/lib/site-config";
import { formatEndpoints } from "@/lib/agent-content";
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

  const serviceLines = servicesContent.items
    .map((s) => `- ${s.title.en}: ${s.description.en}`)
    .join("\n");

  return `# ${siteIdentity.name} Portfolio

> ${heroContent.support.en} Based in ${siteIdentity.location.city}, working globally.

## Overview

${siteIdentity.name} is a visual content creator specializing in:

${serviceLines}

## Projects

Selected work spanning archive collections, films, and video projects:

${projectSections}

## Software

Open source desktop apps and command line tools: ${SITE_URL}/software/

${softwareProjects.map((p) => `- [${p.repo}](${repoUrl(p.repo)}): ${p.description.en}`).join("\n")}
- Go command line tools: ${softwareTools.map((tool) => tool.repo).join(", ")}

## Roles & Responsibilities

- Direction, writing, editing (film)
- Graphic design, editorial layout, archive curation (client work)
- Video editing, motion graphics (commissioned video)
- Desktop apps, command line tools, upstream fixes (software)

## External Profiles

- LinkedIn: ${contactContent.linkedinHref}
- Instagram: ${contactContent.instagramHref}
- GitHub: ${contactContent.githubHref}
- Blog: ${blogUrl}

## Contact

- Email: ${contactContent.emailDisplay}
- Location: ${siteIdentity.location.display}

## Machine-Readable Endpoints

${formatEndpoints("absolute")}
`;
}
