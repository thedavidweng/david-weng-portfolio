import { readFileSync } from "node:fs";
import { join } from "node:path";

test("next config enables the Lightning CSS pipeline for Vite 8", () => {
  const configSource = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");

  expect(configSource).toContain("useLightningcss");
  expect(configSource).not.toContain("outputFileTracingRoot");
});

test("dev script starts the vinext development server", () => {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8"),
  ) as {
    scripts?: Record<string, string>;
  };

  expect(packageJson.scripts?.dev).toBe("vinext dev");
  expect(packageJson.scripts?.build).toBe(
    "vinext build --precompress && node scripts/append-asset-headers.mjs",
  );
  expect(packageJson.scripts?.prebuild).toBe("pnpm subset:fonts");
});
