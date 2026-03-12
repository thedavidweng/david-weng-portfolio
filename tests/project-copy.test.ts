import { getProjectBySlug } from "@/lib/projects";

test("project copy avoids repeating visible platform and link information", () => {
  const fraud = getProjectBySlug("fraud");
  const thePills = getProjectBySlug("the-pills");

  if (!fraud || !thePills) {
    throw new Error("Expected target projects to exist");
  }

  expect(fraud.summary.en).not.toContain("public-facing listings and festival-ready materials");
  expect(fraud.summary.zh).not.toContain("对外展示页面与适用于电影节投递的材料");
  expect(fraud.highlights.en).not.toContain("Listed on IMDb and Douban.");
  expect(fraud.highlights.zh).not.toContain("已在 IMDb 与豆瓣建立条目。");

  expect(thePills.summary.en).not.toContain("public FilmFreeway entry and launch trailer");
  expect(thePills.summary.zh).not.toContain("并配套 FilmFreeway 页面与上线预告片");
  expect(thePills.highlights.en).not.toContain("festival-facing and trailer-facing materials");
  expect(thePills.highlights.zh).not.toContain("电影节投递材料与预告片传播材料");
  expect(thePills.media[1]?.title.en).not.toBe("Trailer Link");
  expect(thePills.media[1]?.title.zh).not.toBe("预告链接");
  expect(thePills.media[1]?.description?.en ?? "").not.toContain("Launch trailer for the project");
  expect(thePills.media[1]?.description?.zh ?? "").not.toContain("该项目的上线预告片");
});
