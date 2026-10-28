import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("cf uses assets-only deploy for free unlimited static requests", () => {
  const root = process.cwd();
  const cfConfig = readFileSync(join(root, "cloudflare.config.ts"), "utf8");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const declared = { ...pkg.dependencies, ...pkg.devDependencies };

  expect(existsSync(join(root, "wrangler.jsonc"))).toBe(false);
  expect(existsSync(join(root, "wrangler.json"))).toBe(false);
  expect(existsSync(join(root, "wrangler.toml"))).toBe(false);
  expect(existsSync(join(root, "wrangler.config.ts"))).toBe(false);
  expect(declared.wrangler).toBeUndefined();
  expect(declared["@cloudflare/vite-plugin"]).toBeTruthy();
  expect(cfConfig).toContain('notFoundHandling: "404-page"');
  expect(cfConfig).toContain('htmlHandling: "auto-trailing-slash"');
  expect(cfConfig).not.toContain("entrypoint");
  expect(cfConfig).not.toContain("runWorkerFirst");
  expect(cfConfig).not.toContain("routes");
  expect(cfConfig).toContain("previewUrls: true");
});
