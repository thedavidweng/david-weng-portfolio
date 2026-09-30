import { projects } from "@/content/projects";
import { buildCarouselProjects, buildSoftwareSlide } from "@/lib/build-carousel-projects";
import {
  buildProjectCategoryGroups,
  getCategoryBySnap,
  orderProjectsByCategory
} from "@/lib/project-carousel";

const orderedProjects = orderProjectsByCategory(buildCarouselProjects(projects));

describe("project carousel grouping", () => {
  test("appends the software slide as its own category linking to the software page", () => {
    const withSoftware = orderProjectsByCategory([buildSoftwareSlide(), ...buildCarouselProjects(projects)]);
    const groups = buildProjectCategoryGroups(withSoftware, "zh");

    expect(withSoftware.at(-1)?.href).toEqual({ en: "/software/", zh: "/zh/software/" });
    expect(groups.at(-1)).toMatchObject({ id: "Software", label: "软件", endIndex: withSoftware.length - 1 });
  });

  test("orders the homepage project rail by explicit category sequence without an all bucket", () => {
    const groups = buildProjectCategoryGroups(orderedProjects, "en");

    expect(groups.map((group) => group.id)).toEqual([
      "Client",
      "Film",
      "Video",
      "Writing"
    ]);
    expect(groups.map((group) => group.label)).toEqual([
      "Client",
      "Film",
      "Video",
      "Writing"
    ]);
    expect(orderedProjects.map((project) => project.category.en)).toEqual([
      "Client",
      "Client",
      "Client",
      "Film",
      "Film",
      "Film",
      "Video",
      "Video",
      "Writing"
    ]);
  });

  test("maps snap indices back to the owning category", () => {
    const groups = buildProjectCategoryGroups(orderedProjects, "zh");

    expect(getCategoryBySnap(groups, 0)?.label).toBe("客户");
    expect(getCategoryBySnap(groups, 3)?.label).toBe("电影");
    expect(getCategoryBySnap(groups, 6)?.label).toBe("视频");
    expect(getCategoryBySnap(groups, 8)?.label).toBe("写作");
  });
});
