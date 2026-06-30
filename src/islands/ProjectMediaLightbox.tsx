import { useCallback, useEffect, useEffectEvent, useRef } from "react";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel } from "@/content/projects";
import { PortfolioImage } from "@/src/islands/_shared/PortfolioImage";

type ProjectMediaLightboxProps = {
  activeItem: ProjectMediaItem | null;
  canNavigate?: boolean;
  closePreviewLabel: LocalizedText;
  locale: Locale;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  previewDialogLabel: LocalizedText;
};

type PreviewImageItem = ProjectMediaItem & {
  type: "image";
  src: string;
};

export function ProjectMediaLightbox({
  activeItem,
  canNavigate = false,
  closePreviewLabel,
  locale,
  onClose,
  onNext,
  onPrevious,
  previewDialogLabel
}: ProjectMediaLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewItem = isPreviewImageItem(activeItem) ? activeItem : null;
  const isOpen = previewItem !== null;

  const handleCancel = useEffectEvent((e: Event) => {
    e.preventDefault();
    onClose();
  });

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "ArrowRight" && canNavigate) {
      event.preventDefault();
      onNext?.();
    } else if (event.key === "ArrowLeft" && canNavigate) {
      event.preventDefault();
      onPrevious?.();
    }
  });

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

    const onCancel = (event: Event) => handleCancel(event);

    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event);

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  if (!previewItem) {
    return null;
  }

  return (
    <dialog ref={dialogRef} aria-label={projectLabel(previewDialogLabel, locale)} className="project-media__lightbox">
      <button
        aria-label={projectLabel(previewDialogLabel, locale)}
        className="project-media__lightbox-backdrop"
        onClick={handleBackdropClick}
        onKeyDown={handleBackdropKeyDown}
        type="button"
      />
      <button
        aria-label={projectLabel(closePreviewLabel, locale)}
        className="project-media__lightbox-close"
        onClick={onClose}
        type="button"
      >
        X
      </button>
      {canNavigate ? (
        <>
          <button
            aria-label="Previous image"
            className="project-media__lightbox-nav project-media__lightbox-nav--prev"
            onClick={onPrevious}
            type="button"
          >
            ←
          </button>
          <button
            aria-label="Next image"
            className="project-media__lightbox-nav project-media__lightbox-nav--next"
            onClick={onNext}
            type="button"
          >
            →
          </button>
        </>
      ) : null}
      <div className="project-media__lightbox-scroll">
        <div className="project-media__lightbox-frame">
          <PortfolioImage
            alt={projectLabel(previewItem.title, locale)}
            className="project-media__lightbox-image"
            height={previewItem.height ?? 900}
            loading="lazy"
            sizes="90vw"
            src={previewItem.src}
            width={previewItem.width ?? 1600}
          />
        </div>
      </div>
    </dialog>
  );
}

function isPreviewImageItem(item: ProjectMediaItem | null): item is PreviewImageItem {
  return item?.type === "image" && typeof item.src === "string";
}