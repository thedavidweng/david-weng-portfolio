import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPageView } from "@/components/pages/ProjectPageView";
import { buildProjectMetadata } from "@/lib/project-metadata";
import { getProjectBySlug } from "@/lib/projects";
import { projects } from "@/content/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCreativeWorkSchema } from "@/lib/jsonld";

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
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | David Weng"
    };
  }

  return buildProjectMetadata({
    locale: "en",
    pathname: `/projects/${slug}`,
    project
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <><JsonLd data={buildCreativeWorkSchema(project, "en")} /><ProjectPageView locale="en" pathname={`/projects/${slug}`} project={project} /></>;
}
