import type { APIRoute } from "astro";
import { generateIndexMd } from "@/lib/index-md";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(generateIndexMd("en"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};