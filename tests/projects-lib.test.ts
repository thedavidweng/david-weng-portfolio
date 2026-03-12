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

test("beaty archive hydrates linked static works and YouTube video thumbnails from the archive", () => {
  const project = getProjectBySlug("beaty-biodiversity-museum-annual-report-2022-2023");

  if (!project) {
    throw new Error("Expected Beaty project to exist");
  }

  const imageItems = project.media.filter((item) => item.type === "image");
  const videoItems = imageItems.filter((item) => item.badge?.en === "Video");
  const staticItems = imageItems.filter((item) => item.badge?.en !== "Video");

  expect(videoItems).toHaveLength(4);
  expect(videoItems.map((item) => item.src)).toEqual(
    expect.arrayContaining([
      "/projects/beaty-biodiversity-museum/video/youtube-HaaFUnupWOM.jpg",
      "/projects/beaty-biodiversity-museum/video/youtube-hAw-MQBdgIk.jpg",
      "/projects/beaty-biodiversity-museum/video/youtube-wELwGJ1fM50.jpg",
      "/projects/beaty-biodiversity-museum/video/youtube-wwMFyMqo19M.jpg"
    ])
  );
  expect(videoItems.map((item) => item.href)).toEqual(
    expect.arrayContaining([
      "https://youtu.be/HaaFUnupWOM",
      "https://youtu.be/hAw-MQBdgIk",
      "https://youtu.be/wELwGJ1fM50",
      "https://youtu.be/wwMFyMqo19M"
    ])
  );
  expect(videoItems.find((item) => item.href === "https://youtu.be/HaaFUnupWOM")?.title.en).toBe(
    "Tulip tree | Liriodendron tulipifera"
  );
  expect(videoItems.find((item) => item.href === "https://youtu.be/HaaFUnupWOM")?.description.en).toBe(
    "Martin Henry shows how to identify different species of trees around UBC."
  );
  expect(videoItems.find((item) => item.href === "https://youtu.be/hAw-MQBdgIk")?.title.en).toBe(
    "Apicomplexans - Ina Na | Researchers Revealed - UBC"
  );
  expect(videoItems.find((item) => item.href === "https://youtu.be/wELwGJ1fM50")?.title.en).toBe(
    "Jacelyn Shu - Visual Communication | Researchers Revealed, Beaty Biodiversity Museum, UBC"
  );
  expect(videoItems.find((item) => item.href === "https://youtu.be/wwMFyMqo19M")?.description.en).toBe(
    "Find out how a natural history collection is digitized at the Beaty Biodiversity Museum, including 3D scanning and collection database work."
  );
  expect(staticItems.some((item) => item.src === "/projects/beaty-biodiversity-museum/booklet/beaty-visitor-guide-cn.jpg")).toBe(true);
  expect(staticItems.find((item) => item.src === "/projects/beaty-biodiversity-museum/booklet/beaty-visitor-guide-cn.jpg")?.href).toBe(
    "https://explore.beatymuseum.ubc.ca/assets/guides/visitorguide-CN.pdf"
  );
  expect(staticItems.find((item) => item.src === "/projects/beaty-biodiversity-museum/report/beaty-annual-report-spread.jpeg")?.href).toBe(
    "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
  );
  expect(project.summary.zh).toBe("为 Beaty Biodiversity Museum 设计产出的手册、标识、年度报告与视频相关成果。");
});

test("archive-backed organization projects use the archive collection naming scheme", () => {
  const beaty = getProjectBySlug("beaty-biodiversity-museum-annual-report-2022-2023");
  const bcAi = getProjectBySlug("designs-for-bc-ai-ecosystem");
  const theUpgrade = getProjectBySlug("designs-for-theupgrade-ai");

  if (!beaty || !bcAi || !theUpgrade) {
    throw new Error("Expected archive-backed organization projects to exist");
  }

  [beaty, bcAi, theUpgrade].forEach((project) => {
    expect(project.title.en).toMatch(/^Archive for /);
    expect(project.category.en).toBe("Client / Organization");
    expect(project.category.zh).toBe("客户 / 机构");
    expect(project.projectType.en).toBe("Archive Collection");
    expect(project.projectType.zh).toBe("档案集合");
  });
});
