import { Container } from "@/components/layout/Container";
import { FilmMediaRail } from "@/components/projects/FilmMediaRail";
import { projectDetailContent, projectLabel } from "@/content/projects";
import type { Locale, ProjectItem } from "@/types/content";

type ProjectFilmRailsProps = {
  locale: Locale;
  project: ProjectItem;
};

export function ProjectFilmRails({ locale, project }: ProjectFilmRailsProps) {
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