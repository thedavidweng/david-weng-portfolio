import { readFileSync } from "node:fs";
import { join } from "node:path";

test("project card title styling does not animate letter-spacing on hover", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".project-card__title");
  expect(css).not.toContain("transition: letter-spacing var(--ease);");
  expect(css).not.toContain(".project-card:hover .project-card__title");
  expect(css).not.toContain(".project-card:focus-visible .project-card__title");
});

test("project card covers use a softened default filter and sharpen slightly on hover", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain("filter: blur(4px) brightness(0.72)");
  expect(css).toContain("filter: blur(1.5px) brightness(0.9) saturate(1.15)");
  expect(css).toContain("transform: translate3d(10px, -8px, 0);");
});

test("archive media hover keeps the bottom shadow aligned with the image scale", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain("--archive-media-hover-scale: 1;");
  expect(css).toContain(".project-media__rows-button::after");
  expect(css).toContain("transform: translateY(10px) scale(var(--archive-media-hover-scale));");
  expect(css).toContain("transform: translateY(0) scale(var(--archive-media-hover-scale));");
  expect(css).toContain("transform: scale(var(--archive-media-hover-scale));");
});
