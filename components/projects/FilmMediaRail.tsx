"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel } from "@/content/projects";
import { ProjectMediaLightbox } from "@/components/projects/ProjectMediaLightbox";

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
  sizes
}: FilmMediaRailProps) {
  const previewItems = items.filter(
    (item): item is ProjectMediaItem & { type: "image"; src: string } => item.type === "image" && typeof item.src === "string"
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : (previewItems[activeIndex] ?? null);

  return (
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
              <Image
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
        activeItem={activeItem}
        canNavigate={previewItems.length > 1}
        closePreviewLabel={closePreviewLabel}
        locale={locale}
        onClose={() => setActiveIndex(null)}
        onNext={() => {
          if (activeIndex === null || previewItems.length <= 1) return;
          setActiveIndex((activeIndex + 1) % previewItems.length);
        }}
        onPrevious={() => {
          if (activeIndex === null || previewItems.length <= 1) return;
          setActiveIndex((activeIndex - 1 + previewItems.length) % previewItems.length);
        }}
        previewDialogLabel={previewDialogLabel}
      />
    </>
  );
}
