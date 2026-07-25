import type { Locale, ProjectItem } from "@/types/content";
import { siteIdentity } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";

export type PageMetadata = {
  title: string;
  description: string;
  canonical: string;
  languages: { en: string; zh: string };
  openGraph: {
    type: string;
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    alternateLocale: string;
    images: Array<{ url: string; alt: string }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
};

type BuildProjectMetadataInput = {
  locale: Locale;
  pathname: string;
  project: ProjectItem;
};

export function buildProjectMetadata({ locale, pathname, project }: BuildProjectMetadataInput): PageMetadata {
  const title = `${getLocalizedText(project.title, locale)} | ${siteIdentity.name}`;
  const description = getLocalizedText(project.summary, locale);

  return {
    title,
    description,
    canonical: pathname,
    languages: {
      en: `/projects/${project.slug}`,
      zh: `/zh/projects/${project.slug}`
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: pathname,
      siteName: siteIdentity.name,
      locale,
      alternateLocale: locale === "zh" ? "en" : "zh",
      images: [
        {
          url: project.coverImage,
          alt: getLocalizedText(project.coverAlt, locale)
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.coverImage]
    }
  };
}