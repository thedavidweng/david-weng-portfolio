import type { Locale } from "@/types/content";
import type { ProjectItem } from "@/types/content";
import { getProjectBySlug } from "@/lib/projects";
import { buildProjectMetadata } from "@/lib/project-metadata";
import { buildCreativeWorkSchema } from "@/lib/jsonld";

export function buildProjectPageData(slug: string, locale: Locale) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const pathname = locale === "en" ? `/projects/${slug}` : `/${locale}/projects/${slug}`;
  const metadata = buildProjectMetadata({ locale, pathname, project });
  const jsonLd = buildCreativeWorkSchema(project, locale);

  return { project, pathname, metadata, jsonLd };
}
