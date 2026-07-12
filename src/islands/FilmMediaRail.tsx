import { StrictMode, useMemo, useState } from "react";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel } from "@/content/projects";
import { ProjectMediaLightbox } from "@/src/islands/ProjectMediaLightbox";
import { PortfolioImage } from "@/src/islands/_shared/PortfolioImage";

type FilmMediaRailProps = {
  cardClassName: string;
  closePreviewLabel: LocalizedText;
  imageClassName: string;
  items: ProjectMediaItem[];
  locale: Locale;
  previewDialogLabel: LocalizedText;
  previewLabel: LocalizedText;
  railClassName: string;
  sizes: string;
};

export function FilmMediaRail({
  cardClassName,
  closePreviewLabel,
  imageClassName,
  items,
  locale,
  previewDialogLabel,
  previewLabel,
  railClassName,
  sizes,
}: FilmMediaRailProps) {
  const previewItems = useMemo(
    () =>
      items.filter(
        (item): item is ProjectMediaItem & { type: "image"; src: string } =>
          item.type === "image" && typeof item.src === "string",
      ),
    [items],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <StrictMode>
      <>
        <div className={`project-film__rail ${railClassName}`}>
          {previewItems.map((item, index) => (
            <figure key={item.src} className={`${cardClassName} signal-panel`}>
              <button
                aria-label={`${projectLabel(previewLabel, locale)} ${projectLabel(item.title, locale)}`}
                className="project-film__rail-button"
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <PortfolioImage
                  alt={projectLabel(item.title, locale)}
                  className={imageClassName}
                  height={item.height ?? 1080}
                  loading="lazy"
                  sizes={sizes}
                  src={item.src}
                  width={item.width ?? 1920}
                />
              </button>
            </figure>
          ))}
        </div>
        <ProjectMediaLightbox
          activeIndex={activeIndex}
          closePreviewLabel={closePreviewLabel}
          items={previewItems}
          locale={locale}
          onClose={() => setActiveIndex(null)}
          onIndexChange={setActiveIndex}
          previewDialogLabel={previewDialogLabel}
        />
      </>
    </StrictMode>
  );
}

export default FilmMediaRail;
