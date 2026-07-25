import type { Locale } from "@/types/content";
import {
  siteIdentity,
  heroContent,
  contactContent,
  navigationItems,
  blogUrl
} from "@/content/site";
import {
  formatServices,
  formatProjects,
  formatAbout,
  formatEndpoints
} from "@/lib/agent-content";
import { SITE_URL } from "@/lib/site-config";

function formatContact(): string {
  return `- **Email**: [${contactContent.emailDisplay}](mailto:${contactContent.email})
- **LinkedIn**: ${contactContent.linkedinHref}
- **Instagram**: ${contactContent.instagramHref}
- **GitHub**: ${contactContent.githubHref}
- **Blog**: ${blogUrl}`;
}

function formatNavigation(locale: Locale): string {
  return navigationItems
    .map((item) => `- [${item.label[locale]}](${item.href})`)
    .join("\n");
}

export function generateIndexMd(locale: Locale): string {
  return `# ${siteIdentity.name}: ${siteIdentity.roles[locale].join(", ")}

${heroContent.kicker[locale]}

${heroContent.support[locale]}

## Services

${formatServices(locale)}

## Projects

${formatProjects(locale)}

## About

${formatAbout(locale)}

## Contact

${formatContact()}

## Site Navigation

${formatNavigation(locale)}

## Agent Endpoints

${formatEndpoints("linked")}

---

*This is a machine-readable markdown version of ${SITE_URL}. Visit the site for the full visual experience.*
`;
}

export function generateLlmsFull(): string {
  return `# ${siteIdentity.name}: Complete Site Documentation

Last updated: ${new Date().toISOString().split("T")[0]}

> ${heroContent.support.en}

---

## Identity

**Name**: ${siteIdentity.name} (${siteIdentity.fullName})
**Roles**: ${siteIdentity.roles.en.join(", ")}
**Location**: ${siteIdentity.location.display}
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

${formatContact()}

---

## Site Navigation

${formatNavigation("en")}

---

## Agent Endpoints

${formatEndpoints("linked")}

---

*This file contains the complete public content of ${SITE_URL} in a single document, optimized for AI agent ingestion.*
`;
}
