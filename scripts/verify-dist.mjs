import { existsSync, readFileSync, readdirSync } from "node:fs";
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

assert(existsSync(distDir), "dist/ is missing, run pnpm build first");

for (const name of ["app", "next.config.ts", "vite.config.ts", "proxy.ts"]) {
  assert(!existsSync(join(root, name)), `${name} must not exist`);
  ok(`no ${name}`);
}

assert(existsSync(join(root, "astro.config.mjs")), "astro.config.mjs must exist");
ok("astro.config.mjs present");

const wranglerConfig = readFileSync(join(root, "wrangler.jsonc"), "utf8");
assert(wranglerConfig.includes('"directory": "./dist"'), 'wrangler.jsonc must set assets.directory to "./dist"');
assert(wranglerConfig.includes('"not_found_handling": "404-page"'), 'wrangler.jsonc must set assets.not_found_handling to "404-page"');
assert(!wranglerConfig.includes('"main"'), "wrangler.jsonc must use assets-only deploy (no main worker script)");
assert(!wranglerConfig.includes("run_worker_first"), "wrangler.jsonc must not set run_worker_first (static assets are free/unlimited)");
ok("wrangler Workers static assets config");

const headersPath = join(distDir, "_headers");
assert(existsSync(headersPath), "dist/_headers is missing");
const headers = readFileSync(headersPath, "utf8");
assert(headers.includes("/_astro/*"), "dist/_headers must cache /_astro/*");
assert(headers.includes("/projects/film-video/*"), "dist/_headers must cache portfolio media paths");
assert(headers.includes("/brand/*"), "dist/_headers must cache /brand/*");
assert(headers.includes("max-age=31536000, immutable"), "dist/_headers must set immutable long cache");
assert(headers.includes("stale-while-revalidate=86400"), "dist/_headers must set HTML stale-while-revalidate");
assert(!headers.includes("/projects/*\n"), "dist/_headers must not blanket-cache all /projects/* HTML");
assert(headers.includes("/projects/fraud/\n  Cache-Control:"), "dist/_headers must pair project HTML paths with cache headers");
ok("dist/_headers cache rules");
assert(
  headers.includes("/agent\n  Content-Type: application/json; charset=utf-8\n  X-Robots-Tag: noindex"),
  "dist/_headers must type /agent as JSON and mark it noindex (static endpoints cannot set headers)"
);
ok("dist/_headers /agent content type");

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

const imagesMissingSrcset = readdirSync(distDir, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".html"))
  .flatMap((file) =>
    [...readFileSync(join(distDir, file), "utf8").matchAll(/<img\b[^>]*>/g)]
      .map(([tag]) => tag)
      .filter((tag) => !/\ssrcset=/i.test(tag))
      .map((tag) => tag.match(/\ssrc="([^"]+)"/)?.[1] ?? "")
      .filter((src) => existsSync(join(root, "public", src.replace(/(\.[a-z0-9]+)$/i, "@400w$1"))))
      .map((src) => `${file}: ${src}`)
  );
assert(
  imagesMissingSrcset.length === 0,
  `images with responsive variants must ship a srcset:\n  ${imagesMissingSrcset.join("\n  ")}`
);
ok("responsive images carry srcset");

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