import { localized } from "@/lib/i18n";

export const projectSectionContent = {
  eyebrow: localized("02 / Archive", "02 / 档案"),
  title: localized("Projects", "项目"),
  description: localized(
    "Current work spanning open source software, archive collections, films, and video.",
    "当前作品包含开源软件、档案集合、电影与视频。"
  ),
  filtersLabel: localized("Project categories", "项目分类"),
  carouselLabel: localized("Projects carousel", "项目轮播"),
  previousLabel: localized("Previous projects", "上一组项目"),
  nextLabel: localized("Next projects", "下一组项目"),
  previousButtonText: localized("Prev", "上一组"),
  nextButtonText: localized("Next", "下一组"),
  openItemLabel: localized("View project", "查看项目"),
  software: {
    code: "[CODE-01]",
    posterWord: "CODE",
    title: localized("Open Source Software", "开源软件"),
    category: localized("Software", "软件"),
    teaser: localized(
      "Desktop apps for music, command line tools in Go, and 120+ merged pull requests upstream.",
      "音乐桌面应用、Go 命令行工具，以及 120 多个被合并的上游 PR。"
    ),
    coverLabel: localized("Rust, TypeScript, and Go", "Rust、TypeScript 与 Go")
  }
};
