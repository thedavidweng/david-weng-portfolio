import { carouselProjects } from "@/content/carousel-projects";
import { getLocalizedText } from "@/lib/i18n";
import type { CarouselProjectItem, Locale } from "@/types/content";

const PROJECT_CATEGORY_SEQUENCE = ["Client", "Film", "Video", "Writing"] as const;

export type ProjectCategoryId = (typeof PROJECT_CATEGORY_SEQUENCE)[number];

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
  return PROJECT_CATEGORY_SEQUENCE.reduce<ProjectCategoryGroup[]>((groups, categoryId) => {
    const startIndex = orderedProjects.findIndex((project) => project.category.en === categoryId);

    if (startIndex === -1) {
      return groups;
    }

    const categoryProjects = orderedProjects.filter((project) => project.category.en === categoryId);
    const endIndex = startIndex + categoryProjects.length - 1;

    groups.push({
      id: categoryId,
      label: getLocalizedText(categoryProjects[0].category, locale),
      startIndex,
      endIndex
    });

    return groups;
  }, []);
}

export function getCategoryBySnap(groups: ProjectCategoryGroup[], snapIndex: number) {
  return groups.find((group) => snapIndex >= group.startIndex && snapIndex <= group.endIndex) ?? null;
}
