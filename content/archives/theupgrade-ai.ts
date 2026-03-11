// Use this collection to map files from public/projects/theupgrade-ai by filename.
// Keep semantic metadata here instead of relying on image metadata exported from Canva.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const theUpgradeAiArchive = createEmptyArchiveCollection(
  "theupgrade-ai",
  "Designs for TheUpgrade.AI",
  "Designs for TheUpgrade.AI"
);

theUpgradeAiArchive.items = [
  {
    file: "covers/cover-theupgrade-meet-our-team.png",
    kind: "cover",
    title: localized("Meet our team cover", "Meet our team cover"),
    caption: localized("Primary cover image for the TheUpgrade.AI archive.", "TheUpgrade.AI 档案页的主封面。"),
    featured: true,
    order: 0
  },
  {
    file: "posters/poster-theupgrade-01.png",
    kind: "poster",
    title: localized("Poster graphic 01", "海报视觉 01"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 10
  },
  {
    file: "posters/poster-theupgrade-02.png",
    kind: "poster",
    title: localized("Poster graphic 03", "海报视觉 03"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 11
  },
  {
    file: "posters/poster-theupgrade-03.png",
    kind: "poster",
    title: localized("Poster graphic 04", "海报视觉 04"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 12
  },
  {
    file: "posters/poster-theupgrade-04.png",
    kind: "poster",
    title: localized("Poster graphic 05", "海报视觉 05"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 13
  },
  {
    file: "posters/poster-theupgrade-05.png",
    kind: "poster",
    title: localized("Poster graphic 06", "海报视觉 06"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 14
  },
  {
    file: "posters/poster-theupgrade-06.png",
    kind: "poster",
    title: localized("Poster graphic 06B", "海报视觉 06B"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 15
  },
  {
    file: "posters/poster-theupgrade-07.png",
    kind: "poster",
    title: localized("Poster graphic 07", "海报视觉 07"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 16
  },
  {
    file: "posters/poster-theupgrade-08.png",
    kind: "poster",
    title: localized("Poster graphic 07 alt", "海报视觉 07 替代版"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 17
  },
  {
    file: "posters/poster-theupgrade-09.png",
    kind: "poster",
    title: localized("Poster graphic 08", "海报视觉 08"),
    caption: localized("Poster-format visual from the TheUpgrade.AI archive.", "TheUpgrade.AI 档案中的海报视觉。"),
    order: 18
  },
  {
    file: "posters/poster-theupgrade-course-thumb.png",
    kind: "poster",
    title: localized("Course thumb graphic", "课程缩略图视觉"),
    caption: localized("Course-related campaign graphic from the archive.", "档案中的课程宣传视觉。"),
    order: 19
  },
  {
    file: "square/square-theupgrade-aisl.png",
    kind: "square",
    title: localized("AISL square graphic", "AISL 方形视觉"),
    caption: localized("Square-format social graphic for TheUpgrade.AI.", "TheUpgrade.AI 的方形社交视觉。"),
    order: 30
  },
  {
    file: "square/square-theupgrade-faster-sharper.png",
    kind: "square",
    title: localized("Faster Sharper graphic", "Faster Sharper graphic"),
    caption: localized("Square-format social graphic for TheUpgrade.AI.", "TheUpgrade.AI 的方形社交视觉。"),
    order: 31
  },
  {
    file: "square/square-theupgrade-linkedin-creative-professionals.png",
    kind: "square",
    title: localized("LinkedIn creative professionals post", "LinkedIn creative professionals post"),
    caption: localized("Square-format social graphic for TheUpgrade.AI.", "TheUpgrade.AI 的方形社交视觉。"),
    order: 32
  },
  {
    file: "square/square-theupgrade-master-ai-shape-the-future.png",
    kind: "square",
    title: localized("Master AI and Shape the Future", "Master AI and Shape the Future"),
    caption: localized("Square-format social graphic for TheUpgrade.AI.", "TheUpgrade.AI 的方形社交视觉。"),
    order: 33
  },
  {
    file: "square/square-theupgrade-ode-quote.png",
    kind: "square",
    title: localized("Ode quote graphic", "Ode quote graphic"),
    caption: localized("Square-format social graphic for TheUpgrade.AI.", "TheUpgrade.AI 的方形社交视觉。"),
    order: 34
  },
  {
    file: "square/square-theupgrade-future.png",
    kind: "square",
    title: localized("Future graphic", "Future graphic"),
    caption: localized("Square-format social graphic for TheUpgrade.AI.", "TheUpgrade.AI 的方形社交视觉。"),
    order: 35
  },
  {
    file: "square/square-theupgrade-meet-our-team.png",
    kind: "square",
    title: localized("Meet our team square", "Meet our team square"),
    caption: localized("Square-format team graphic for TheUpgrade.AI.", "TheUpgrade.AI 的团队方形视觉。"),
    order: 36
  }
];
