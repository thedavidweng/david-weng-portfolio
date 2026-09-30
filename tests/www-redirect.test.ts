import { readFileSync } from "node:fs";
import { join } from "node:path";

test("wrangler uses assets-only deploy for free unlimited static requests", () => {
  const wranglerConfig = readFileSync(join(process.cwd(), "wrangler.jsonc"), "utf8");

  expect(wranglerConfig).toContain('"directory": "./dist"');
  expect(wranglerConfig).toContain('"not_found_handling": "404-page"');
  expect(wranglerConfig).toContain('"html_handling": "auto-trailing-slash"');
  expect(wranglerConfig).not.toContain('"main"');
  expect(wranglerConfig).not.toContain("run_worker_first");
  expect(wranglerConfig).not.toContain('"routes"');
  expect(wranglerConfig).toContain('"preview_urls": true');
});

test("zone apply keeps Bot Fight Mode off so machine clients can read agent endpoints", () => {
  const source = readFileSync(join(process.cwd(), "scripts/apply-cf-zone-free-tier.mjs"), "utf8");

  expect(source).toContain("fight_mode: false");
  expect(source).toContain("/bot_management");
});
