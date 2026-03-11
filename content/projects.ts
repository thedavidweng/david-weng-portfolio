import type { Locale, LocalizedText, ProjectItem } from "@/types/content";
import { getLocalizedText, localized } from "@/lib/i18n";
import { beatyBiodiversityMuseumArchive } from "@/content/archives/beaty-biodiversity-museum";
import { bcAiEcosystemArchive } from "@/content/archives/bc-ai-ecosystem";
import { theUpgradeAiArchive } from "@/content/archives/theupgrade-ai";
import { getArchiveCoverItem, getArchiveFilePath } from "@/lib/archives";

export const projectSectionContent = {
  eyebrow: localized("02 / Archive", "02 / 档案"),
  title: localized("Selected Projects", "精选项目"),
  description: localized(
    "Current work selection featuring design archives, published research, and video projects.",
    "当前作品精选，包含设计档案、已发表研究与视频项目。"
  ),
  filtersLabel: localized("Project filters", "项目筛选"),
  carouselLabel: localized("Selected projects carousel", "精选项目轮播"),
  previousLabel: localized("Previous projects", "上一组项目"),
  nextLabel: localized("Next projects", "下一组项目"),
  openItemLabel: localized("Open archive item", "打开项目档案"),
  allCategory: localized("All", "全部")
};

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
  photoCreditLabel: localized("Photo credit", "图片致谢"),
  previewLabel: localized("Preview", "预览"),
  previewDialogLabel: localized("Image preview", "图片预览"),
  closePreviewLabel: localized("Close preview", "关闭预览"),
  openResourceLabel: localized("Open resource", "打开资源")
};

const beatyCover = getArchiveCoverItem(beatyBiodiversityMuseumArchive);
const bcAiCover = getArchiveCoverItem(bcAiEcosystemArchive);
const theUpgradeCover = getArchiveCoverItem(theUpgradeAiArchive);

export const projects: ProjectItem[] = [
  {
    slug: "beaty-biodiversity-museum-annual-report-2022-2023",
    archiveGroup: "beaty-biodiversity-museum",
    title: localized("Designs for Beaty Biodiversity Museum", "Designs for Beaty Biodiversity Museum"),
    code: "[EDITORIAL-01]",
    posterWord: "BEATY",
    category: localized("Design", "设计"),
    year: "2023",
    projectType: localized("Design Archive", "设计档案"),
    duration: localized("Booklet / Signage / Report / Video", "册页 / 导视 / 报告 / 视频"),
    coverLabel: localized("Archive / Booklet / Signage / Report / Video", "档案 / 册页 / 导视 / 报告 / 视频"),
    coverPalette: ["#091520", "#173c58", "#d2e8ff"],
    coverImage: beatyCover
      ? getArchiveFilePath("beaty-biodiversity-museum", beatyCover.file)
      : "/projects/beaty-biodiversity-museum/report/legacy-annual-report.jpeg",
    coverAlt: beatyCover?.title ?? localized(
      "Cover preview of the Beaty museum design archive",
      "Beaty 博物馆设计档案封面预览"
    ),
    teaser: localized(
      "Museum design archive grouping booklet, signage, report, and video work into one record.",
      "持续扩展的博物馆设计档案，将册页、导视、报告与视频项目归入同一记录。"
    ),
    summary: localized(
      "Unified archive page for design work created for the Beaty Biodiversity Museum, structured to hold booklet pages, signage, annual report spreads, and video-related outputs in one place.",
      "为 Beaty Biodiversity Museum 设计产出建立的统一档案页，用来持续整理册页、导视、年度报告版面与视频相关成果。"
    ),
    roles: localized(
      ["Graphic Design", "Editorial Layout", "Archive Curation"],
      ["平面设计", "编辑版式", "档案整理"]
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
    code: "[RESEARCH-02]",
    posterWord: "BARRIERS",
    category: localized("Research", "研究"),
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
      "Publication in Beacon: Journal of Media Studies examining how audiences in China, India, and Russia engaged with Game of Thrones across different media environments.",
      "发表于《Beacon: Journal of Media Studies》，讨论中国、印度与俄罗斯观众如何在不同媒介环境中观看《权力的游戏》。"
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
    title: localized("FRAÜD", "FRAÜD"),
    code: "[FILM-04]",
    posterWord: "FRAUD",
    category: localized("Film / Video", "电影 / 视频"),
    year: "2024",
    projectType: localized("Narrative Film", "剧情短片"),
    duration: localized("Festival / Listing", "电影节 / 条目页面"),
    coverLabel: localized("Film / Narrative", "电影 / 叙事"),
    coverPalette: ["#140f12", "#5f2533", "#f0d6d0"],
    coverImage: "/projects/fraud/cover.jpg",
    coverAlt: localized("Poster art for FRAÜD", "FRAÜD 海报"),
    teaser: localized(
      "Film about fraud among international students.",
      "关于国际学生欺诈与压力的影片。"
    ),
    summary: localized(
      "Narrative film project centered on fraud and pressure among international students, developed with a tense social frame and direct dramatic stakes.",
      "围绕国际学生欺诈与压力展开的剧情片，以直接的戏剧冲突和紧张的社会语境推进叙事。"
    ),
    roles: localized(["Film", "Production", "Promotion"], ["电影制作", "制片", "宣传"]),
    highlights: localized(
      [
        "Builds pressure through a grounded social premise rather than spectacle.",
        "Frames migration anxiety and fraud through a concentrated narrative setup."
      ],
      ["不是靠奇观，而是通过贴近现实的社会处境逐步积累压力。", "以高度集中的叙事设定处理迁移焦虑与欺诈主题。"]
    ),
    externalLinks: [
      { label: localized("IMDb", "IMDb"), href: "https://www.imdb.com/title/tt32035504/" },
      { label: localized("Douban", "豆瓣"), href: "https://movie.douban.com/subject/36934977/" },
      { label: localized("FilmFreeway", "FilmFreeway"), href: "https://filmfreeway.com/fraudmovie" }
    ],
    media: [
      {
        type: "image",
        title: localized("Poster Artwork", "海报主视觉"),
        description: localized("Primary key art used to represent the film.", "用于代表影片的主海报。"),
        src: "/projects/fraud/cover.jpg",
        href: "https://filmfreeway.com/fraudmovie"
      }
    ]
  },
  {
    slug: "the-pills",
    title: localized("The Pills", "The Pills"),
    code: "[FILM-05]",
    posterWord: "PILLS",
    category: localized("Film / Video", "电影 / 视频"),
    year: "2023",
    projectType: localized("Horror Microfilm", "惊悚微电影"),
    duration: localized("Trailer / Festival", "预告 / 电影节"),
    coverLabel: localized("Microfilm / Horror", "微电影 / 惊悚"),
    coverPalette: ["#0e0e10", "#60313e", "#f1d5db"],
    coverImage: "/projects/the-pills/cover.jpg",
    coverAlt: localized("Poster for The Pills horror microfilm", "《The Pills》海报"),
    teaser: localized(
      "Horror microfilm inspired by the Scream series.",
      "受《惊声尖叫》系列启发的惊悚微电影。"
    ),
    summary: localized(
      "Short horror microfilm developed around genre mood, compressed suspense, and compact visual storytelling.",
      "以类型片氛围、压缩式悬念推进与紧凑视觉叙事为核心的惊悚微电影。"
    ),
    roles: localized(["Film", "Editing", "Promotion"], ["电影制作", "剪辑", "宣传"]),
    highlights: localized(
      [
        "Anchored in a strong genre reference point with a distinct horror tone.",
        "Uses tight pacing and controlled reveal to keep the setup immediate."
      ],
      ["在明确的类型片参考下建立出较强的惊悚氛围。", "通过紧凑节奏与信息控制让设定迅速成立。"]
    ),
    externalLinks: [
      { label: localized("FilmFreeway", "FilmFreeway"), href: "https://filmfreeway.com/thepills2023" },
      { label: localized("Launch Trailer", "上线预告"), href: "https://youtu.be/J0LGfoZQ-0Q" }
    ],
    media: [
      {
        type: "image",
        title: localized("Poster Artwork", "海报主视觉"),
        description: localized("Key art used for the public-facing film page.", "用于公开影片页面的主海报。"),
        src: "/projects/the-pills/cover.jpg",
        href: "https://filmfreeway.com/thepills2023"
      },
      {
        type: "video",
        title: localized("Horror Sequence", "惊悚片段"),
        description: localized(
          "Condensed sequence showing the microfilm's genre pacing and tonal setup.",
          "浓缩呈现这部微电影的类型节奏与氛围建立方式。"
        ),
        href: "https://youtu.be/J0LGfoZQ-0Q"
      }
    ]
  },
  {
    slug: "persona-5-style-campaign-video",
    title: localized("Persona 5 Style Campaign Video", "Persona 5 Style Campaign Video"),
    code: "[VIDEO-06]",
    posterWord: "P5",
    category: localized("Film / Video", "电影 / 视频"),
    year: "2023",
    projectType: localized("Video Piece", "视频作品"),
    duration: localized("Social / YouTube", "社交平台 / YouTube"),
    coverLabel: localized("Video / Editing / Motion Graphics", "视频 / 剪辑 / 动态图形"),
    coverPalette: ["#0d0d0f", "#8f1e27", "#f4dad6"],
    coverImage: "/projects/persona-5-style-campaign-video/cover.jpg",
    coverAlt: localized("Persona 5 style campaign video still", "Persona 5 风格竞选视频截图"),
    teaser: localized(
      "Stylized election campaign video for UBC CSSA 2023, drawing on Persona 5 aesthetics.",
      "为 UBC CSSA 2023 竞选制作的风格化视频，视觉上借鉴 Persona 5。"
    ),
    summary: localized(
      "Video piece produced for the UBC CSSA 2023 General Election, using a strong visual reference style to deliver a more distinctive social-first result.",
      "为 UBC CSSA 2023 General Election 制作的视频作品，以鲜明的视觉参考风格完成更具辨识度、面向社交传播的表达。"
    ),
    roles: localized(
      ["Video Editing", "Graphic Design", "Campaign Content"],
      ["视频剪辑", "平面设计", "竞选内容制作"]
    ),
    highlights: localized(
      [
        "Adapted an instantly recognizable style into a campaign context.",
        "Turns a borrowed pop reference into a sharper social-first campaign voice."
      ],
      ["将高度可识别的视觉风格转译到竞选传播语境中。", "把借用而来的流行文化视觉转成更鲜明的社交传播语气。"]
    ),
    externalLinks: [
      { label: localized("Watch on YouTube", "在 YouTube 观看"), href: "https://youtu.be/kdPPnUPtH-E" },
      { label: localized("Watch on BiliBili", "在 Bilibili 观看"), href: "https://www.bilibili.com/video/BV1uL411S7Da/" }
    ],
    media: [
      {
        type: "image",
        title: localized("Campaign Still", "宣传片画面"),
        description: localized("Still frame representing the campaign's graphic language.", "代表该宣传片视觉语言的画面截图。"),
        src: "/projects/persona-5-style-campaign-video/cover.jpg",
        href: "https://youtu.be/kdPPnUPtH-E"
      },
      {
        type: "video",
        title: localized("Campaign Video", "竞选视频"),
        description: localized(
          "Main cut of the campaign piece, focused on rhythm, graphic punch, and tone.",
          "这支竞选视频的主体成片，重点在节奏、图形冲击力与整体语气。"
        ),
        href: "https://youtu.be/kdPPnUPtH-E"
      }
    ]
  },
  {
    slug: "designs-for-bc-ai-ecosystem",
    archiveGroup: "bc-ai-ecosystem",
    title: localized("Designs for BC + AI Ecosystem", "Designs for BC + AI Ecosystem"),
    code: "[DESIGN-07]",
    posterWord: "BCAI",
    category: localized("Design", "设计"),
    year: "2026",
    projectType: localized("Design Archive", "设计档案"),
    duration: localized("Mixed Formats", "多种尺寸"),
    coverLabel: localized("Archive / Slides / Event Photos", "档案 / 幻灯片 / 活动照片"),
    coverPalette: ["#0b0f16", "#6f1a28", "#f2d7d4"],
    coverImage: bcAiCover
      ? getArchiveFilePath(bcAiEcosystemArchive.group, bcAiCover.file)
      : "/projects/bc-ai-ecosystem/covers/legacy-portfolio.png",
    coverAlt: bcAiCover?.title ?? localized(
      "Preview image for the BC plus AI Ecosystem design archive",
      "BC + AI Ecosystem 设计档案预览图"
    ),
    teaser: localized(
      "Expandable design archive for BC plus AI Ecosystem, structured for social graphics, slides, event imagery, and mixed-format visual work.",
      "为 BC + AI Ecosystem 准备的可扩展设计档案，用于整理社交视觉、幻灯片、活动照片与混合尺寸设计。"
    ),
    summary: localized(
      "Collection page for design work created across the BC plus AI ecosystem, spanning meetup graphics, slides, social assets, and event documentation.",
      "用于汇集 BC + AI Ecosystem 相关设计作品的集合页，涵盖 meetup 视觉、幻灯片、社交图片与活动记录。"
    ),
    roles: localized(
      ["Graphic Design", "Visual System", "Archive Curation"],
      ["平面设计", "视觉系统", "档案整理"]
    ),
    highlights: localized([], []),
    externalLinks: [],
    media: []
  },
  {
    slug: "designs-for-theupgrade-ai",
    archiveGroup: "theupgrade-ai",
    title: localized("Designs for TheUpgrade.AI", "Designs for TheUpgrade.AI"),
    code: "[DESIGN-08]",
    posterWord: "UPGRADE",
    category: localized("Design", "设计"),
    year: "2026",
    projectType: localized("Design Archive", "设计档案"),
    duration: localized("Mixed Formats", "多种尺寸"),
    coverLabel: localized("Archive / Brand Graphics / Posters", "档案 / 品牌视觉 / 海报"),
    coverPalette: ["#0c0f12", "#421728", "#e8d8db"],
    coverImage: theUpgradeCover
      ? getArchiveFilePath(theUpgradeAiArchive.group, theUpgradeCover.file)
      : "/projects/theupgrade-ai/covers/meet-our-team.png",
    coverAlt: theUpgradeCover?.title ?? localized(
      "Preview image for TheUpgrade.AI design archive",
      "TheUpgrade.AI 设计档案预览图"
    ),
    teaser: localized(
      "Dedicated archive page for TheUpgrade.AI design output, ready for branding, square graphics, presentation slides, and launch materials.",
      "专门为 TheUpgrade.AI 设计产出准备的档案页，可继续承载品牌视觉、方形图片、演示文稿与上线素材。"
    ),
    summary: localized(
      "Collection page for visual work made for TheUpgrade.AI, spanning posters, social graphics, and branded launch visuals.",
      "用于整理 TheUpgrade.AI 视觉设计作品的集合页，涵盖海报、社交图片与品牌发布视觉。"
    ),
    roles: localized(
      ["Graphic Design", "Content Design", "Archive Curation"],
      ["平面设计", "内容设计", "档案整理"]
    ),
    highlights: localized([], []),
    externalLinks: [],
    media: []
  },
  {
    slug: "project-race",
    title: localized("Project Race", "Project Race"),
    code: "[FILM-09]",
    posterWord: "RACE",
    category: localized("Film / Video", "电影 / 视频"),
    year: "2023",
    projectType: localized("Toy Car Race Short", "玩具车竞速短片"),
    duration: localized("Short Video", "短视频"),
    coverLabel: localized("Short / Experimental Play", "短片 / 实验性创作"),
    coverPalette: ["#101216", "#1b3d67", "#dce9fa"],
    coverImage: "/projects/project-race/cover.jpg",
    coverAlt: localized("Frame from Project Race toy car race short", "Project Race 画面截图"),
    teaser: localized(
      "Toy car race short built around miniature motion, pace, and playful visual construction.",
      "围绕微缩运动、节奏与趣味视觉构建的玩具车竞速短片。"
    ),
    summary: localized(
      "Compact short-form video project built around a toy car race concept, emphasizing movement, playful framing, and accessible web distribution.",
      "以玩具车竞速为概念的短视频项目，强调运动感、趣味性构图与适合网络传播的轻量表达。"
    ),
    roles: localized(["Video Editing", "Short-form Production"], ["视频剪辑", "短片制作"]),
    highlights: localized(
      [
        "Shows hands-on experimentation with pace, framing, and miniature action.",
        "Leans into play, motion, and scale illusion rather than narrative complexity."
      ],
      ["展示了在节奏、构图与微缩动作表达上的动手实验。", "重点在玩具尺度、运动感与趣味表达，而不是复杂剧情。"]
    ),
    externalLinks: [
      { label: localized("Watch on YouTube", "在 YouTube 观看"), href: "https://youtu.be/i64iXe_CPfw/" },
      { label: localized("Watch on BiliBili", "在 Bilibili 观看"), href: "https://www.bilibili.com/video/BV1PM411q7hA/" }
    ],
    media: [
      {
        type: "image",
        title: localized("Project Still", "项目画面"),
        description: localized("Representative frame from the short.", "短片中的代表性画面。"),
        src: "/projects/project-race/cover.jpg",
        href: "https://youtu.be/i64iXe_CPfw/"
      },
      {
        type: "video",
        title: localized("Short Video", "短片视频"),
        description: localized(
          "Main cut focused on motion, playful framing, and miniature race energy.",
          "主体成片围绕运动感、趣味构图与微缩竞速的能量展开。"
        ),
        href: "https://youtu.be/i64iXe_CPfw/"
      }
    ]
  }
];

export function getProjectCategories(locale: Locale): Array<{ id: string; label: string }> {
  const uniqueCategories = projects
    .map((project) => ({
      id: project.category.en,
      label: getLocalizedText(project.category, locale)
    }))
    .filter((category, index, allCategories) => allCategories.findIndex((item) => item.id === category.id) === index);

  return [...uniqueCategories, { id: "all", label: getLocalizedText(projectSectionContent.allCategory, locale) }];
}

export function projectLabel(text: LocalizedText, locale: Locale) {
  return getLocalizedText(text, locale);
}
