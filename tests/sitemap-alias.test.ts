import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { aliasSitemapXml } from "../scripts/sitemap-alias.mjs";

test("aliasSitemapXml copies sitemap-0.xml to sitemap.xml", () => {
  const dir = mkdtempSync(join(tmpdir(), "sitemap-alias-"));
  const chunk = "<urlset><url><loc>https://davidweng.eu.org/</loc></url></urlset>";

  writeFileSync(join(dir, "sitemap-0.xml"), chunk);

  const outputPath = aliasSitemapXml(dir);

  expect(outputPath).toBe(join(dir, "sitemap.xml"));
  expect(existsSync(outputPath)).toBe(true);
  expect(readFileSync(outputPath, "utf8")).toBe(chunk);
});

test("aliasSitemapXml throws when sitemap-0.xml is missing", () => {
  const dir = mkdtempSync(join(tmpdir(), "sitemap-alias-missing-"));

  expect(() => aliasSitemapXml(dir)).toThrow(/sitemap-0\.xml/);
});