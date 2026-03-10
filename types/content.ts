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
};

export type ProjectItem = {
  slug: string;
  title: string;
  code: string;
  posterWord: string;
  category: "Film" | "Client Work" | "Research" | "Experimental" | "Design";
  year: string;
  projectType: string;
  duration: string;
  coverLabel: string;
  coverPalette: [string, string, string];
  teaser: string;
  summary: string;
  roles: string[];
  highlights: string[];
  externalLinks: ExternalLink[];
  media: ProjectMediaItem[];
};
