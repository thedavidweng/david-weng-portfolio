import type { APIRoute } from "astro";
import { generateLlmsFull } from "@/lib/llms-full";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(generateLlmsFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};