export type Locale = "en" | "zh";

export type ArchiveGroup =
  | "beaty-biodiversity-museum"
  | "bc-ai-ecosystem"
  | "theupgrade-ai"
  | "personal"
  | "client-work"
  | "research-publication"
  | "film-video";

export type LocalizedValue<T> = {
  en: T;
  zh: T;
};

export type LocalizedText = LocalizedValue<string>;

export type ServiceItem = {
  title: LocalizedText;
  description: LocalizedText;
};

export type ExternalLink = {
  label: LocalizedText;
  href: string;
};

export type ProjectMediaItem = {
  type: "image" | "video" | "pdf";
  title: LocalizedText;
  description: LocalizedText;
  archiveKind?: ArchiveItemKind;
  src?: string;
  width?: number;
  height?: number;
  href?: string;
  badge?: LocalizedText;
  credit?: ExternalLink;
  layout?: "square" | "landscape" | "portrait";
};

export type ProjectItem = {
  slug: string;
  archiveGroup?: ArchiveGroup;
  detailLayout?: "standard" | "title-only" | "external-handoff";
  title: LocalizedText;
  code: string;
  posterWord: string;
  category: LocalizedText;
  year: string;
  projectType: LocalizedText;
  duration: LocalizedText;
  coverLabel: LocalizedText;
  coverPalette: [string, string, string];
  coverImage: string;
  coverAlt: LocalizedText;
  teaser: LocalizedText;
  summary: LocalizedText;
  roles: LocalizedValue<string[]>;
  highlights: LocalizedValue<string[]>;
  externalLinks: ExternalLink[];
  media: ProjectMediaItem[];
};

export type ArchiveItemKind =
  | "cover"
  | "poster"
  | "square"
  | "slide"
  | "event-photo"
  | "thumb"
  | "booklet"
  | "signage"
  | "report"
  | "video";

export type ArchiveItem = {
  file: string;
  src?: string;
  kind: ArchiveItemKind;
  width?: number;
  height?: number;
  title?: LocalizedText;
  caption?: LocalizedText;
  publishedUrl?: string;
  credit?: ExternalLink;
  featured?: boolean;
  hidden?: boolean;
  order?: number;
  notes?: string;
};

export type ArchiveCollection = {
  group: ArchiveGroup;
  title: LocalizedText;
  defaultCredits?: Partial<Record<ArchiveItemKind, ExternalLink>>;
  items: ArchiveItem[];
};
