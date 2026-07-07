import { readFileSync } from "node:fs";
import { join } from "node:path";

test("wrangler Workers static assets config points at dist output", () => {
  const wranglerConfig = readFileSync(join(process.cwd(), "wrangler.jsonc"), "utf8");

  expect(wranglerConfig).toContain('"directory": "./dist"');
  expect(wranglerConfig).toContain('"not_found_handling": "404-page"');
  expect(wranglerConfig).toContain('"html_handling": "none"');
  expect(wranglerConfig).toContain('"observability"');
  expect(wranglerConfig).not.toContain('"routes"');
  expect(wranglerConfig).toContain('"cache"');
  expect(wranglerConfig).toContain('"enabled": true');
});