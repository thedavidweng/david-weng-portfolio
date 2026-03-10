import type { ProjectItem } from "@/types/content";

export const projectSectionContent = {
  eyebrow: "02 / Archive",
  title: "Selected Projects",
  description:
    "A responsive reel of projects migrated from the earlier site, spanning publication design, research, film, campaign work, and web."
};

export const projects: ProjectItem[] = [
  {
    slug: "beaty-biodiversity-museum-annual-report-2022-2023",
    title: "Beaty Biodiversity Museum Annual Report 2022-2023",
    code: "[EDITORIAL-01]",
    posterWord: "BEATY",
    category: "Design",
    year: "2023",
    projectType: "Annual Report",
    duration: "Publication",
    coverLabel: "Editorial Design / Report Layout",
    coverPalette: ["#091520", "#173c58", "#d2e8ff"],
    coverImage: "/legacy/Annual-Report.jpeg",
    coverAlt: "Cover preview of the Beaty Biodiversity Museum annual report",
    teaser: "An institutional annual report summarizing the museum's progress, translated into a clean visual publication.",
    summary:
      "A report design project for the Beaty Biodiversity Museum that organizes institutional updates, visual material, and year-in-review information into a coherent publication.",
    roles: ["Graphic Design", "Layout", "Publication Design"],
    highlights: [
      "Turned a dense institutional report into a more readable visual document.",
      "Delivered in a web-friendly PDF format for public access."
    ],
    externalLinks: [
      {
        label: "Web Version",
        href: "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
      }
    ],
    media: [
      {
        type: "image",
        title: "Cover Preview",
        description: "A preview still from the final publication.",
        src: "/legacy/Annual-Report.jpeg",
        href: "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
      },
      {
        type: "pdf",
        title: "Published PDF",
        description: "The distributed report file.",
        src: "/legacy/Portfolio_print.pdf",
        href: "https://beatymuseum.sites.olt.ubc.ca/files/2023/09/Beaty-Museum-Annual-Report-2022-2023_compressed.pdf"
      }
    ]
  },
  {
    slug: "transcending-barriers",
    title: 'Transcending Barriers: Viewing Practices of "Games of Thrones" in China, India, and Russia',
    code: "[RESEARCH-02]",
    posterWord: "BARRIERS",
    category: "Research",
    year: "2024",
    projectType: "Published Article",
    duration: "Beacon Journal Vol. 5",
    coverLabel: "Research / Publication",
    coverPalette: ["#121515", "#46595b", "#dfe9ea"],
    coverImage: "/legacy/Transcending_Barriers.png",
    coverAlt: "Article cover for Transcending Barriers publication",
    teaser: "A published piece on transnational viewing practices and media circulation.",
    summary:
      "A publication in Beacon: Journal of Media Studies examining how audiences in China, India, and Russia engaged with Game of Thrones across different media environments.",
    roles: ["Research", "Writing", "Publication"],
    highlights: [
      "Published in Beacon: Journal of Media Studies, Vol. 5 (2024).",
      "Bridges academic research and publicly readable media analysis."
    ],
    externalLinks: [
      {
        label: "Read Online",
        href: "https://beaconjournal.arts.ubc.ca/transcending-barriers-viewing-practices-of-games-of-thrones-in-china-india-and-russia/"
      }
    ],
    media: [
      {
        type: "image",
        title: "Article Artwork",
        description: "Lead image used to represent the publication.",
        src: "/legacy/Transcending_Barriers.png",
        href: "https://beaconjournal.arts.ubc.ca/transcending-barriers-viewing-practices-of-games-of-thrones-in-china-india-and-russia/"
      }
    ]
  },
  {
    slug: "davids-blog",
    title: "David's Blog",
    code: "[WEB-03]",
    posterWord: "BLOG",
    category: "Web",
    year: "2024",
    projectType: "Website",
    duration: "Live Site",
    coverLabel: "Web / NotionNext / Next.js",
    coverPalette: ["#0d1319", "#25465d", "#d0f0ff"],
    coverImage: "/legacy/blog.png",
    coverAlt: "Screenshot of David's blog homepage",
    teaser: "A blog deployed on Vercel using NotionNext and the Notion API.",
    summary:
      "A personal publishing site that uses NotionNext as a static blogging system, combining Next.js with the Notion API for a flexible content workflow.",
    roles: ["Web", "Design", "Content System"],
    highlights: [
      "Published as a live site on Vercel.",
      "Built on a structured content system rather than a hand-authored static page."
    ],
    externalLinks: [
      { label: "See Live", href: "https://blog.davidweng.eu.org" },
      { label: "Source Code", href: "https://github.com/thedavidweng/NotionNext" }
    ],
    media: [
      {
        type: "image",
        title: "Homepage Screenshot",
        description: "A snapshot of the live blog interface.",
        src: "/legacy/blog.png",
        href: "https://blog.davidweng.eu.org"
      }
    ]
  },
  {
    slug: "fraud",
    title: "FRAÜD",
    code: "[FILM-04]",
    posterWord: "FRAUD",
    category: "Film",
    year: "2024",
    projectType: "Narrative Film",
    duration: "Festival / Listing",
    coverLabel: "Film / Narrative",
    coverPalette: ["#140f12", "#5f2533", "#f0d6d0"],
    coverImage: "/legacy/fraud.jpg",
    coverAlt: "Poster art for FRAÜD",
    teaser: "A film about fraud among international students.",
    summary:
      "A narrative film project centered on fraud and pressure among international students, presented with public-facing listings and festival-ready materials.",
    roles: ["Film", "Production", "Promotion"],
    highlights: [
      "Listed on IMDb and Douban.",
      "Packaged with poster artwork and external festival-facing presence."
    ],
    externalLinks: [
      { label: "IMDb", href: "https://www.imdb.com/title/tt32035504/" },
      { label: "Douban", href: "https://movie.douban.com/subject/36934977/" },
      { label: "FilmFreeway", href: "https://filmfreeway.com/fraudmovie" }
    ],
    media: [
      {
        type: "image",
        title: "Poster Artwork",
        description: "Primary key art used to represent the film.",
        src: "/legacy/fraud.jpg",
        href: "https://filmfreeway.com/fraudmovie"
      }
    ]
  },
  {
    slug: "the-pills",
    title: "The Pills",
    code: "[FILM-05]",
    posterWord: "PILLS",
    category: "Film",
    year: "2023",
    projectType: "Horror Microfilm",
    duration: "Trailer / Festival",
    coverLabel: "Microfilm / Horror",
    coverPalette: ["#0e0e10", "#60313e", "#f1d5db"],
    coverImage: "/legacy/The_Pills.jpg",
    coverAlt: "Poster for The Pills horror microfilm",
    teaser: "A horror microfilm inspired by the Scream series.",
    summary:
      "A short horror microfilm project with a public FilmFreeway entry and launch trailer, developed around genre mood and compact visual storytelling.",
    roles: ["Film", "Editing", "Promotion"],
    highlights: [
      "Distributed with both festival-facing and trailer-facing materials.",
      "Anchored in a strong genre reference point with a distinct horror tone."
    ],
    externalLinks: [
      { label: "FilmFreeway", href: "https://filmfreeway.com/thepills2023" },
      { label: "Launch Trailer", href: "https://youtu.be/J0LGfoZQ-0Q" }
    ],
    media: [
      {
        type: "image",
        title: "Poster Artwork",
        description: "Key art used for the public-facing film page.",
        src: "/legacy/The_Pills.jpg",
        href: "https://filmfreeway.com/thepills2023"
      },
      {
        type: "video",
        title: "Trailer Link",
        description: "Launch trailer for the project.",
        href: "https://youtu.be/J0LGfoZQ-0Q"
      }
    ]
  },
  {
    slug: "persona-5-style-campaign-video",
    title: "Persona 5 Style Campaign Video",
    code: "[CAMPAIGN-06]",
    posterWord: "P5",
    category: "Client Work",
    year: "2023",
    projectType: "Campaign Video",
    duration: "Social / YouTube",
    coverLabel: "Campaign / Video Editing",
    coverPalette: ["#0d0d0f", "#8f1e27", "#f4dad6"],
    coverImage: "/legacy/P5_Resume.jpg",
    coverAlt: "Persona 5 style campaign video still",
    teaser: "A stylized election campaign video for UBC CSSA 2023, drawing on Persona 5 aesthetics.",
    summary:
      "A campaign video project produced for the UBC CSSA 2023 General Election, using a strong visual reference style to deliver a more distinctive social-first piece.",
    roles: ["Video Editing", "Graphic Design", "Campaign Content"],
    highlights: [
      "Adapted an instantly recognizable style into a campaign context.",
      "Published across both YouTube and Bilibili."
    ],
    externalLinks: [
      { label: "Watch on YouTube", href: "https://youtu.be/kdPPnUPtH-E" },
      { label: "Watch on BiliBili", href: "https://www.bilibili.com/video/BV1uL411S7Da/" }
    ],
    media: [
      {
        type: "image",
        title: "Campaign Still",
        description: "A still frame representing the campaign's graphic language.",
        src: "/legacy/P5_Resume.jpg",
        href: "https://youtu.be/kdPPnUPtH-E"
      }
    ]
  },
  {
    slug: "project-race",
    title: "Project Race",
    code: "[FILM-07]",
    posterWord: "RACE",
    category: "Film",
    year: "2023",
    projectType: "Toy Car Race Short",
    duration: "Short Video",
    coverLabel: "Short / Experimental Play",
    coverPalette: ["#101216", "#1b3d67", "#dce9fa"],
    coverImage: "/legacy/Project_Race.jpg",
    coverAlt: "Frame from Project Race toy car race short",
    teaser: "A toy car race short built around miniature motion, pace, and playful visual construction.",
    summary:
      "A compact short-form video project built around a toy car race concept, emphasizing movement, playful framing, and accessible web distribution.",
    roles: ["Video Editing", "Short-form Production"],
    highlights: [
      "Published on both YouTube and Bilibili.",
      "Shows hands-on experimentation with pace, framing, and miniature action."
    ],
    externalLinks: [
      { label: "Watch on YouTube", href: "https://youtu.be/i64iXe_CPfw/" },
      { label: "Watch on BiliBili", href: "https://www.bilibili.com/video/BV1PM411q7hA/" }
    ],
    media: [
      {
        type: "image",
        title: "Project Still",
        description: "Representative frame from the short.",
        src: "/legacy/Project_Race.jpg",
        href: "https://youtu.be/i64iXe_CPfw/"
      }
    ]
  }
];
