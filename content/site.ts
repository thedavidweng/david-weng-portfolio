import type { Locale, LocalizedText, ServiceItem } from "@/types/content";
import { getLocalizedText, localized } from "@/lib/i18n";

export const siteIdentity = {
  name: "David Weng",
  fullName: "David (Jiachen) Weng",
  roles: localized(
    ["Video Editor", "Photographer", "Graphic Designer", "ContentOps"],
    ["视频剪辑", "摄影", "平面设计", "内容运营"]
  )
};

export const navigationItems = [
  { label: localized("Projects", "项目"), href: "#projects" },
  { label: localized("What I Do", "能力"), href: "#services" },
  { label: localized("Contact", "联系"), href: "#contact" },
  { label: localized("Blog", "博客"), href: "https://blog.davidweng.eu.org/" }
];

export const heroContent = {
  kicker: localized("Visual Content Creator in Vancouver", "常驻温哥华 · 视觉内容创作者"),
  headline: localized("PORTFOLIO", "PORTFOLIO"),
  support: localized(
    "Video editing, photography, graphic design. Concept to delivery.",
    "视频剪辑、摄影、平面设计。从概念到交付。"
  )
};

const services: ServiceItem[] = [
  {
    title: localized("Video Editing & Post-Production", "视频剪辑与后期制作"),
    description: localized(
      "I shoot and edit footage into focused, clearly paced stories, specializing in commercial campaigns, event recaps, short-form video, and social-first content.",
      "拍摄并剪辑节奏明确、故事清晰的成片，擅长短视频、商业短片、宣传物料、活动记录与社交平台内容呈现。"
    )
  },
  {
    title: localized("Photography & Visual Storytelling", "摄影与视觉叙事"),
    description: localized(
      "I create image sets with narrative weight for portraits, live events, and editorial coverage.",
      "为人物写真、现场活动与编辑报道拍摄具有叙事感的图像。"
    )
  },
  {
    title: localized("Graphic & Brand System Design", "平面与品牌系统设计"),
    description: localized(
      "I build visual systems, content designs, and guidelines that help projects look coherent, credible, and ready to ship across web, social, and presentation formats.",
      "搭建视觉系统与内容设计，为团队或创始人交付完整方案，让项目在网页、社交媒体与展示材料中都保持清晰、可信与统一。"
    )
  },
  {
    title: localized("AI-Integrated Experimental Work", "AI 整合与实验性项目"),
    description: localized(
      "I use AI for image-making, media research, visual prototyping, and accelerating content operations while preserving authorship and production quality.",
      "在保留作者性与创作质量的前提下，使用 AI 进行影像制作、媒体研究、视觉原型并加速核心内容运营流程。"
    )
  }
];

export const servicesContent = {
  eyebrow: localized("01 / Core Capabilities", "01 / 核心能力"),
  title: localized("What I Do", "我能做什么"),
  description: localized(
    "Video, photography, design, and content operations.",
    "视频、摄影、设计与内容运营。"
  ),
  items: services
};

export const aboutContent = {
  eyebrow: localized("03 / Background", "03 / 背景"),
  title: localized("About", "关于我"),
  lead: localized(
    "Video production, graphic design, and content operations — concept to delivery.",
    "视频制作、平面设计与内容运营，从概念到交付。"
  ),
  body: localized(
    "Background in video editing, photography, graphic design, and social media content. Most projects go from concept to final output in-house, with AI tools integrated where they improve speed or quality.",
    "背景涵盖视频剪辑、摄影、平面设计与社交媒体内容。多数项目从概念到成品独立完成，在有助于提速或提升质量的环节引入 AI 工具。"
  ),
  bodySecondary: localized(
    "Also involved in research, publication, and teaching — including co-developing and instructing a course on AI film production.",
    "同时参与研究、出版与教学工作，包括共同开发并教授一门 AI 电影制作课程。"
  ),
  stats: [
    { value: "AI", label: localized("Integrated into real workflows, not used as decoration", "融入实际流程，而非表面装饰") },
    { value: "E2E", label: localized("From brief to final delivery", "从需求简报到最终交付") },
    { value: "Film", label: localized("Narrative, microfilm, campaign, and event recaps", "叙事短片、微电影、宣传活动与活动回顾") },
    { value: "Research", label: localized("Publication and media studies alongside production", "在制作之外持续进行出版与媒体研究") }
  ],
  homepageHref: "https://thedavidweng.github.io/",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  homepageLabel: localized("Home", "主页"),
  focusLabel: localized("Practice Focus", "实践重点")
};

export const contactContent = {
  eyebrow: localized("03 / Contact", "03 / 联系"),
  title: localized("Let's craft the", "创造"),
  unseenLabel: localized("unseen.", "未见之物"),
  lead: localized(
    "Open to freelance editing, campaign work, event recaps, and creative collaborations.",
    "接受自由剪辑、宣传活动、活动回顾与创意合作。"
  ),
  body: localized(
    "Based in Vancouver, working globally. If you have a project that needs a focused visual approach, let's talk about how to bring it to life.",
    "常驻温哥华，面向全球。如果你有项目需要专注的视觉呈现，让我们聊聊如何将其实现。"
  ),
  email: "mail@davidweng.eu.org",
  emailDisplay: "mail[at]davidweng.eu.org",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  instagramHref: "https://www.instagram.com/davidwengpro/",
  githubHref: "https://github.com/thedavidweng",
  emailLabel: localized("Email Me", "发邮件"),
  linkedinLabel: localized("LinkedIn", "领英"),
  instagramLabel: localized("Instagram", "Instagram")
};

export const footerContent = {
  copyright: localized("© 2026 David Weng.", "© 2026 David Weng."),
  languageLabel: localized("中文", "EN"),
  externalWindowHint: localized("opens in new tab", "将在新标签页打开")
};

export function label(text: LocalizedText, locale: Locale) {
  return getLocalizedText(text, locale);
}
