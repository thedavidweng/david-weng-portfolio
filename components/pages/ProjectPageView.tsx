import Link from "next/link";
import Image from "next/image";
import type { Locale, ProjectItem, ProjectMediaItem } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ArchiveMediaWall } from "@/components/projects/ArchiveMediaWall";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { projectDetailContent, projectLabel } from "@/content/projects";
import { getLocaleHomePath } from "@/lib/i18n";

type ProjectPageViewProps = {
  locale: Locale;
  pathname: string;
  project: ProjectItem;
};

function getYouTubeEmbedUrl(href?: string) {
  if (!href) {
    return null;
  }

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.slice(1);

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (url.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${url.pathname}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function ProjectPageView({ locale, pathname, project }: ProjectPageViewProps) {
  const homePath = getLocaleHomePath(locale);
  const useImageWall = Boolean(project.archiveGroup);
  // Project pages deliberately branch by intent, not just by media type:
  // article/research pages can hand off externally, film/video pages become viewing pages,
  // and archive-backed projects use the image wall instead of generic case-study sections.
  const isTitleOnly = project.detailLayout === "title-only";
  const isExternalHandoff = project.detailLayout === "external-handoff";
  const isFilmVideoProject = project.category.en === "Film / Video";
  const primaryExternalLink = project.externalLinks[0];
  const featuredVideo = project.media.find((item) => item.type === "video" && getYouTubeEmbedUrl(item.href));
  const featuredVideoEmbedUrl = featuredVideo ? getYouTubeEmbedUrl(featuredVideo.href) : null;
  const archiveVideoItems = useImageWall ? project.media.filter(isArchiveVideoItem) : [];
  const archiveStaticItems = useImageWall ? project.media.filter((item) => !isArchiveVideoItem(item)) : [];
  const useSplitArchiveLayout = useImageWall && archiveVideoItems.length > 0;
  const archiveWallItems = useSplitArchiveLayout ? archiveStaticItems : project.media;

  return (
    <div className={`site-shell site-shell--${locale}`}>
      <Header locale={locale} pathname={pathname} />
      <main
        className={`project-page${useImageWall ? " project-page--archive" : ""}${isTitleOnly ? " project-page--title-only" : ""}${isExternalHandoff ? " project-page--external-handoff" : ""}`}
      >
        <section className="project-hero">
          <Container>
            <div className="project-hero__frame">
              <div className="project-hero__header">
                <Link className="project-hero__back signal-control signal-control--nav" href={`${homePath}#projects`}>
                  {projectLabel(projectDetailContent.backLabel, locale)}
                </Link>
                <div className="project-hero__micro">
                  <span>{project.code}</span>
                  <span>{projectLabel(project.category, locale)}</span>
                  <span>{project.year}</span>
                </div>
              </div>
              <div
                className={`project-hero__grid${isTitleOnly ? " project-hero__grid--title-only" : ""}${isExternalHandoff ? " project-hero__grid--external-handoff" : ""}`}
              >
                <div
                  className={`project-hero__content${isTitleOnly ? " project-hero__content--title-only" : ""}${isExternalHandoff ? " project-hero__content--external-handoff" : ""}`}
                >
                  {isExternalHandoff ? (
                    <p className="project-hero__article-eyebrow">{projectLabel(project.projectType, locale)}</p>
                  ) : null}
                  <h1 className="project-hero__title">{projectLabel(project.title, locale)}</h1>
                  {!isTitleOnly && !isExternalHandoff ? (
                    <>
                      <p className="project-hero__summary">{projectLabel(project.summary, locale)}</p>
                      <p className="project-hero__roles">
                        {projectLabel(project.projectType, locale)} / {project.roles[locale].join(" / ")}
                      </p>
                      <div className="project-detail__links">
                        {project.externalLinks.map((link) => (
                          <a
                            key={link.label.en}
                            className="button button--signal"
                            href={link.href}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {projectLabel(link.label, locale)}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : null}
                  {isExternalHandoff ? (
                    <>
                      <p className="project-hero__publication">
                        {projectLabel(projectDetailContent.publicationLabel, locale)} {projectLabel(project.duration, locale)}
                      </p>
                      <p className="project-hero__summary">{projectLabel(project.summary, locale)}</p>
                      <p className="project-hero__roles">{project.roles[locale].join(" / ")}</p>
                    </>
                  ) : null}
                </div>
                {isExternalHandoff && primaryExternalLink ? (
                  <aside className="project-handoff signal-panel">
                    <p className="poster-section__eyebrow">{projectLabel(projectDetailContent.externalEyebrow, locale)}</p>
                    <h2 className="project-handoff__title">{projectLabel(project.duration, locale)}</h2>
                    <p className="project-handoff__copy">{projectLabel(projectDetailContent.externalHint, locale)}</p>
                    <div className="project-handoff__meta">
                      <span>{projectLabel(projectDetailContent.externalDestinationLabel, locale)}</span>
                      <span>beaconjournal.arts.ubc.ca</span>
                    </div>
                    <a className="button button--signal" href={primaryExternalLink.href} rel="noreferrer" target="_blank">
                      {projectLabel(primaryExternalLink.label, locale)}
                    </a>
                  </aside>
                ) : null}
                {!isTitleOnly && !isExternalHandoff ? (
                  <div
                    className="project-hero__cover"
                    style={{
                      background: `linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 55%, ${project.coverPalette[2]})`
                    }}
                  >
                    <Image
                      alt={projectLabel(project.coverAlt, locale)}
                      className="project-hero__cover-image"
                      fill
                      priority
                      sizes="(max-width: 1120px) 100vw, 40vw"
                      src={project.coverImage}
                    />
                    <div className="project-hero__word" aria-hidden="true">
                      {project.posterWord}
                    </div>
                    <div className="project-hero__cover-meta">
                      <span>{projectLabel(project.coverLabel, locale)}</span>
                      <span>{projectLabel(project.duration, locale)}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </section>

        {!project.archiveGroup && !isTitleOnly && !isExternalHandoff && !isFilmVideoProject ? (
          <section className="project-detail">
            <Container>
              <div className="project-detail__grid">
                <div className="signal-panel">
                  <p className="poster-section__eyebrow">{projectLabel(projectDetailContent.highlightsEyebrow, locale)}</p>
                  <h2 className="project-detail__title">{projectLabel(projectDetailContent.highlightsTitle, locale)}</h2>
                  <ul className="project-detail__list">
                    {project.highlights[locale].map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        {!isTitleOnly && !isExternalHandoff && isFilmVideoProject ? (
          <section className="project-video-stage">
            <Container>
              {featuredVideoEmbedUrl ? (
                <div className="project-video-stage__frame signal-panel">
                  <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="project-video-stage__iframe"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={featuredVideoEmbedUrl}
                    title={projectLabel(project.title, locale)}
                  />
                </div>
              ) : null}
            </Container>
          </section>
        ) : null}

        {!isTitleOnly && !isExternalHandoff && !isFilmVideoProject ? (
          <section className="project-media">
            <Container>
              <div className="poster-section__intro">
                <p className="poster-section__eyebrow">{projectLabel(projectDetailContent.materialsEyebrow, locale)}</p>
                <h2 className="poster-section__title">{projectLabel(projectDetailContent.materialsTitle, locale)}</h2>
              </div>
              {useImageWall ? (
                <div className="project-media__sections">
                  {archiveWallItems.length > 0 ? (
                    <div className="project-media__section">
                      {useSplitArchiveLayout ? (
                        <h3 className="project-media__section-title">
                          {projectLabel(projectDetailContent.staticWorksTitle, locale)}
                        </h3>
                      ) : null}
                      <ArchiveMediaWall
                        closePreviewLabel={projectDetailContent.closePreviewLabel}
                        items={archiveWallItems}
                        locale={locale}
                        photoCreditLabel={projectDetailContent.photoCreditLabel}
                        previewDialogLabel={projectDetailContent.previewDialogLabel}
                        previewLabel={projectDetailContent.previewLabel}
                      />
                    </div>
                  ) : null}
                  {useSplitArchiveLayout ? (
                    <div className="project-media__section">
                      <h3 className="project-media__section-title">
                        {projectLabel(projectDetailContent.videoWorksTitle, locale)}
                      </h3>
                      <div className="project-media__video-grid">
                        {archiveVideoItems.map((item) => (
                          <article
                            key={`${item.title.en}-${item.src ?? item.href ?? "video"}`}
                            className="project-media__video-card signal-panel"
                          >
                            {item.src ? (
                              <div className="project-media__video-thumb">
                                <Image
                                  alt={projectLabel(item.title, locale)}
                                  fill
                                  sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 42vw"
                                  src={item.src}
                                />
                              </div>
                            ) : null}
                            <div className="project-media__video-copy">
                              <h3>{projectLabel(item.title, locale)}</h3>
                              <p>{projectLabel(item.description, locale)}</p>
                              {item.href ? (
                                <a className="button button--signal" href={item.href} rel="noreferrer" target="_blank">
                                  {projectLabel(projectDetailContent.watchOnYouTubeLabel, locale)}
                                </a>
                              ) : null}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="project-media__grid">
                  {project.media.map((item) => (
                    <article
                      key={`${item.title.en}-${item.src ?? item.href ?? "resource"}`}
                      className={`project-media__card signal-panel${item.layout ? ` project-media__card--${item.layout}` : ""}`}
                    >
                      <div className="project-media__badge">{item.badge ? projectLabel(item.badge, locale) : item.type}</div>
                      {item.type === "image" && item.src ? (
                        <div className={`project-media__image${item.layout ? ` project-media__image--${item.layout}` : ""}`}>
                          <Image
                            alt={projectLabel(item.title, locale)}
                            fill
                            sizes="(max-width: 1120px) 100vw, 28vw"
                            src={item.src}
                          />
                        </div>
                      ) : null}
                      <h3>{projectLabel(item.title, locale)}</h3>
                      <p>{projectLabel(item.description, locale)}</p>
                      {item.credit ? (
                        <p className="project-media__credit">
                          {projectLabel(projectDetailContent.photoCreditLabel, locale)}:{" "}
                          <a href={item.credit.href} rel="noreferrer" target="_blank">
                            {projectLabel(item.credit.label, locale)}
                          </a>
                        </p>
                      ) : null}
                      {item.href ? (
                        <a className="project-card__cta" href={item.href} rel="noreferrer" target="_blank">
                          {projectLabel(projectDetailContent.openResourceLabel, locale)}
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
            </Container>
          </section>
        ) : null}
      </main>
      <Footer locale={locale} />
    </div>
  );
}

function isArchiveVideoItem(item: ProjectMediaItem) {
  return item.type === "image" && item.archiveKind === "video";
}
