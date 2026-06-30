import type { APIRoute } from "astro";

export const prerender = true;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://davidweng.eu.org/sitemap.xml

Content-Signal: ai-train=no, search=yes, ai-input=no
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};