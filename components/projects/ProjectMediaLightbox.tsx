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

export function ProjectMediaLightbox({
  activeItem,
  closePreviewLabel,
  locale,
  onClose,
  previewDialogLabel
}: ProjectMediaLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = activeItem?.type === "image" && !!activeItem.src;

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

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [handleCancel]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      aria-label={projectLabel(previewDialogLabel, locale)}
      className="project-media__lightbox"
      onClick={handleBackdropClick}
    >
      {isOpen && activeItem ? (
        <>
          <button
            aria-label={projectLabel(closePreviewLabel, locale)}
            className="project-media__lightbox-close"
            onClick={onClose}
            type="button"
          >
            close
          </button>
          <div className="project-media__lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <Image
              alt={projectLabel(activeItem.title, locale)}
              className="project-media__lightbox-image"
              height={activeItem.height ?? 900}
              priority
              sizes="90vw"
              src={activeItem.src!}
              width={activeItem.width ?? 1600}
            />
          </div>
        </>
      ) : null}
    </dialog>
  );
}
