// Use this collection to map files from public/projects/theupgrade-ai by filename.
// Keep semantic metadata here instead of relying on image metadata exported from Canva.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const theUpgradeAiArchive = createEmptyArchiveCollection(
  "theupgrade-ai",
  "Archive for TheUpgrade.AI",
  "Archive for TheUpgrade.AI"
);

theUpgradeAiArchive.items = [
  {
    file: "covers/cover-theupgrade-meet-our-team.avif",
    kind: "cover",
    title: localized("Meet Our Team", "团队介绍"),
    caption: localized("Cover image for the TheUpgrade.AI archive.", "TheUpgrade.AI 档案封面。"),
    featured: true,
    order: 0
  },
  {
    file: "posters/poster-theupgrade-01.avif",
    kind: "poster",
    title: localized("Poster 01", "海报 01"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 10
  },
  {
    file: "posters/poster-theupgrade-02.avif",
    kind: "poster",
    title: localized("Poster 02", "海报 02"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 11
  },
  {
    file: "posters/poster-theupgrade-03.avif",
    kind: "poster",
    title: localized("Poster 03", "海报 03"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 12
  },
  {
    file: "posters/poster-theupgrade-04.avif",
    kind: "poster",
    title: localized("Poster 04", "海报 04"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 13
  },
  {
    file: "posters/poster-theupgrade-05.avif",
    kind: "poster",
    title: localized("Poster 05", "海报 05"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 14
  },
  {
    file: "posters/poster-theupgrade-06.avif",
    kind: "poster",
    title: localized("Poster 06", "海报 06"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 15
  },
  {
    file: "posters/poster-theupgrade-07.avif",
    kind: "poster",
    title: localized("Poster 07", "海报 07"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 16
  },
  {
    file: "posters/poster-theupgrade-08.avif",
    kind: "poster",
    title: localized("Poster 08 (alternate)", "海报 08（替代版）"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 17
  },
  {
    file: "posters/poster-theupgrade-09.avif",
    kind: "poster",
    title: localized("Poster 09", "海报 09"),
    caption: localized("Promotional poster for TheUpgrade.AI.", "TheUpgrade.AI 宣传海报。"),
    order: 18
  },
  {
    file: "posters/poster-theupgrade-course-thumb.avif",
    kind: "poster",
    title: localized("Course thumbnail", "课程缩略图"),
    caption: localized("Course promotional graphic.", "课程宣传图。"),
    order: 19
  },
  {
    file: "square/square-theupgrade-aisl.avif",
    kind: "square",
    title: localized("AISL graphic", "AISL 图片"),
    caption: localized("Social graphic for TheUpgrade.AI.", "TheUpgrade.AI 社交图片。"),
    order: 30
  },
  {
    file: "square/square-theupgrade-faster-sharper.avif",
    kind: "square",
    title: localized("Faster Sharper", "Faster Sharper"),
    caption: localized("Social graphic for TheUpgrade.AI.", "TheUpgrade.AI 社交图片。"),
    order: 31
  },
  {
    file: "square/square-theupgrade-linkedin-creative-professionals.avif",
    kind: "square",
    title: localized("LinkedIn: Creative Professionals", "LinkedIn：创意专业人士"),
    caption: localized("Social graphic for TheUpgrade.AI.", "TheUpgrade.AI 社交图片。"),
    order: 32
  },
  {
    file: "square/square-theupgrade-master-ai-shape-the-future.avif",
    kind: "square",
    title: localized("Master AI, Shape the Future", "Master AI, Shape the Future"),
    caption: localized("Social graphic for TheUpgrade.AI.", "TheUpgrade.AI 社交图片。"),
    order: 33
  },
  {
    file: "square/square-theupgrade-ode-quote.avif",
    kind: "square",
    title: localized("Ode quote", "Ode 引言"),
    caption: localized("Social graphic for TheUpgrade.AI.", "TheUpgrade.AI 社交图片。"),
    order: 34
  },
  {
    file: "square/square-theupgrade-future.avif",
    kind: "square",
    title: localized("Future", "Future"),
    caption: localized("Social graphic for TheUpgrade.AI.", "TheUpgrade.AI 社交图片。"),
    order: 35
  },
  {
    file: "square/square-theupgrade-meet-our-team.avif",
    kind: "square",
    title: localized("Meet Our Team (square)", "团队介绍（方形版）"),
    caption: localized("Team graphic for TheUpgrade.AI.", "TheUpgrade.AI 团队图片。"),
    order: 36
  }
];
