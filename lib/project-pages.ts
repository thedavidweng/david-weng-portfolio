import { projects } from "@/content/projects";
import { getProjectBySlug } from "@/lib/projects";
import { buildProjectMetadata } from "@/lib/project-metadata";
import { buildCreativeWorkSchema } from "@/lib/jsonld";
import { getProjectPath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function buildProjectPageData(slug: string, locale: Locale) {
  const project = getProjectBySlug(slug);
  if (!project) return null;

  const pathname = getProjectPath(locale, slug);
  const metadata = buildProjectMetadata({ locale, pathname, project });
  const jsonLd = buildCreativeWorkSchema(project, locale);

  return { project, pathname, metadata, jsonLd };
}

export function getProjectPageStaticPaths(locale: Locale) {
  return projects
    .map((project) => {
      const data = buildProjectPageData(project.slug, locale);
      if (!data) return null;

      return {
        params: { slug: project.slug },
        props: {
          project: data.project,
          pathname: data.pathname,
          metadata: data.metadata,
          jsonLd: data.jsonLd
        }
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

export function getProjectMarkdownStaticPaths() {
  return projects.map((project) => ({ params: { slug: project.slug }, props: { project } }));
}
