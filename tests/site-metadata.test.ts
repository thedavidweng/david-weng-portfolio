import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL, SITEMAP_URL } from "@/lib/site-config";

test("robots.txt route advertises canonical sitemap URL from shared constant", () => {
  const source = readFileSync(join(process.cwd(), "src/pages/robots.txt.ts"), "utf8");

  expect(source).toContain("SITEMAP_URL");
  expect(source).toContain("Sitemap: ${SITEMAP_URL}");
  expect(source).toContain("Content-Signal: ai-train=no, search=yes, ai-input=yes");
  expect(SITEMAP_URL).toBe(`${SITE_URL}/sitemap.xml`);
});

test("write-headers script links sitemap.xml in agent discovery headers", () => {
  const source = readFileSync(join(process.cwd(), "scripts/write-headers.mjs"), "utf8");

  expect(source).toContain("</sitemap.xml>; rel=\"sitemap\"");
});