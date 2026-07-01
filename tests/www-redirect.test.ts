import { readFileSync } from "node:fs";
import { join } from "node:path";
import worker from "../workers/site.mjs";

const APEX = "https://davidweng.eu.org";
const WWW = "https://www.davidweng.eu.org";

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

test("legacy worker script still redirects www host to apex with path and query preserved", async () => {
  const response = await worker.fetch(
    new Request(`${WWW}/projects/fraud/?lang=en`),
    { ASSETS: { fetch: async () => new Response("asset") } }
  );

  expect(response.status).toBe(301);
  expect(response.headers.get("Location")).toBe(`${APEX}/projects/fraud/?lang=en`);
});

test("legacy worker script serves assets on apex host", async () => {
  const assetResponse = new Response("homepage", { status: 200 });
  const response = await worker.fetch(new Request(`${APEX}/`), {
    ASSETS: { fetch: async () => assetResponse }
  });

  expect(response).toBe(assetResponse);
});
