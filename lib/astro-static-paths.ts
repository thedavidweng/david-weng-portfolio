import { projects } from "@/content/projects";
import { buildProjectPageData } from "@/lib/page-helpers";
import type { Locale } from "@/types/content";

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
  return projects.map((project) => ({ params: { slug: project.slug } }));
}