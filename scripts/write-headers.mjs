import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { aliasSitemapXml } from "./sitemap-alias.mjs";

const distDir = join(process.cwd(), "dist");
const headersPath = join(distDir, "_headers");
const MANAGED_MARKER = "# managed-by: write-headers.mjs";

const SECURITY_HEADERS = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-DNS-Prefetch-Control: on
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/
  Link: </llms.txt>; rel="llms.txt", </llms-full.txt>; rel="llms-full.txt", </index.md>; rel="index.md", </agent>; rel="agent-catalog", </sitemap.xml>; rel="sitemap", </robots.txt>; rel="robots"

/agent
  Content-Type: application/json; charset=utf-8
  X-Robots-Tag: noindex
`;

const ASSET_CACHE_RULES = `
# Long-lived cache for hashed build assets and portfolio media
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/brand/*
  Cache-Control: public, max-age=31536000, immutable

/projects/client-work/*
  Cache-Control: public, max-age=31536000, immutable

/projects/film-video/*
  Cache-Control: public, max-age=31536000, immutable

/projects/personal/*
  Cache-Control: public, max-age=31536000, immutable

/projects/personal-video/*
  Cache-Control: public, max-age=31536000, immutable

/
  Cache-Control: public, max-age=300, stale-while-revalidate=86400

/zh/
  Cache-Control: public, max-age=300, stale-while-revalidate=86400

/software/
  Cache-Control: public, max-age=300, stale-while-revalidate=86400

/zh/software/
  Cache-Control: public, max-age=300, stale-while-revalidate=86400
`;

/** @returns {string} */
function buildProjectHtmlCacheRules() {
  const projectsDir = join(distDir, "projects");
  const zhProjectsDir = join(distDir, "zh", "projects");

  if (!existsSync(projectsDir)) {
    return "";
  }

  const htmlCache = "  Cache-Control: public, max-age=300, stale-while-revalidate=86400";
  const rules = [];

  const pushSlugRules = (dir, prefix) => {
    if (!existsSync(dir)) {
      return;
    }

    for (const slug of readdirSync(dir)) {
      if (existsSync(join(dir, slug, "index.html"))) {
        rules.push(`${prefix}/${slug}/\n${htmlCache}`);
      }
    }
  };

  pushSlugRules(projectsDir, "/projects");
  pushSlugRules(zhProjectsDir, "/zh/projects");

  if (rules.length === 0) {
    return "";
  }

  return `\n# Project detail HTML\n${rules.join("\n\n")}\n`;
}

/** @param {string} headers */
function stripManagedHeaders(headers) {
  const markerIndex = headers.indexOf(MANAGED_MARKER);

  if (markerIndex === -1) {
    return headers.trimEnd();
  }

  return headers.slice(0, markerIndex).trimEnd();
}

if (!existsSync(distDir)) {
  throw new Error(`[write-headers] Missing build output at ${distDir}. Run pnpm build first.`);
}

aliasSitemapXml(distDir);

const existingHeaders = existsSync(headersPath) ? readFileSync(headersPath, "utf8") : "";
const astroHeaders = stripManagedHeaders(existingHeaders);
const managedHeaders = `${MANAGED_MARKER}\n${SECURITY_HEADERS}${ASSET_CACHE_RULES}${buildProjectHtmlCacheRules()}`;

writeFileSync(headersPath, `${astroHeaders}\n${managedHeaders}`.trimEnd() + "\n");
