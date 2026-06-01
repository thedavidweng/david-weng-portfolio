import { NextResponse } from "next/server";
import {
  siteIdentity,
  heroContent,
  contactContent,
  aboutContent,
  navigationItems
} from "@/content/site";
import { SITE_URL, formatServices, formatProjects } from "@/lib/agent-content";

export async function GET() {
  const markdown = `# ${siteIdentity.name} — ${siteIdentity.roles.en.join(", ")}

${heroContent.kicker.en}

${heroContent.support.en}

## Services

${formatServices("en")}

## Projects

${formatProjects("en")}

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
