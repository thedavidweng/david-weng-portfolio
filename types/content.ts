export type Locale = "en" | "zh";

export type ArchiveGroup =
  | "beaty-biodiversity-museum"
  | "bc-ai-ecosystem"
  | "theupgrade-ai"
  | "personal"
  | "personal-video"
  | "client-work"
  | "film-video";

export type LocalizedValue<T> = {
  en: T;
  zh: T;
};

export type LocalizedText = LocalizedValue<string>;

export type InlineTextFragment =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "link";
      text: string;
      href: string;
    };

export type LocalizedInlineText = LocalizedValue<InlineTextFragment[]>;

export type ServiceItem = {
  title: LocalizedText;
  description: LocalizedText;
};

export type ExternalLink = {
  label: LocalizedText;
  href: string;
};

export type FilmCreditPerson = {
  name: LocalizedText;
  href?: string;
  note?: LocalizedText;
};

export type FilmCreditGroup = {
  role: LocalizedText;
  people: FilmCreditPerson[];
};

export type FilmInfoItem = {
  label: LocalizedText;
  value: LocalizedText;
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

export type FilmDetails = {
  heroPoster: LocalizedValue<ProjectMediaItem>;
  posters: ProjectMediaItem[];
  stills: ProjectMediaItem[];
  credits: FilmCreditGroup[];
  facts: FilmInfoItem[];
};

export type CarouselProjectItem = {
  slug: string;
  title: LocalizedText;
  code: string;
  posterWord: string;
  category: LocalizedText;
  year: string;
  coverLabel: LocalizedText;
  coverPalette: [string, string, string];
  coverImage: string;
  coverWidth?: number;
  teaser: LocalizedText;
  href?: LocalizedText;
};

export type ProjectItem = {
  slug: string;
  archiveGroup?: ArchiveGroup;
  detailLayout?: "standard" | "title-only" | "external-handoff";
  film?: FilmDetails;
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
  detailSummary?: LocalizedInlineText;
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
