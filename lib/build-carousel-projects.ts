import { projectSectionContent } from "@/content/project-section";
import { localized } from "@/lib/i18n";
import { getImageWidth } from "@/lib/image-dimensions";
import type { CarouselProjectItem, ProjectItem } from "@/types/content";

const SOFTWARE_COVER = "/projects/software/cover.svg";

export function buildSoftwareSlide(): CarouselProjectItem {
  const { software } = projectSectionContent;
  return {
    slug: "software",
    title: software.title,
    code: software.code,
    posterWord: software.posterWord,
    category: software.category,
    year: "2026",
    coverLabel: software.coverLabel,
    coverPalette: ["#0a0607", "#2a0b0d", "#e11d25"],
    coverImage: SOFTWARE_COVER,
    coverWidth: getImageWidth(SOFTWARE_COVER),
    teaser: software.teaser,
    href: localized("/software/", "/zh/software/")
  };
}

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
