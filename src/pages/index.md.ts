import type { APIRoute } from "astro";
import { generateIndexMd } from "@/lib/site-markdown";
import { markdownResponse } from "@/lib/responses";

export const prerender = true;

export const GET: APIRoute = () => markdownResponse(generateIndexMd("en"));
