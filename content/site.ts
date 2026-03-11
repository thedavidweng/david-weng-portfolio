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
  { label: localized("Contact", "联系"), href: "#contact" }
];

export const heroContent = {
  kicker: localized("David (Jiachen) Weng / Vancouver / Visual Content Creator", "David Weng / 温哥华 / 视觉内容创作者"),
  headline: localized(
    "Video, design, and Content operations.",
    "影像剪辑\n视觉设计\n内容运营"
  ),
  support: localized(
    "A versatile digital content creator working across video production, photography, graphic design, and AI-integrated creative workflows.",
    "从概念、拍摄到后期与发布，完成完整的视觉内容交付。"
  ),
  supportSecondary: localized(
    "I build from concept to delivery for employers, collaborators, and research-minded teams who need visual work that feels considered and still ships cleanly.",
    ""
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
      value: localized("Film, campaign, research, publication, and web", "电影、campaign、研究、出版与网站")
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
        "Visual storytelling anchored in post-production craft and cross-format systems thinking.",
        "以剪辑与后期为核心，同时用跨媒介的系统思维组织视觉表达。"
      )
    },
    {
      title: localized("Best fit", "最佳合作"),
      copy: localized(
        "Teams or projects that need one person who can cut, design, and structure content with continuity.",
        "适合需要同一个人同时处理剪辑、设计与内容结构，保证整体连续性的团队或项目。"
      )
    },
    {
      title: localized("Contact", "合作方向"),
      copy: localized(
        "Open to freelance editing, campaign work, event recap, and creative collaborations.",
        "开放视频剪辑、campaign 制作、活动 recap 与创意合作。"
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
    "A tighter capability overview for people hiring across moving image, visual communication, and content operations.",
    "为招聘、合作或研究场景快速说明我在影像、视觉沟通与内容运营方面能提供什么。"
  ),
  items: services
};

export const aboutContent = {
  eyebrow: localized("03 / Background", "03 / 背景"),
  title: localized("About", "关于我"),
  lead: localized(
    "A cross-media practice built around craft, systems, and end-to-end delivery.",
    "一个围绕创作手艺、系统思维与端到端交付建立的跨媒介实践。"
  ),
  body: localized(
    "I am a versatile digital content creator specializing in AI-integrated creative workflows. My background spans video production, graphic design, and social media marketing, with a consistent focus on taking projects from concept to completion.",
    "我是一名专注于 AI 整合创意流程的多面向数字内容创作者。我的背景横跨视频制作、平面设计与社交媒体营销，并始终强调从概念到完成的完整执行能力。"
  ),
  bodySecondary: localized(
    "I have also worked on research, publication, and teaching-adjacent projects, including co-developing and instructing a course on AI film production. That mix helps me contribute as both a hands-on maker and a systems-minded collaborator.",
    "我也参与过研究、出版与教学相关项目，包括共同开发并教授一门关于 AI 电影制作的课程。这种经历让我既能作为一线创作者动手执行，也能作为重视系统与协作的伙伴参与项目。"
  ),
  stats: [
    { value: "AI", label: localized("Integrated into creative workflows, not used as decoration", "融入实际创作流程，而不是作为表面装饰") },
    { value: "E2E", label: localized("Comfortable taking work from brief to final delivery", "能够从 brief 一路推进到最终交付") },
    { value: "Film", label: localized("Narrative, microfilm, campaign, and event recap experience", "具备叙事短片、微电影、campaign 与活动 recap 经验") },
    { value: "Research", label: localized("Publication and media studies work alongside production practice", "在影像制作之外也持续进行出版与媒体研究工作") }
  ],
  resumeHref: "/documents/resume.pdf",
  portfolioHref: "/documents/portfolio.pdf",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  resumeLabel: localized("Resume", "简历"),
  portfolioLabel: localized("View Portfolio", "查看作品集"),
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
    "Available for freelance, contract, and collaborative work, focusing on editing, commercial campaigns, event recaps, and visual storytelling.",
    "可承接自由职业、合同制与合作型项目：专注于视频剪辑、商业短片、活动记录与视觉叙事。"
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
      title: localized("Freelance Editing", "自由剪辑合作"),
      copy: localized(
        "Short-form video, campaign assets, event recap, and social-first storytelling.",
        "短视频、campaign 素材、活动 recap 与面向社交平台的叙事内容。"
      )
    },
    {
      title: localized("Creative Production", "创意制作"),
      copy: localized(
        "Concept shaping, visual systems, and cross-format delivery for content teams or founders.",
        "为内容团队或创始人提供概念梳理、视觉系统与跨格式交付。"
      )
    },
    {
      title: localized("Experimental Work", "实验性项目"),
      copy: localized(
        "AI image-making, media research, and visual prototypes with a strong editorial frame.",
        "带有明确编辑框架的 AI 影像、媒体研究与视觉原型实验。"
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
