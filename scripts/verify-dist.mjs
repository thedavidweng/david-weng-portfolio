import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");
const SITEMAP_URL = "https://davidweng.eu.org/sitemap.xml";

/** @param {boolean} condition @param {string} message */
function assert(condition, message) {
  if (!condition) {
    throw new Error(`[verify-dist] ${message}`);
  }
}

/** @param {string} label */
function ok(label) {
  console.log(`OK: ${label}`);
}

assert(existsSync(distDir), "dist/ is missing — run pnpm build first");

assert(!existsSync(join(root, "app")), "app/ must not exist");
ok("no app/ directory");

assert(!existsSync(join(root, "next.config.ts")), "next.config.ts must not exist");
ok("no next.config.ts");

assert(!existsSync(join(root, "vite.config.ts")), "vite.config.ts must not exist");
ok("no vite.config.ts");

assert(!existsSync(join(root, "proxy.ts")), "proxy.ts must not exist");
ok("no proxy.ts");

assert(existsSync(join(root, "astro.config.mjs")), "astro.config.mjs must exist");
ok("astro.config.mjs present");

const wranglerConfig = readFileSync(join(root, "wrangler.jsonc"), "utf8");
assert(wranglerConfig.includes('"directory": "./dist"'), 'wrangler.jsonc must set assets.directory to "./dist"');
assert(wranglerConfig.includes('"not_found_handling": "404-page"'), 'wrangler.jsonc must set assets.not_found_handling to "404-page"');
ok("wrangler Workers static assets config");

const headersPath = join(distDir, "_headers");
assert(existsSync(headersPath), "dist/_headers is missing");
const headers = readFileSync(headersPath, "utf8");
assert(headers.includes("/projects/*"), "dist/_headers must cache /projects/*");
assert(headers.includes("/brand/*"), "dist/_headers must cache /brand/*");
assert(headers.includes("max-age=31536000, immutable"), "dist/_headers must set immutable long cache");
ok("dist/_headers cache rules");

const sitemapPath = join(distDir, "sitemap.xml");
assert(existsSync(sitemapPath), "dist/sitemap.xml is missing");
const sitemap = readFileSync(sitemapPath, "utf8");
assert(sitemap.includes("<urlset"), "dist/sitemap.xml must be a urlset document");
assert(!sitemap.includes("<sitemapindex"), "dist/sitemap.xml must not be a sitemap index");
assert(sitemap.includes("https://davidweng.eu.org/"), "dist/sitemap.xml must include the homepage URL");
ok("dist/sitemap.xml urlset preserved at legacy path");

const robotsPath = join(distDir, "robots.txt");
assert(existsSync(robotsPath), "dist/robots.txt is missing");
const robots = readFileSync(robotsPath, "utf8");
assert(robots.includes(`Sitemap: ${SITEMAP_URL}`), "dist/robots.txt must advertise /sitemap.xml");
ok("dist/robots.txt sitemap URL");

const requiredPages = [
  "src/pages/index.astro",
  "src/pages/zh/index.astro",
  "src/pages/projects/[slug].astro",
  "src/islands/Header.tsx",
  "src/layouts/BaseLayout.astro"
];

for (const page of requiredPages) {
  assert(existsSync(join(root, page)), `${page} is missing`);
}
ok("core Astro pages and layouts present");

console.log("[verify-dist] All post-build checks passed.");