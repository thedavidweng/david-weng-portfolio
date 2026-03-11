import { localized } from "@/lib/i18n";
import type { ArchiveCollection, ArchiveGroup } from "@/types/content";

export const archiveGroups: ArchiveGroup[] = [
  "beaty-biodiversity-museum",
  "bc-ai-ecosystem",
  "theupgrade-ai",
  "personal",
  "client-work",
  "research-publication",
  "film-video"
];

export function isArchiveGroup(value: string): value is ArchiveGroup {
  return archiveGroups.includes(value as ArchiveGroup);
}

export function createEmptyArchiveCollection(
  group: ArchiveGroup,
  enTitle: string,
  zhTitle: string
): ArchiveCollection {
  return {
    group,
    title: localized(enTitle, zhTitle),
    items: []
  };
}
