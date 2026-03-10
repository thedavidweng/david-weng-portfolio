import { projects } from "@/content/projects";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
