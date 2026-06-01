import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageView } from "@/components/pages/ProjectPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildProjectPageData } from "@/lib/page-helpers";
import { localizedRouteLocales, resolveLocalizedRouteLocale } from "@/lib/i18n";
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
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!resolvedLocale) {
    return { title: "Project Not Found | David Weng" };
  }

  const data = buildProjectPageData(slug, resolvedLocale);
  return data?.metadata ?? { title: "Project Not Found | David Weng" };
}

export default async function LocalizedProjectPage({ params }: LocalizedProjectPageProps) {
  const { locale, slug } = await params;
  const resolvedLocale = resolveLocalizedRouteLocale(locale);

  if (!resolvedLocale) {
    notFound();
  }

  const data = buildProjectPageData(slug, resolvedLocale);

  if (!data) {
    notFound();
  }

  return <><JsonLd data={data.jsonLd} /><ProjectPageView locale={resolvedLocale} pathname={data.pathname} project={data.project} /></>;
}
