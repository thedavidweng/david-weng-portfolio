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

test("beaty archive keeps only the linked annual report item in project media", () => {
  const project = getProjectBySlug("beaty-biodiversity-museum-annual-report-2022-2023");

  if (!project) {
    throw new Error("Expected Beaty project to exist");
  }

  const imageItems = project.media.filter((item) => item.type === "image");

  expect(imageItems).toHaveLength(1);
  expect(imageItems[0]?.title.en).toBe("Beaty annual report archive spread");
  expect(imageItems[0]?.href).toBe(
    "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
  );
});
