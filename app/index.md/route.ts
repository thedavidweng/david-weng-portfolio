import { NextResponse } from "next/server";
import {
  siteIdentity,
  heroContent,
  servicesContent,
  contactContent,
  aboutContent,
  navigationItems
} from "@/content/site";
import { projects } from "@/content/projects";

const SITE_URL = "https://davidweng.eu.org";

export async function GET() {
  const services = servicesContent.items
    .map(
      (s) => `### ${s.title.en}

${s.description.en}`
    )
    .join("\n\n");

  const projectList = projects
    .map(
      (p) => `- **[${p.code} ${p.title.en}](${SITE_URL}/projects/${p.slug})** (${p.year})
  - Category: ${p.category.en}
  - Type: ${p.projectType.en}
  - Roles: ${p.roles.en.join(", ")}
  - ${p.summary.en}`
    )
    .join("\n\n");

  const markdown = `# ${siteIdentity.name} — ${siteIdentity.roles.en.join(", ")}

${heroContent.kicker.en}

${heroContent.support.en}

## Services

${services}

## Projects

${projectList}

## About

${aboutContent.lead.en}

${aboutContent.body.en}

${aboutContent.bodySecondary.en}

### Focus Areas

${aboutContent.stats
  .map((s) => `- **${s.value}**: ${s.label.en}`)
  .join("\n")}

## Contact

- **Email**: [${contactContent.emailDisplay}](mailto:${contactContent.email})
- **LinkedIn**: ${contactContent.linkedinHref}
- **Instagram**: ${contactContent.instagramHref}
- **GitHub**: ${contactContent.githubHref}

## Site Navigation

${navigationItems
  .map((item) => `- [${item.label.en}](${item.href})`)
  .join("\n")}

## Agent Endpoints

- [/agent](${SITE_URL}/agent) — JSON data about this person and their work
- [/llms.txt](${SITE_URL}/llms.txt) — LLM discovery file
- [/llms-full.txt](${SITE_URL}/llms-full.txt) — Complete documentation
- [/sitemap.xml](${SITE_URL}/sitemap.xml) — Site map
- [/robots.txt](${SITE_URL}/robots.txt) — Crawling policy

---

*This is a machine-readable markdown version of https://davidweng.eu.org. Visit the site for the full visual experience.*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
