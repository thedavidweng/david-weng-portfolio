import type { Locale } from "@/types/content";
import {
  siteIdentity,
  heroContent,
  servicesContent,
  contactContent,
  aboutContent,
  navigationItems,
  blogUrl
} from "@/content/site";
import { projects } from "@/content/projects";
import { AGENT_ENDPOINTS, SITE_URL } from "@/lib/site-config";
import { getLocalizedText, getLocalizedValue } from "@/lib/i18n";

export function formatEndpoints(style: "linked" | "absolute"): string {
  return AGENT_ENDPOINTS.map((endpoint) =>
    style === "linked"
      ? `- [${endpoint.path}](${SITE_URL}${endpoint.path}): ${endpoint.description}`
      : `- ${SITE_URL}${endpoint.path}: ${endpoint.description}`
  ).join("\n");
}

export function formatServices(locale: Locale): string {
  return servicesContent.items
    .map(
      (s) => `### ${getLocalizedText(s.title, locale)}

${getLocalizedText(s.description, locale)}`
    )
    .join("\n\n");
}

export function formatProjects(locale: Locale): string {
  return projects
    .map(
      (p) => `- **[${p.code} ${getLocalizedText(p.title, locale)}](${SITE_URL}/projects/${p.slug})** (${p.year})
  - Category: ${getLocalizedText(p.category, locale)}
  - Type: ${getLocalizedText(p.projectType, locale)}
  - Roles: ${getLocalizedValue(p.roles, locale).join(", ")}
  - ${getLocalizedText(p.summary, locale)}`
    )
    .join("\n\n");
}

export function formatAbout(locale: Locale): string {
  return `${getLocalizedText(aboutContent.lead, locale)}

${getLocalizedText(aboutContent.body, locale)}

${getLocalizedText(aboutContent.bodySecondary, locale)}

### Focus Areas

${aboutContent.stats
  .map((s) => `- **${s.value}**: ${getLocalizedText(s.label, locale)}`)
  .join("\n")}`;
}

export function buildAgentData(locale: Locale) {
  return {
    identity: {
      name: siteIdentity.name,
      fullName: siteIdentity.fullName,
      roles: getLocalizedValue(siteIdentity.roles, locale)
    },
    hero: {
      kicker: getLocalizedText(heroContent.kicker, locale),
      support: getLocalizedText(heroContent.support, locale)
    },
    location: siteIdentity.location,
    services: servicesContent.items.map((s) => ({
      name: getLocalizedText(s.title, locale),
      description: getLocalizedText(s.description, locale)
    })),
    projects: projects.map((p) => ({
      slug: p.slug,
      title: getLocalizedText(p.title, locale),
      category: getLocalizedText(p.category, locale),
      year: p.year,
      type: getLocalizedText(p.projectType, locale),
      roles: getLocalizedValue(p.roles, locale),
      summary: getLocalizedText(p.summary, locale),
      url: `${SITE_URL}/projects/${p.slug}`
    })),
    navigation: navigationItems.map((item) => ({
      label: getLocalizedText(item.label, locale),
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
      blog: blogUrl,
      languages: ["en", "zh"],
      endpoints: AGENT_ENDPOINTS.map((endpoint) => ({
        url: `${SITE_URL}${endpoint.path}`,
        description: endpoint.description
      }))
    }
  };
}

export function buildAgentEndpointPayload() {
  return {
    defaultLocale: "en" as const,
    locales: {
      en: buildAgentData("en"),
      zh: buildAgentData("zh")
    } satisfies Record<Locale, ReturnType<typeof buildAgentData>>
  };
}
