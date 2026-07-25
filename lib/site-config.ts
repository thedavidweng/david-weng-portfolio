export const SITE_URL = "https://davidweng.eu.org";
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

export const AGENT_ENDPOINTS = [
  { path: "/agent", description: "JSON data about this person and their work" },
  { path: "/llms.txt", description: "LLM discovery file" },
  { path: "/llms-full.txt", description: "Complete site documentation" },
  { path: "/index.md", description: "English homepage markdown" },
  { path: "/zh/index.md", description: "Chinese homepage markdown" },
  { path: "/sitemap.xml", description: "XML sitemap" },
  { path: "/robots.txt", description: "Robots policy" }
] as const;
