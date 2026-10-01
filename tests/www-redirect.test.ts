import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("cf uses assets-only deploy for free unlimited static requests", () => {
  const cfConfig = readFileSync(join(process.cwd(), "cloudflare.config.ts"), "utf8");
  const bundlerConfig = readFileSync(join(process.cwd(), "wrangler.config.ts"), "utf8");

  expect(existsSync(join(process.cwd(), "wrangler.jsonc"))).toBe(false);
  expect(bundlerConfig).toContain('assetsDirectory: "./dist"');
  expect(cfConfig).toContain('notFoundHandling: "404-page"');
  expect(cfConfig).toContain('htmlHandling: "auto-trailing-slash"');
  expect(cfConfig).not.toContain("entrypoint");
  expect(cfConfig).not.toContain("runWorkerFirst");
  expect(cfConfig).not.toContain("routes");
  expect(cfConfig).toContain("previewUrls: true");
});

test("zone apply keeps Bot Fight Mode off so machine clients can read agent endpoints", () => {
  const source = readFileSync(join(process.cwd(), "scripts/apply-cf-zone-free-tier.mjs"), "utf8");

  expect(source).toContain("fight_mode: false");
  expect(source).toContain("/bot_management");
});
