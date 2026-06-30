import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("vinext compatibility check reports 100%", () => {
  const output = execFileSync("pnpm", ["exec", "vinext", "check"], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env
  });

  expect(output).toContain("100% compatible");
  expect(output).toContain("0 partial, 0 issues");
});

test("vinext config files exist for Cloudflare deployment", () => {
  const root = process.cwd();
  const viteConfig = readFileSync(join(root, "vite.config.ts"), "utf8");

  expect(existsSync(join(root, "wrangler.jsonc"))).toBe(true);
  expect(existsSync(join(root, "worker/index.ts"))).toBe(true);
  expect(viteConfig).toContain("vinext()");
  expect(viteConfig).not.toContain("@vitejs/plugin-rsc");
});