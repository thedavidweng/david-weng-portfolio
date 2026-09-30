import { readFileSync } from "node:fs";
import { imageSize } from "image-size";
import { join } from "node:path";

const cache = new Map<string, number | undefined>();

const PUBLIC_DIR = join(process.cwd(), "public");

/**
 * Returns the pixel width of an image stored under `public/`.
 * Caches results per path for the duration of the build.
 * Returns `undefined` if the file cannot be read or parsed.
 */
export function getImageWidth(publicPath: string): number | undefined {
  if (!publicPath) return undefined;
  if (cache.has(publicPath)) return cache.get(publicPath);

  try {
    const filePath = join(PUBLIC_DIR, publicPath);
    const buffer = readFileSync(filePath);
    const width = imageSize(buffer).width;
    cache.set(publicPath, width);
    return width;
  } catch {
    cache.set(publicPath, undefined);
    return undefined;
  }
}
