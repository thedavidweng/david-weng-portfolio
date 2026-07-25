import type { APIRoute } from "astro";
import { generateLlmsTxt } from "@/lib/llms-txt";
import { textResponse } from "@/lib/responses";

export const prerender = true;

export const GET: APIRoute = () => textResponse(generateLlmsTxt(), 86400);
