import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageView } from "@/components/pages/ProjectPageView";
import { getLocalizedText } from "@/lib/i18n";
import { getProjectBySlug } from "@/lib/projects";
import { localizedRouteLocales, resolveLocalizedRouteLocale } from "@/lib/routes";
import { projects } from "@/content/projects";

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

  return {
    title: `${getLocalizedText(project.title, resolvedLocale)} | David Weng`,
    description: getLocalizedText(project.summary, resolvedLocale)
  };
}

export default async function LocalizedProjectPage({ params }: LocalizedProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!project || !resolvedLocale) {
    notFound();
  }

  return <ProjectPageView locale={resolvedLocale} pathname={`/zh/projects/${slug}`} project={project} />;
}
