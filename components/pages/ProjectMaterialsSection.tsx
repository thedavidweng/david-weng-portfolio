import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ArchiveMediaWall } from "@/components/projects/ArchiveMediaWall";
import { projectDetailContent, projectLabel } from "@/content/projects";
import type { Locale, ProjectItem, ProjectMediaItem } from "@/types/content";

function isArchiveVideoItem(item: ProjectMediaItem) {
  return item.type === "image" && item.archiveKind === "video";
}

type ProjectMaterialsSectionProps = {
  locale: Locale;
  project: ProjectItem;
  useImageWall: boolean;
};

export function ProjectMaterialsSection({ locale, project, useImageWall }: ProjectMaterialsSectionProps) {
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
  );
}