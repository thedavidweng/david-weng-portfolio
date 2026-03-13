"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel } from "@/content/projects";

type ProjectMediaLightboxProps = {
  activeItem: ProjectMediaItem | null;
  closePreviewLabel: LocalizedText;
  locale: Locale;
  onClose: () => void;
  previewDialogLabel: LocalizedText;
};

type PreviewImageItem = ProjectMediaItem & {
  type: "image";
  src: string;
};

export function ProjectMediaLightbox({
  activeItem,
  closePreviewLabel,
  locale,
  onClose,
  previewDialogLabel
}: ProjectMediaLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewItem = isPreviewImageItem(activeItem) ? activeItem : null;
  const isOpen = previewItem !== null;

  const handleCancel = useCallback(
    (e: Event) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [handleCancel]);

  const handleBackdropClick = useCallback(
    () => {
      onClose();
    },
    [onClose]
  );

  if (!previewItem) {
    return null;
  }

  return (
    <dialog ref={dialogRef} aria-label={projectLabel(previewDialogLabel, locale)} className="project-media__lightbox">
      <div className="project-media__lightbox-stage" onClick={handleBackdropClick}>
        <button
          aria-label={projectLabel(closePreviewLabel, locale)}
          className="project-media__lightbox-close"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          type="button"
        >
          close
        </button>
        <div className="project-media__lightbox-scroll">
          <div className="project-media__lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <Image
              alt={projectLabel(previewItem.title, locale)}
              className="project-media__lightbox-image"
              height={previewItem.height ?? 900}
              priority
              sizes="90vw"
              src={previewItem.src}
              width={previewItem.width ?? 1600}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}

function isPreviewImageItem(item: ProjectMediaItem | null): item is PreviewImageItem {
  return item?.type === "image" && typeof item.src === "string";
}
