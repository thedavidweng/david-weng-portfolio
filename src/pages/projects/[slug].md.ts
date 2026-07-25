import type { APIRoute } from "astro";
import { getProjectMarkdownStaticPaths } from "@/lib/astro-static-paths";
import { generateProjectMd } from "@/lib/project-md";
import type { ProjectItem } from "@/types/content";

export const prerender = true;

export function getStaticPaths() {
  return getProjectMarkdownStaticPaths();
}

export const GET: APIRoute<{ project: ProjectItem }> = ({ props }) => {
  return new Response(generateProjectMd(props.project, "en"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
