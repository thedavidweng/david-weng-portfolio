// Use this collection to map files from public/projects/bc-ai-ecosystem by filename.
// Keep semantic metadata here instead of relying on image metadata exported from Canva.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const bcAiEcosystemArchive = createEmptyArchiveCollection(
  "bc-ai-ecosystem",
  "Designs for BC + AI Ecosystem",
  "Designs for BC + AI Ecosystem"
);

bcAiEcosystemArchive.defaultCredits = {
  "event-photo": {
    label: localized("Michelle Diamond", "Michelle Diamond"),
    href: "https://www.instagram.com/diamondsedgephotography/"
  }
};

bcAiEcosystemArchive.items = [
  {
    file: "covers/cover-bcai-apr-26-speaker.png",
    kind: "cover",
    title: localized("April speaker graphic", "April speaker graphic"),
    caption: localized(
      "A widescreen meetup visual used as the collection cover.",
      "作为该集合页封面的横版 meetup 视觉。"
    ),
    featured: true,
    order: 0
  },
  {
    file: "slides/slide-bcai-apr-26-meetup-deck.png",
    kind: "slide",
    title: localized("April meetup slides", "April meetup slides"),
    caption: localized("Selected deck page from the April meetup.", "四月 meetup 演示文稿中的精选页面。"),
    order: 10
  },
  {
    file: "slides/slide-bcai-nov-20-meetup-graphics.png",
    kind: "slide",
    title: localized("November meetup graphics deck", "November meetup graphics deck"),
    caption: localized(
      "A presentation page used to introduce November meetup graphics.",
      "用于展示十一月 meetup 视觉的演示页面。"
    ),
    order: 11
  },
  {
    file: "slides/slide-bcai-nov-26-slide-deck.png",
    kind: "slide",
    title: localized("November 26 slide deck", "November 26 slide deck"),
    caption: localized("Selected presentation page from the November 26 event.", "11 月 26 日活动演示文稿中的精选页面。"),
    order: 12
  },
  {
    file: "square/square-bcai-nov-25-speaker.png",
    kind: "square",
    title: localized("November speaker graphic", "November speaker graphic"),
    caption: localized("Square-format speaker announcement artwork.", "方形讲者宣传视觉。"),
    order: 20
  },
  {
    file: "square/square-bcai-jan-26-01.png",
    kind: "square",
    title: localized("January campaign square 01", "January campaign square 01"),
    caption: localized("Square social graphic from the January campaign set.", "一月活动视觉中的方形社交图片。"),
    order: 21
  },
  {
    file: "square/square-bcai-jan-26-07.png",
    kind: "square",
    title: localized("January campaign square 07", "January campaign square 07"),
    caption: localized("Square social graphic from the January campaign set.", "一月活动视觉中的方形社交图片。"),
    order: 22
  },
  {
    file: "square/square-bcai-jan-26-09.png",
    kind: "square",
    title: localized("January campaign square 09", "January campaign square 09"),
    caption: localized("Square social graphic from the January campaign set.", "一月活动视觉中的方形社交图片。"),
    order: 23
  },
  {
    file: "square/square-bcai-jan-26-14.png",
    kind: "square",
    title: localized("January campaign square 14", "January campaign square 14"),
    caption: localized("Square social graphic from the January campaign set.", "一月活动视觉中的方形社交图片。"),
    order: 24
  },
  {
    file: "square/square-bcai-jan-26-15.png",
    kind: "square",
    title: localized("January campaign square 15", "January campaign square 15"),
    caption: localized("Square social graphic from the January campaign set.", "一月活动视觉中的方形社交图片。"),
    order: 25
  },
  {
    file: "event-photos/event-bcai-2026-01-michelle-diamond-267.jpg",
    kind: "event-photo",
    title: localized("January meetup event photo", "一月 meetup 活动照片"),
    caption: localized("Event documentation from the January BC + AI meetup.", "BC + AI 一月 meetup 的活动现场记录。"),
    order: 30
  },
  {
    file: "event-photos/event-bcai-2025-11-michelle-diamond-155.jpg",
    kind: "event-photo",
    title: localized("November meetup event photo 01", "十一月 meetup 活动照片 01"),
    caption: localized("Event documentation from the November BC + AI meetup.", "BC + AI 十一月 meetup 的活动现场记录。"),
    order: 31
  },
  {
    file: "event-photos/event-bcai-2025-11-michelle-diamond-161.jpg",
    kind: "event-photo",
    title: localized("November meetup event photo 02", "十一月 meetup 活动照片 02"),
    caption: localized("Event documentation from the November BC + AI meetup.", "BC + AI 十一月 meetup 的活动现场记录。"),
    order: 32
  },
  {
    file: "event-photos/event-bcai-2025-11-michelle-diamond-178.jpg",
    kind: "event-photo",
    title: localized("November meetup event photo 03", "十一月 meetup 活动照片 03"),
    caption: localized("Event documentation from the November BC + AI meetup.", "BC + AI 十一月 meetup 的活动现场记录。"),
    order: 33
  },
  {
    file: "thumbs/youtube-ZN-IywZzAp0.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (ZN-IywZzAp0)", "YouTube 缩略图 (ZN-IywZzAp0)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/ZN-IywZzAp0",
    order: 40
  },
  {
    file: "thumbs/youtube-AXYZZ_P218Q.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (AXYZZ_P218Q)", "YouTube 缩略图 (AXYZZ_P218Q)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/AXYZZ_P218Q",
    order: 41
  },
  {
    file: "thumbs/youtube-boAPl6_OZks.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (boAPl6_OZks)", "YouTube 缩略图 (boAPl6_OZks)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/boAPl6_OZks",
    order: 42
  },
  {
    file: "thumbs/youtube-SM69zw8Q79E.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (SM69zw8Q79E)", "YouTube 缩略图 (SM69zw8Q79E)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/SM69zw8Q79E",
    order: 43
  },
  {
    file: "thumbs/youtube-wjc1-bnjU4s.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (wjc1-bnjU4s)", "YouTube 缩略图 (wjc1-bnjU4s)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/wjc1-bnjU4s",
    order: 44
  },
  {
    file: "thumbs/youtube-nb61rAIMQhU.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (nb61rAIMQhU)", "YouTube 缩略图 (nb61rAIMQhU)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/nb61rAIMQhU",
    order: 45
  },
  {
    file: "thumbs/youtube-RUGucjG76Y0.png",
    kind: "thumb",
    title: localized("YouTube thumbnail (RUGucjG76Y0)", "YouTube 缩略图 (RUGucjG76Y0)"),
    caption: localized("Compact supporting visual from the archive.", "档案中的紧凑辅助视觉。"),
    publishedUrl: "https://youtu.be/RUGucjG76Y0",
    order: 46
  }
];
