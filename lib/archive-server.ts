import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import type { ArchiveCollection, ArchiveGroup, ArchiveItem, ArchiveItemKind } from "@/types/content";

const archiveFolderKindMap: Record<string, ArchiveItemKind> = {
  covers: "cover",
  posters: "poster",
  square: "square",
  slides: "slide",
  "event-photos": "event-photo",
  thumbs: "thumb",
  booklet: "booklet",
  signage: "signage",
  report: "report",
  video: "video"
};

const ignoredArchiveFiles = new Set([".gitkeep", ".DS_Store", "README.md"]);

const archiveFallbackDimensions: Record<ArchiveItemKind, { width: number; height: number }> = {
  cover: { width: 1600, height: 1600 },
  poster: { width: 1200, height: 1800 },
  square: { width: 1500, height: 1500 },
  slide: { width: 1920, height: 1080 },
  "event-photo": { width: 1920, height: 1080 },
  thumb: { width: 1280, height: 720 },
  booklet: { width: 1600, height: 1200 },
  signage: { width: 1200, height: 1800 },
  report: { width: 1600, height: 1200 },
  video: { width: 1920, height: 1080 }
};

export function getArchiveDirectory(group: ArchiveGroup) {
  return join(process.cwd(), "public", "projects", group);
}

export function scanArchiveItemsFromDirectory(directory: string, collection: ArchiveCollection): ArchiveItem[] {
  const overrideMap = new Map(collection.items.map((item) => [item.file, item]));
  const discovered: ArchiveItem[] = [];

  for (const [folder, kind] of Object.entries(archiveFolderKindMap)) {
    const folderPath = join(directory, folder);
    let entries: string[] = [];

    try {
      entries = readdirSync(folderPath);
    } catch {
      continue;
    }

    for (const entry of entries.sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))) {
      if (ignoredArchiveFiles.has(entry)) {
        continue;
      }

      const file = `${folder}/${entry}`;
      const override = overrideMap.get(file);

      discovered.push({
        file,
        kind,
        ...getArchiveImageDimensions(join(folderPath, entry), kind),
        title: override?.title,
        caption: override?.caption,
        publishedUrl: override?.publishedUrl,
        credit: override?.credit ?? collection.defaultCredits?.[kind],
        featured: override?.featured,
        hidden: override?.hidden,
        order: override?.order,
        notes: override?.notes
      });
    }
  }

  return discovered;
}

function getArchiveImageDimensions(filePath: string, kind: ArchiveItemKind) {
  try {
    const dimensions = imageSize(readFileSync(filePath));

    if (dimensions.width && dimensions.height) {
      return {
        width: dimensions.width,
        height: dimensions.height
      };
    }
  } catch {
    // Fall through to the layout-based defaults below.
  }

  return archiveFallbackDimensions[kind];
}
