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
  const [activeItem, setActiveItem] = useState<ProjectMediaItem | null>(null);

  return (
    <>
      <div className={`project-film__rail ${railClassName}`}>
        {items.map((item) => (
          <figure key={item.src} className={`${cardClassName} signal-panel`}>
            {item.src ? (
              <button
                aria-label={`${projectLabel(previewLabel, locale)} ${projectLabel(item.title, locale)}`}
                className="project-film__rail-button"
                onClick={() => setActiveItem(item)}
                type="button"
              >
                <Image
                  alt={projectLabel(item.title, locale)}
                  className={imageClassName}
                  height={item.height ?? 1080}
                  sizes={sizes}
                  src={item.src}
                  width={item.width ?? 1920}
                />
              </button>
            ) : null}
          </figure>
        ))}
      </div>
      <ProjectMediaLightbox
        activeItem={activeItem}
        closePreviewLabel={closePreviewLabel}
        locale={locale}
        onClose={() => setActiveItem(null)}
        previewDialogLabel={previewDialogLabel}
      />
    </>
  );
}
