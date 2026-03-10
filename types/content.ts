export type ServiceItem = {
  title: string;
  description: string;
};

export type ExternalLink = {
  label: string;
  href: string;
};

export type ProjectMediaItem = {
  type: "image" | "video" | "pdf";
  title: string;
  description: string;
  src?: string;
  href?: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  code: string;
  posterWord: string;
  category: string;
  year: string;
  projectType: string;
  duration: string;
  coverLabel: string;
  coverPalette: [string, string, string];
  coverImage: string;
  coverAlt: string;
  teaser: string;
  summary: string;
  roles: string[];
  highlights: string[];
  externalLinks: ExternalLink[];
  media: ProjectMediaItem[];
};
