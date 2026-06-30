import { readFileSync } from "node:fs";
import { join } from "node:path";

test("wrangler Pages config points at dist output", () => {
  const wranglerConfig = readFileSync(join(process.cwd(), "wrangler.toml"), "utf8");

  expect(wranglerConfig).toContain('pages_build_output_dir = "./dist"');
  expect(wranglerConfig).not.toContain("routes");
});