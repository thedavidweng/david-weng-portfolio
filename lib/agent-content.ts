import type { Locale } from "@/types/content";
import {
  siteIdentity,
  heroContent,
  servicesContent,
  contactContent,
  aboutContent,
  navigationItems
} from "@/content/site";
import { projects } from "@/content/projects";

export const SITE_URL = "https://davidweng.eu.org";

export function formatServices(locale: Locale): string {
  return servicesContent.items
    .map(
      (s) => `### ${s.title[locale]}

${s.description[locale]}`
    )
    .join("\n\n");
}

export function formatProjects(locale: Locale): string {
  return projects
    .map(
      (p) => `- **[${p.code} ${p.title[locale]}](${SITE_URL}/projects/${p.slug})** (${p.year})
  - Category: ${p.category[locale]}
  - Type: ${p.projectType[locale]}
  - Roles: ${p.roles[locale].join(", ")}
  - ${p.summary[locale]}`
    )
    .join("\n\n");
}

export function buildAgentData(locale: Locale) {
  return {
    identity: {
      name: siteIdentity.name,
      fullName: siteIdentity.fullName,
      roles: siteIdentity.roles[locale]
    },
    hero: {
      kicker: heroContent.kicker[locale],
      support: heroContent.support[locale]
    },
    location: {
      city: "Vancouver",
      country: "Canada",
      workingScope: "Global"
    },
    services: servicesContent.items.map((s) => ({
      name: s.title[locale],
      description: s.description[locale]
    })),
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title[locale],
      category: p.category[locale],
      year: p.year,
      type: p.projectType[locale],
      roles: p.roles[locale],
      summary: p.summary[locale],
      url: `${SITE_URL}/projects/${p.slug}`
    })),
    navigation: navigationItems.map((item) => ({
      label: item.label[locale],
      href: item.href
    })),
    contact: {
      email: contactContent.email,
      emailDisplay: contactContent.emailDisplay,
      linkedIn: contactContent.linkedinHref,
      instagram: contactContent.instagramHref,
      github: contactContent.githubHref,
      homepage: aboutContent.homepageHref
    },
    meta: {
      website: SITE_URL,
      blog: "https://blog.davidweng.eu.org/",
      languages: ["en", "zh"],
      sitemap: `${SITE_URL}/sitemap.xml`,
      llmsTxt: `${SITE_URL}/llms.txt`,
      robotsTxt: `${SITE_URL}/robots.txt`,
      agentEndpoint: `${SITE_URL}/agent`,
      markdownVersion: `${SITE_URL}/index.md`
    }
  };
}
