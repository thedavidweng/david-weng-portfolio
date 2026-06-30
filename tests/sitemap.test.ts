import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");

test("build emits /sitemap.xml as a urlset (not only sitemap-index.xml)", () => {
  const sitemapPath = join(distDir, "sitemap.xml");

  expect(existsSync(sitemapPath)).toBe(true);

  const sitemap = readFileSync(sitemapPath, "utf8");

  expect(sitemap).toContain("<urlset");
  expect(sitemap).not.toContain("<sitemapindex");
  expect(sitemap).toContain("https://davidweng.eu.org/");
});

test("robots.txt advertises the same sitemap URL that exists in dist", () => {
  const robotsPath = join(distDir, "robots.txt");

  expect(existsSync(robotsPath)).toBe(true);
  expect(existsSync(join(distDir, "sitemap.xml"))).toBe(true);

  const robots = readFileSync(robotsPath, "utf8");

  expect(robots).toContain("Sitemap: https://davidweng.eu.org/sitemap.xml");
});