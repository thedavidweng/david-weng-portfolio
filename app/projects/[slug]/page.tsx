import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageView } from "@/components/pages/ProjectPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildProjectPageData } from "@/lib/page-helpers";
import { projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = buildProjectPageData(slug, "en");
  return data?.metadata ?? { title: "Project Not Found | David Weng" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const data = buildProjectPageData(slug, "en");

  if (!data) {
    notFound();
  }

  return <><JsonLd data={data.jsonLd} /><ProjectPageView locale="en" pathname={data.pathname} project={data.project} /></>;
}
