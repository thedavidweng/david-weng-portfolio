import Image from "next/image";
import { FilmCreditGroupBlock } from "@/components/projects/FilmCredits";
import { ProjectExternalLinkButton } from "@/components/projects/ProjectExternalLinkButton";
import { projectDetailContent, projectLabel } from "@/content/projects";
import type { Locale, ProjectItem } from "@/types/content";
import { ProjectSummary } from "@/components/pages/ProjectSummary";

type ProjectFilmHeroProps = {
  locale: Locale;
  project: ProjectItem;
};

export function ProjectFilmHero({ locale, project }: ProjectFilmHeroProps) {
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