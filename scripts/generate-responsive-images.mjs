#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, basename, extname, relative, sep } from "node:path";
import { MIN_ORIGINAL_WIDTH, RESPONSIVE_WIDTHS } from "../lib/responsive-srcset.ts";
import { getImageWidth } from "../lib/image-dimensions.ts";

const PUBLIC_DIR = new URL("../public", import.meta.url).pathname;
const PROJECTS_DIR = join(PUBLIC_DIR, "projects");

const force = process.argv.includes("--force");

function findAvifFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findAvifFiles(fullPath));
    } else if (extname(entry).toLowerCase() === ".avif" && !/@\d+w\.avif$/i.test(entry)) {
      results.push(fullPath);
    }
  }
  return results;
}

function toPublicPath(filePath) {
  return `/${relative(PUBLIC_DIR, filePath).split(sep).join("/")}`;
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
    const originalWidth = getImageWidth(toPublicPath(file));

    if (!originalWidth || originalWidth <= MIN_ORIGINAL_WIDTH) {
      untouched++;
      continue;
    }

    for (const width of RESPONSIVE_WIDTHS) {
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
