// Use this collection to map files from public/projects/beaty-biodiversity-museum by filename.
// Keep semantic metadata here instead of relying on image metadata exported from design tools.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const beatyBiodiversityMuseumArchive = createEmptyArchiveCollection(
  "beaty-biodiversity-museum",
  "Archive for Beaty Biodiversity Museum",
  "Archive for Beaty Biodiversity Museum"
);

beatyBiodiversityMuseumArchive.items = [
  {
    file: "covers/Big-Blue-lights-3-scaled.avif",
    kind: "cover",
    title: localized("Beaty archive cover", "Beaty 档案封面"),
    caption: localized("Cover image for the Beaty archive collection.", "Beaty 档案集合的封面图。"),
    featured: true,
    order: 0
  },
  {
    file: "report/beaty-annual-report-spread.avif",
    kind: "report",
    title: localized("Beaty annual report archive spread", "Beaty 年度报告档案版面"),
    caption: localized(
      "Spread from the 2022–2023 annual report.",
      "2022–2023 年度报告版面。"
    ),
    publishedUrl: "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf",
    order: 10
  },
  {
    file: "booklet/beaty-visitor-guide-cn.avif",
    kind: "booklet",
    title: localized("Visitor guide (Chinese edition)", "访客指南（中文版）"),
    caption: localized(
      "Chinese-language visitor guide prepared for museum visitors.",
      "为博物馆访客准备的中文版参观指南。"
    ),
    publishedUrl: "https://explore.beatymuseum.ubc.ca/assets/guides/visitorguide-CN.pdf",
    order: 11
  },
  {
    file: "video/youtube-HaaFUnupWOM.avif",
    kind: "video",
    title: localized("Tulip tree | Liriodendron tulipifera", "Tulip tree | Liriodendron tulipifera"),
    caption: localized(
      "Martin Henry shows how to identify different species of trees around UBC.",
      "Martin Henry 介绍如何辨认 UBC 校园周边的不同树种。"
    ),
    publishedUrl: "https://youtu.be/HaaFUnupWOM",
    order: 100
  },
  {
    file: "video/youtube-hAw-MQBdgIk.avif",
    kind: "video",
    title: localized(
      "Apicomplexans - Ina Na | Researchers Revealed - UBC",
      "Apicomplexans - Ina Na | Researchers Revealed - UBC"
    ),
    caption: localized(
      "PhD candidate Ina Na explores the hidden world of parasitic apicomplexans through microscopy and bioinformatics.",
      "博士候选人 Ina Na 通过显微技术和生物信息学带观众认识寄生性顶复门生物的隐秘世界。"
    ),
    publishedUrl: "https://youtu.be/hAw-MQBdgIk",
    order: 101
  },
  {
    file: "video/youtube-wELwGJ1fM50.avif",
    kind: "video",
    title: localized(
      "Jacelyn Shu - Visual Communication | Researchers Revealed, Beaty Biodiversity Museum, UBC",
      "Jacelyn Shu - Visual Communication | Researchers Revealed, Beaty Biodiversity Museum, UBC"
    ),
    caption: localized(
      "Jacelyn Shu shares how scientific illustration helps researchers communicate their work at UBC.",
      "Jacelyn Shu 分享科学插画如何帮助 UBC 研究者更清晰地传达他们的工作。"
    ),
    publishedUrl: "https://youtu.be/wELwGJ1fM50",
    order: 102
  },
  {
    file: "video/youtube-wwMFyMqo19M.avif",
    kind: "video",
    title: localized(
      "Digitization of the Beaty with the Museums Assistance Program | Researchers Revealed - UBC",
      "Digitization of the Beaty with the Museums Assistance Program | Researchers Revealed - UBC"
    ),
    caption: localized(
      "Find out how a natural history collection is digitized at the Beaty Biodiversity Museum, including 3D scanning and collection database work.",
      "介绍 Beaty Biodiversity Museum 如何进行自然历史馆藏数字化，包括 3D 扫描和馆藏数据库整理。"
    ),
    publishedUrl: "https://youtu.be/wwMFyMqo19M",
    order: 103
  }
];
