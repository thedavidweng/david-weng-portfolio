import { readFileSync } from "node:fs";
import { join } from "node:path";

test("project card title styling keeps letter-spacing stable without block highlight overrides", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

  expect(css).toContain(".project-card__title");
  expect(css).not.toContain("transition: letter-spacing var(--ease);");
  expect(css).not.toContain(".project-card:hover .project-card__title");
  expect(css).not.toContain(".project-card:focus-visible .project-card__title");
});

test("project card covers use a softened default filter and sharpen slightly on hover", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const source = readFileSync(join(process.cwd(), "components/sections/ProjectsSection.tsx"), "utf8");

  expect(source).toContain('import Image from "next/image"');
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

test("home layout uses dedicated modern font variables without changing project card typography", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const layoutSource = readFileSync(join(process.cwd(), "app/layout.tsx"), "utf8");
  const projectCardTitleBlock = css.match(/\.project-card__title\s*\{[^}]+\}/)?.[0] ?? "";
  const headerTitleBlock = css.match(/\.site-header__title\s*\{[^}]+\}/)?.[0] ?? "";
  const rootBlock = css.match(/:root\s*\{[^}]+\}/)?.[0] ?? "";

  expect(layoutSource).toContain("Outfit");
  expect(layoutSource).toContain("Manrope");
  expect(layoutSource).toContain("Noto_Sans_SC");
  expect(layoutSource).toContain('variable: "--font-display"');
  expect(layoutSource).toContain('variable: "--font-body"');
  expect(layoutSource).toContain('variable: "--font-home-zh"');
  expect(css).toContain("--font-home-display");
  expect(css).toContain("--font-home-body");
  expect(css).toContain("--font-home-zh");
  expect(css).toContain(".site-main--home .hero__title");
  expect(css).toContain(".site-main--home .poster-section__title");
  expect(css).toContain(".site-main--home .contact__title");
  expect(headerTitleBlock).toContain("font-family: var(--font-home-display);");
  expect(headerTitleBlock).toContain("display: inline-flex;");
  expect(headerTitleBlock).toContain("align-items: center;");
  expect(headerTitleBlock).toContain("min-height: 44px;");
  expect(headerTitleBlock).toContain("font-style: normal;");
  expect(headerTitleBlock).toContain("font-weight: 700;");
  const headerBrandBlock = css.match(/\.site-header__brand\s*\{[^}]+\}/)?.[0] ?? "";
  expect(headerBrandBlock).toContain("align-items: center;");
  expect(rootBlock).toContain("--line: rgba(174, 174, 180, 0.12);");
  expect(rootBlock).toContain("--line-strong: rgba(174, 174, 180, 0.18);");
  expect(rootBlock).toContain("--text-soft: rgba(202, 202, 206, 0.74);");
  expect(rootBlock).toContain("--text-faint: rgba(150, 150, 156, 0.62);");
  expect(rootBlock).toContain("--accent-soft: rgba(165, 56, 72, 0.72);");
  expect(rootBlock).toContain("--radius-xl: 0;");
  expect(rootBlock).toContain("--radius-lg: 0;");
  expect(rootBlock).toContain("--radius-md: 0;");
  expect(rootBlock).toContain("--radius-pill: 0;");
  expect(projectCardTitleBlock).toContain("font-family: var(--font-body);");
});

test("homepage components separate services from hero instead of rendering hero capabilities inline", () => {
  const heroSource = readFileSync(join(process.cwd(), "components/sections/HeroSection.tsx"), "utf8");
  const homeSource = readFileSync(join(process.cwd(), "components/pages/HomePageView.tsx"), "utf8");

  expect(heroSource).not.toContain("ServiceCard");
  expect(heroSource).not.toContain("hero__capabilities");
  expect(heroSource).not.toContain('id="services"');
  expect(homeSource).toContain("ServicesSection");
  expect(homeSource).toContain("<ServicesSection locale={locale} />");
  expect(homeSource).toContain("<ProjectsSection locale={locale} />");
  expect(homeSource.indexOf("<ProjectsSection locale={locale} />")).toBeLessThan(
    homeSource.indexOf("<ServicesSection locale={locale} />"),
  );
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

test("home hero and contact no longer use the same boxed panel treatment", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const homeHeroFrameBlock = Array.from(css.matchAll(/\.site-main--home \.hero__frame\s*\{[^}]+\}/g))
    .map((match) => match[0])
    .join("\n");
  const homeContactContentBlock = css.match(/\.site-main--home \.contact__content,\s*\.site-main--home \.contact__rail\s*\{[^}]+\}/)?.[0] ?? "";
  const homeContactRailBlock = Array.from(css.matchAll(/\.site-main--home \.contact__rail\s*\{[^}]+\}/g))
    .map((match) => match[0])
    .join("\n");

  expect(homeHeroFrameBlock).toContain("border: none;");
  expect(homeHeroFrameBlock).toContain("border-radius: 0;");
  expect(homeHeroFrameBlock).toContain("background: transparent;");
  expect(homeHeroFrameBlock).toContain("box-shadow: none;");
  expect(homeContactContentBlock).toContain("border: none;");
  expect(homeContactContentBlock).toContain("border-radius: 0;");
  expect(homeContactRailBlock).toContain("border-left: 1px solid rgba(229, 226, 225, 0.08);");
});

test("global controls switch to square noir styling without pill buttons or slash suffixes", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const buttonBlock = css.match(/\.button\s*\{[^}]+\}/)?.[0] ?? "";
  const filterBlock = css.match(/\.filter-chip\s*\{[^}]+\}/)?.[0] ?? "";
  const reelNavBlock = css.match(/\.reel-nav\s*\{[^}]+\}/)?.[0] ?? "";
  const signalButtonBlock = css.match(/\.button--signal\s*\{[^}]+\}/)?.[0] ?? "";
  const headerLinkBlock = css.match(/\.site-header__nav-link\s*\{[^}]+\}/)?.[0] ?? "";
  const lightboxCloseBlock = css.match(/\.project-media__lightbox-close\s*\{[^}]+\}/)?.[0] ?? "";

  expect(buttonBlock).toContain("border-radius: 0;");
  expect(buttonBlock).toContain("text-transform: uppercase;");
  expect(buttonBlock).toContain("border: 1px solid var(--line-strong);");
  expect(css).not.toContain('content: "//";');
  expect(headerLinkBlock).toContain("min-height: 44px;");
  expect(filterBlock).toContain("background: transparent;");
  expect(filterBlock).toContain("min-height: 44px;");
  expect(reelNavBlock).toContain("border-radius: 0;");
  expect(reelNavBlock).toContain("min-height: 44px;");
  expect(reelNavBlock).toContain("min-width: 44px;");
  expect(signalButtonBlock).toContain("background: rgba(var(--accent-rgb), 0.92);");
  expect(signalButtonBlock).toContain("border-color: rgba(var(--accent-rgb), 0.74);");
  expect(lightboxCloseBlock).toContain("min-width: 44px;");
  expect(lightboxCloseBlock).toContain("min-height: 44px;");
});

test("signal panels restore the red border and top-right corner accent on hover", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const signalPanelBlock = Array.from(css.matchAll(/\.signal-panel\s*\{[^}]+\}/g))
    .map((match) => match[0])
    .join("\n");
  const signalPanelAfterBlock = css.match(/\.signal-panel::after\s*\{[^}]+\}/)?.[0] ?? "";

  expect(signalPanelBlock).toContain("border: 1px solid rgba(229, 226, 225, 0.08);");
  expect(css).toContain(".signal-panel:hover");
  expect(css).toContain("border-color: rgba(252, 0, 0, 0.76);");
  expect(css).toContain("outline: 1px solid rgba(252, 0, 0, 0.92);");
  expect(css).toContain("outline-offset: -1px;");
  expect(signalPanelAfterBlock).toContain('content: "";');
  expect(signalPanelAfterBlock).toContain("border-top: 2px solid transparent;");
  expect(signalPanelAfterBlock).toContain("border-right: 2px solid transparent;");
  expect(css).toContain(".signal-panel:hover::after");
  expect(css).toContain("border-color: rgba(252, 0, 0, 0.94);");
});

test("home hero splits the title into stage lines and colors the operations line", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const heroSource = readFileSync(join(process.cwd(), "components/sections/HeroSection.tsx"), "utf8");

  expect(heroSource).toContain('className="hero__title-line hero__title-line--accent"');
  expect(css).toContain(".hero__title-line");
  expect(css).toContain("display: block;");
  expect(css).toContain(".hero__title-line--accent");
  expect(css).toContain("color: #b33445;");
});

test("home services use a full border and tighter vertical spacing instead of a top-only divider", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const homeServiceCardBlock = css.match(/\.site-main--home \.service-card\s*\{[^}]+\}/)?.[0] ?? "";
  const homeServiceCopyBlock = css.match(/\.site-main--home \.service-card p\s*\{[^}]+\}/)?.[0] ?? "";

  expect(homeServiceCardBlock).toContain("min-height: 264px;");
  expect(homeServiceCardBlock).toContain("justify-content: flex-start;");
  expect(homeServiceCardBlock).toContain("gap: 0.78rem;");
  expect(homeServiceCardBlock).toContain("border: 1px solid rgba(229, 226, 225, 0.08);");
  expect(homeServiceCardBlock).not.toContain("border-top:");
  expect(homeServiceCopyBlock).toContain("margin-top: 0.25rem;");
  expect(homeServiceCopyBlock).toContain("line-height: 1.62;");
});

test("homepage sections remove eyebrow labels and tighten section intro spacing", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const servicesSource = readFileSync(join(process.cwd(), "components/sections/ServicesSection.tsx"), "utf8");
  const projectsSource = readFileSync(join(process.cwd(), "components/sections/ProjectsSection.tsx"), "utf8");
  const contactSource = readFileSync(join(process.cwd(), "components/sections/ContactSection.tsx"), "utf8");
  const introBlock = css.match(/\.poster-section__intro\s*\{[^}]+\}/)?.[0] ?? "";
  const homeServicesIntroBlock = css.match(/\.site-main--home \.services \.poster-section__intro\s*\{[^}]+\}/)?.[0] ?? "";

  expect(servicesSource).not.toContain("poster-section__eyebrow");
  expect(projectsSource).not.toContain("poster-section__eyebrow");
  expect(contactSource).not.toContain("poster-section__eyebrow");
  expect(introBlock).toContain("gap: 0.55rem;");
  expect(homeServicesIntroBlock).toContain("gap: 0.55rem;");
});

test("home sections share a stage gutter so projects services and contact do not pin to the container edge", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const homeHeroContentBlock = css.match(/\.site-main--home \.hero__content\s*\{[^}]+\}/)?.[0] ?? "";
  const homeHeroStageBlock = css.match(/\.site-main--home \.hero__content--stage\s*\{[^}]+\}/)?.[0] ?? "";

  expect(css).toContain("--home-stage-gutter: clamp(1.2rem, 3.6vw, 3.25rem);");
  expect(css).toContain(".site-main--home .projects__layout,");
  expect(css).toContain(".site-main--home .services .poster-section__intro,");
  expect(css).toContain(".site-main--home .services__grid,");
  expect(css).toContain(".site-main--home .contact__panel {");
  expect(css).toContain("padding-inline: var(--home-stage-gutter);");
  expect(css).toContain("--home-section-top: clamp(1.4rem, 3.8vw, 2.7rem);");
  expect(homeHeroContentBlock).toContain("padding: clamp(3.2rem, 7vw, 5.8rem) var(--home-stage-gutter) clamp(3rem, 7vw, 4.6rem);");
  expect(homeHeroStageBlock).toContain("padding: clamp(3.2rem, 7vw, 5.8rem) var(--home-stage-gutter) clamp(3rem, 7vw, 4.6rem);");
});

test("project pages and media modules use open-stage containers instead of dark boxed panels", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
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
  expect(handoffBlock).toContain("border-left: 1px solid rgba(229, 226, 225, 0.08);");
  expect(signalPanelBlock).toContain("background: transparent;");
  expect(signalPanelBlock).toContain("border-radius: 0;");
  expect(videoThumbBlock).toContain("border-radius: 0;");
  expect(imageBlock).toContain("border-radius: 0;");
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

test("lightbox keeps the close control pinned while preview content scrolls inside its own viewport", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const scrollBlock = css.match(/\.project-media__lightbox-scroll\s*\{[^}]+\}/)?.[0] ?? "";
  const closeBlock = css.match(/\.project-media__lightbox-close\s*\{[^}]+\}/)?.[0] ?? "";

  expect(css).toContain(".project-media__lightbox-stage");
  expect(scrollBlock).toContain("overflow: auto;");
  expect(scrollBlock).toContain("overscroll-behavior: contain;");
  expect(closeBlock).toContain("position: fixed;");
  expect(closeBlock).toContain("top: calc(env(safe-area-inset-top) + 1rem);");
});
