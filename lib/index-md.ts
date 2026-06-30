import type { Locale } from "@/types/content";
import {
  siteIdentity,
  heroContent,
  contactContent,
  aboutContent,
  navigationItems
} from "@/content/site";
import { SITE_URL, formatServices, formatProjects } from "@/lib/agent-content";

export function generateIndexMd(locale: Locale): string {
  const roles = siteIdentity.roles[locale].join(", ");

  return `# ${siteIdentity.name} — ${roles}

${heroContent.kicker[locale]}

${heroContent.support[locale]}

## Services

${formatServices(locale)}

## Projects

${formatProjects(locale)}

## About

${aboutContent.lead[locale]}

${aboutContent.body[locale]}

${aboutContent.bodySecondary[locale]}

### Focus Areas

${aboutContent.stats
  .map((s) => `- **${s.value}**: ${s.label[locale]}`)
  .join("\n")}

## Contact

- **Email**: [${contactContent.emailDisplay}](mailto:${contactContent.email})
- **LinkedIn**: ${contactContent.linkedinHref}
- **Instagram**: ${contactContent.instagramHref}
- **GitHub**: ${contactContent.githubHref}

## Site Navigation

${navigationItems
  .map((item) => `- [${item.label[locale]}](${item.href})`)
  .join("\n")}

## Agent Endpoints

- [/agent](${SITE_URL}/agent) — JSON data about this person and their work
- [/llms.txt](${SITE_URL}/llms.txt) — LLM discovery file
- [/llms-full.txt](${SITE_URL}/llms-full.txt) — Complete documentation
- [/index.md](${SITE_URL}/index.md) — English homepage markdown
- [/zh/index.md](${SITE_URL}/zh/index.md) — Chinese homepage markdown
- [/sitemap.xml](${SITE_URL}/sitemap.xml) — Site map
- [/robots.txt](${SITE_URL}/robots.txt) — Crawling policy

---

*This is a machine-readable markdown version of ${SITE_URL}. Visit the site for the full visual experience.*
`;
}