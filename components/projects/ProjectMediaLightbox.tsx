"use client";

import Image from "next/image";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel } from "@/content/projects";

type ProjectMediaLightboxProps = {
  activeItem: ProjectMediaItem | null;
  closePreviewLabel: LocalizedText;
  locale: Locale;
  onClose: () => void;
  previewDialogLabel: LocalizedText;
};

export function ProjectMediaLightbox({
  activeItem,
  closePreviewLabel,
  locale,
  onClose,
  previewDialogLabel
}: ProjectMediaLightboxProps) {
  if (activeItem?.type !== "image" || !activeItem.src) {
    return null;
  }

  return (
    <div
      aria-label={projectLabel(previewDialogLabel, locale)}
      className="project-media__lightbox"
      onClick={onClose}
      role="dialog"
    >
      <button
        aria-label={projectLabel(closePreviewLabel, locale)}
        className="project-media__lightbox-close"
        onClick={onClose}
        type="button"
      >
        close
      </button>
      <div className="project-media__lightbox-frame" onClick={(event) => event.stopPropagation()}>
        <Image
          alt={projectLabel(activeItem.title, locale)}
          className="project-media__lightbox-image"
          height={activeItem.height ?? 900}
          priority
          sizes="90vw"
          src={activeItem.src}
          width={activeItem.width ?? 1600}
        />
      </div>
    </div>
  );
}
