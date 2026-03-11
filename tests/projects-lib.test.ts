import { getLocalizedText, isLocale } from "@/lib/i18n";
import { getProjectBySlug } from "@/lib/projects";

test("resolves supported locales and bilingual project content", () => {
  expect(isLocale("en")).toBe(true);
  expect(isLocale("zh")).toBe(true);
  expect(isLocale("fr")).toBe(false);
  expect(
    getLocalizedText(
      {
        en: "What I Do",
        zh: "我能做什么"
      },
      "zh"
    )
  ).toBe("我能做什么");
  expect(getProjectBySlug("fraud")?.slug).toBe("fraud");
  expect(getProjectBySlug("fraud")?.title.zh).toBeTruthy();
});

test("hydrates archive-backed project media with image dimensions for rows layout", () => {
  const project = getProjectBySlug("designs-for-bc-ai-ecosystem");

  if (!project) {
    throw new Error("Expected archive project to exist");
  }

  const imageItems = project.media.filter((item) => item.type === "image");

  expect(imageItems.length).toBeGreaterThan(0);
  expect(project.coverImage?.startsWith("/projects/bc-ai-ecosystem/")).toBe(true);
  imageItems.forEach((item) => {
    expect(item.width).toBeGreaterThan(0);
    expect(item.height).toBeGreaterThan(0);
    expect(item.src.startsWith("/projects/bc-ai-ecosystem/")).toBe(true);
  });
});
