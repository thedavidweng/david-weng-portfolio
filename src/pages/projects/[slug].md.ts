import type { APIRoute } from "astro";
import { getProjectMarkdownStaticPaths } from "@/lib/project-pages";
import { generateProjectMd } from "@/lib/project-md";
import { markdownResponse } from "@/lib/responses";
import type { ProjectItem } from "@/types/content";

export const prerender = true;

export const getStaticPaths = getProjectMarkdownStaticPaths;

export const GET: APIRoute<{ project: ProjectItem }> = ({ props }) =>
  markdownResponse(generateProjectMd(props.project, "en"));
