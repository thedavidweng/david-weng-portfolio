import type { ServiceItem } from "@/types/content";

export const siteIdentity = {
  name: "David Weng",
  fullName: "David (Jiachen) Weng",
  brandLine: "video / photography / design / content systems",
  roles: ["Video Editor", "Photographer", "Graphic Designer", "ContentOps"]
};

export const navigationItems = [
  { label: "What I Do", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const heroContent = {
  kicker: "David (Jiachen) Weng / Vancouver / Visual Content Creator",
  headline: "Video, design, and content systems with cinematic discipline.",
  support:
    "A versatile digital content creator working across video production, photography, graphic design, and AI-integrated creative workflows.",
  supportSecondary:
    "I build from concept to delivery for employers, collaborators, and research-minded teams who need visual work that feels considered and still ships cleanly.",
  stats: [
    { label: "Focus", value: "Editing / Photography / Design / ContentOps" },
    { label: "Workflow", value: "AI-integrated where it improves speed or iteration" },
    { label: "Formats", value: "Film, campaign, research, publication, and web" }
  ],
  visualHeadline: "Selected work from film, research, design, and campaign production.",
  visualCaption: "Profile / capability / current archive",
  visualNotes: [
    {
      title: "Current mode",
      copy: "Visual storytelling anchored in post-production craft and cross-format systems thinking."
    },
    {
      title: "Best fit",
      copy: "Teams or projects that need one person who can cut, design, and structure content with continuity."
    },
    {
      title: "Contact",
      copy: "Open to freelance editing, campaign work, event recap, and creative collaborations."
    }
  ],
  primaryCta: "View Projects",
  secondaryCta: "View Resume",
  profileImage: "/legacy/profile.jpg"
};

const services: ServiceItem[] = [
  {
    title: "Video Editing & Post-Production",
    description:
      "I shape footage into focused, emotionally paced stories for campaigns, short films, event recaps, and platform-native publishing."
  },
  {
    title: "Photography & Visual Storytelling",
    description:
      "I create image sets with narrative weight for portraits, editorial coverage, live events, and visual world-building."
  },
  {
    title: "Graphic & Brand Design",
    description:
      "I build visual systems that help projects look coherent, credible, and ready to ship across web, social, and presentation formats."
  },
  {
    title: "AI-Integrated Creative Workflows",
    description:
      "I use AI to streamline research, ideation, rough cuts, and content operations while preserving authorship and production quality."
  }
];

export const servicesContent = {
  eyebrow: "01 / Core Capabilities",
  title: "What I Do",
  description:
    "A tighter capability overview for people hiring across moving image, visual communication, and content operations.",
  items: services
};

export const aboutContent = {
  eyebrow: "03 / Background",
  title: "About",
  lead: "A cross-media practice built around craft, systems, and end-to-end delivery.",
  body:
    "I am a versatile digital content creator specializing in AI-integrated creative workflows. My background spans video production, graphic design, and social media marketing, with a consistent focus on taking projects from concept to completion.",
  bodySecondary:
    "I have also worked on research, publication, and teaching-adjacent projects, including co-developing and instructing a course on AI film production. That mix helps me contribute as both a hands-on maker and a systems-minded collaborator.",
  stats: [
    { value: "AI", label: "Integrated into creative workflows, not used as decoration" },
    { value: "E2E", label: "Comfortable taking work from brief to final delivery" },
    { value: "Film", label: "Narrative, microfilm, campaign, and event recap experience" },
    { value: "Research", label: "Publication and media studies work alongside production practice" }
  ],
  resumeHref: "/legacy/resume.pdf",
  cvHref: "/legacy/CV.pdf",
  portfolioHref: "/legacy/Portfolio_web.pdf",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  profileImage: "/legacy/profile.jpg"
};

export const contactContent = {
  eyebrow: "04 / Contact",
  title: "Contact",
  lead: "Open to roles, freelance projects, and visual collaborations.",
  body:
    "I am available for freelance, contract, and collaborative work in editing, campaign content, event recap, visual storytelling, and AI-driven film experiments.",
  email: "mail@davidweng.eu.org",
  linkedinHref: "https://www.linkedin.com/in/thedavidweng/",
  instagramHref: "https://www.instagram.com/davidwengpro/",
  githubHref: "https://github.com/thedavidweng",
  inquiryTypes: [
    {
      title: "Freelance Editing",
      copy: "Short-form video, campaign assets, event recap, and social-first storytelling."
    },
    {
      title: "Creative Production",
      copy: "Concept shaping, visual systems, and cross-format delivery for content teams or founders."
    },
    {
      title: "Experimental Work",
      copy: "AI image-making, media research, and visual prototypes with a strong editorial frame."
    }
  ]
};
