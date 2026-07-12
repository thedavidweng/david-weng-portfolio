// Use this collection to map files from public/projects/personal-video by filename.
// Keep semantic metadata here instead of relying on image metadata exported from editing exports.
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";

export const personalVideoArchive = createEmptyArchiveCollection(
  "personal-video",
  "Personal Video Projects",
  "个人视频项目"
);

personalVideoArchive.items = [
  {
    file: "video/persona-5-style-campaign-video-cover.avif",
    kind: "video",
    title: localized("Persona 5 Style Campaign Video", "Persona 5 Style Campaign Video"),
    caption: localized(
      "Stylized campaign video drawing on Persona 5 references for a student election context.",
      "为学生竞选场景制作、借鉴 Persona 5 视觉语言的风格化视频。"
    ),
    publishedUrl: "https://youtu.be/kdPPnUPtH-E",
    order: 10
  },
  {
    file: "video/project-race-cover.avif",
    kind: "video",
    title: localized("Project Race", "Project Race"),
    caption: localized(
      "Miniature racing short, pacing and motion as the main focus.",
      "玩具车竞速短视频，以节奏与运动感为核心。"
    ),
    publishedUrl: "https://youtu.be/i64iXe_CPfw/",
    order: 11
  },
  {
    file: "video/youtube-t9Si3THY5OU.avif",
    kind: "video",
    title: localized("PHANTOM PAIN", "PHANTOM PAIN"),
    caption: localized(
      "Edit built from footage of Phantom of the Paradise.",
      "基于《天堂魅影》电影素材剪辑出的短片。"
    ),
    publishedUrl: "https://youtu.be/t9Si3THY5OU",
    order: 12
  }
];
