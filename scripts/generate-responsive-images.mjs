#!/usr/bin/env node
/**
 * Generate responsive AVIF image variants for srcset.
 *
 * For each AVIF image in public/projects/ wider than 1200px, generates
 * variants at 400w, 800w, 1200w, and 1920w (only those smaller than the
 * original). Variants are written alongside the original with a
 * `@<width>w` suffix, e.g. `still-fraud-08@800w.avif`.
 *
 * Usage:
 *   node scripts/generate-responsive-images.mjs          # generate missing
 *   node scripts/generate-responsive-images.mjs --force   # regenerate all
 */

import { execSync } from "node:child_process";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";

const PROJECTS_DIR = new URL("../public/projects", import.meta.url).pathname;
const WIDTHS = [400, 800, 1200, 1920];
const MIN_ORIGINAL_WIDTH = 1200; // only generate variants for images wider than this

const force = process.argv.includes("--force");

function findAvifFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findAvifFiles(fullPath));
    } else if (extname(entry).toLowerCase() === ".avif") {
      results.push(fullPath);
    }
  }
  return results;
}

function getImageWidth(filePath) {
  const output = execSync(`identify -format "%w" "${filePath}" 2>/dev/null`, {
    encoding: "utf-8",
  }).trim();
  return parseInt(output, 10);
}

function generateVariant(srcPath, width) {
  const dir = dirname(srcPath);
  const name = basename(srcPath, ".avif");
  const variantPath = join(dir, `${name}@${width}w.avif`);

  if (!force && existsSync(variantPath)) {
    return { path: variantPath, skipped: true };
  }

  execSync(
    `magick "${srcPath}" -resize ${width}x -format AVIF "${variantPath}"`,
    { stdio: "pipe" },
  );
  return { path: variantPath, skipped: false };
}

function main() {
  const files = findAvifFiles(PROJECTS_DIR);
  let generated = 0;
  let skipped = 0;
  let untouched = 0;

  for (const file of files) {
    const originalWidth = getImageWidth(file);

    if (originalWidth <= MIN_ORIGINAL_WIDTH) {
      untouched++;
      continue;
    }

    for (const width of WIDTHS) {
      if (width >= originalWidth) continue;

      const result = generateVariant(file, width);
      if (result.skipped) {
        skipped++;
      } else {
        generated++;
        console.log(`  ${basename(file)} -> @${width}w`);
      }
    }
  }

  console.log(
    `\nDone: ${generated} generated, ${skipped} skipped (already exist), ${untouched} untouched (<=${MIN_ORIGINAL_WIDTH}px)`,
  );
}

main();
