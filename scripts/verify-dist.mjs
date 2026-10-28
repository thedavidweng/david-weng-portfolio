import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distDir = join(root, ".cloudflare/output/v0/workers/default/assets");
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

assert(existsSync(distDir), "Cloudflare asset output is missing, run bun run build first");

for (const name of ["app", "next.config.ts", "proxy.ts"]) {
  assert(!existsSync(join(root, name)), `${name} must not exist`);
  ok(`no ${name}`);
}

assert(existsSync(join(root, "astro.config.mjs")), "astro.config.mjs must exist");
ok("astro.config.mjs present");

const cfConfig = readFileSync(join(root, "cloudflare.config.ts"), "utf8");
assert(cfConfig.includes('notFoundHandling: "404-page"'), 'cloudflare.config.ts must set assets.notFoundHandling to "404-page"');
assert(cfConfig.includes('htmlHandling: "auto-trailing-slash"'), 'cloudflare.config.ts must set assets.htmlHandling to "auto-trailing-slash"');
assert(!cfConfig.includes("entrypoint"), "cloudflare.config.ts must use assets-only deploy (no worker entrypoint)");
assert(!cfConfig.includes("runWorkerFirst"), "cloudflare.config.ts must not set runWorkerFirst (static assets are free/unlimited)");
assert(!existsSync(join(root, "wrangler.config.ts")), "wrangler.config.ts must not exist (assets-only deploy has no Wrangler bundler config)");
assert(!existsSync(join(root, "wrangler.jsonc")), "wrangler.jsonc must not exist");
ok("cf Workers static assets config");

const headersPath = join(distDir, "_headers");
assert(existsSync(headersPath), "_headers is missing from the Cloudflare asset output");
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
assert(existsSync(sitemapPath), "sitemap.xml is missing from the Cloudflare asset output");
const sitemap = readFileSync(sitemapPath, "utf8");
assert(sitemap.includes("<urlset"), "dist/sitemap.xml must be a urlset document");
assert(!sitemap.includes("<sitemapindex"), "dist/sitemap.xml must not be a sitemap index");
assert(sitemap.includes("https://davidweng.eu.org/"), "dist/sitemap.xml must include the homepage URL");
ok("dist/sitemap.xml urlset preserved at legacy path");

const robotsPath = join(distDir, "robots.txt");
assert(existsSync(robotsPath), "robots.txt is missing from the Cloudflare asset output");
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
  "src/pages/software.astro",
  "src/pages/zh/software.astro",
  "src/layouts/BaseLayout.astro"
];

for (const page of requiredPages) {
  assert(existsSync(join(root, page)), `${page} is missing`);
}
ok("core Astro pages and layouts present");

console.log("[verify-dist] All post-build checks passed.");