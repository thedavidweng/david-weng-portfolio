import type { APIRoute } from "astro";
import { getProjectMarkdownStaticPaths } from "@/lib/astro-static-paths";
import { generateProjectMd } from "@/lib/project-md";
import { getProjectBySlug } from "@/lib/projects";

export const prerender = true;

export function getStaticPaths() {
  return getProjectMarkdownStaticPaths();
}

export const GET: APIRoute = ({ params }) => {
  const project = getProjectBySlug(params.slug!);
  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(generateProjectMd(project, "en"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};