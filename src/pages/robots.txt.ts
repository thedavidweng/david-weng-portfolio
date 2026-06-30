import type { APIRoute } from "astro";
import { SITEMAP_URL } from "@/lib/agent-content";

export const prerender = true;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITEMAP_URL}

Content-Signal: ai-train=no, search=yes, ai-input=no
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};