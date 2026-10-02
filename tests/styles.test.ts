import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(process.cwd(), "src/styles/global.css"), "utf8");

test("project card title styling keeps letter-spacing stable without block highlight overrides", () => {
  expect(css).toContain(".project-card__title");
  expect(css).not.toContain("transition: letter-spacing var(--ease);");
  expect(css).not.toContain(".project-card:hover .project-card__title");
  expect(css).not.toContain(".project-card:focus-visible .project-card__title");
});

test("project card meta stays readable on light covers", () => {
  const metaBlock = css.match(/\.project-card__meta span\s*\{[^}]+\}/g)?.at(-1) ?? "";

  expect(metaBlock).toContain("border-color: color-mix(in srgb, var(--paper) 52%, transparent);");
  expect(metaBlock).toContain("background: rgba(0, 0, 0, 0.68);");
  expect(metaBlock).toContain("color: var(--paper);");
});

test("project card covers use a softened default filter and sharpen slightly on hover", () => {
  const source = readFileSync(join(process.cwd(), "src/islands/ProjectsSection.tsx"), "utf8");

  expect(source).toContain('PortfolioImage');
  expect(source).toContain('className="project-card__image"');
  expect(source).not.toContain("url(${project.coverImage})");
  expect(css).toContain(".project-card__backdrop");
  expect(css).toContain(".project-card__image");
  expect(css).toContain("filter: blur(2.75px) brightness(0.76)");
  expect(css).toContain("filter: blur(0.75px) brightness(0.9) saturate(1.08)");
  expect(css).toContain(".projects__slide");
  expect(css).toContain("contain: layout paint;");
});

test("archive media hover keeps the bottom shadow aligned with the image scale", () => {
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
  const contentBlock = css.match(/\.project-hero__content\s*\{[^}]+\}/)?.[0] ?? "";
  const coverBlock = css.match(/\.project-hero__cover\s*\{[^}]+\}/)?.[0] ?? "";

  expect(contentBlock).toContain("position: relative;");
  expect(contentBlock).toContain("z-index: 1;");
  expect(coverBlock).toContain("z-index: 0;");
});

test("external handoff titles use article-scale typography instead of poster styling", () => {
  const externalTitleBlock = css.match(/\.project-page--external-handoff \.project-hero__title\s*\{[^}]+\}/)?.[0] ?? "";

  expect(externalTitleBlock).toContain("max-width: 14ch;");
  expect(externalTitleBlock).toContain("font-size: clamp(2.4rem, 4.8vw, 4.4rem);");
  expect(externalTitleBlock).toContain("line-height: 1;");
  expect(externalTitleBlock).toContain("letter-spacing: -0.01em;");
  expect(externalTitleBlock).toContain("text-transform: none;");
});

test("beaty video badge stays content-width inside the video card grid", () => {
  const videoCopyBadgeBlock = css.match(/\.project-media__video-copy \.project-media__badge\s*\{[^}]+\}/)?.[0] ?? "";

  expect(videoCopyBadgeBlock).toContain("justify-self: start;");
});

test("archive-backed titles use article-scale typography instead of poster styling", () => {
  const archiveTitleBlock = css.match(/\.project-page--archive \.project-hero__title\s*\{[^}]+\}/)?.[0] ?? "";

  expect(archiveTitleBlock).toContain("max-width: none;");
  expect(archiveTitleBlock).toContain("font-size: clamp(2.35rem, 4.5vw, 4.6rem);");
  expect(archiveTitleBlock).toContain("line-height: 1.05;");
  expect(archiveTitleBlock).toContain("text-transform: none;");
  expect(archiveTitleBlock).toContain("overflow-wrap: normal;");
  expect(archiveTitleBlock).toContain("text-wrap: balance;");
});

test("archive-backed hero layout anchors a catalog ledger beneath the title block", () => {
  const archiveContentBlock = css.match(/\.project-hero__content--archive\s*\{[^}]+\}/)?.[0] ?? "";
  const archiveLedgerBlock = css.match(/\.project-hero__archive-ledger\s*\{[^}]+\}/)?.[0] ?? "";

  expect(archiveContentBlock).toContain("justify-content: space-between;");
  expect(archiveContentBlock).toContain("min-height: 100%;");
  expect(archiveLedgerBlock).toContain("margin-top: auto;");
  expect(archiveLedgerBlock).toContain("border-top: 1px solid rgba(var(--accent-rgb), 0.24);");
  expect(css).toContain(".project-hero__cover-meta--archive");
  expect(css).toContain(".project-hero__archive-watermark");
});

test("archive-backed hero layout gives the cover panel more width and height on detail pages", () => {
  const archiveGridBlock = css.match(/\.project-page--archive \.project-hero__grid\s*\{[^}]+\}/)?.[0] ?? "";
  const archiveCoverBlock = css.match(/\.project-page--archive \.project-hero__cover\s*\{[^}]+\}/)?.[0] ?? "";

  expect(archiveGridBlock).toContain("grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);");
  expect(archiveCoverBlock).toContain("min-height: clamp(24rem, 34vw, 30rem);");
});

test("beaty video thumbnails render in a fixed 16:9 frame instead of a cropped min-height box", () => {
  const videoThumbBlock = css.match(/\.project-media__video-thumb\s*\{[^}]+\}/)?.[0] ?? "";

  expect(videoThumbBlock).toContain("aspect-ratio: 16 / 9;");
  expect(videoThumbBlock).not.toContain("min-height: 240px;");
});

test("archive media wall defers ResizeObserver-based branching until after mount to avoid hydration mismatches", () => {
  const source = readFileSync(join(process.cwd(), "src/islands/ArchiveMediaWall.tsx"), "utf8");

  expect(source).toContain("useSyncExternalStore");
  expect(source).toContain("getStaticAlbumSnapshot");
  expect(source).toContain("return false;");
  expect(source).not.toContain('const supportsResponsiveAlbum = typeof ResizeObserver !== "undefined";');
});

test("film poster hero uses contain sizing and dedicated horizontal rails for stills", () => {
  expect(css).toContain(".project-film__poster-image");
  expect(css).toContain("object-fit: contain;");
  expect(css).toContain(".project-film__stills-rail");
  expect(css).toContain("overflow-x: auto;");
  expect(css).toContain("scroll-snap-type: x proximity;");
});

test("mobile film pages define a dedicated stacked layout with tighter credits and media spacing", () => {
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

test("mobile header hides the inline nav and turns the search button into the menu", () => {
  const mobileBlock = extractCssBlock(css.slice(css.indexOf(".site-header__inner {")), "@media (max-width: 760px)");

  expect(css).toContain(".home-hero__title");
  expect(css).toContain(".site-header__nav-link");
  expect(css).not.toContain(".site-header__menu-panel");
  expect(mobileBlock).toContain(".site-header__nav,\n  .site-header__search-icon,\n  html.js .site-header__locale {\n    display: none;");
  expect(mobileBlock).toContain(".site-header__menu-icon {\n    display: block;");
});

test("home layout uses dedicated modern font variables without changing project card typography", () => {
  const layoutSource = readFileSync(join(process.cwd(), "src/layouts/BaseLayout.astro"), "utf8");
  const fontsSource = readFileSync(join(process.cwd(), "src/styles/fonts.css"), "utf8");
  const projectCardTitleBlock = css.match(/\.project-card__title\s*\{[^}]+\}/)?.[0] ?? "";
  const rootBlock = css.match(/:root\s*\{[^}]+\}/)?.[0] ?? "";

  expect(layoutSource).toContain("src/styles/fonts.css");
  expect(fontsSource).toContain("outfit-latin-wght-normal.woff2");
  expect(fontsSource).toContain("mona-sans-latin.woff2");
  expect(fontsSource).toContain("noto-sans-sc-chinese-simplified");
  expect(fontsSource).toContain("--font-display");
  expect(fontsSource).toContain("font-weight: 100 900");
  expect(fontsSource).toContain("display Fallback");
  expect(fontsSource).toContain("--font-body");
  expect(fontsSource).toContain("body Fallback");
  expect(fontsSource).toContain("--font-home-zh");
  expect(fontsSource).toContain("homeZh Fallback");
  expect(fontsSource).toContain("mono Fallback");
  expect(readFileSync(join(process.cwd(), "src/styles/font-fallbacks.css"), "utf8")).toContain(
    'font-family: "display Fallback"'
  );
  expect(fontsSource).toContain("--font-home-display");
  expect(fontsSource).toContain("--font-home-body");
  expect(fontsSource).toContain("font-display: optional");
  expect(layoutSource).toContain('rel="preload"');
  expect(layoutSource).toContain("outfit-latin-wght-normal.woff2?url");
  expect(layoutSource).toContain('fetchpriority="high"');
  expect(layoutSource).toContain('name="theme-color"');
  expect(layoutSource).toContain('content="#100e0d" media="(prefers-color-scheme: dark)" data-scheme="dark"');
  expect(layoutSource).toContain('content="#fcfbfa" media="(prefers-color-scheme: light)" data-scheme="light"');
  expect(layoutSource).toContain('name="color-scheme"');
  expect(layoutSource).toContain("viewport-fit=cover");
  expect(layoutSource).toContain('rel="apple-touch-icon"');
  expect(layoutSource).toContain("/brand/og-image.png");
  expect(existsSync(join(process.cwd(), "public/brand/og-image.png"))).toBe(true);
  expect(rootBlock).not.toContain("Inter Tight");
  const headerBrandBlock = css.match(/\.site-header__brand\s*\{[^}]+\}/)?.[0] ?? "";
  expect(headerBrandBlock).toContain("align-items: center;");
  expect(rootBlock).toContain("color-scheme: dark light;");
  expect(rootBlock).toContain("--line: light-dark(");
  expect(rootBlock).toContain("--surface: light-dark(");
  expect(rootBlock).toContain("--accent: light-dark(");
  expect(rootBlock).toContain("--accent-soft: rgba(225, 29, 37, 0.72);");
  expect(rootBlock).toContain("--radius-xl: 0;");
  expect(rootBlock).toContain("--radius-lg: 0;");
  expect(rootBlock).toContain("--radius-md: 0;");
  expect(rootBlock).toContain("--radius-pill: 999px;");
  expect(projectCardTitleBlock).toContain("font-family: var(--font-body);");
});

function extractCssBlock(source: string, selector: string): string {
  const startIndex = source.indexOf(selector);
  if (startIndex === -1) return "";
  const openBrace = source.indexOf("{", startIndex);
  if (openBrace === -1) return "";
  let depth = 0;
  for (let i = openBrace; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return source.slice(startIndex, i + 1);
    }
  }
  return "";
}

test("theme toggle uses a plain view transition and keeps image surfaces dark in light mode", () => {
  const layoutSource = readFileSync(join(process.cwd(), "src/layouts/BaseLayout.astro"), "utf8");

  expect(layoutSource).toContain('localStorage.getItem("theme")');
  expect(css).toContain(":root[data-theme-transition]::view-transition-new(root)");
  expect(css).toContain(':root[data-theme="light"] {\n  color-scheme: light;');
  expect(css).toContain(".project-card,\n.project-hero__cover,");
  expect(css).toContain("html:not(.js) .js-only");
});

test("homepage components separate services from hero instead of rendering hero capabilities inline", () => {
  const heroSource = readFileSync(join(process.cwd(), "src/components/HeroSection.astro"), "utf8");
  const homeSource = readFileSync(join(process.cwd(), "src/layouts/HomeLayout.astro"), "utf8");

  expect(heroSource).not.toContain("ServiceCard");
  expect(heroSource).not.toContain("hero__capabilities");
  expect(heroSource).not.toContain('id="services"');
  expect(homeSource).toContain("ServicesSection");
  expect(homeSource).toContain("<ServicesSection locale={locale} />");
  expect(homeSource).toContain("<ProjectsSection client:visible locale={locale}");
  expect(homeSource.indexOf("<ProjectsSection client:visible locale={locale}")).toBeLessThan(
    homeSource.indexOf("<ServicesSection locale={locale} />"),
  );
  expect(homeSource).toContain('import("@/src/islands/AgentModeGate.tsx")');
  expect(homeSource).not.toContain("AgentModeGate client:only");
});

test("touch screens get 44px targets, safe-area gutters, and visible archive overlays", () => {
  const coarseBlock = extractCssBlock(css, "@media (pointer: coarse)");
  const rootBlock = css.match(/:root\s*\{[^}]+\}/)?.[0] ?? "";

  expect(coarseBlock).toContain(".site-header__control {\n    min-width: 44px;\n    height: 44px;");
  expect(coarseBlock).toContain(".filter-chip,");
  expect(coarseBlock).toContain(".site-footer__links a,");
  expect(rootBlock).toContain("env(safe-area-inset-left), env(safe-area-inset-right)");
  expect(css).toContain("text-size-adjust: 100%;");
  expect(css).toContain("padding: 0 0 calc(2.5rem + env(safe-area-inset-bottom));");
  expect(extractCssBlock(css, "@media (max-width: 1120px), (hover: none)")).toContain(".project-media__wall-overlay");
});

test("sticky header reserves the iPhone safe-area inset instead of exposing page content behind the status bar", () => {
  const headerBlock = css.match(/\.site-header\s*\{[^}]+\}/)?.[0] ?? "";

  expect(headerBlock).toContain("padding-top: env(safe-area-inset-top);");
});

test("home backgrounds remove the red radial glow layers from the page and hero shell", () => {
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


test("controls are pills while cards and media frames stay square", () => {
  const buttonBlock = css.match(/\.button\s*\{[^}]+\}/)?.[0] ?? "";
  const filterBlock = css.match(/\.filter-chip,\n\.reel-nav\s*\{[^}]+\}/)?.[0] ?? "";
  const frameCardBlock = css.match(/\.frame-card\s*\{[^}]+\}/)?.[0] ?? "";
  const rootBlock = css.match(/:root\s*\{[^}]+\}/)?.[0] ?? "";
  const lightboxCloseBlock = css.match(/\.project-media__lightbox-close\s*\{[^}]+\}/)?.[0] ?? "";

  expect(rootBlock).toContain("--radius-pill: 999px;");
  expect(rootBlock).toContain("--radius-md: 0;");
  expect(buttonBlock).toContain("border-radius: var(--radius-pill);");
  expect(filterBlock).toContain("border-radius: var(--radius-pill);");
  expect(frameCardBlock).not.toContain("border-radius");
  expect(css).not.toContain('content: "//";');
  expect(lightboxCloseBlock).toContain("min-width: 44px;");
  expect(lightboxCloseBlock).toContain("min-height: 44px;");
});

test("signal panels restore the red border and top-right corner accent on hover", () => {
  const signalPanelBlock = Array.from(css.matchAll(/\.signal-panel\s*\{[^}]+\}/g))
    .map((match) => match[0])
    .join("\n");
  const signalPanelAfterBlock = css.match(/\.signal-panel::after\s*\{[^}]+\}/)?.[0] ?? "";

  expect(signalPanelBlock).toContain("border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent);");
  expect(css).toContain(".signal-panel:hover");
  expect(css).toContain("border-color: rgba(var(--accent-rgb), 0.76);");
  expect(css).toContain("outline: 1px solid rgba(var(--accent-rgb), 0.92);");
  expect(css).toContain("outline-offset: -1px;");
  expect(signalPanelAfterBlock).toContain('content: "";');
  expect(signalPanelAfterBlock).toContain("border-top: 2px solid transparent;");
  expect(signalPanelAfterBlock).toContain("border-right: 2px solid transparent;");
  expect(css).toContain(".signal-panel:hover::after");
  expect(css).toContain("border-color: rgba(var(--accent-rgb), 0.94);");
});

test("home hero uses a single poster title without accent title lines", () => {
  const heroSource = readFileSync(join(process.cwd(), "src/components/HeroSection.astro"), "utf8");
  const siteSource = readFileSync(join(process.cwd(), "content/site.ts"), "utf8");
  const posterBlock = css.match(/\.poster\s*\{[^}]+\}/)?.[0] ?? "";

  expect(siteSource).toContain('headline: localized("PORTFOLIO", "PORTFOLIO")');
  expect(heroSource).toContain("poster home-hero__title");
  expect(heroSource).not.toContain("hero__title-line");
  expect(css).not.toContain(".hero__title-line");
  expect(posterBlock).toContain("text-transform: uppercase;");
  expect(posterBlock).toContain("font-weight: 900;");
});


test("homepage sections share one indexed section head", () => {
  const servicesSource = readFileSync(join(process.cwd(), "src/components/ServicesSection.astro"), "utf8");
  const projectsSource = readFileSync(join(process.cwd(), "src/islands/ProjectsSection.tsx"), "utf8");
  const headSource = readFileSync(join(process.cwd(), "src/components/SectionHead.astro"), "utf8");

  expect(servicesSource).toContain("SectionHead");
  expect(projectsSource).toContain("section-head");
  expect(headSource).toContain("section-head__index");
  expect(servicesSource).not.toContain("poster-section__eyebrow");
  expect(projectsSource).not.toContain("poster-section__eyebrow");
  expect(css).toContain(".section-head {");
});


test("project pages and media modules use open-stage containers instead of dark boxed panels", () => {
  const heroFrameBlock = css.match(/\.project-hero__frame\s*\{[^}]+\}/)?.[0] ?? "";
  const handoffBlock = css.match(/\.project-handoff\s*\{[^}]+\}/)?.[0] ?? "";
  const videoThumbBlock = css.match(/\.project-media__video-thumb\s*\{[^}]+\}/)?.[0] ?? "";
  const imageBlock = css.match(/\.project-media__image\s*\{[^}]+\}/)?.[0] ?? "";
  const signalPanelBlock = Array.from(css.matchAll(/\.signal-panel\s*\{[^}]+\}/g))
    .map((match) => match[0])
    .join("\n");

  expect(heroFrameBlock).toContain("background: transparent;");
  expect(heroFrameBlock).toContain("box-shadow: none;");
  expect(heroFrameBlock).toContain("border-radius: 0;");
  expect(handoffBlock).toContain("background: transparent;");
  expect(handoffBlock).toContain("border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);");
  expect(signalPanelBlock).toContain("background: transparent;");
  expect(signalPanelBlock).toContain("border-radius: 0;");
  expect(videoThumbBlock).toContain("border-radius: 0;");
  expect(imageBlock).toContain("border-radius: 0;");
});

test("mobile non-film project pages define tighter archive and external-handoff hero spacing rules", () => {
  const archiveGridBlocks = Array.from(css.matchAll(/\.project-page--archive \.project-hero__grid\s*\{[^}]+\}/g)).map(
    (match) => match[0]
  );
  const mobileArchiveGridBlock = archiveGridBlocks.find((block) => block.includes("gap: 1.1rem;")) ?? "";

  expect(css).toContain(".project-page--archive .project-hero__grid");
  expect(css).toContain(".project-page--archive .project-hero__content");
  expect(css).toContain(".project-page--archive .project-media");
  expect(css).toContain(".project-page--external-handoff .project-hero__grid");
  expect(css).toContain(".project-page--external-handoff .project-handoff");
  expect(css).toContain(".project-page:not(.project-page--film) .project-hero__grid");
  expect(css).toContain("grid-template-columns: 1fr;");
  expect(mobileArchiveGridBlock).toContain("padding: 1rem;");
  expect(mobileArchiveGridBlock).toContain("gap: 1.1rem;");
});

test("mobile archive hero titles switch out of poster uppercase styling and use a protected reading layer", () => {
  expect(css).toContain(".project-page--archive .project-hero__content");
  expect(css).toContain(".project-page--archive .project-hero__cover::after");
  expect(css).toContain(".project-page--archive .project-hero__cover-image");
  expect(css).not.toMatch(/\.project-page--archive \.project-hero__cover\s*\{[^}]*align-items:\s*flex-start;/);
  expect(css).toContain(".project-page--archive .project-hero__title");
  expect(css).toContain("text-transform: none;");
  expect(css).toContain("line-height: 0.94;");
  expect(css).toContain(".project-page--archive .project-hero__summary");
  expect(css).toContain("font-size: 0.96rem;");
});

test("project media lightbox styles YARL with noir chrome and mobile pinch-zoom support", () => {
  const closeBlock = css.match(/\.project-media__lightbox-close\s*\{[^}]+\}/)?.[0] ?? "";
  const mobileSlideBlock =
    css.match(/@media \(max-width: 760px\)[\s\S]*?\.project-media__lightbox \.yarl__slide\s*\{[^}]+\}/)?.[0] ?? "";

  expect(css).toContain(".project-media__lightbox");
  expect(css).toContain(".project-media__lightbox .yarl__container");
  expect(css).toContain(".project-media__lightbox .yarl__slide_image");
  expect(css).toContain("touch-action: pan-x pan-y pinch-zoom;");
  expect(css).not.toContain(".project-media__lightbox-backdrop");
  expect(css).not.toContain(".project-media__lightbox-scroll");
  expect(css).not.toContain(".project-media__lightbox-frame");
  expect(css).not.toContain(".project-media__lightbox-image");
  expect(closeBlock).toContain("position: fixed;");
  expect(closeBlock).toContain("top: calc(env(safe-area-inset-top) + 1rem);");
  expect(mobileSlideBlock).toContain("env(safe-area-inset-top)");
});
