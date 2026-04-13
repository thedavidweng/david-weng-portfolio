import type { ProjectMediaItem } from "@/types/content";

export function isArchiveVideoItem(item: ProjectMediaItem) {
  return item.type === "image" && item.archiveKind === "video";
}

export function getProjectLinkIconType(href: string) {
  return href.includes("youtu") ? "youtube" : "external";
}
