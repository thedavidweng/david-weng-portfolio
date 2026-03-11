import { localized } from "@/lib/i18n";
import type {
  ArchiveCollection,
  ArchiveGroup,
  ArchiveItem,
  LocalizedText,
  ProjectMediaItem
} from "@/types/content";

export function getArchiveFilePath(group: ArchiveGroup, file: string) {
  return `/projects/${group}/${file}`;
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
    .sort((left, right) => (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER))
    .map((item) => ({
      type: "image",
      title: item.title ?? getFallbackArchiveTitle(item),
      description: item.caption ?? getFallbackArchiveCaption(item),
      src: getArchiveItemSource(collection.group, item),
      width: item.width,
      height: item.height,
      href: item.publishedUrl,
      badge: getArchiveBadge(item.kind),
      credit: item.credit,
      layout: getArchiveLayout(item.kind)
    }));
}

function getFallbackArchiveTitle(item: ArchiveItem): LocalizedText {
  switch (item.kind) {
    case "booklet":
      return localized("Booklet spread", "册页版面");
    case "poster":
      return localized("Poster graphic", "海报视觉");
    case "signage":
      return localized("Signage graphic", "导视视觉");
    case "report":
      return localized("Report spread", "报告版面");
    case "square":
      return localized("Square graphic", "方形视觉");
    case "slide":
      return localized("Slide excerpt", "幻灯片节选");
    case "event-photo":
      return localized("Event photo", "活动现场照片");
    case "thumb":
      return localized("Thumbnail asset", "缩略图素材");
    case "video":
      return localized("Video frame", "视频画面");
    case "cover":
      return localized("Cover image", "封面图");
  }
}

function getFallbackArchiveCaption(item: ArchiveItem): LocalizedText {
  switch (item.kind) {
    case "booklet":
      return localized("Booklet spread or printed page from the archive.", "档案中的 booklet 版面或印刷页面。");
    case "poster":
      return localized("Poster-format visual from the archive.", "档案中的海报尺寸视觉。");
    case "signage":
      return localized("Signage or exhibition graphic from the archive.", "档案中的导视或展陈视觉。");
    case "report":
      return localized("Report spread or editorial page from the archive.", "档案中的报告版面或编辑页面。");
    case "square":
      return localized("Square-format social or promo graphic.", "方形社交或宣传视觉。");
    case "slide":
      return localized("Selected slide or presentation page.", "精选幻灯片或演示页面。");
    case "event-photo":
      return localized("Event documentation image from the archive.", "档案中的活动记录照片。");
    case "thumb":
      return localized("Thumbnail or compact supporting visual.", "缩略图或轻量辅助视觉。");
    case "video":
      return localized("Video still or frame capture from the archive.", "档案中的视频截图或画面。");
    case "cover":
      return localized("Archive cover image.", "档案封面图。");
  }
}

function getArchiveBadge(kind: ArchiveItem["kind"]): LocalizedText {
  switch (kind) {
    case "booklet":
      return localized("Booklet", "册页");
    case "poster":
      return localized("Poster", "海报");
    case "signage":
      return localized("Signage", "导视");
    case "report":
      return localized("Report", "报告");
    case "square":
      return localized("Square", "方图");
    case "slide":
      return localized("Slides", "幻灯片");
    case "event-photo":
      return localized("Event Photo", "活动照片");
    case "thumb":
      return localized("Thumb", "缩略图");
    case "video":
      return localized("Video", "视频");
    case "cover":
      return localized("Cover", "封面");
  }
}

function getArchiveLayout(kind: ArchiveItem["kind"]): ProjectMediaItem["layout"] {
  switch (kind) {
    case "booklet":
    case "report":
    case "video":
      return "landscape";
    case "poster":
    case "signage":
      return "portrait";
    case "slide":
    case "event-photo":
    case "cover":
      return "landscape";
    case "square":
    case "thumb":
      return "square";
  }
}
