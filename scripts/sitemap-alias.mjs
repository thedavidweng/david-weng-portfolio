import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * @param {string} distDir
 * @returns {string}
 */
export function aliasSitemapXml(distDir) {
  const sitemapChunkPath = join(distDir, "sitemap-0.xml");
  const sitemapPath = join(distDir, "sitemap.xml");

  if (!existsSync(sitemapChunkPath)) {
    throw new Error(
      `[sitemap-alias] Missing ${sitemapChunkPath} from @astrojs/sitemap. Run astro build first.`
    );
  }

  copyFileSync(sitemapChunkPath, sitemapPath);
  return sitemapPath;
}