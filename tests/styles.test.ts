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

test("mobile film pages define a dedicated stacked layout with tighter credits and media spacing", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".project-page--film .project-hero__grid");
  expect(css).toContain("grid-template-areas:");
  expect(css).toContain('"intro"');
  expect(css).toContain('"poster"');
  expect(css).toContain('"credits"');
  expect(css).toContain(".project-film__intro");
  expect(css).toContain("grid-area: intro;");
  expect(css).toContain(".project-film__credits-wrap");
  expect(css).toContain("grid-area: credits;");
  expect(css).toContain(".project-page--film .project-film__credits-groups");
  expect(css).toContain("grid-template-columns: 1fr;");
  expect(css).toContain(".project-page--film .project-film__section");
  expect(css).toContain("gap: 0.02rem;");
});

test("mobile home shell keeps a visible header nav with built-in separators instead of a duplicate hero nav", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".site-header--home");
  expect(css).toContain(".site-main--home .hero");
  expect(css).toContain(".site-header__descriptor");
  expect(css).toContain(".site-header__nav");
  expect(css).toContain(".site-header__nav-link");
  expect(css).toContain("text-decoration: none;");
  expect(css).toContain(".site-header__nav-link + .site-header__nav-link::before");
  expect(css).toContain("width: 1px;");
  expect(css).not.toContain('content: "/";');
  expect(css).toContain("@media (max-width: 760px)");
  const hiddenHomeNavBlock = css.match(
    /\.site-header--home\s+\.site-header__nav\s*\{[^}]*display:\s*none;[^}]*\}/
  );
  expect(hiddenHomeNavBlock).toBeNull();
});

test("sticky header reserves the iPhone safe-area inset instead of exposing page content behind the status bar", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const headerBlock = css.match(/\.site-header\s*\{[^}]+\}/)?.[0] ?? "";

  expect(headerBlock).toContain("padding-top: env(safe-area-inset-top);");
});

test("home backgrounds remove the red radial glow layers from the page and hero shell", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const bodyBlock = css.match(/body\s*\{[^}]+\}/)?.[0] ?? "";
  const heroFrameBlock = css.match(/\.hero__frame\s*\{[^}]+\}/)?.[0] ?? "";
  const homeHeroFrameBlock = css.match(/\.site-main--home \.hero__frame\s*\{[^}]+\}/)?.[0] ?? "";
  const heroFrameAfterBlock = css.match(/\.hero__frame::after\s*\{[^}]+\}/)?.[0] ?? "";

  expect(bodyBlock).not.toContain("radial-gradient(circle at top right, rgba(255, 77, 90, 0.12), transparent 28%)");
  expect(bodyBlock).not.toContain("radial-gradient(circle at 14% 18%, rgba(255, 77, 90, 0.05), transparent 24%)");
  expect(heroFrameBlock).not.toContain("linear-gradient(145deg, rgba(255, 77, 90, 0.08), transparent 42%)");
  expect(homeHeroFrameBlock).not.toContain("linear-gradient(145deg, rgba(255, 77, 90, 0.08), transparent 42%)");
  expect(heroFrameAfterBlock).not.toContain("linear-gradient(90deg, rgba(255, 77, 90, 0.14), transparent 14%, transparent 86%, rgba(255, 77, 90, 0.14))");
});

test("mobile non-film project pages define tighter archive and external-handoff hero spacing rules", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".project-page--archive .project-hero__grid");
  expect(css).toContain(".project-page--archive .project-hero__content");
  expect(css).toContain(".project-page--archive .project-media");
  expect(css).toContain(".project-page--external-handoff .project-hero__grid");
  expect(css).toContain(".project-page--external-handoff .project-handoff");
  expect(css).toContain(".project-page:not(.project-page--film) .project-hero__grid");
  expect(css).toContain("grid-template-columns: 1fr;");
  expect(css).toContain("padding: 1rem;");
  expect(css).toContain("gap: 0.6rem;");
});

test("mobile archive hero titles switch out of poster uppercase styling and use a protected reading layer", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".project-page--archive .project-hero__content");
  expect(css).toContain(".project-page--archive .project-hero__cover::after");
  expect(css).toContain(".project-page--archive .project-hero__title");
  expect(css).toContain("text-transform: none;");
  expect(css).toContain("line-height: 0.94;");
  expect(css).toContain(".project-page--archive .project-hero__summary");
  expect(css).toContain("font-size: 0.96rem;");
});
