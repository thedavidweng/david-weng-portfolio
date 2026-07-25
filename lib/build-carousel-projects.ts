import { getImageWidth } from "@/lib/image-dimensions";
import type { CarouselProjectItem, ProjectItem } from "@/types/content";

const CAROUSEL_FIELDS = [
  "slug",
  "title",
  "code",
  "posterWord",
  "category",
  "year",
  "coverLabel",
  "coverPalette",
  "coverImage",
  "coverWidth",
  "teaser"
] as const satisfies ReadonlyArray<keyof CarouselProjectItem>;

export function buildCarouselProjects(source: ProjectItem[]): CarouselProjectItem[] {
  return source.map((project) => {
    const entry = Object.fromEntries(
      CAROUSEL_FIELDS.flatMap((field) =>
        field !== "coverWidth"
          ? [[field, project[field as keyof ProjectItem]]]
          : [],
      ),
    ) as unknown as CarouselProjectItem;

    if (project.coverImage) {
      entry.coverWidth = getImageWidth(project.coverImage);
    }

    return entry;
  });
}
