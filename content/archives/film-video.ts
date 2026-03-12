// Use this collection to map files from public/projects/film-video by filename.
// Keep semantic metadata here instead of relying on image metadata exported from Canva.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const filmVideoArchive = createEmptyArchiveCollection(
  "film-video",
  "Commissioned Video Work",
  "委托视频项目"
);

filmVideoArchive.items = [
  {
    file: "video/youtube-WlLGuSej0Yg.jpg",
    kind: "video",
    title: localized(
      "Notion 繁體中文版發布會 Traditional Chinese Launch Party",
      "Notion 繁體中文版發布會 Traditional Chinese Launch Party"
    ),
    caption: localized(
      "Event recap of Notion's Traditional Chinese launch party.",
      "Notion 繁体中文版发布会回顾。"
    ),
    publishedUrl: "https://youtu.be/WlLGuSej0Yg",
    order: 10
  },
  {
    file: "video/youtube-sn_P6wawBLk.jpeg",
    kind: "video",
    title: localized("Iris's Lain", "Iris's Lain"),
    caption: localized(
      "Serial Experiments Lain cosplay video and AMV.",
      "玲音 Cosplay & AMV"
    ),
    publishedUrl: "https://youtu.be/sn_P6wawBLk",
    order: 11
  }
];
