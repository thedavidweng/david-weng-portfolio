import type { APIRoute } from "astro";
import { buildAgentEndpointPayload } from "@/lib/agent-content";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildAgentEndpointPayload(), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
