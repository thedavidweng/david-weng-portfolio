import { carouselProjects } from "@/content/carousel-projects";
import { getLocalizedText } from "@/lib/i18n";
import type { CarouselProjectItem, Locale } from "@/types/content";

export const PROJECT_CATEGORY_SEQUENCE = ["Client", "Film", "Video", "Writing"] as const;

type ProjectCategoryId = (typeof PROJECT_CATEGORY_SEQUENCE)[number];

export type ProjectCategoryGroup = {
  id: ProjectCategoryId;
  label: string;
  startIndex: number;
  endIndex: number;
};

export const orderedProjects: CarouselProjectItem[] = PROJECT_CATEGORY_SEQUENCE.flatMap((categoryId) =>
  carouselProjects.filter((project) => project.category.en === categoryId)
);

/**
 * Build category groups with start/end indices into `orderedProjects`.
 *
 * Single-pass O(n) implementation: iterates `orderedProjects` once, tracking
 * the current category and emitting a group each time the category changes.
 */
export function buildProjectCategoryGroups(locale: Locale): ProjectCategoryGroup[] {
  const groups: ProjectCategoryGroup[] = [];
  let currentGroupId: ProjectCategoryId | null = null;
  let currentStart = 0;

  for (let index = 0; index < orderedProjects.length; index++) {
    const project = orderedProjects[index];
    const categoryId = project.category.en as ProjectCategoryId;

    if (categoryId !== currentGroupId) {
      if (currentGroupId !== null) {
        groups.push({
          id: currentGroupId,
          label: getLocalizedText(orderedProjects[currentStart].category, locale),
          startIndex: currentStart,
          endIndex: index - 1
        });
      }

      currentGroupId = categoryId;
      currentStart = index;
    }
  }

  if (currentGroupId !== null) {
    groups.push({
      id: currentGroupId,
      label: getLocalizedText(orderedProjects[currentStart].category, locale),
      startIndex: currentStart,
      endIndex: orderedProjects.length - 1
    });
  }

  return groups;
}

export function getCategoryBySnap(groups: ProjectCategoryGroup[], snapIndex: number) {
  return groups.find((group) => snapIndex >= group.startIndex && snapIndex <= group.endIndex) ?? null;
}
