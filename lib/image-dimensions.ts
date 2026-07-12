/**
 * Server-side helper to read image dimensions from the public directory.
 * Used in Astro components to populate `width` for PortfolioImage srcset.
 */
import { readFileSync } from "node:fs";
import { imageSize } from "image-size";
import { join } from "node:path";

const cache = new Map<string, number | undefined>();

/**
 * Returns the pixel width of an image stored under `public/`.
 * Caches results per path for the duration of the build.
 * Returns `undefined` if the file cannot be read or parsed.
 */
export function getImageWidth(publicPath: string): number | undefined {
  if (!publicPath) return undefined;
  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  try {
    const filePath = join(process.cwd(), "public", publicPath);
    const buffer = readFileSync(filePath);
    const width = imageSize(buffer).width;
    cache.set(publicPath, width);
    return width;
  } catch {
    cache.set(publicPath, undefined);
    return undefined;
  }
}
