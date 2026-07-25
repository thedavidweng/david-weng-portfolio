import type { APIRoute } from "astro";
import { generateLlmsFull } from "@/lib/site-markdown";
import { textResponse } from "@/lib/responses";

export const prerender = true;

export const GET: APIRoute = () => textResponse(generateLlmsFull());
