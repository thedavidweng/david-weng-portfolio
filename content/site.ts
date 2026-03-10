import type { ServiceItem } from "@/types/content";

export const siteIdentity = {
  name: "David Weng",
  fullName: "David (Jiachen) Weng",
  brandLine: "moving image / visual systems / poster-first portfolio",
  roles: ["Video Editor", "Photographer", "Graphic Designer", "ContentOps"]
};

export const navigationItems = [
  { label: "What I Do", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const heroContent = {
  kicker: "David (Jiachen) Weng / Video Editor / Photographer / Graphic Designer / ContentOps",
  headline: "CUT MOTION. FRAME STILLS. BUILD SIGNAL.",
  support:
    "Versatile digital content creator working across video production, photography, graphic design, social media systems, and AI-integrated creative workflows.",
  supportSecondary:
    "I take projects from concept to delivery for employers, collaborators, and research-minded partners who need visual work with both atmosphere and execution discipline.",
  visualHeadline: "A dark portfolio built to read like a poster system, not a template.",
  visualCaption: "selected work / archive logic / acid-red signal",
  visualNotes: [
    {
      title: "For employers",
      copy: "Editing, design, and content production that ships with tone, speed, and control."
    },
    {
      title: "For collaborators",
      copy: "Visual systems that can move between film, campaign work, research, and experiments."
    },
    {
      title: "For process",
      copy: "AI-integrated workflows used where they sharpen iteration instead of diluting authorship."
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
  eyebrow: "01 / Core Capabilities",
  title: "What I Do",
  description:
    "Four capability lanes, structured for hiring managers and collaborators who need someone that can think conceptually and still deliver under production pressure.",
  items: services
};

export const aboutContent = {
  eyebrow: "03 / Background",
  title: "About",
  lead: "A cross-media practice built around craft, systems, and end-to-end delivery.",
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
  eyebrow: "04 / Contact",
  title: "Contact",
  lead: "Open to roles, freelance projects, and visual collaborations.",
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
