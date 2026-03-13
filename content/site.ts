import type { Locale, LocalizedText, ServiceItem } from "@/types/content";
import { getLocalizedText, localized } from "@/lib/i18n";

export const siteIdentity = {
  name: "David Weng",
  fullName: "David (Jiachen) Weng",
  brandLine: localized("video / photography / design / content operations", "视频 / 摄影 / 设计 / 内容运营"),
  roles: localized(
    ["Video Editor", "Photographer", "Graphic Designer", "ContentOps"],
    ["视频剪辑", "摄影", "平面设计", "内容运营"]
  )
};

export const navigationItems = [
  { label: localized("What I Do", "能力"), href: "#services" },
  { label: localized("Projects", "项目"), href: "#projects" },
  { label: localized("Contact", "联系"), href: "#contact" },
  { label: localized("Blog", "博客"), href: "https://blog.davidweng.eu.org/" }
];

export const heroContent = {
  kicker: localized("Visual Content Creator in Vancouver", "常驻温哥华 · 视觉内容创作者"),
  headline: localized(
    "Video, design, and Content operations.",
    "影像剪辑\n视觉设计\n内容运营"
  ),
  support: localized(
    "Video editing, photography, graphic design. Concept to delivery.",
    "视频剪辑、摄影、平面设计。从概念到交付。"
  ),
  supportSecondary: localized(
    "Working with teams and collaborators who need visual content that's well-made and ready to publish.",
    "与需要高完成度、可直接发布的视觉内容的团队与合作者协作。"
  ),
  stats: [
    {
      label: localized("Focus", "专注方向"),
      value: localized("Editing / Photography / Design / ContentOps", "剪辑 / 摄影 / 设计 / 内容运营")
    },
    {
      label: localized("Workflow", "工作流程"),
      value: localized(
        "AI-integrated where it improves speed or iteration",
        "在提速或提升迭代效率时引入 AI"
      )
    },
    {
      label: localized("Formats", "内容形式"),
      value: localized("Film, campaign, research, publication, and web", "电影、宣传活动、研究、出版与网站")
    }
  ],
  visualHeadline: localized(
    "Selected work from film, research, design, and campaign production.",
    "来自电影、研究、设计与 campaign 制作的精选项目"
  ),
  visualCaption: localized("Profile / capability / current archive", "简介 / 能力 / 当前档案"),
  visualNotes: [
    {
      title: localized("Current mode", "当前状态"),
      copy: localized(
        "Post-production and editing as the core, with design and content work built around it.",
        "以后期与剪辑为核心，围绕它展开设计与内容工作。"
      )
    },
    {
      title: localized("Best fit", "最佳合作"),
      copy: localized(
        "Projects that need one person to handle editing, design, and content — start to finish.",
        "需要一个人完成剪辑、设计与内容的项目——从头到尾。"
      )
    },
    {
      title: localized("Contact", "合作方向"),
      copy: localized(
        "Open to freelance editing, campaign work, event recaps, and creative collaborations.",
        "接受自由剪辑、宣传活动、活动回顾与创意合作。"
      )
    }
  ],
  primaryCta: localized("View Projects", "查看项目")
};

const services: ServiceItem[] = [
  {
    title: localized("Video Editing & Post-Production", "视频剪辑与后期制作"),
    description: localized(
      "I shoot and edit footage into focused, clearly paced stories, specializing in commercial campaigns, event recaps, and social-first content.",
      "拍摄并剪辑节奏明确、故事清晰的成片，擅长商业短片、活动记录与社交平台内容呈现。"
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
    title: localized("Graphic & Brand Design", "平面与品牌设计"),
    description: localized(
      "I build visual systems that help projects look coherent, credible, and ready to ship across web, social, and presentation formats.",
      "搭建统一的视觉系统，让项目在网页、社交媒体与展示材料中都保持清晰、可信与可发布。"
    )
  },
  {
    title: localized("AI-Integrated Creative Workflows", "AI 整合创意流程"),
    description: localized(
      "I use AI to streamline research, ideation, and content operations while preserving authorship and production quality.",
      "在保留作者性与成片质量的前提下，用 AI 加速研究、构思与内容运营流程。"
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
    "视频制作、平面设计与内容运营——从概念到交付。"
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
  resumeHref: "/documents/resume.pdf",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  resumeLabel: localized("Resume", "简历"),
  focusLabel: localized("Practice Focus", "实践重点")
};

export const contactContent = {
  eyebrow: localized("03 / Contact", "03 / 联系"),
  title: localized("Contact", "联系"),
  lead: localized(
    "",
    ""
  ),
  body: localized(
    "Available for freelance, contract, and collaborative work — editing, commercial campaigns, event recaps, and visual storytelling.",
    "接受自由职业、合同制与合作项目——视频剪辑、商业宣传、活动回顾与视觉叙事。"
  ),
  email: "mail@davidweng.eu.org",
  emailDisplay: "mail[at]davidweng.eu.org",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  instagramHref: "https://www.instagram.com/davidwengpro/",
  githubHref: "https://github.com/thedavidweng",
  emailLabel: localized("Email Me", "发邮件"),
  bestForLabel: localized("Best for", "适合合作"),
  inquiryTypes: [
    {
      title: localized("Freelance Editing", "自由剪辑"),
      copy: localized(
        "Short-form video, campaign assets, event recaps, social content.",
        "短视频、宣传物料、活动回顾、社交媒体内容。"
      )
    },
    {
      title: localized("Creative Production", "创意制作"),
      copy: localized(
        "Visual systems, content design, and delivery for teams or founders.",
        "视觉系统、内容设计，为团队或创始人交付完整方案。"
      )
    },
    {
      title: localized("Experimental Work", "实验性项目"),
      copy: localized(
        "AI image-making, media research, visual prototyping.",
        "AI 影像制作、媒体研究、视觉原型。"
      )
    }
  ]
};

export const footerContent = {
  copyright: localized("© 2026 David Weng.", "© 2026 David Weng."),
  languageLabel: localized("中文", "EN")
};

export function label(text: LocalizedText, locale: Locale) {
  return getLocalizedText(text, locale);
}
