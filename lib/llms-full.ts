import {
  siteIdentity,
  heroContent,
  contactContent,
  navigationItems
} from "@/content/site";
import { formatServices, formatProjects, formatAbout } from "@/lib/agent-content";
import { SITE_URL } from "@/lib/site-config";

export function generateLlmsFull(): string {
  return `# ${siteIdentity.name}: Complete Site Documentation

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

${formatServices("en")}

---

## Projects

${formatProjects("en")}

---

## About

${formatAbout("en")}

---

## Contact

- **Email**: [${contactContent.emailDisplay}](mailto:${contactContent.email})
- **LinkedIn**: ${contactContent.linkedinHref}
- **Instagram**: ${contactContent.instagramHref}
- **GitHub**: ${contactContent.githubHref}
- **Blog**: https://blog.davidweng.eu.org/

---

## Site Navigation

${navigationItems
  .map((item) => `- [${item.label.en}](${item.href})`)
  .join("\n")}

---

## Agent Endpoints

- \`/agent\`: JSON data about this person and their work
- \`/llms.txt\`: LLM discovery file
- \`/llms-full.txt\`: Complete documentation (this file)
- \`/index.md\`: Markdown version of homepage
- \`/zh/index.md\`: Chinese homepage markdown
- \`/sitemap.xml\`: Site map
- \`/robots.txt\`: Crawling policy

---

*This file contains the complete public content of ${SITE_URL} in a single document, optimized for AI agent ingestion.*
`;
}