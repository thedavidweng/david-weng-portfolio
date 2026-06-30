import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("base layout declares dark mobile browser chrome metadata for Safari-compatible theming", () => {
  const source = readFileSync(join(process.cwd(), "src/layouts/BaseLayout.astro"), "utf8");

  expect(source).toContain('name="theme-color"');
  expect(source).toContain("#070607");
  expect(source).toContain('name="color-scheme"');
  expect(source).toContain("viewport-fit=cover");
  expect(source).toContain('rel="apple-touch-icon"');
  expect(source).toContain("/brand/og-image.png");
  expect(existsSync(join(process.cwd(), "public/brand/og-image.png"))).toBe(true);
  expect(source).toContain('rel="preload"');
  expect(source).toContain('as="font"');
  expect(source).toContain('fetchpriority="high"');
});