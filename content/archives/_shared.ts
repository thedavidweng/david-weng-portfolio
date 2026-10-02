import { localized } from "@/lib/i18n";
import type { ArchiveCollection, ArchiveGroup } from "@/types/content";

export const archiveGroups: ArchiveGroup[] = [
  "beaty-biodiversity-museum",
  "bc-ai-ecosystem",
  "theupgrade-ai",
  "personal",
  "personal-video",
  "client-work",
  "film-video"
];

export function isArchiveGroup(value: string): value is ArchiveGroup {
  return archiveGroups.includes(value as ArchiveGroup);
}

const archiveStoragePathMap: Partial<Record<ArchiveGroup, string>> = {
  "beaty-biodiversity-museum": "client-work/beaty-biodiversity-museum",
  "bc-ai-ecosystem": "client-work/bc-ai-ecosystem",
  "theupgrade-ai": "client-work/theupgrade-ai"
};

export function getArchiveStoragePath(group: ArchiveGroup) {
  return archiveStoragePathMap[group] ?? group;
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
