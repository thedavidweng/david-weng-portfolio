import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import subsetFont from "subset-font";

const ROOT = process.cwd();
const SCAN_DIRS = ["src", "content", "lib", "tests"];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".md"]);
const FULL_DIR = join(ROOT, "assets/fonts/full");
const OUTPUT_DIR = join(ROOT, "assets/fonts");

const NOTO_FONTS = [
  "noto-sans-sc-chinese-simplified-400-normal.woff2",
  "noto-sans-sc-chinese-simplified-700-normal.woff2",
  "noto-sans-sc-chinese-simplified-900-normal.woff2",
];

const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g;
const BASE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
  " .,;:!?\"'()[]{}<>/@#%&*+-=_~`|\\" +
  "·—…、。，；：？！「」『』（）【】《》〈〉“”‘’";

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      if (entry === "node_modules" || entry === "dist" || entry === ".git") {
        continue;
      }
      walk(path, files);
      continue;
    }

    const ext = entry.slice(entry.lastIndexOf("."));
    if (SCAN_EXTENSIONS.has(ext)) {
      files.push(path);
    }
  }

  return files;
}

function collectText() {
  const chars = new Set(BASE_CHARS.split(""));

  for (const dir of SCAN_DIRS) {
    const absoluteDir = join(ROOT, dir);
    try {
      statSync(absoluteDir);
    } catch {
      continue;
    }

    for (const file of walk(absoluteDir)) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(CJK_RE)) {
        chars.add(match[0]);
      }
    }
  }

  return [...chars].join("");
}

async function subsetFonts(text) {
  for (const name of NOTO_FONTS) {
    const inputPath = join(FULL_DIR, name);
    const outputPath = join(OUTPUT_DIR, name);
    const input = readFileSync(inputPath);
    const output = await subsetFont(input, text, { targetFormat: "woff2" });

    writeFileSync(outputPath, output);
    console.log(
      `  ${relative(ROOT, outputPath)}  ${(input.length / 1024).toFixed(0)}KB → ${(output.length / 1024).toFixed(0)}KB  (${text.length} code points)`,
    );
  }
}

const text = collectText();
console.log(`Subsetting Noto Sans SC using ${text.length} code points from ${SCAN_DIRS.join(", ")}`);
await subsetFonts(text);