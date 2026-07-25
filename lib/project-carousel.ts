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

export function buildProjectCategoryGroups(locale: Locale): ProjectCategoryGroup[] {
  const groups: ProjectCategoryGroup[] = [];
  let startIndex = 0;

  for (const id of PROJECT_CATEGORY_SEQUENCE) {
    const items = orderedProjects.filter((project) => project.category.en === id);
    if (items.length === 0) continue;

    groups.push({
      id,
      label: getLocalizedText(items[0].category, locale),
      startIndex,
      endIndex: startIndex + items.length - 1
    });
    startIndex += items.length;
  }

  return groups;
}

export function getCategoryBySnap(groups: ProjectCategoryGroup[], snapIndex: number) {
  return groups.find((group) => snapIndex >= group.startIndex && snapIndex <= group.endIndex) ?? null;
}
