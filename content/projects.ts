import type { Locale, LocalizedText, ProjectItem } from "@/types/content";
import { getLocalizedText, localized } from "@/lib/i18n";
import { beatyBiodiversityMuseumArchive } from "@/content/archives/beaty-biodiversity-museum";
import { bcAiEcosystemArchive } from "@/content/archives/bc-ai-ecosystem";
import { theUpgradeAiArchive } from "@/content/archives/theupgrade-ai";
import { fraudFilmDetails, gourdFilmDetails, thePillsFilmDetails } from "@/content/film-data";
import { getArchiveCoverItem, getArchiveFilePath } from "@/lib/archives";

export { projectSectionContent } from "@/content/project-section";

export const projectDetailContent = {
  backLabel: localized("Back to projects", "返回项目列表"),
  highlightsEyebrow: localized("Highlights", "亮点"),
  highlightsTitle: localized("Why it matters", "项目价值"),
  externalEyebrow: localized("Continue reading", "继续阅读"),
  externalHint: localized(
    "Opens the published article on an external site.",
    "将打开外部站点上的已发布文章。"
  ),
  publicationLabel: localized("Published in", "发表于"),
  externalDestinationLabel: localized("Destination", "访问目标"),
  materialsEyebrow: localized("Project Materials", "项目材料"),
  materialsTitle: localized("Archives", "档案墙"),
  staticWorksTitle: localized("Print / Editorial / Static Works", "印刷 / 编辑 / 静态作品"),
  videoWorksTitle: localized("Video Works", "视频作品"),
  photoCreditLabel: localized("Photo credit", "图片致谢"),
  previewLabel: localized("Preview", "预览"),
  previewDialogLabel: localized("Image preview", "图片预览"),
  closePreviewLabel: localized("Close preview", "关闭预览"),
  nextPreviewLabel: localized("Next image", "下一张"),
  previousPreviewLabel: localized("Previous image", "上一张"),
  openResourceLabel: localized("Open resource", "打开资源"),
  watchOnYouTubeLabel: localized("Watch on YouTube", "前往 YouTube 观看"),
  castAndCrewTitle: localized("Cast and Crew", "演职人员"),
  stillsTitle: localized("Stills", "剧照"),
  postersTitle: localized("Posters", "海报")
};

const beatyCover = getArchiveCoverItem(beatyBiodiversityMuseumArchive);
const bcAiCover = getArchiveCoverItem(bcAiEcosystemArchive);
const theUpgradeCover = getArchiveCoverItem(theUpgradeAiArchive);

export const projects: ProjectItem[] = [
  {
    slug: "beaty-biodiversity-museum-annual-report-2022-2023",
    archiveGroup: "beaty-biodiversity-museum",
    title: localized("Archive for Beaty Biodiversity Museum", "Beaty Biodiversity Museum 档案"),
    code: "[EDITORIAL-01]",
    posterWord: "BEATY",
    category: localized("Client", "客户"),
    year: "2023",
    projectType: localized("Client work", "客户项目"),
    duration: localized("2022–2023", "2022–2023"),
    coverLabel: localized("Annual report, signage & booklets", "年报、导视与手册"),
    coverPalette: ["#091520", "#173c58", "#d2e8ff"],
    coverImage: beatyCover
      ? getArchiveFilePath("beaty-biodiversity-museum", beatyCover.file)
      : "/projects/client-work/beaty-biodiversity-museum/report/legacy-annual-report.jpeg",
    coverAlt: beatyCover?.title ?? localized(
      "Cover preview of the Beaty museum archive collection",
      "Beaty 博物馆档案集合封面预览"
    ),
    teaser: localized(
      "Booklet, signage, report, and video work for the Beaty Biodiversity Museum.",
      "为 Beaty Biodiversity Museum 制作的册页、导视、报告与视频。"
    ),
    summary: localized(
      "Booklets, signage, annual report layouts, and video work created for the Beaty Biodiversity Museum.",
      "为 Beaty Biodiversity Museum 制作的手册、标识、年度报告版式与视频。"
    ),
    roles: localized(
      ["Graphic Design", "Editorial Layout"],
      ["平面设计", "编辑版式"]
    ),
    highlights: localized([], []),
    externalLinks: [
      {
        label: localized("Web Version", "网页版"),
        href: "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
      }
    ],
    media: []
  },
  {
    slug: "transcending-barriers",
    detailLayout: "external-handoff",
    title: localized(
      'Transcending Barriers: Viewing Practices of "Games of Thrones" in China, India, and Russia',
      'Transcending Barriers: Viewing Practices of "Games of Thrones" in China, India, and Russia'
    ),
    code: "[RESEARCH-01]",
    posterWord: "BARRIERS",
    category: localized("Writing", "写作"),
    year: "2024",
    projectType: localized("Published Article", "已发表文章"),
    duration: localized("Beacon: Journal of Media Studies", "Beacon: Journal of Media Studies"),
    coverLabel: localized("Research / Publication", "研究 / 出版"),
    coverPalette: ["#121515", "#46595b", "#dfe9ea"],
    coverImage: "",
    coverAlt: localized(
      "Article cover for Transcending Barriers publication",
      "《跨越边界》文章封面图"
    ),
    teaser: localized(
      "Published piece on transnational viewing practices and media circulation.",
      "关于跨国观看实践与媒介流通的已发表研究文章。"
    ),
    summary: localized(
      "Examines how audiences in China, India, and Russia engaged with Game of Thrones across different media environments.",
      "讨论中国、印度与俄罗斯观众如何在不同媒介环境中观看《权力的游戏》。"
    ),
    roles: localized(["Research", "Writing", "Publication"], ["研究", "写作", "出版"]),
    highlights: localized([], []),
    externalLinks: [
      {
        label: localized("Read on Beacon", "前往 Beacon 阅读"),
        href: "https://beaconjournal.arts.ubc.ca/transcending-barriers-viewing-practices-of-games-of-thrones-in-china-india-and-russia/"
      }
    ],
    media: []
  },
  {
    slug: "fraud",
    film: fraudFilmDetails,
    title: localized("FRAÜD", "信途"),
    code: "[FILM-01]",
    posterWord: "FRAUD",
    category: localized("Film", "电影"),
    year: "2024",
    projectType: localized("Narrative Film", "剧情短片"),
    duration: localized("Short Film / Drama", "短片 / 剧情"),
    coverLabel: localized("Film / Narrative", "电影 / 叙事"),
    coverPalette: ["#140f12", "#5f2533", "#f0d6d0"],
    coverImage: "/projects/film-video/film/fraud/cover.avif",
    coverAlt: localized("FRAÜD cover frame", "《信途》封面画面"),
    teaser: localized(
      "Short drama about debt, manipulation, and fraud among international students.",
      "围绕债务、操控与国际学生欺诈展开的剧情短片。"
    ),
    summary: localized(
      "Facing debt and manipulation from their senior in academia, two international students are pushed toward financial fraud and the fallout that follows.",
      "面对学术体系中学姐的债务压迫与操控，两名国际学生一步步被推向金融欺诈，以及随之而来的后果。"
    ),
    roles: localized(["Direction", "Writing", "Editing"], ["导演", "编剧", "剪辑"]),
    highlights: localized(
      [
        "Builds pressure through academic debt, coercion, and social precarity rather than spectacle.",
        "Holds the moral tension close to the characters through a concentrated short-film runtime."
      ],
      ["不是靠奇观，而是通过债务、操控与现实处境逐步积累压力。", "在短片长度内把道德困境紧贴角色展开。"]
    ),
    externalLinks: [
      { label: localized("IMDb", "IMDb"), href: "https://www.imdb.com/title/tt32035504/" },
      { label: localized("Douban", "豆瓣"), href: "https://movie.douban.com/subject/36934977/" },
      { label: localized("FilmFreeway", "FilmFreeway"), href: "https://filmfreeway.com/fraudmovie" }
    ],
    media: []
  },
  {
    slug: "the-pills",
    film: thePillsFilmDetails,
    title: localized("The Pills", "药丸"),
    code: "[FILM-02]",
    posterWord: "PILLS",
    category: localized("Film", "电影"),
    year: "2023",
    projectType: localized("Horror Microfilm", "惊悚微电影"),
    duration: localized("Microfilm / Horror", "微电影 / 惊悚"),
    coverLabel: localized("Microfilm / Horror", "微电影 / 惊悚"),
    coverPalette: ["#0e0e10", "#60313e", "#f1d5db"],
    coverImage: "/projects/film-video/film/the-pills/cover.avif",
    coverAlt: localized("The Pills cover frame", "《药丸》封面画面"),
    teaser: localized(
      "Short horror microfilm built around a medicine-fueled nightmare setup.",
      "围绕药物失控设定展开的惊悚微电影。"
    ),
    summary: localized(
      "When his medication stops working, a man in a dental office is unexpectedly tormented by terrifying hallucinations.",
      "以类型片氛围、压缩式悬念推进与紧凑视觉叙事为核心的惊悚微电影。"
    ),
    roles: localized(["Direction", "Writing", "Editing"], ["导演", "编剧", "剪辑"]),
    highlights: localized(
      [
        "Uses a compressed runtime to establish dread quickly through genre framing.",
        "Builds its horror tone around the bodily unease of a routine clinic visit."
      ],
      ["在极短时长内快速建立惊悚气氛。", "把恐惧感建立在日常诊所场景与身体不适之上。"]
    ),
    externalLinks: [
      { label: localized("IMDb", "IMDb"), href: "https://www.imdb.com/title/tt35674862/" },
      { label: localized("Douban", "豆瓣"), href: "https://movie.douban.com/subject/37235581/" },
      { label: localized("FilmFreeway", "FilmFreeway"), href: "https://filmfreeway.com/thepillsmovie" }
    ],
    media: []
  },
  {
    slug: "gourd",
    film: gourdFilmDetails,
    title: localized("Gourd", "清兵卫"),
    code: "[FILM-03]",
    posterWord: "GOURD",
    category: localized("Film", "电影"),
    year: "2020",
    projectType: localized("Short Film", "短片"),
    duration: localized("Student Film", "学生短片"),
    coverLabel: localized("Film / Short", "电影 / 短片"),
    coverPalette: ["#0f1011", "#2d2c26", "#d9ceb8"],
    coverImage: "/projects/film-video/film/gourd/stills/still-gourd-01.avif",
    coverAlt: localized("Frame from Gourd", "《清兵卫》剧照"),
    teaser: localized(
      "Early short film project centered on a young ensemble and a spare, atmospheric setup.",
      "早期短片项目，以年轻群像和克制氛围为核心。"
    ),
    summary: localized(
      'A short film made in high school, loosely adapted from "The Artist" by Shiga Naoya.',
      "高中拍摄的微电影，松散地改编自志贺直哉《清兵卫和葫芦》"
    ),
    detailSummary: localized(
      [
        { type: "text", text: 'A short film made in high school, loosely adapted from "' },
        {
          type: "link",
          text: "The Artist",
          href: "https://en.wikisource.org/wiki/Modern_Japanese_Stories/The_Artist"
        },
        { type: "text", text: '" by Shiga Naoya.' }
      ],
      [
        { type: "text", text: "高中拍摄的微电影，松散地改编自志贺直哉" },
        {
          type: "link",
          text: "《清兵卫和葫芦》",
          href: "https://ja.wikipedia.org/wiki/%E6%B8%85%E5%85%B5%E8%A1%9B%E3%81%A8%E7%93%A2%E7%AE%AA"
        }
      ]
    ),
    roles: localized(["Direction", "Writing", "Editing"], ["导演", "编剧", "剪辑"]),
    highlights: localized(
      [
        "Spare mise-en-scène, foregrounding performance and atmosphere.",
        "An earlier piece — before the later festival short films."
      ],
      ["克制的场面调度，注意力集中在表演与气氛上。", "更早期的作品，拍于后续电影节短片之前。"]
    ),
    externalLinks: [
      { label: localized("IMDb", "IMDb"), href: "https://www.imdb.com/title/tt35677249/" },
      { label: localized("FilmFreeway", "FilmFreeway"), href: "https://filmfreeway.com/GOURD" }
    ],
    media: []
  },
  {
    slug: "commissioned-video-work",
    archiveGroup: "film-video",
    title: localized("Commissioned Video Work", "委托视频项目"),
    code: "[VIDEO-01]",
    posterWord: "CLIENT",
    category: localized("Video", "视频"),
    year: "2026",
    projectType: localized("Commissioned video", "委托视频"),
    duration: localized("YouTube & event edits", "YouTube 与活动剪辑"),
    coverLabel: localized("Event recaps & promo edits", "活动回顾与宣传剪辑"),
    coverPalette: ["#0a0d14", "#24324f", "#dae7ff"],
    coverImage: "/projects/film-video/video/youtube-WlLGuSej0Yg.avif",
    coverAlt: localized(
      "Commissioned video archive cover",
      "委托视频档案封面"
    ),
    teaser: localized(
      "Video projects created on commission.",
      "受委托制作的视频项目。"
    ),
    summary: localized(
      "Video projects created on commission — event recaps, promotional content, and more.",
      "受委托制作的视频项目，包括活动回顾、宣传内容等。"
    ),
    roles: localized(
      ["Video Editing", "Motion Graphics"],
      ["视频剪辑", "动态图形"]
    ),
    highlights: localized([], []),
    externalLinks: [],
    media: []
  },
  {
    slug: "personal-video-projects",
    archiveGroup: "personal-video",
    title: localized("Personal Video Projects", "个人视频项目"),
    code: "[VIDEO-02]",
    posterWord: "PERSONAL",
    category: localized("Video", "视频"),
    year: "2026",
    projectType: localized("Personal video", "个人视频"),
    duration: localized("YouTube uploads", "YouTube 发布"),
    coverLabel: localized("Campaign edits & short experiments", "宣传剪辑与短片实验"),
    coverPalette: ["#0e1014", "#2b3d5d", "#d8e3f8"],
    coverImage: "/projects/personal-video/video/persona-5-style-campaign-video-cover.avif",
    coverAlt: localized(
      "Personal video archive cover",
      "个人视频档案封面"
    ),
    teaser: localized(
      "Personal video work — campaign edits, short films, and experiments.",
      "个人视频作品，包括宣传片剪辑、短片与实验性项目。"
    ),
    summary: localized(
      "Personal video projects, from stylized campaign edits to short-form experiments.",
      "个人视频项目，从风格化宣传片剪辑到短片实验。"
    ),
    roles: localized(
      ["Video Editing", "Concept Development"],
      ["视频剪辑", "概念开发"]
    ),
    highlights: localized([], []),
    externalLinks: [],
    media: []
  },
  {
    slug: "designs-for-bc-ai-ecosystem",
    archiveGroup: "bc-ai-ecosystem",
    title: localized("Archive for BC + AI Ecosystem", "BC + AI Ecosystem 档案"),
    code: "[DESIGN-01]",
    posterWord: "BCAI",
    category: localized("Client", "客户"),
    year: "2026",
    projectType: localized("Client work", "客户项目"),
    duration: localized("Meetups & talks", "聚会与分享活动"),
    coverLabel: localized("Meetup graphics & event photos", "聚会视觉与活动摄影"),
    coverPalette: ["#0b0f16", "#6f1a28", "#f2d7d4"],
    coverImage: bcAiCover
      ? getArchiveFilePath(bcAiEcosystemArchive.group, bcAiCover.file)
      : "/projects/client-work/bc-ai-ecosystem/covers/legacy-portfolio.png",
    coverAlt: bcAiCover?.title ?? localized(
      "Preview image for the BC plus AI Ecosystem archive collection",
      "BC + AI Ecosystem 档案集合预览图"
    ),
    teaser: localized(
      "Social graphics, slides, event photos, and design work for BC + AI Ecosystem.",
      "为 BC + AI Ecosystem 制作的社交图片、幻灯片、活动照片与设计作品。"
    ),
    summary: localized(
      "Design work for BC + AI Ecosystem — meetup graphics, presentation slides, social assets, and event documentation.",
      "BC + AI Ecosystem 的设计工作，包括线下聚会视觉、演示文稿、社交图片与活动记录。"
    ),
    roles: localized(
      ["Graphic Design", "Visual System"],
      ["平面设计", "视觉系统"]
    ),
    highlights: localized([], []),
    externalLinks: [],
    media: []
  },
  {
    slug: "designs-for-theupgrade-ai",
    archiveGroup: "theupgrade-ai",
    title: localized("Archive for TheUpgrade.AI", "TheUpgrade.AI 档案"),
    code: "[DESIGN-02]",
    posterWord: "UPGRADE",
    category: localized("Client", "客户"),
    year: "2026",
    projectType: localized("Client work", "客户项目"),
    duration: localized("Brand launch", "品牌发布"),
    coverLabel: localized("Posters & social graphics", "海报与社交视觉"),
    coverPalette: ["#0c0f12", "#421728", "#e8d8db"],
    coverImage: theUpgradeCover
      ? getArchiveFilePath(theUpgradeAiArchive.group, theUpgradeCover.file)
      : "/projects/client-work/theupgrade-ai/covers/meet-our-team.png",
    coverAlt: theUpgradeCover?.title ?? localized(
      "Preview image for TheUpgrade.AI archive collection",
      "TheUpgrade.AI 档案集合预览图"
    ),
    teaser: localized(
      "Posters, social graphics, and brand visuals for TheUpgrade.AI.",
      "为 TheUpgrade.AI 制作的海报、社交图片与品牌视觉。"
    ),
    summary: localized(
      "Visual work for TheUpgrade.AI — posters, social graphics, and branded launch materials.",
      "TheUpgrade.AI 的视觉设计，包括海报、社交图片与品牌发布物料。"
    ),
    roles: localized(
      ["Graphic Design", "Content Design"],
      ["平面设计", "内容设计"]
    ),
    highlights: localized([], []),
    externalLinks: [],
    media: []
  }
];

export function projectLabel(text: LocalizedText, locale: Locale) {
  return getLocalizedText(text, locale);
}
