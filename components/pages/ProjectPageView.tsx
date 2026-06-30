import Link from "next/link";
import Image from "next/image";
import type { Locale, ProjectItem } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ProjectExternalLinkButton } from "@/components/projects/ProjectExternalLinkButton";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ProjectFilmHero } from "@/components/pages/ProjectFilmHero";
import { ProjectFilmRails } from "@/components/pages/ProjectFilmRails";
import { ProjectMaterialsSection } from "@/components/pages/ProjectMaterialsSection";
import { ProjectSummary } from "@/components/pages/ProjectSummary";
import { projectDetailContent, projectLabel } from "@/content/projects";
import { getLocaleHomePath } from "@/lib/i18n";

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
                    className={`project-hero__content${isTitleOnly ? " project-hero__content--title-only" : ""}${isExternalHandoff ? " project-hero__content--external-handoff" : ""}`}
                  >
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
                        <p className="project-hero__summary">
                          <ProjectSummary locale={locale} project={project} />
                        </p>
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

        {isDedicatedFilmProject && project.film ? <ProjectFilmRails locale={locale} project={project} /> : null}

        {!isTitleOnly && !isExternalHandoff && (!isFilmOrVideoProject || isArchiveVideoProject) ? (
          <ProjectMaterialsSection locale={locale} project={project} useImageWall={useImageWall} />
        ) : null}
      </main>
      <Footer locale={locale} />
    </div>
  );
}