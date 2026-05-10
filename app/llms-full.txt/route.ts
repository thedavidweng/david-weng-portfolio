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

  const llmsFull = `# ${siteIdentity.name} — Complete Site Documentation

Last updated: ${new Date().toISOString().split("T")[0]}

> ${heroContent.support.en}

---

## Identity

**Name**: ${siteIdentity.name} (${siteIdentity.fullName})
**Roles**: ${siteIdentity.roles.en.join(", ")}
**Location**: Vancouver, Canada (working globally)
**Website**: ${SITE_URL}

---

## Services

${services}

---

## Projects

${projectList}

---

## About

${aboutContent.lead.en}

${aboutContent.body.en}

${aboutContent.bodySecondary.en}

### Focus Areas

${aboutContent.stats
  .map((s) => `- **${s.value}**: ${s.label.en}`)
  .join("\n")}

---

## Contact

- **Email**: [${contactContent.emailDisplay}](mailto:${contactContent.email})
- **LinkedIn**: ${contactContent.linkedinHref}
- **Instagram**: ${contactContent.instagramHref}
- **GitHub**: ${contactContent.githubHref}
- **Blog**: https://blog.blahaj.uk/

---

## Site Navigation

${navigationItems
  .map((item) => `- [${item.label.en}](${item.href})`)
  .join("\n")}

---

## Agent Endpoints

- \\\`/agent\\\` — JSON data about this person and their work
- \\\`/llms.txt\\\` — LLM discovery file
- \\\`/llms-full.txt\\\` — Complete documentation (this file)
- \\\`/index.md\\\` — Markdown version of homepage
- \\\`/sitemap.xml\\\` — Site map
- \\\`/robots.txt\\\` — Crawling policy

---

*This file contains the complete public content of ${SITE_URL} in a single document, optimized for AI agent ingestion.*
`;

  return new NextResponse(llmsFull, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
