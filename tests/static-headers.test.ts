import { readFileSync } from "node:fs";
import { join } from "node:path";

test("wrangler config does not require paid Cloudflare Images transforms", () => {
  const wranglerConfig = readFileSync(join(process.cwd(), "wrangler.jsonc"), "utf8");

  expect(wranglerConfig).not.toContain('"binding": "IMAGES"');
  expect(wranglerConfig).not.toContain('"main"');
  expect(wranglerConfig).toContain('"directory": "./dist"');
});