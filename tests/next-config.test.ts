import { readFileSync } from "node:fs";
import { join } from "node:path";

test("next config pins outputFileTracingRoot to the project directory", () => {
  const configSource = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

  expect(configSource).toContain("outputFileTracingRoot");
  expect(configSource).toContain("import.meta.dirname");
});

test("dev script uses polling watchers to avoid EMFILE errors in local preview", () => {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8"),
  ) as {
    scripts?: Record<string, string>;
  };

  expect(packageJson.scripts?.dev).toContain("WATCHPACK_POLLING=true");
  expect(packageJson.scripts?.dev).toContain("next dev --webpack");
});
