import { getProjectBySlug } from "@/lib/projects";

test("project copy avoids repeating visible platform and link information", () => {
  const fraud = getProjectBySlug("fraud");
  const thePills = getProjectBySlug("the-pills");
  const persona5 = getProjectBySlug("persona-5-style-campaign-video");
  const projectRace = getProjectBySlug("project-race");

  if (!fraud || !thePills || !persona5 || !projectRace) {
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
  expect(thePills.media[1]?.description.en).not.toContain("Launch trailer for the project");
  expect(thePills.media[1]?.description.zh).not.toContain("该项目的上线预告片");

  expect(persona5.highlights.en).not.toContain("Published across both YouTube and Bilibili.");
  expect(persona5.highlights.zh).not.toContain("同时发布于 YouTube 与 Bilibili。");
  expect(persona5.media[1]?.description.en).not.toContain("Embedded YouTube version");
  expect(persona5.media[1]?.description.zh).not.toContain("可直接在站内观看的 YouTube 版");

  expect(projectRace.highlights.en).not.toContain("Published on both YouTube and Bilibili.");
  expect(projectRace.highlights.zh).not.toContain("同时发布于 YouTube 与 Bilibili。");
  expect(projectRace.media[1]?.description.en).not.toContain("Embedded YouTube version");
  expect(projectRace.media[1]?.description.zh).not.toContain("可直接在项目页播放的 YouTube 短片版本");
});
