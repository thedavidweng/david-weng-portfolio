import type { ProjectItem } from "@/types/content";

export const projectSectionContent = {
  eyebrow: "Selected Projects",
  title: "A portfolio spanning film, client work, research, design, and experimental image-making.",
  description:
    "Each card opens into a focused project page with roles, highlights, mixed-media materials, and outbound links for deeper review."
};

export const projects: ProjectItem[] = [
  {
    slug: "afterimage-city",
    title: "Afterimage City",
    category: "Film",
    year: "2025",
    projectType: "Short Film",
    duration: "12 min",
    coverLabel: "Director / Editor / Color",
    coverPalette: ["#1a1613", "#68493c", "#d4b493"],
    teaser: "A mood-driven short film balancing cinematic pacing, urban observation, and a restrained color arc.",
    summary:
      "A short film project built to explore atmosphere, memory, and visual rhythm through a compact production pipeline spanning direction, editing, and finishing.",
    roles: ["Director", "Editor", "Color"],
    highlights: [
      "Built a cohesive visual language from production planning through final grade.",
      "Packaged for festival-style screening, trailer use, and portfolio review."
    ],
    externalLinks: [
      { label: "Watch Teaser", href: "https://example.com/afterimage-city" },
      { label: "Production Notes", href: "https://example.com/afterimage-notes" }
    ],
    media: [
      {
        type: "video",
        title: "Trailer Cut",
        description: "A short teaser edit used to establish tone and pacing for review."
      },
      {
        type: "image",
        title: "Frame Sequence",
        description: "Selected stills focused on contrast, texture, and nighttime composition."
      },
      {
        type: "pdf",
        title: "Lookbook",
        description: "A visual reference deck for aesthetic alignment and scene continuity."
      }
    ]
  },
  {
    slug: "signal-relay",
    title: "Signal Relay",
    category: "Client Work",
    year: "2024",
    projectType: "Campaign Content Suite",
    duration: "Multi-format",
    coverLabel: "Editor / Motion / ContentOps",
    coverPalette: ["#14181d", "#35536e", "#d5dfeb"],
    teaser: "A platform-aware campaign package designed for speed, consistency, and repeatable content production.",
    summary:
      "A client-facing campaign system built to turn a single shoot into a flexible package of edits, cutdowns, and reusable graphic assets.",
    roles: ["Editor", "Motion Design", "ContentOps"],
    highlights: [
      "Structured deliverables for web, social, and presentation contexts from one source production.",
      "Reduced editorial turnaround by defining repeatable asset formats and naming logic."
    ],
    externalLinks: [
      { label: "Campaign Overview", href: "https://example.com/signal-relay" }
    ],
    media: [
      {
        type: "video",
        title: "Launch Cut",
        description: "Primary campaign edit designed for web and presentation release."
      },
      {
        type: "image",
        title: "Social Frames",
        description: "Graphic and still-frame system for cross-platform adaptation."
      }
    ]
  },
  {
    slug: "fragments-of-arrival",
    title: "Fragments of Arrival",
    category: "Research",
    year: "2025",
    projectType: "Research-led Visual Essay",
    duration: "Essay series",
    coverLabel: "Research / Editing / Design",
    coverPalette: ["#1f1f1b", "#6d695d", "#d6d0c1"],
    teaser: "A visual essay connecting migration, media memory, and cross-cultural narrative framing.",
    summary:
      "A research-oriented project that combines writing, image sequencing, and motion fragments to communicate ideas in a more publicly legible format.",
    roles: ["Research", "Editor", "Graphic Design"],
    highlights: [
      "Bridges research language and public-facing visual storytelling.",
      "Designed for both academic-adjacent context and broader online publication."
    ],
    externalLinks: [
      { label: "Read Essay", href: "https://example.com/fragments" }
    ],
    media: [
      {
        type: "pdf",
        title: "Essay Draft",
        description: "A designed reading version with image-led pacing and annotations."
      },
      {
        type: "image",
        title: "Research Boards",
        description: "Reference boards connecting visual motifs, citations, and sequence ideas."
      }
    ]
  },
  {
    slug: "synthetic-streets",
    title: "Synthetic Streets",
    category: "Experimental",
    year: "2026",
    projectType: "AI Image Experiment",
    duration: "Ongoing",
    coverLabel: "Prompt Design / Curation / Edit",
    coverPalette: ["#120f16", "#5b435f", "#ceb7cb"],
    teaser: "An AI-assisted image series testing mood, control, and authored world-building in urban scenes.",
    summary:
      "An experimental project exploring how AI-assisted image workflows can support ideation and aesthetic iteration without flattening authorship.",
    roles: ["Prompt Design", "Curation", "Edit"],
    highlights: [
      "Tests workflow boundaries rather than treating AI output as a finished artifact.",
      "Creates a reusable process for mood studies, pitch imagery, and concept development."
    ],
    externalLinks: [
      { label: "Experiment Log", href: "https://example.com/synthetic-streets" }
    ],
    media: [
      {
        type: "image",
        title: "Scene Set",
        description: "A sequence of curated images ordered by tone, recurrence, and editorial contrast."
      },
      {
        type: "pdf",
        title: "Workflow Notes",
        description: "Process notes covering prompting, selection criteria, and post-editing decisions."
      }
    ]
  },
  {
    slug: "monochrome-signal",
    title: "Monochrome Signal",
    category: "Design",
    year: "2024",
    projectType: "Brand System",
    duration: "Identity package",
    coverLabel: "Visual Identity / Layout / Motion",
    coverPalette: ["#1d1c1b", "#6f564b", "#e6d7c8"],
    teaser: "A restrained visual identity system built for consistency across decks, social, and motion assets.",
    summary:
      "A brand design system focused on clarity, pacing, and visual restraint for a project that needed to look intentional across static and moving formats.",
    roles: ["Graphic Design", "Art Direction", "Motion"],
    highlights: [
      "Created a scalable system rather than one-off graphics.",
      "Designed to hold together across stills, title cards, and presentation contexts."
    ],
    externalLinks: [
      { label: "Design Case", href: "https://example.com/monochrome-signal" }
    ],
    media: [
      {
        type: "image",
        title: "Identity Frames",
        description: "Logotype, typographic hierarchy, and key layout applications."
      },
      {
        type: "video",
        title: "Motion Tests",
        description: "Short motion studies translating the identity system into animated transitions."
      }
    ]
  }
];
