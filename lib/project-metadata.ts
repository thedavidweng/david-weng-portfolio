import type { Locale, ProjectItem } from "@/types/content";
import { siteIdentity } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";

export type PageMetadata = {
  title: string;
  description: string;
  canonical: string;
  languages: { en: string; zh: string };
  image: string;
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
    image: project.coverImage
  };
}