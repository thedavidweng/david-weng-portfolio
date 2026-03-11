import { readFileSync } from "node:fs";
import { join } from "node:path";

const filesToClean = [
  "content/site.ts",
  "content/projects.ts",
  "README.md",
  "tests/homepage.test.tsx"
];

test("repository uses content operations / 内容运营 consistently in active copy and docs", () => {
  for (const relativePath of filesToClean) {
    const text = readFileSync(join(process.cwd(), relativePath), "utf8");

    expect(text).not.toContain("content systems");
    expect(text).not.toContain("Content systems");
    expect(text).not.toContain("内容系统");
    expect(text).not.toContain("Content System");
  }

  const siteCopy = readFileSync(join(process.cwd(), "content/site.ts"), "utf8");

  expect(siteCopy).toContain("content operations");
  expect(siteCopy).toContain("Content operations");
  expect(siteCopy).toContain("内容运营");
});
