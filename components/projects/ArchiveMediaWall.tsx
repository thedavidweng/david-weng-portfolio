"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { RowsPhotoAlbum, StaticPhotoAlbum, computeRowsLayout, type Photo } from "react-photo-album";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { projectLabel } from "@/content/projects";

type ArchiveMediaWallProps = {
  locale: Locale;
  items: ProjectMediaItem[];
  photoCreditLabel: LocalizedText;
  previewLabel: LocalizedText;
  previewDialogLabel: LocalizedText;
  closePreviewLabel: LocalizedText;
};

type ArchivePhoto = Photo & {
  item: ProjectMediaItem;
};

type OverlayLinkMeta = {
  icon: "youtube" | "external";
  label: string;
  platform: "youtube" | "generic";
};

export function ArchiveMediaWall({
  locale,
  items,
  photoCreditLabel,
  previewLabel,
  previewDialogLabel,
  closePreviewLabel
}: ArchiveMediaWallProps) {
  const [activeItem, setActiveItem] = useState<ProjectMediaItem | null>(null);
  const supportsResponsiveAlbum = typeof ResizeObserver !== "undefined";
  const photos = useMemo<ArchivePhoto[]>(
    () =>
      items
        .filter((item): item is ProjectMediaItem & { src: string; width: number; height: number } => {
          return item.type === "image" && Boolean(item.src) && Boolean(item.width) && Boolean(item.height);
        })
        .map((item) => {
          const title = projectLabel(item.title, locale);

          return {
            key: `${title}-${item.src}`,
            src: item.src,
            width: item.width,
            height: item.height,
            alt: title,
            title,
            label: `${projectLabel(previewLabel, locale)} ${title}`,
            item
          };
        }),
    [items, locale, previewLabel]
  );
  const staticModel = useMemo(
    () =>
      computeRowsLayout(
        photos,
        18,
        0,
        1280,
        320,
        1
      ),
    [photos]
  );

  const getOverlayLinkMeta = (href: string): OverlayLinkMeta => {
    try {
      const hostname = new URL(href).hostname.replace(/^www\./, "");

      if (hostname === "youtu.be" || hostname.endsWith("youtube.com")) {
        return {
          icon: "youtube",
          label: "YouTube",
          platform: "youtube"
        };
      }
    } catch {
      // Fall back to a generic label if the URL is malformed.
    }

    return {
      icon: "external",
      label: "Open",
      platform: "generic"
    };
  };

  const sharedAlbumProps = {
    componentsProps: {
      button: ({ photo }: { photo: ArchivePhoto }) => ({
        "aria-label": photo.label,
        className: "project-media__rows-button"
      }),
      container: {
        className: "project-media__wall project-media__wall--rows"
      },
      image: {
        className: "project-media__rows-image"
      },
      wrapper: ({ photo }: { photo: ArchivePhoto }) => ({
        className: `project-media__rows-item${photo.item.layout ? ` project-media__rows-item--${photo.item.layout}` : ""}`
      })
    },
    onClick: ({ photo }: { photo: ArchivePhoto }) => setActiveItem(photo.item),
    photos,
    render: {
      extras: (_props: object, { photo }: { photo: ArchivePhoto }) => {
        if (!photo.item.href && !photo.item.credit) {
          return null;
        }

        const linkMeta = photo.item.href ? getOverlayLinkMeta(photo.item.href) : null;

        return (
          <div className="project-media__wall-overlay">
            {photo.item.credit ? (
              <span className="project-media__wall-credit">
                {projectLabel(photoCreditLabel, locale)}:{" "}
                <a href={photo.item.credit.href} onClick={(event) => event.stopPropagation()} rel="noreferrer" target="_blank">
                  {projectLabel(photo.item.credit.label, locale)}
                </a>
              </span>
            ) : (
              <span />
            )}
            {photo.item.href && linkMeta ? (
              <a
                className={`project-media__wall-link-indicator project-media__wall-link-indicator--${linkMeta.platform}`}
                href={photo.item.href}
                onClick={(event) => event.stopPropagation()}
                rel="noreferrer"
                target="_blank"
              >
                <ArchiveOverlayIcon type={linkMeta.icon} />
                <span>{linkMeta.label}</span>
              </a>
            ) : null}
          </div>
        );
      }
    },
    sizes: {
      size: "100vw",
      sizes: [
        {
          viewport: "(max-width: 760px)",
          size: "calc(100vw - 32px)"
        },
        {
          viewport: "(max-width: 1200px)",
          size: "calc(100vw - 64px)"
        },
        {
          viewport: "(max-width: 1600px)",
          size: "calc(100vw - 96px)"
        },
        {
          viewport: "(min-width: 1601px)",
          size: "1400px"
        }
      ]
    }
  };

  return (
    <>
      {supportsResponsiveAlbum ? (
        <RowsPhotoAlbum
          {...sharedAlbumProps}
          defaultContainerWidth={1280}
          padding={0}
          rowConstraints={{
            minPhotos: 1,
            singleRowMaxHeight: 560
          }}
          spacing={(containerWidth) => (containerWidth < 760 ? 12 : 18)}
          targetRowHeight={(containerWidth) => {
            if (containerWidth < 760) {
              return 180;
            }

            if (containerWidth < 1200) {
              return 240;
            }

            return 320;
          }}
        />
      ) : staticModel ? (
        <StaticPhotoAlbum {...sharedAlbumProps} layout="rows" model={staticModel} />
      ) : null}
      {activeItem?.type === "image" && activeItem.src ? (
        <div
          aria-label={projectLabel(previewDialogLabel, locale)}
          className="project-media__lightbox"
          onClick={() => setActiveItem(null)}
          role="dialog"
        >
          <button
            aria-label={projectLabel(closePreviewLabel, locale)}
            className="project-media__lightbox-close"
            onClick={() => setActiveItem(null)}
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
      ) : null}
    </>
  );
}

function ArchiveOverlayIcon({ type }: { type: OverlayLinkMeta["icon"] }) {
  if (type === "youtube") {
    return (
      <svg aria-hidden="true" className="project-media__wall-link-icon" viewBox="0 0 24 24">
        <path
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.5 15.7V8.3l6.4 3.7-6.4 3.7Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="project-media__wall-link-icon" viewBox="0 0 24 24">
      <path
        d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3Zm4 14v4H3V6h4v2H5v11h11v-2h2Z"
        fill="currentColor"
      />
    </svg>
  );
}
