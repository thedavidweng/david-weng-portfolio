import type { APIRoute } from "astro";
import { buildAgentEndpointPayload } from "@/lib/agent-endpoint";

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(buildAgentEndpointPayload(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex"
    }
  });
};