import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

test("root layout declares dark mobile browser chrome metadata for Safari-compatible theming", () => {
  const source = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");

  expect(source).toContain("export const viewport");
  expect(source).toContain("themeColor");
  expect(source).toContain("#070607");
  expect(source).toContain("colorScheme");
  expect(source).toContain("viewportFit");
  expect(source).toContain("appleWebApp");
  expect(source).toContain("statusBarStyle");
  expect(source).toContain('url: "/brand/og-image.png"');
  expect(source).toContain('images: ["/brand/og-image.png"]');
  expect(existsSync(join(process.cwd(), "public/brand/og-image.png"))).toBe(true);
});
