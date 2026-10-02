import { projects } from "@/content/projects";
import { buildCarouselProjects, buildSoftwareSlide } from "@/lib/build-carousel-projects";
import {
  buildProjectCategoryGroups,
  getCategoryBySnap,
  orderProjectsByCategory
} from "@/lib/project-carousel";

const orderedProjects = orderProjectsByCategory(buildCarouselProjects(projects));

describe("project carousel grouping", () => {
  test("leads with the software slide as its own category linking to the software page", () => {
    const withSoftware = orderProjectsByCategory([...buildCarouselProjects(projects), buildSoftwareSlide()]);
    const groups = buildProjectCategoryGroups(withSoftware, "zh");

    expect(withSoftware[0]?.href).toEqual({ en: "/software/", zh: "/zh/software/" });
    expect(groups[0]).toMatchObject({ id: "Software", label: "软件", startIndex: 0, endIndex: 0 });
  });

  test("orders the homepage project rail by explicit category sequence without an all bucket", () => {
    const groups = buildProjectCategoryGroups(orderedProjects, "en");

    expect(groups.map((group) => group.id)).toEqual([
      "Client",
      "Film",
      "Video"
    ]);
    expect(groups.map((group) => group.label)).toEqual([
      "Client",
      "Film",
      "Video"
    ]);
    expect(orderedProjects.map((project) => project.category.en)).toEqual([
      "Client",
      "Client",
      "Client",
      "Film",
      "Film",
      "Film",
      "Video",
      "Video"
    ]);
  });

  test("maps snap indices back to the owning category", () => {
    const groups = buildProjectCategoryGroups(orderedProjects, "zh");

    expect(getCategoryBySnap(groups, 0)?.label).toBe("客户");
    expect(getCategoryBySnap(groups, 3)?.label).toBe("电影");
    expect(getCategoryBySnap(groups, 6)?.label).toBe("视频");
    expect(getCategoryBySnap(groups, 7)?.label).toBe("视频");
  });
});
