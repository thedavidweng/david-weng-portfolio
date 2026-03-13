import type { ProjectMediaItem } from "@/types/content";

export function getYouTubeEmbedUrl(href?: string) {
  if (!href) {
    return null;
  }

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.slice(1);

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (url.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${url.pathname}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function isArchiveVideoItem(item: ProjectMediaItem) {
  return item.type === "image" && item.archiveKind === "video";
}

export function getProjectLinkIconType(href: string) {
  return href.includes("youtu") ? "youtube" : "external";
}
