import type { Locale, ProjectItem } from "@/types/content";
import { getLocalizedText, getLocalizedValue } from "@/lib/i18n";
import {
  siteIdentity,
  heroContent,
  servicesContent,
  contactContent,
  aboutContent
} from "@/content/site";

const SITE_URL = "https://davidweng.eu.org";

export function buildOrganizationSchema(locale: Locale) {
  const services = servicesContent.items;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteIdentity.name,
    alternateName: siteIdentity.fullName,
    description: getLocalizedText(heroContent.support, locale),
    url: SITE_URL,
    email: contactContent.email,
    logo: `${SITE_URL}/brand/og-image.png`,
    sameAs: [
      contactContent.linkedinHref,
      contactContent.instagramHref,
      contactContent.githubHref,
      aboutContent.homepageHref
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: contactContent.email,
      contactType: "customer service"
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      name: getLocalizedText(s.title, locale),
      description: getLocalizedText(s.description, locale)
    }))
  };
}

export function buildWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "David Weng",
    url: SITE_URL,
    description: getLocalizedText(heroContent.support, locale),
    inLanguage: ["en", "zh"]
  };
}

export function buildCreativeWorkSchema(project: ProjectItem, locale: Locale) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: getLocalizedText(project.title, locale),
    description: getLocalizedText(project.summary, locale),
    creator: {
      "@type": "Organization",
      name: "David Weng",
      url: SITE_URL
    },
    dateCreated: project.year,
    keywords: getLocalizedValue(project.roles, locale).join(", ")
  };

  if (project.coverImage) {
    schema.image = `${SITE_URL}${project.coverImage}`;
    schema.thumbnailUrl = `${SITE_URL}${project.coverImage}`;
  }

  return schema;
}
