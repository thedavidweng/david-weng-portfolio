import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("wrangler config does not require paid Cloudflare Images transforms", () => {
  const wranglerConfig = readFileSync(join(process.cwd(), "wrangler.jsonc"), "utf8");

  expect(wranglerConfig).not.toContain('"binding": "IMAGES"');
});

test("build output applies long-lived cache headers to self-hosted media", () => {
  const headersPath = join(process.cwd(), "dist", "client", "_headers");

  expect(existsSync(headersPath)).toBe(true);

  const headers = readFileSync(headersPath, "utf8");

  expect(headers).toContain("/_next/static/*");
  expect(headers).toContain("/projects/*");
  expect(headers).toContain("/brand/*");
  expect(headers).toContain("max-age=31536000, immutable");
});