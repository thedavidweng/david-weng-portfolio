import Link from "next/link";
import Image from "next/image";
import type { Locale, ProjectItem } from "@/types/content";
import { LocalizedInlineText } from "@/components/content/LocalizedInlineText";
import { Container } from "@/components/layout/Container";
import { ArchiveMediaWall } from "@/components/projects/ArchiveMediaWall";
import { FilmCreditGroupBlock } from "@/components/projects/FilmCredits";
import { FilmMediaRail } from "@/components/projects/FilmMediaRail";
import { ProjectExternalLinkButton } from "@/components/projects/ProjectExternalLinkButton";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { projectDetailContent, projectLabel } from "@/content/projects";
import { getLocaleHomePath } from "@/lib/i18n";
import { getYouTubeEmbedUrl, isArchiveVideoItem } from "@/lib/project-page";

type ProjectPageViewProps = {
  locale: Locale;
  pathname: string;
  project: ProjectItem;
};

export function ProjectPageView({ locale, pathname, project }: ProjectPageViewProps) {
  const homePath = getLocaleHomePath(locale);
  const useImageWall = Boolean(project.archiveGroup);
  const isTitleOnly = project.detailLayout === "title-only";
  const isExternalHandoff = project.detailLayout === "external-handoff";
  const isFilmProject = project.category.en === "Film";
  const isVideoProject = project.category.en === "Video";
  const isFilmOrVideoProject = isFilmProject || isVideoProject;
  const isDedicatedFilmProject = isFilmProject && Boolean(project.film) && !useImageWall;
  const isArchiveVideoProject = isVideoProject && useImageWall;
  const primaryExternalLink = project.externalLinks[0];
  const featuredVideo = project.media.find((item) => item.type === "video" && getYouTubeEmbedUrl(item.href));
  const featuredVideoEmbedUrl = featuredVideo ? getYouTubeEmbedUrl(featuredVideo.href) : null;
  const archiveVideoItems = useImageWall ? project.media.filter(isArchiveVideoItem) : [];
  const archiveStaticItems = useImageWall ? project.media.filter((item) => !isArchiveVideoItem(item)) : [];
  const useSplitArchiveLayout = useImageWall && archiveVideoItems.length > 0;
  const archiveWallItems = useSplitArchiveLayout ? archiveStaticItems : project.media;
  const film = project.film;
  const filmHeroPoster = film ? film.heroPoster[locale] : null;
  const renderProjectSummary = () =>
    project.detailSummary ? (
      <LocalizedInlineText locale={locale} value={project.detailSummary} linkClassName="project-hero__summary-link" />
    ) : (
      projectLabel(project.summary, locale)
    );

  return (
    <div className={`site-shell site-shell--${locale}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header locale={locale} pathname={pathname} />
      <main
        id="main-content"
        className={`project-page${useImageWall ? " project-page--archive" : ""}${isTitleOnly ? " project-page--title-only" : ""}${isExternalHandoff ? " project-page--external-handoff" : ""}${isDedicatedFilmProject ? " project-page--film" : ""}`}
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
                className={`project-hero__grid${isTitleOnly ? " project-hero__grid--title-only" : ""}${isExternalHandoff ? " project-hero__grid--external-handoff" : ""}${isDedicatedFilmProject ? " project-hero__grid--film" : ""}`}
              >
                {isDedicatedFilmProject && film && filmHeroPoster ? (
                  <>
                    <div className="project-film__intro">
                      <div className="project-film__content">
                        <h1 className="project-hero__title">{projectLabel(project.title, locale)}</h1>
                        <p className="project-hero__summary">{renderProjectSummary()}</p>
                        <p className="project-hero__roles">
                          {projectLabel(project.projectType, locale)} / {project.roles[locale].join(" / ")}
                        </p>
                        {film.facts.length > 0 ? (
                          <div className="project-film__facts">
                            {film.facts.map((fact) => (
                              <div
                                key={`${fact.label.en}-${fact.value.en}`}
                                className="project-film__fact signal-control signal-control--micro"
                              >
                                <span>{projectLabel(fact.label, locale)}</span>
                                <strong>{projectLabel(fact.value, locale)}</strong>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        <div className="project-detail__links project-detail__links--film">
                          {project.externalLinks.map((link) => (
                            <ProjectExternalLinkButton key={link.label.en} href={link.href} label={projectLabel(link.label, locale)} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="project-film__poster">
                      <Image
                        alt={projectLabel(filmHeroPoster.title, locale)}
                        className="project-film__poster-image"
                        height={filmHeroPoster.height ?? 2304}
                        priority
                        sizes="(max-width: 760px) 100vw, (max-width: 1120px) 78vw, 42vw"
                        src={filmHeroPoster.src ?? project.coverImage}
                        width={filmHeroPoster.width ?? 1728}
                      />
                    </div>
                    <div className="project-film__credits-wrap">
                      <section className="project-film__credits signal-panel">
                        <p className="poster-section__eyebrow">{projectLabel(project.projectType, locale)}</p>
                        <h2 className="project-film__credits-title">
                          {projectLabel(projectDetailContent.castAndCrewTitle, locale)}
                        </h2>
                        <div className="project-film__credits-groups">
                          {film.credits.map((group) => (
                            <FilmCreditGroupBlock key={group.role.en} group={group} locale={locale} />
                          ))}
                        </div>
                      </section>
                    </div>
                  </>
                ) : null}
                {!isDedicatedFilmProject ? (
                  <div
                    className={`project-hero__content${isTitleOnly ? " project-hero__content--title-only" : ""}${isExternalHandoff ? " project-hero__content--external-handoff" : ""}`}
                  >
                    {isExternalHandoff ? (
                      <p className="project-hero__article-eyebrow">{projectLabel(project.projectType, locale)}</p>
                    ) : null}
                    <h1 className="project-hero__title">{projectLabel(project.title, locale)}</h1>
                    {!isTitleOnly && !isExternalHandoff ? (
                      <>
                        <p className="project-hero__summary">{renderProjectSummary()}</p>
                        <p className="project-hero__roles">
                          {projectLabel(project.projectType, locale)} / {project.roles[locale].join(" / ")}
                        </p>
                        <div className="project-detail__links">
                          {project.externalLinks.map((link) => (
                            <ProjectExternalLinkButton key={link.label.en} href={link.href} label={projectLabel(link.label, locale)} />
                          ))}
                        </div>
                      </>
                    ) : null}
                    {isExternalHandoff ? (
                      <>
                        <p className="project-hero__publication">
                          {projectLabel(projectDetailContent.publicationLabel, locale)} {projectLabel(project.duration, locale)}
                        </p>
                        <p className="project-hero__summary">{renderProjectSummary()}</p>
                        <p className="project-hero__roles">{project.roles[locale].join(" / ")}</p>
                      </>
                    ) : null}
                  </div>
                ) : null}
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
                      <span className="visually-hidden">(opens in new tab)</span>
                    </a>
                  </aside>
                ) : null}
                {!isTitleOnly && !isExternalHandoff && !isDedicatedFilmProject ? (
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

        {!project.archiveGroup && !isTitleOnly && !isExternalHandoff && !isFilmOrVideoProject ? (
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

        {isDedicatedFilmProject && film ? (
          <section className="project-film">
            <Container>
              <div className="project-film__section">
                <div className="poster-section__intro">
                  <p className="poster-section__eyebrow">{projectLabel(projectDetailContent.materialsEyebrow, locale)}</p>
                  <h2 className="poster-section__title">{projectLabel(projectDetailContent.stillsTitle, locale)}</h2>
                </div>
                <FilmMediaRail
                  cardClassName="project-film__stills-item"
                  closePreviewLabel={projectDetailContent.closePreviewLabel}
                  imageClassName="project-film__rail-image project-film__rail-image--still"
                  items={film.stills}
                  locale={locale}
                  previewDialogLabel={projectDetailContent.previewDialogLabel}
                  previewLabel={projectDetailContent.previewLabel}
                  railClassName="project-film__stills-rail"
                  sizes="(max-width: 760px) 80vw, 34vw"
                />
              </div>
              <div className="project-film__section">
                <div className="poster-section__intro">
                  <p className="poster-section__eyebrow">{projectLabel(projectDetailContent.materialsEyebrow, locale)}</p>
                  <h2 className="poster-section__title">{projectLabel(projectDetailContent.postersTitle, locale)}</h2>
                </div>
                <FilmMediaRail
                  cardClassName="project-film__poster-card"
                  closePreviewLabel={projectDetailContent.closePreviewLabel}
                  imageClassName="project-film__rail-image project-film__rail-image--poster"
                  items={film.posters}
                  locale={locale}
                  previewDialogLabel={projectDetailContent.previewDialogLabel}
                  previewLabel={projectDetailContent.previewLabel}
                  railClassName="project-film__posters-rail"
                  sizes="(max-width: 760px) 60vw, 24vw"
                />
              </div>
            </Container>
          </section>
        ) : null}

        {!isTitleOnly && !isExternalHandoff && isVideoProject && !isArchiveVideoProject ? (
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

        {!isTitleOnly && !isExternalHandoff && (!isFilmOrVideoProject || isArchiveVideoProject) ? (
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
                                  <span className="visually-hidden">(opens in new tab)</span>
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
                            <span className="visually-hidden">(opens in new tab)</span>
                          </a>
                        </p>
                      ) : null}
                      {item.href ? (
                        <a className="project-card__cta" href={item.href} rel="noreferrer" target="_blank">
                          {projectLabel(projectDetailContent.openResourceLabel, locale)}
                          <span className="visually-hidden">(opens in new tab)</span>
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
