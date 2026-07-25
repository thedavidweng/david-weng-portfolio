import {
  buildProjectCategoryGroups,
  getCategoryBySnap,
  orderedProjects
} from "@/lib/project-carousel";

describe("project carousel grouping", () => {
  test("orders the homepage project rail by explicit category sequence without an all bucket", () => {
    const groups = buildProjectCategoryGroups("en");

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
    const groups = buildProjectCategoryGroups("zh");

    expect(getCategoryBySnap(groups, 0)?.label).toBe("客户");
    expect(getCategoryBySnap(groups, 3)?.label).toBe("电影");
    expect(getCategoryBySnap(groups, 6)?.label).toBe("视频");
    expect(getCategoryBySnap(groups, 8)?.label).toBe("写作");
  });
});
