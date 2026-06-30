import { localized } from "@/lib/i18n";
import { getArchiveStoragePath } from "@/content/archives/_shared";
import type {
  ArchiveCollection,
  ArchiveGroup,
  ArchiveItem,
  LocalizedText,
  ProjectMediaItem
} from "@/types/content";

export function getArchiveFilePath(group: ArchiveGroup, file: string) {
  return `/projects/${getArchiveStoragePath(group)}/${file}`;
}

export function getArchiveCoverItem(collection: ArchiveCollection) {
  return (
    collection.items.find((item) => item.kind === "cover" && item.featured && !item.hidden) ??
    collection.items.find((item) => item.kind === "cover" && !item.hidden)
  );
}

export function getArchiveItemSource(group: ArchiveGroup, item: ArchiveItem) {
  return item.src ?? getArchiveFilePath(group, item.file);
}

export function archiveItemsToProjectMedia(collection: ArchiveCollection): ProjectMediaItem[] {
  return collection.items
    .filter((item) => item.kind !== "cover" && !item.hidden)
    .toSorted((left, right) => (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER))
    .map((item) => ({
      type: "image",
      title: item.title ?? getFallbackArchiveTitle(item),
      description: item.caption ?? getFallbackArchiveCaption(item),
      archiveKind: item.kind,
      src: getArchiveItemSource(collection.group, item),
      width: item.width,
      height: item.height,
      href: item.publishedUrl,
      badge: getArchiveBadge(item.kind),
      credit: item.credit,
      layout: getArchiveLayout(item.kind)
    }));
}

type ArchiveMeta = {
  title: LocalizedText;
  caption: LocalizedText;
  badge: LocalizedText;
  layout: ProjectMediaItem["layout"];
};

const archiveMeta: Record<ArchiveItem["kind"], ArchiveMeta> = {
  booklet: {
    title: localized("Booklet spread", "册页版面"),
    caption: localized("Booklet spread or printed page from the archive.", "档案中的 booklet 版面或印刷页面。"),
    badge: localized("Booklet", "册页"),
    layout: "landscape"
  },
  poster: {
    title: localized("Poster graphic", "海报视觉"),
    caption: localized("Poster-format visual from the archive.", "档案中的海报尺寸视觉。"),
    badge: localized("Poster", "海报"),
    layout: "portrait"
  },
  signage: {
    title: localized("Signage graphic", "导视视觉"),
    caption: localized("Signage or exhibition graphic from the archive.", "档案中的导视或展陈视觉。"),
    badge: localized("Signage", "导视"),
    layout: "portrait"
  },
  report: {
    title: localized("Report spread", "报告版面"),
    caption: localized("Report spread or editorial page from the archive.", "档案中的报告版面或编辑页面。"),
    badge: localized("Report", "报告"),
    layout: "landscape"
  },
  square: {
    title: localized("Square graphic", "方形视觉"),
    caption: localized("Square-format social or promo graphic.", "方形社交或宣传视觉。"),
    badge: localized("Square", "方图"),
    layout: "square"
  },
  slide: {
    title: localized("Slide excerpt", "幻灯片节选"),
    caption: localized("Selected slide or presentation page.", "精选幻灯片或演示页面。"),
    badge: localized("Slides", "幻灯片"),
    layout: "landscape"
  },
  "event-photo": {
    title: localized("Event photo", "活动现场照片"),
    caption: localized("Event documentation image from the archive.", "档案中的活动记录照片。"),
    badge: localized("Event Photo", "活动照片"),
    layout: "landscape"
  },
  thumb: {
    title: localized("Thumbnail asset", "缩略图素材"),
    caption: localized("Thumbnail or compact supporting visual.", "缩略图或轻量辅助视觉。"),
    badge: localized("Thumb", "缩略图"),
    layout: "square"
  },
  video: {
    title: localized("Video frame", "视频画面"),
    caption: localized("Video still or frame capture from the archive.", "档案中的视频截图或画面。"),
    badge: localized("Video", "视频"),
    layout: "landscape"
  },
  cover: {
    title: localized("Cover image", "封面图"),
    caption: localized("Archive cover image.", "档案封面图。"),
    badge: localized("Cover", "封面"),
    layout: "landscape"
  }
};

function getFallbackArchiveTitle(item: ArchiveItem): LocalizedText {
  return archiveMeta[item.kind].title;
}

function getFallbackArchiveCaption(item: ArchiveItem): LocalizedText {
  return archiveMeta[item.kind].caption;
}

function getArchiveBadge(kind: ArchiveItem["kind"]): LocalizedText {
  return archiveMeta[kind].badge;
}

function getArchiveLayout(kind: ArchiveItem["kind"]): ProjectMediaItem["layout"] {
  return archiveMeta[kind].layout;
}
