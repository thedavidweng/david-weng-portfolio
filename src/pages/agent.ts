import type { APIRoute } from "astro";
import { buildAgentData } from "@/lib/agent-content";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(buildAgentData("en"), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex"
    }
  });
};