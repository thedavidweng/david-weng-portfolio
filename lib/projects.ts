import { projects } from "@/content/projects";
import { getArchiveCollection } from "@/content/archives";
import { archiveItemsToProjectMedia, getArchiveCoverItem, getArchiveItemSource } from "@/lib/archives";
import { getArchiveDirectory, scanArchiveItemsFromDirectory } from "@/lib/archive-server";

export function getProjectBySlug(slug: string) {
  const project = projects.find((entry) => entry.slug === slug);

  if (!project || !project.archiveGroup) {
    return project;
  }

  const collection = getArchiveCollection(project.archiveGroup);
  const scannedItems = scanArchiveItemsFromDirectory(getArchiveDirectory(project.archiveGroup), collection);
  // Archive-backed projects prefer the real local directory contents when present,
  // but fall back to the authored collection metadata so the page still renders cleanly
  // before every asset has been added to the filesystem.
  const hydratedCollection = {
    ...collection,
    items: scannedItems.length > 0 ? scannedItems : collection.items
  };
  const cover = getArchiveCoverItem(hydratedCollection);

  return {
    ...project,
    coverImage: cover ? getArchiveItemSource(project.archiveGroup, cover) : project.coverImage,
    coverAlt: cover?.title ?? project.coverAlt,
    media: archiveItemsToProjectMedia(hydratedCollection)
  };
}
