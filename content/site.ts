import type { ServiceItem } from "@/types/content";

export const siteIdentity = {
  name: "David Weng",
  fullName: "David (Jiachen) Weng",
  brandLine: "Visual storytelling, design, and creative systems",
  roles: ["Video Editor", "Photographer", "Graphic Designer", "ContentOps"]
};

export const navigationItems = [
  { label: "What I Do", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const heroContent = {
  kicker: "Visual storytelling, design, and creative systems",
  headline: "I build visual stories, content systems, and creative workflows from concept to delivery.",
  support:
    "I work across video production, photography, graphic design, and AI-integrated workflows for brands, teams, and independent projects.",
  visualHeadline: "A cinematic portfolio built for employers, collaborators, and research-minded partners.",
  visualCaption: "Selected work / moving image / design systems",
  visualNotes: [
    {
      title: "Editorial pacing",
      copy: "Short-form, branded, and narrative projects shaped with a clear sense of rhythm."
    },
    {
      title: "AI-aware process",
      copy: "Workflow design that speeds up iteration without flattening the creative voice."
    }
  ]
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
  eyebrow: "What I Do",
  title: "Creative production with editorial clarity, visual precision, and AI-aware execution.",
  description:
    "The goal is not just output. It is to help teams move from an idea to a credible, publishable result with fewer handoff gaps.",
  items: services
};

export const aboutContent = {
  eyebrow: "About",
  title: "A cross-media practice built around craft, systems, and end-to-end delivery.",
  body:
    "I am a versatile digital content creator working across video editing, photography, design, and content operations. My practice combines visual craft with production thinking, which allows me to move projects from concept development to final delivery with a clear editorial point of view.",
  bodySecondary:
    "I am especially interested in AI-integrated creative workflows, media research, and cross-cultural communication through moving images and digital content. That mix helps me contribute both as a hands-on maker and as a systems-minded collaborator.",
  stats: [
    { value: "4", label: "Core disciplines across image, motion, design, and operations" },
    { value: "E2E", label: "Able to lead from concept framing to publish-ready delivery" },
    { value: "AI", label: "Integrated where it improves speed, experimentation, or consistency" },
    { value: "Global", label: "Research and storytelling interests grounded in cross-cultural media" }
  ],
  resumeHref: "#",
  cvHref: "#",
  linkedinHref: "#"
};

export const contactContent = {
  eyebrow: "Contact",
  title: "Open to roles, freelance projects, and visual collaborations.",
  body:
    "I am available for freelance, contract, and collaborative work in editing, campaign content, event recap, visual storytelling, and AI-driven film experiments.",
  email: "hello@davidweng.studio",
  linkedinHref: "#",
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
