import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageView } from "@/components/pages/ProjectPageView";
import { buildProjectMetadata } from "@/lib/project-metadata";
import { getProjectBySlug } from "@/lib/projects";
import { localizedRouteLocales, resolveLocalizedRouteLocale } from "@/lib/routes";
import { projects } from "@/content/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCreativeWorkSchema } from "@/lib/jsonld";

type LocalizedProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return localizedRouteLocales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug
    }))
  );
}

export async function generateMetadata({ params }: LocalizedProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!project || !resolvedLocale) {
    return {
      title: "Project Not Found | David Weng"
    };
  }

  return buildProjectMetadata({
    locale: resolvedLocale,
    pathname: `/${resolvedLocale}/projects/${slug}`,
    project
  });
}

export default async function LocalizedProjectPage({ params }: LocalizedProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!project || !resolvedLocale) {
    notFound();
  }

  return <><JsonLd data={buildCreativeWorkSchema(project, resolvedLocale)} /><ProjectPageView locale={resolvedLocale} pathname={`/${resolvedLocale}/projects/${slug}`} project={project} /></>;
}
