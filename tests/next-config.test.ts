import { readFileSync } from "node:fs";
import { join } from "node:path";

test("next config pins outputFileTracingRoot to the project directory", () => {
  const configSource = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

  expect(configSource).toContain("outputFileTracingRoot");
  expect(configSource).toContain("import.meta.dirname");
});

test("dev script starts the vinext development server", () => {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8"),
  ) as {
    scripts?: Record<string, string>;
  };

  expect(packageJson.scripts?.dev).toBe("vinext dev");
  expect(packageJson.scripts?.build).toBe("vinext build");
});
