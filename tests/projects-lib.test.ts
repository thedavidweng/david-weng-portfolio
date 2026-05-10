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
  expect(project.coverImage?.startsWith("/projects/client-work/bc-ai-ecosystem/")).toBe(true);
  imageItems.forEach((item) => {
    expect(item.width).toBeGreaterThan(0);
    expect(item.height).toBeGreaterThan(0);
    expect(item.src && item.src.startsWith("/projects/client-work/bc-ai-ecosystem/")).toBe(true);
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
      "/projects/client-work/beaty-biodiversity-museum/video/youtube-HaaFUnupWOM.avif",
      "/projects/client-work/beaty-biodiversity-museum/video/youtube-hAw-MQBdgIk.avif",
      "/projects/client-work/beaty-biodiversity-museum/video/youtube-wELwGJ1fM50.avif",
      "/projects/client-work/beaty-biodiversity-museum/video/youtube-wwMFyMqo19M.avif"
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
  expect(staticItems.some((item) => item.src === "/projects/client-work/beaty-biodiversity-museum/booklet/beaty-visitor-guide-cn.avif")).toBe(true);
  expect(staticItems.find((item) => item.src === "/projects/client-work/beaty-biodiversity-museum/booklet/beaty-visitor-guide-cn.avif")?.href).toBe(
    "https://explore.beatymuseum.ubc.ca/assets/guides/visitorguide-CN.pdf"
  );
  expect(staticItems.find((item) => item.src === "/projects/client-work/beaty-biodiversity-museum/report/beaty-annual-report-spread.avif")?.href).toBe(
    "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
  );
  expect(project.summary.zh).toBe("为 Beaty Biodiversity Museum 制作的手册、标识、年度报告版式与视频。");
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
    expect(project.category.en).toBe("Client");
    expect(project.category.zh).toBe("客户");
    expect(project.projectType.en).toBe("Archive Collection");
    expect(project.projectType.zh).toBe("档案集合");
  });
});

test("adds dedicated commissioned and personal video archive projects with normalized asset paths", () => {
  const commissioned = getProjectBySlug("commissioned-video-work");
  const personalVideo = getProjectBySlug("personal-video-projects");
  const fraud = getProjectBySlug("fraud");
  const thePills = getProjectBySlug("the-pills");
  const gourd = getProjectBySlug("gourd");
  const persona5 = getProjectBySlug("persona-5-style-campaign-video");
  const projectRace = getProjectBySlug("project-race");

  if (!commissioned || !personalVideo || !fraud || !thePills || !gourd) {
    throw new Error("Expected video archive and film projects to exist");
  }

  expect(fraud.category.en).toBe("Film");
  expect(fraud.category.zh).toBe("电影");
  expect(thePills.category.en).toBe("Film");
  expect(gourd.category.en).toBe("Film");

  expect(commissioned.archiveGroup).toBe("film-video");
  expect(commissioned.title.en).toBe("Commissioned Video Work");
  expect(commissioned.category.en).toBe("Video");
  expect(commissioned.category.zh).toBe("视频");
  expect(commissioned.media.filter((item) => item.archiveKind === "video")).toHaveLength(2);
  expect(commissioned.media.map((item) => item.src)).toEqual(
    expect.arrayContaining([
      "/projects/film-video/video/youtube-WlLGuSej0Yg.avif",
      "/projects/film-video/video/youtube-sn_P6wawBLk.avif"
    ])
  );
  expect(commissioned.media.find((item) => item.href === "https://youtu.be/WlLGuSej0Yg")?.title.en).toBe(
    "Notion 繁體中文版發布會 Traditional Chinese Launch Party"
  );
  expect(commissioned.media.find((item) => item.href === "https://youtu.be/sn_P6wawBLk")?.title.en).toBe("Iris's Lain");

  expect(personalVideo.archiveGroup).toBe("personal-video");
  expect(personalVideo.title.en).toBe("Personal Video Projects");
  expect(personalVideo.category.en).toBe("Video");
  expect(personalVideo.category.zh).toBe("视频");
  expect(personalVideo.media.filter((item) => item.archiveKind === "video")).toHaveLength(3);
  expect(personalVideo.media.map((item) => item.href)).toEqual(
    expect.arrayContaining([
      "https://youtu.be/kdPPnUPtH-E",
      "https://youtu.be/i64iXe_CPfw/",
      "https://youtu.be/t9Si3THY5OU"
    ])
  );

  expect(fraud.coverImage).toBe("/projects/film-video/film/fraud/cover.avif");
  expect(thePills.coverImage).toBe("/projects/film-video/film/the-pills/cover.avif");
  expect(gourd.title.zh).toBe("清兵卫");
  expect(gourd.coverImage).toBe("/projects/film-video/film/gourd/stills/still-gourd-01.avif");
  expect(persona5).toBeUndefined();
  expect(projectRace).toBeUndefined();
});
