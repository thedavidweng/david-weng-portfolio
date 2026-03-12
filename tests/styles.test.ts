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
  expect(css).toContain("inset: 0;");
  expect(css).toContain(
    "background: linear-gradient(180deg, rgba(0, 0, 0, 0) 54%, rgba(0, 0, 0, 0.08) 68%, rgba(0, 0, 0, 0.86) 100%);"
  );
  expect(css).toContain("transform: translateY(10px) scale(var(--archive-media-hover-scale));");
  expect(css).toContain("transform: translateY(0) scale(var(--archive-media-hover-scale));");
  expect(css).toContain("transform: scale(var(--archive-media-hover-scale));");
});

test("project hero content stays layered above the cover panel", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const contentBlock = css.match(/\.project-hero__content\s*\{[^}]+\}/)?.[0] ?? "";
  const coverBlock = css.match(/\.project-hero__cover\s*\{[^}]+\}/)?.[0] ?? "";

  expect(contentBlock).toContain("position: relative;");
  expect(contentBlock).toContain("z-index: 1;");
  expect(coverBlock).toContain("z-index: 0;");
});

test("external handoff titles use article-scale typography instead of poster styling", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const externalTitleBlock = css.match(/\.project-page--external-handoff \.project-hero__title\s*\{[^}]+\}/)?.[0] ?? "";

  expect(externalTitleBlock).toContain("max-width: 14ch;");
  expect(externalTitleBlock).toContain("font-size: clamp(2.4rem, 4.8vw, 4.4rem);");
  expect(externalTitleBlock).toContain("line-height: 1;");
  expect(externalTitleBlock).toContain("letter-spacing: -0.01em;");
  expect(externalTitleBlock).toContain("text-transform: none;");
});

test("beaty video badge stays content-width inside the video card grid", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const videoCopyBadgeBlock = css.match(/\.project-media__video-copy \.project-media__badge\s*\{[^}]+\}/)?.[0] ?? "";

  expect(videoCopyBadgeBlock).toContain("justify-self: start;");
});

test("archive-backed hero layout gives the cover panel more width and height on detail pages", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const archiveGridBlock = css.match(/\.project-page--archive \.project-hero__grid\s*\{[^}]+\}/)?.[0] ?? "";
  const archiveCoverBlock = css.match(/\.project-page--archive \.project-hero__cover\s*\{[^}]+\}/)?.[0] ?? "";

  expect(archiveGridBlock).toContain("grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);");
  expect(archiveCoverBlock).toContain("min-height: 560px;");
});

test("beaty video thumbnails render in a fixed 16:9 frame instead of a cropped min-height box", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const videoThumbBlock = css.match(/\.project-media__video-thumb\s*\{[^}]+\}/)?.[0] ?? "";

  expect(videoThumbBlock).toContain("aspect-ratio: 16 / 9;");
  expect(videoThumbBlock).not.toContain("min-height: 240px;");
});

test("archive media wall defers ResizeObserver-based branching until after mount to avoid hydration mismatches", () => {
  const source = readFileSync(join(process.cwd(), "components/projects/ArchiveMediaWall.tsx"), "utf8");

  expect(source).toContain("useSyncExternalStore");
  expect(source).toContain("getStaticAlbumSnapshot");
  expect(source).toContain("return false;");
  expect(source).not.toContain('const supportsResponsiveAlbum = typeof ResizeObserver !== "undefined";');
});

test("film poster hero uses contain sizing and dedicated horizontal rails for stills", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".project-film__poster-image");
  expect(css).toContain("object-fit: contain;");
  expect(css).toContain(".project-film__stills-rail");
  expect(css).toContain("overflow-x: auto;");
  expect(css).toContain("scroll-snap-type: x proximity;");
});
