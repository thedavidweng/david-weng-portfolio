#!/usr/bin/env node

import { readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, basename, extname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { MIN_ORIGINAL_WIDTH, RESPONSIVE_WIDTHS } from "../lib/responsive-srcset.ts";
import { getImageWidth } from "../lib/image-dimensions.ts";

const PUBLIC_DIR = fileURLToPath(new URL("../public", import.meta.url));
const PROJECTS_DIR = join(PUBLIC_DIR, "projects");
const CONCURRENCY = 4;
const AVIF_OPTIONS = { quality: 55, effort: 6, chromaSubsampling: "4:2:0" };

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

async function generateVariant(srcPath, width) {
  const ext = extname(srcPath);
  const base = basename(srcPath, ext);
  const variantPath = join(dirname(srcPath), `${base}@${width}w${ext}`);

  if (!force && existsSync(variantPath)) {
    return { skipped: true };
  }

  await sharp(srcPath).resize({ width }).avif(AVIF_OPTIONS).toFile(variantPath);
  return { skipped: false };
}

async function mapLimit(items, limit, fn) {
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

async function main() {
  const files = findAvifFiles(PROJECTS_DIR);
  let generated = 0;
  let skipped = 0;
  let untouched = 0;
  const tasks = [];

  for (const file of files) {
    const originalWidth = getImageWidth(toPublicPath(file));
    if (!originalWidth || originalWidth <= MIN_ORIGINAL_WIDTH) {
      untouched++;
      continue;
    }
    for (const width of RESPONSIVE_WIDTHS) {
      if (width >= originalWidth) continue;
      tasks.push({ file, width });
    }
  }

  await mapLimit(tasks, CONCURRENCY, async ({ file, width }) => {
    const result = await generateVariant(file, width);
    if (result.skipped) {
      skipped++;
    } else {
      generated++;
      console.log(`  ${basename(file)} -> @${width}w`);
    }
  });

  console.log(
    `\nDone: ${generated} generated, ${skipped} skipped (already exist), ${untouched} untouched (<=${MIN_ORIGINAL_WIDTH}px)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});