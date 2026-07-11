import type { ReactNode } from "react";
import { Footer } from "@/tests/helpers/sections/Footer";
import { Header } from "@/src/islands/Header";
import { FilmMediaRail } from "@/src/islands/FilmMediaRail";
import { ArchiveMediaWall } from "@/src/islands/ArchiveMediaWall";
import { PortfolioImage } from "@/src/islands/_shared/PortfolioImage";
import { projectDetailContent, projectLabel } from "@/content/projects";
import { getLocaleHomePath, getLocalizedValue } from "@/lib/i18n";
import { getHostname } from "@/lib/url";
import { YOUTUBE_ICON_PATH, EXTERNAL_LINK_ICON_PATH } from "@/src/icons";
import type {
  FilmCreditGroup,
  FilmCreditPerson,
  Locale,
  LocalizedInlineText as LocalizedInlineTextType,
  ProjectItem,
  ProjectMediaItem
} from "@/types/content";

type ProjectPageFixtureProps = {
  locale: Locale;
  pathname: string;
  project: ProjectItem;
};

function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}

function LocalizedInlineText({
  locale,
  value,
  linkClassName
}: {
  locale: Locale;
  value: LocalizedInlineTextType;
  linkClassName?: string;
}) {
  const fragments = getLocalizedValue(value, locale);

  return fragments.map((fragment, index) => {
    if (fragment.type === "link") {
      return (
        <a
          key={`${fragment.href}-${index}`}
          className={linkClassName}
          href={fragment.href}
          rel="noreferrer"
          target="_blank"
        >
          {fragment.text}
          <span className="visually-hidden">(opens in new tab)</span>
        </a>
      );
    }

    return <span key={`${fragment.text}-${index}`}>{fragment.text}</span>;
  });
}

function ProjectSummary({ locale, project }: { locale: Locale; project: ProjectItem }) {
  if (project.detailSummary) {
    return (
      <LocalizedInlineText
        locale={locale}
        value={project.detailSummary}
        linkClassName="project-hero__summary-link"
      />
    );
  }

  return <>{projectLabel(project.summary, locale)}</>;
}

function ProjectExternalLinkButton({ href, label }: { href: string; label: string }) {
  const iconPath = href.includes("youtu") ? YOUTUBE_ICON_PATH : EXTERNAL_LINK_ICON_PATH;

  return (
    <a className="button button--signal project-link-button" href={href} rel="noreferrer" target="_blank">
      <span>{label}</span>
      <svg aria-hidden="true" className="project-link-button__icon" viewBox="0 0 24 24">
        <path d={iconPath} fill="currentColor" />
      </svg>
      <span className="visually-hidden">(opens in new tab)</span>
    </a>
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
          <span className="visually-hidden">(opens in new tab)</span>
        </a>
      ) : (
        <span className="project-film__credit-text">{label}</span>
      )}
      {note ? <span className="project-film__credit-note">{note}</span> : null}
    </>
  );
}

function FilmCreditGroupBlock({ group, locale }: { group: FilmCreditGroup; locale: Locale }) {
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

function isArchiveVideoItem(item: ProjectMediaItem) {
  return item.type === "image" && item.archiveKind === "video";
}

function ProjectArchiveLedger({ locale, project }: { locale: Locale; project: ProjectItem }) {
  const roles = project.roles[locale];

  return (
    <aside
      className="project-hero__archive-ledger"
      aria-label={`${projectLabel(project.category, locale)} ${project.year}`}
    >
      <p className="poster-section__eyebrow">
        {projectLabel(project.category, locale)} · {project.year}
      </p>
      {roles.length > 0 ? (
        <ul className="project-hero__archive-roles">
          {roles.map((role) => (
            <li key={role} className="project-hero__archive-role">
              {role}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="project-hero__archive-watermark" aria-hidden="true">
        {project.posterWord}
      </span>
    </aside>
  );
}

function ProjectFilmHero({ locale, project }: { locale: Locale; project: ProjectItem }) {
  const film = project.film;
  const filmHeroPoster = film ? film.heroPoster[locale] : null;

  if (!film || !filmHeroPoster) {
    return null;
  }

  return (
    <>
      <div className="project-film__intro">
        <div className="project-film__content">
          <h1 className="project-hero__title">{projectLabel(project.title, locale)}</h1>
          <p className="project-hero__summary">
            <ProjectSummary locale={locale} project={project} />
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
              <ProjectExternalLinkButton
                key={link.label.en}
                href={link.href}
                label={projectLabel(link.label, locale)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="project-film__poster">
        <PortfolioImage
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
          <h2 className="project-film__credits-title">{projectLabel(projectDetailContent.castAndCrewTitle, locale)}</h2>
          <div className="project-film__credits-groups">
            {film.credits.map((group) => (
              <FilmCreditGroupBlock key={group.role.en} group={group} locale={locale} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function ProjectFilmRails({ locale, project }: { locale: Locale; project: ProjectItem }) {
  const film = project.film;

  if (!film) {
    return null;
  }

  return (
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
  );
}

function ProjectMaterialsSection({
  locale,
  project,
  useImageWall
}: {
  locale: Locale;
  project: ProjectItem;
  useImageWall: boolean;
}) {
  const archiveVideoItems = useImageWall ? project.media.filter(isArchiveVideoItem) : [];
  const archiveStaticItems = useImageWall ? project.media.filter((item) => !isArchiveVideoItem(item)) : [];
  const useSplitArchiveLayout = useImageWall && archiveVideoItems.length > 0;
  const archiveWallItems = useSplitArchiveLayout ? archiveStaticItems : project.media;

  return (
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
                          <PortfolioImage
                            alt={projectLabel(item.title, locale)}
                            fill
                            loading="lazy"
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
                    <PortfolioImage
                      alt={projectLabel(item.title, locale)}
                      fill
                      loading="lazy"
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
  );
}

export function ProjectPageFixture({ locale, pathname, project }: ProjectPageFixtureProps) {
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
                <a className="project-hero__back signal-control signal-control--nav" href={`${homePath}#projects`}>
                  {projectLabel(projectDetailContent.backLabel, locale)}
                </a>
                <div className="project-hero__micro">
                  <span>[{project.code}]</span>
                  <span>[{projectLabel(project.category, locale)}]</span>
                  <span>[{project.year}]</span>
                </div>
              </div>
              <div
                className={`project-hero__grid${isTitleOnly ? " project-hero__grid--title-only" : ""}${isExternalHandoff ? " project-hero__grid--external-handoff" : ""}${isDedicatedFilmProject ? " project-hero__grid--film" : ""}`}
              >
                {isDedicatedFilmProject ? <ProjectFilmHero locale={locale} project={project} /> : null}
                {!isDedicatedFilmProject ? (
                  <div
                    className={`project-hero__content${useImageWall ? " project-hero__content--archive" : ""}${isTitleOnly ? " project-hero__content--title-only" : ""}${isExternalHandoff ? " project-hero__content--external-handoff" : ""}`}
                  >
                    <div className={`project-hero__archive-intro${useImageWall ? " project-hero__archive-intro--stacked" : ""}`}>
                      {isExternalHandoff ? (
                        <p className="project-hero__article-eyebrow">{projectLabel(project.projectType, locale)}</p>
                      ) : null}
                      <h1 className="project-hero__title">{projectLabel(project.title, locale)}</h1>
                      {!isTitleOnly && !isExternalHandoff ? (
                        <>
                          <p className="project-hero__summary">
                            <ProjectSummary locale={locale} project={project} />
                          </p>
                          <div className="project-detail__links">
                            {project.externalLinks.map((link) => (
                              <ProjectExternalLinkButton
                                key={link.label.en}
                                href={link.href}
                                label={projectLabel(link.label, locale)}
                              />
                            ))}
                          </div>
                        </>
                      ) : null}
                      {isExternalHandoff ? (
                        <>
                          <p className="project-hero__publication">
                            {projectLabel(projectDetailContent.publicationLabel, locale)} {projectLabel(project.duration, locale)}
                          </p>
                          <p className="project-hero__summary">
                            <ProjectSummary locale={locale} project={project} />
                          </p>
                        </>
                      ) : null}
                    </div>
                    {useImageWall ? <ProjectArchiveLedger locale={locale} project={project} /> : null}
                  </div>
                ) : null}
                {isExternalHandoff && primaryExternalLink ? (
                  <aside className="project-handoff signal-panel">
                    <p className="poster-section__eyebrow">{projectLabel(projectDetailContent.externalEyebrow, locale)}</p>
                    <h2 className="project-handoff__title">{projectLabel(project.duration, locale)}</h2>
                    <p className="project-handoff__copy">{projectLabel(projectDetailContent.externalHint, locale)}</p>
                    <div className="project-handoff__meta">
                      <span>{projectLabel(projectDetailContent.externalDestinationLabel, locale)}</span>
                      <span>{getHostname(primaryExternalLink.href)}</span>
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
                    <PortfolioImage
                      alt={projectLabel(project.coverAlt, locale)}
                      className="project-hero__cover-image"
                      fill
                      priority
                      sizes="(max-width: 1120px) 100vw, 40vw"
                      src={project.coverImage}
                    />
                    {!useImageWall ? (
                      <>
                        <div className="project-hero__word" aria-hidden="true">
                          {project.posterWord}
                        </div>
                        <div className="project-hero__cover-meta">
                          <span>{projectLabel(project.coverLabel, locale)}</span>
                          <span>{projectLabel(project.duration, locale)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="project-hero__cover-meta project-hero__cover-meta--archive">
                        <span>{projectLabel(project.coverLabel, locale)}</span>
                      </div>
                    )}
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

        {isDedicatedFilmProject && project.film ? <ProjectFilmRails locale={locale} project={project} /> : null}

        {!isTitleOnly && !isExternalHandoff && (!isFilmOrVideoProject || isArchiveVideoProject) ? (
          <ProjectMaterialsSection locale={locale} project={project} useImageWall={useImageWall} />
        ) : null}
      </main>
      <Footer locale={locale} />
    </div>
  );
}