import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SCAN_DIRS = ["src", "lib", "content", "types", "tests"];
const SCAN_EXTENSIONS = /\.(ts|tsx|astro|css)$/;
const GENERATED_FILES = new Set<string>();

const ALLOWED_COMMENT_UNITS: Record<string, number> = {
  "lib/image-dimensions.ts": 1,
  "lib/projects.ts": 1,
  "lib/responsive-srcset.ts": 1,
  "lib/url.ts": 1,
  "src/islands/AgentModeGate.tsx": 3,
  "src/islands/ArchiveMediaWall.tsx": 1,
  "src/styles/font-fallbacks.css": 1,
};

const DIRECTIVE_PATTERN = /^\/\/\/|@ts-expect-error|oxlint-disable|@license/;

function listSourceFiles(): string[] {
  return SCAN_DIRS.flatMap((dir) =>
    readdirSync(join(process.cwd(), dir), { recursive: true, encoding: "utf8" })
      .filter((name) => SCAN_EXTENSIONS.test(name))
      .map((name) => [dir, ...name.split(/[\\/]/)].join("/")),
  ).filter((path) => !GENERATED_FILES.has(path));
}

function stripStringLiterals(source: string): string {
  return source
    .replace(/`(?:\\.|[^`\\])*`/gs, "``")
    .replace(/'(?:\\.|[^'\\\n])*'/g, "''")
    .replace(/"(?:\\.|[^"\\\n])*"/g, '""');
}

function findCommentUnits(source: string): number[] {
  const stripped = stripStringLiterals(source);
  const startLines: number[] = [];
  let insideLineCommentRun = false;
  stripped.split("\n").forEach((line, index) => {
    const trimmed = line.trim();
    const isLineComment = trimmed.startsWith("//") && !DIRECTIVE_PATTERN.test(trimmed);
    if (isLineComment && !insideLineCommentRun) {
      startLines.push(index + 1);
    }
    insideLineCommentRun = isLineComment;
  });
  for (const match of stripped.matchAll(/\/\*[\s\S]*?\*\//g)) {
    if (!DIRECTIVE_PATTERN.test(match[0])) {
      startLines.push(stripped.slice(0, match.index).split("\n").length);
    }
  }
  for (const match of stripped.matchAll(/<!--/g)) {
    startLines.push(stripped.slice(0, match.index).split("\n").length);
  }
  return startLines.toSorted((a, b) => a - b);
}

test("comments stay within the allowlist (AGENTS.md → Coding Conventions)", () => {
  const violations: string[] = [];
  for (const path of listSourceFiles()) {
    const units = findCommentUnits(readFileSync(join(process.cwd(), path), "utf8"));
    const allowed = ALLOWED_COMMENT_UNITS[path] ?? 0;
    if (units.length > allowed) {
      violations.push(
        `${path}: ${units.length} comment unit(s), ${allowed} allowed (line ${units.join(", ")}). ` +
          "Delete the comment, or record the rationale in docs/adr/ instead. " +
          "Extend the allowlist only for a constraint the code cannot express.",
      );
    }
  }
  expect(violations).toEqual([]);
});
