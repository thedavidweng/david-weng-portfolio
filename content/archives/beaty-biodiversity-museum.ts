// Use this collection to map files from public/projects/beaty-biodiversity-museum by filename.
// Keep semantic metadata here instead of relying on image metadata exported from design tools.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const beatyBiodiversityMuseumArchive = createEmptyArchiveCollection(
  "beaty-biodiversity-museum",
  "Designs for Beaty Biodiversity Museum",
  "Designs for Beaty Biodiversity Museum"
);

beatyBiodiversityMuseumArchive.items = [
  {
    file: "covers/beaty-archive-cover.jpeg",
    kind: "cover",
    title: localized("Beaty archive cover", "Beaty 档案封面"),
    caption: localized("Cover image for the Beaty design archive.", "Beaty 设计档案的封面图。"),
    featured: true,
    order: 0
  },
  {
    file: "report/beaty-annual-report-spread.jpeg",
    kind: "report",
    title: localized("Beaty annual report archive spread", "Beaty 年度报告档案版面"),
    caption: localized(
      "Initial report spread carried into the expanded Beaty archive.",
      "作为 Beaty 扩展档案起点保留下来的报告版面。"
    ),
    publishedUrl: "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf",
    order: 10
  }
];
