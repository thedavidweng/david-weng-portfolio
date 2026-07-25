import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const bcAiEcosystemArchive = createEmptyArchiveCollection(
  "bc-ai-ecosystem",
  "Archive for BC + AI Ecosystem",
  "Archive for BC + AI Ecosystem"
);

bcAiEcosystemArchive.defaultCredits = {
  "event-photo": {
    label: localized("Michelle Diamond", "Michelle Diamond"),
    href: "https://www.instagram.com/diamondsedgephotography/"
  }
};

bcAiEcosystemArchive.items = [
  {
    file: "covers/cover-bcai-apr-26-speaker.avif",
    kind: "cover",
    title: localized("April speaker graphic", "四月讲者视觉"),
    caption: localized(
      "Widescreen speaker graphic, used as the collection cover.",
      "横版讲者视觉，用作该集合的封面。"
    ),
    featured: true,
    order: 0
  },
  {
    file: "slides/slide-bcai-apr-26-meetup-deck.avif",
    kind: "slide",
    title: localized("April meetup slides", "四月线下聚会幻灯片"),
    caption: localized("From the April meetup presentation deck.", "四月线下聚会演示文稿。"),
    order: 10
  },
  {
    file: "slides/slide-bcai-nov-20-meetup-graphics.avif",
    kind: "slide",
    title: localized("November meetup graphics", "十一月线下聚会视觉"),
    caption: localized(
      "Graphics deck for the November meetup.",
      "十一月线下聚会视觉演示。"
    ),
    order: 11
  },
  {
    file: "slides/slide-bcai-nov-26-slide-deck.avif",
    kind: "slide",
    title: localized("November 26 slide deck", "11 月 26 日演示文稿"),
    caption: localized("From the November 26 event presentation.", "11 月 26 日活动演示文稿。"),
    order: 12
  },
  {
    file: "square/square-bcai-nov-25-speaker.avif",
    kind: "square",
    title: localized("November speaker graphic", "十一月讲者视觉"),
    caption: localized("Speaker announcement, square format.", "讲者宣传图，方形版式。"),
    order: 20
  },
  {
    file: "square/square-bcai-jan-26-01.avif",
    kind: "square",
    title: localized("January campaign 01", "一月宣传活动 01"),
    caption: localized("Social graphic from the January campaign.", "一月宣传活动社交图片。"),
    order: 21
  },
  {
    file: "square/square-bcai-jan-26-07.avif",
    kind: "square",
    title: localized("January campaign 07", "一月宣传活动 07"),
    caption: localized("Social graphic from the January campaign.", "一月宣传活动社交图片。"),
    order: 22
  },
  {
    file: "square/square-bcai-jan-26-09.avif",
    kind: "square",
    title: localized("January campaign 09", "一月宣传活动 09"),
    caption: localized("Social graphic from the January campaign.", "一月宣传活动社交图片。"),
    order: 23
  },
  {
    file: "square/square-bcai-jan-26-14.avif",
    kind: "square",
    title: localized("January campaign 14", "一月宣传活动 14"),
    caption: localized("Social graphic from the January campaign.", "一月宣传活动社交图片。"),
    order: 24
  },
  {
    file: "square/square-bcai-jan-26-15.avif",
    kind: "square",
    title: localized("January campaign 15", "一月宣传活动 15"),
    caption: localized("Social graphic from the January campaign.", "一月宣传活动社交图片。"),
    order: 25
  },
  {
    file: "event-photos/event-bcai-2026-01-michelle-diamond-267.avif",
    kind: "event-photo",
    title: localized("January meetup photo", "一月线下聚会照片"),
    caption: localized("From the January BC + AI meetup.", "BC + AI 一月线下聚会现场。"),
    order: 30
  },
  {
    file: "event-photos/event-bcai-2025-11-michelle-diamond-155.avif",
    kind: "event-photo",
    title: localized("November meetup photo 01", "十一月线下聚会照片 01"),
    caption: localized("From the November BC + AI meetup.", "BC + AI 十一月线下聚会现场。"),
    order: 31
  },
  {
    file: "event-photos/event-bcai-2025-11-michelle-diamond-161.avif",
    kind: "event-photo",
    title: localized("November meetup photo 02", "十一月线下聚会照片 02"),
    caption: localized("From the November BC + AI meetup.", "BC + AI 十一月线下聚会现场。"),
    order: 32
  },
  {
    file: "event-photos/event-bcai-2025-11-michelle-diamond-178.avif",
    kind: "event-photo",
    title: localized("November meetup photo 03", "十一月线下聚会照片 03"),
    caption: localized("From the November BC + AI meetup.", "BC + AI 十一月线下聚会现场。"),
    order: 33
  },
  {
    file: "thumbs/youtube-ZN-IywZzAp0.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/ZN-IywZzAp0",
    order: 40
  },
  {
    file: "thumbs/youtube-AXYZZ_P218Q.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/AXYZZ_P218Q",
    order: 41
  },
  {
    file: "thumbs/youtube-boAPl6_OZks.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/boAPl6_OZks",
    order: 42
  },
  {
    file: "thumbs/youtube-SM69zw8Q79E.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/SM69zw8Q79E",
    order: 43
  },
  {
    file: "thumbs/youtube-wjc1-bnjU4s.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/wjc1-bnjU4s",
    order: 44
  },
  {
    file: "thumbs/youtube-nb61rAIMQhU.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/nb61rAIMQhU",
    order: 45
  },
  {
    file: "thumbs/youtube-RUGucjG76Y0.avif",
    kind: "thumb",
    title: localized("YouTube thumbnail", "YouTube 缩略图"),
    caption: localized("Video thumbnail for BC + AI content.", "BC + AI 视频缩略图。"),
    publishedUrl: "https://youtu.be/RUGucjG76Y0",
    order: 46
  },
  {
    file: "square/square-bcai-apr-26-meetup-announcement.avif",
    kind: "square",
    title: localized("April meetup announcement", "四月线下聚会公告"),
    caption: localized(
      "Main announcement graphic for the April 29th Vancouver AI Community Meetup.",
      "4 月 29 日 Vancouver AI 社区聚会主公告图。"
    ),
    order: 50
  },
  {
    file: "square/square-bcai-apr-26-community-meetup.avif",
    kind: "square",
    title: localized("Vancouver AI community description", "Vancouver AI 社区简介"),
    caption: localized(
      "Community description graphic: what the Vancouver AI meetups are about.",
      "社区介绍图：Vancouver AI 聚会的定位与愿景。"
    ),
    order: 51
  },
  {
    file: "square/square-bcai-apr-26-hosts-aliza-noa.avif",
    kind: "square",
    title: localized("April hosts: Aliza & Noa", "四月主持人：Aliza & Noa"),
    caption: localized(
      "Host card for Aliza and Noa, April 29th meetup.",
      "4 月 29 日聚会主持人卡：Aliza 与 Noa。"
    ),
    order: 52
  },
  {
    file: "square/square-bcai-apr-26-speaker-martin-lopatka.avif",
    kind: "square",
    title: localized("April speaker: Martin Lopatka", "四月讲者：Martin Lopatka"),
    caption: localized(
      "Speaker card for Martin Lopatka (EPAM Systems), April 29th meetup.",
      "4 月 29 日聚会讲者卡：Martin Lopatka（EPAM Systems）。"
    ),
    order: 53
  },
  {
    file: "square/square-bcai-apr-26-speaker-sev-geraskin.avif",
    kind: "square",
    title: localized("April speaker: Sev Geraskin", "四月讲者：Sev Geraskin"),
    caption: localized(
      "Speaker card for Sev Geraskin, April 29th meetup.",
      "4 月 29 日聚会讲者卡：Sev Geraskin。"
    ),
    order: 54
  },
  {
    file: "square/square-bcai-recruit-2026-04-15-author.avif",
    kind: "square",
    title: localized("BC+AI open invitation", "BC+AI 公开邀请"),
    caption: localized(
      "Year-round open invitation graphic for the Vancouver AI community.",
      "Vancouver AI 社区全年通用公开邀请图。"
    ),
    order: 60
  },
  {
    file: "square/square-bcai-recruit-2026-04-15-demo.avif",
    kind: "square",
    title: localized("Recruit: Demo", "招募：Demo 演示"),
    caption: localized(
      "Year-round recruitment graphic for demo presenters: show your work, get feedback, find collaborators.",
      "全年招募 Demo 演示者：展示作品、获得反馈、寻找协作者。"
    ),
    order: 61
  },
  {
    file: "square/square-bcai-recruit-2026-04-15-get-involved.avif",
    kind: "square",
    title: localized("Get involved", "参与其中"),
    caption: localized(
      "Year-round call-to-action for volunteers, speakers, sponsors, and demos.",
      "全年号召志愿者、讲者、赞助商和 Demo 参与。"
    ),
    order: 62
  },
  {
    file: "square/square-bcai-recruit-2026-04-15-speaker.avif",
    kind: "square",
    title: localized("Recruit: Speaker", "招募：讲者"),
    caption: localized(
      "Year-round recruitment graphic for speakers: share ideas with the community.",
      "全年招募讲者：与社区分享你的想法。"
    ),
    order: 63
  },
  {
    file: "square/square-bcai-recruit-2026-04-15-sponsor.avif",
    kind: "square",
    title: localized("Recruit: Sponsor", "招募：赞助商"),
    caption: localized(
      "Year-round sponsorship recruitment: support grassroots AI community.",
      "全年招募赞助商：支持草根 AI 社区。"
    ),
    order: 64
  },
  {
    file: "square/square-bcai-recruit-2026-04-15-volunteer.avif",
    kind: "square",
    title: localized("Recruit: Volunteer", "招募：志愿者"),
    caption: localized(
      "Year-round volunteer recruitment for the BC+AI ecosystem.",
      "BC+AI 生态全年志愿者招募。"
    ),
    order: 65
  }
];
