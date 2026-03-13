import type { Metadata } from "next";
import type { Locale, ProjectItem } from "@/types/content";
import { getLocalizedText } from "@/lib/i18n";

type BuildProjectMetadataInput = {
  locale: Locale;
  pathname: string;
  project: ProjectItem;
};

export function buildProjectMetadata({ locale, pathname, project }: BuildProjectMetadataInput): Metadata {
  const title = `${getLocalizedText(project.title, locale)} | David Weng`;
  const description = getLocalizedText(project.summary, locale);

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
      languages: {
        en: `/projects/${project.slug}`,
        zh: `/zh/projects/${project.slug}`
      }
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: pathname,
      siteName: "David Weng",
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
