import type { ProjectMediaItem } from "@/types/content";

export type PreviewImageItem = ProjectMediaItem & {
  type: "image";
  src: string;
};

export function isPreviewImageItem(item: ProjectMediaItem): item is PreviewImageItem {
  return item.type === "image" && typeof item.src === "string";
}
