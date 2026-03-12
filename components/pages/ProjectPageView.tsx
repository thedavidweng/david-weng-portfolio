import Link from "next/link";
import Image from "next/image";
import type { FilmCreditGroup, FilmCreditPerson, Locale, ProjectItem, ProjectMediaItem } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ArchiveMediaWall } from "@/components/projects/ArchiveMediaWall";
import { FilmMediaRail } from "@/components/projects/FilmMediaRail";
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
  const isDedicatedFilmProject = isFilmVideoProject && Boolean(project.film) && !useImageWall;
  const isArchiveFilmVideoProject = isFilmVideoProject && useImageWall;
  const primaryExternalLink = project.externalLinks[0];
  const featuredVideo = project.media.find((item) => item.type === "video" && getYouTubeEmbedUrl(item.href));
  const featuredVideoEmbedUrl = featuredVideo ? getYouTubeEmbedUrl(featuredVideo.href) : null;
  const archiveVideoItems = useImageWall ? project.media.filter(isArchiveVideoItem) : [];
  const archiveStaticItems = useImageWall ? project.media.filter((item) => !isArchiveVideoItem(item)) : [];
  const useSplitArchiveLayout = useImageWall && archiveVideoItems.length > 0;
  const archiveWallItems = useSplitArchiveLayout ? archiveStaticItems : project.media;
  const film = project.film;
  const filmHeroPoster = film ? film.heroPoster[locale] : null;

  return (
    <div className={`site-shell site-shell--${locale}`}>
      <Header locale={locale} pathname={pathname} />
      <main
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
                    <div className="project-film__content">
                      <h1 className="project-hero__title">{projectLabel(project.title, locale)}</h1>
                      <p className="project-hero__summary">{projectLabel(project.summary, locale)}</p>
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
                    <div className="project-film__poster">
                      <Image
                        alt={projectLabel(filmHeroPoster.title, locale)}
                        className="project-film__poster-image"
                        height={filmHeroPoster.height ?? 2304}
                        priority
                        sizes="(max-width: 1120px) 100vw, 42vw"
                        src={filmHeroPoster.src ?? project.coverImage}
                        width={filmHeroPoster.width ?? 1728}
                      />
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
                      <p className="project-hero__summary">{projectLabel(project.summary, locale)}</p>
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
                      <p className="project-hero__summary">{projectLabel(project.summary, locale)}</p>
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

        {!isTitleOnly && !isExternalHandoff && isFilmVideoProject && !isArchiveFilmVideoProject && !isDedicatedFilmProject ? (
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

        {!isTitleOnly && !isExternalHandoff && (!isFilmVideoProject || isArchiveFilmVideoProject) ? (
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

function getProjectLinkIconType(href: string) {
  return href.includes("youtu") ? "youtube" : "external";
}

function ProjectExternalLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a className="button button--signal project-link-button" href={href} rel="noreferrer" target="_blank">
      <span>{label}</span>
      <ProjectLinkIcon type={getProjectLinkIconType(href)} />
    </a>
  );
}

function FilmCreditGroupBlock({
  group,
  locale
}: {
  group: FilmCreditGroup;
  locale: Locale;
}) {
  return (
    <div className="project-film__credit-group">
      <h3 className="project-film__credit-role">{projectLabel(group.role, locale)}</h3>
      <ul className="project-film__credit-list">
        {group.people.map((person) => (
          <li key={`${group.role.en}-${person.name.en}`} className="project-film__credit-item">
            <FilmCreditPersonItem person={person} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilmCreditPersonItem({ person, locale }: { person: FilmCreditPerson; locale: Locale }) {
  const label = projectLabel(person.name, locale);
  const note = person.note ? projectLabel(person.note, locale) : null;

  return (
    <>
      {person.href ? (
        <a className="project-film__credit-link" href={person.href} rel="noreferrer" target="_blank">
          {label}
        </a>
      ) : (
        <span className="project-film__credit-text">{label}</span>
      )}
      {note ? <span className="project-film__credit-note">{note}</span> : null}
    </>
  );
}

function ProjectLinkIcon({ type }: { type: "youtube" | "external" }) {
  if (type === "youtube") {
    return (
      <svg aria-hidden="true" className="project-link-button__icon" viewBox="0 0 24 24">
        <path
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.5 15.7V8.3l6.4 3.7-6.4 3.7Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="project-link-button__icon" viewBox="0 0 24 24">
      <path
        d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3Zm4 14v4H3V6h4v2H5v11h11v-2h2Z"
        fill="currentColor"
      />
    </svg>
  );
}
