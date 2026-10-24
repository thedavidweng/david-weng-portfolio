import { StrictMode, useMemo, useState, useSyncExternalStore } from "react";
import {
  RowsPhotoAlbum,
  StaticPhotoAlbum,
  computeRowsLayout,
  type Photo,
} from "react-photo-album";
import "react-photo-album/rows.css";
import type { Locale, LocalizedText, ProjectMediaItem } from "@/types/content";
import { getLocalizedText } from "@/lib/i18n";
import { ProjectMediaLightbox } from "@/src/islands/ProjectMediaLightbox";
import { getHostname } from "@/lib/url";
import { buildSrcSetArray } from "@/lib/responsive-srcset";
import { YOUTUBE_ICON_PATH, EXTERNAL_LINK_ICON_PATH } from "@/src/icons";

type ArchiveMediaWallProps = {
  locale: Locale;
  items: ProjectMediaItem[];
  photoCreditLabel: LocalizedText;
  previewLabel: LocalizedText;
  previewDialogLabel: LocalizedText;
  closePreviewLabel: LocalizedText;
};

type DimensionalMediaItem = ProjectMediaItem & {
  src: string;
  width: number;
  height: number;
};

type ArchivePhoto = Photo & {
  item: ProjectMediaItem;
};

type OverlayLinkMeta = {
  icon: "youtube" | "external";
  label: string;
  platform: "youtube" | "generic";
};

const STATIC_ALBUM_CONTAINER_WIDTH = 1280;
const STATIC_ALBUM_ROW_HEIGHT = 320;
const STATIC_ALBUM_SPACING = 18;
const STATIC_ALBUM_PADDING = 0;
const STATIC_ALBUM_MIN_PHOTOS = 1;

function isDimensionalImageItem(
  item: ProjectMediaItem,
): item is DimensionalMediaItem {
  return (
    item.type === "image" &&
    Boolean(item.src) &&
    Boolean(item.width) &&
    Boolean(item.height)
  );
}

function getOverlayLinkMeta(href: string): OverlayLinkMeta {
  const hostname = getHostname(href);

  if (hostname === "youtu.be" || hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
    return {
      icon: "youtube",
      label: "YouTube",
      platform: "youtube",
    };
  }

  return {
    icon: "external",
    label: "Open",
    platform: "generic",
  };
}

/**
 * `useSyncExternalStore` for SSR-safe feature detection of `ResizeObserver`.
 * The subscribe function is a no-op because `ResizeObserver` availability is
 * static, it never changes during a component's lifetime, so there is nothing
 * to subscribe to. `useSyncExternalStore` is still used (rather than a plain
 * `useState`/`useMemo`) because it provides the `getServerSnapshot` parameter,
 * which keeps SSR output deterministic.
 */
function subscribeToResponsiveAlbum() {
  return () => {};
}

function getResponsiveAlbumSnapshot() {
  return typeof ResizeObserver !== "undefined";
}

function getStaticAlbumSnapshot() {
  return false;
}

export function ArchiveMediaWall({
  locale,
  items,
  photoCreditLabel,
  previewLabel,
  previewDialogLabel,
  closePreviewLabel,
}: ArchiveMediaWallProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const supportsResponsiveAlbum = useSyncExternalStore(
    subscribeToResponsiveAlbum,
    getResponsiveAlbumSnapshot,
    getStaticAlbumSnapshot,
  );

  const dimensionalItems = useMemo(
    () => items.filter(isDimensionalImageItem),
    [items],
  );

  const photos = useMemo<ArchivePhoto[]>(
    () =>
      dimensionalItems.map((item) => {
        const title = getLocalizedText(item.title, locale);

        return {
          key: `${title}-${item.src}`,
          src: item.src,
          width: item.width,
          height: item.height,
          alt: title,
          title,
          label: `${getLocalizedText(previewLabel, locale)} ${title}`,
          srcSet: buildSrcSetArray(item.src, item.width, item.height),
          item,
        };
      }),
    [dimensionalItems, locale, previewLabel],
  );

  const staticModel = useMemo(
    () =>
      computeRowsLayout(
        photos,
        STATIC_ALBUM_SPACING,
        STATIC_ALBUM_PADDING,
        STATIC_ALBUM_CONTAINER_WIDTH,
        STATIC_ALBUM_ROW_HEIGHT,
        STATIC_ALBUM_MIN_PHOTOS,
      ),
    [photos],
  );

  const sharedAlbumProps = useMemo(
    () => ({
      componentsProps: {
        button: ({ photo }: { photo: ArchivePhoto }) => ({
          "aria-label": photo.label,
          className: "project-media__rows-button",
        }),
        container: {
          className: "project-media__wall project-media__wall--rows",
        },
        image: {
          className: "project-media__rows-image",
          decoding: "async" as const,
          loading: "lazy" as const,
        },
        wrapper: ({ photo }: { photo: ArchivePhoto }) => ({
          className: `project-media__rows-item${photo.item.layout ? ` project-media__rows-item--${photo.item.layout}` : ""}`,
        }),
      },
      onClick: ({ index }: { index: number }) => setActiveIndex(index),
      photos,
      render: {
        extras: (_props: object, { photo }: { photo: ArchivePhoto }) => {
          if (!photo.item.href && !photo.item.credit) {
            return null;
          }

          const linkMeta = photo.item.href
            ? getOverlayLinkMeta(photo.item.href)
            : null;

          return (
            <div className="project-media__wall-overlay">
              {photo.item.credit ? (
                <span className="project-media__wall-credit">
                  {getLocalizedText(photoCreditLabel, locale)}:{" "}
                  <a
                    href={photo.item.credit.href}
                    onClick={(event) => event.stopPropagation()}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {getLocalizedText(photo.item.credit.label, locale)}
                    <span className="visually-hidden">(opens in new tab)</span>
                  </a>
                </span>
              ) : null}
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
                  <span className="visually-hidden">(opens in new tab)</span>
                </a>
              ) : null}
            </div>
          );
        },
      },
      sizes: {
        size: "100vw",
        sizes: [
          {
            viewport: "(max-width: 760px)",
            size: "calc(100vw - 32px)",
          },
          {
            viewport: "(max-width: 1200px)",
            size: "calc(100vw - 64px)",
          },
          {
            viewport: "(max-width: 1600px)",
            size: "calc(100vw - 96px)",
          },
          {
            viewport: "(min-width: 1601px)",
            size: "1400px",
          },
        ],
      },
    }),
    [photos, locale, photoCreditLabel],
  );

  return (
    <StrictMode>
      <>
        {supportsResponsiveAlbum ? (
          <RowsPhotoAlbum
            {...sharedAlbumProps}
            defaultContainerWidth={STATIC_ALBUM_CONTAINER_WIDTH}
            padding={0}
            rowConstraints={{
              minPhotos: 1,
              singleRowMaxHeight: 560,
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
          <StaticPhotoAlbum
            {...sharedAlbumProps}
            layout="rows"
            model={staticModel}
          />
        ) : null}
        <ProjectMediaLightbox
          activeIndex={activeIndex}
          closePreviewLabel={closePreviewLabel}
          items={dimensionalItems}
          locale={locale}
          onClose={() => setActiveIndex(null)}
          previewDialogLabel={previewDialogLabel}
        />
      </>
    </StrictMode>
  );
}

function ArchiveOverlayIcon({ type }: { type: OverlayLinkMeta["icon"] }) {
  const path = type === "youtube" ? YOUTUBE_ICON_PATH : EXTERNAL_LINK_ICON_PATH;

  return (
    <svg
      aria-hidden="true"
      className="project-media__wall-link-icon"
      viewBox="0 0 24 24"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}
