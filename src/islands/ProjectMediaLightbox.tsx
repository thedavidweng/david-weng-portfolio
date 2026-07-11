import { useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel, projectDetailContent } from "@/content/projects";

const DEFAULT_SLIDE_HEIGHT = 900;
const DEFAULT_SLIDE_WIDTH = 1600;
const MAX_ZOOM_PIXEL_RATIO = 3;

const CLOSE_ICON_PATH =
  "M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z";

type ProjectMediaLightboxProps = {
  activeIndex: number | null;
  closePreviewLabel: LocalizedText;
  items: ProjectMediaItem[];
  locale: Locale;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  previewDialogLabel: LocalizedText;
};

type PreviewImageItem = ProjectMediaItem & {
  type: "image";
  src: string;
};

export function ProjectMediaLightbox({
  activeIndex,
  closePreviewLabel,
  items,
  locale,
  onClose,
  onIndexChange,
  previewDialogLabel,
}: ProjectMediaLightboxProps) {
  const slides = useMemo(
    () =>
      items
        .filter(
          (item): item is PreviewImageItem =>
            item.type === "image" && typeof item.src === "string",
        )
        .map((item) => ({
          alt: projectLabel(item.title, locale),
          height: item.height ?? DEFAULT_SLIDE_HEIGHT,
          src: item.src,
          width: item.width ?? DEFAULT_SLIDE_WIDTH,
        })),
    [items, locale],
  );
  const isOpen =
    activeIndex !== null && activeIndex >= 0 && activeIndex < slides.length;
  const previewLabel = projectLabel(previewDialogLabel, locale);
  const closeLabel = projectLabel(closePreviewLabel, locale);

  return (
    <Lightbox
      carousel={{
        finite: slides.length <= 1,
        imageFit: "contain",
        padding: 0,
        spacing: 0,
      }}
      className="project-media__lightbox"
      close={onClose}
      controller={{
        aria: true,
        closeOnBackdropClick: true,
      }}
      index={activeIndex ?? 0}
      labels={{
        Close: closeLabel,
        Next: projectLabel(projectDetailContent.nextPreviewLabel, locale),
        Previous: projectLabel(
          projectDetailContent.previousPreviewLabel,
          locale,
        ),
      }}
      on={{
        view: ({ index }) => onIndexChange?.(index),
      }}
      open={isOpen}
      plugins={[Zoom]}
      portal={{
        container: {
          "aria-label": previewLabel,
          role: "dialog",
        },
      }}
      render={{
        controls: () => (
          <button
            aria-label={closeLabel}
            className="project-media__lightbox-close"
            onClick={onClose}
            type="button"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="project-media__lightbox-close-icon"
            >
              <path d={CLOSE_ICON_PATH} fill="currentColor" />
            </svg>
          </button>
        ),
      }}
      slides={slides}
      toolbar={{ buttons: [] }}
      zoom={{
        maxZoomPixelRatio: MAX_ZOOM_PIXEL_RATIO,
        pinchZoomV4: true,
      }}
    />
  );
}
