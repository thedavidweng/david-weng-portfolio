import { describe, expect, test } from "vitest";
import { buildProjectPageData } from "@/lib/page-helpers";

describe("project page metadata", () => {
  test("english project pages expose project-specific canonical, Open Graph, and Twitter metadata", () => {
    const data = buildProjectPageData("fraud", "en");
    if (!data) throw new Error("Expected fraud project data");

    const { metadata } = data;

    expect(metadata.title).toBe("FRAÜD | David Weng");
    expect(metadata.description).toBe(
      "Facing debt and manipulation from their senior in academia, two international students are pushed toward financial fraud and the fallout that follows."
    );
    expect(metadata.canonical).toBe("/projects/fraud");
    expect(metadata.openGraph.title).toBe("FRAÜD | David Weng");
    expect(metadata.openGraph.description).toBe(metadata.description);
    expect(metadata.openGraph.url).toBe("/projects/fraud");
    expect(metadata.openGraph.images).toEqual([
      {
        url: "/projects/film-video/film/fraud/cover.avif",
        alt: "FRAÜD cover frame"
      }
    ]);
    expect(metadata.twitter.title).toBe("FRAÜD | David Weng");
    expect(metadata.twitter.description).toBe(metadata.description);
    expect(metadata.twitter.images).toEqual(["/projects/film-video/film/fraud/cover.avif"]);
  });

  test("localized project pages expose localized canonical, alternates, Open Graph, and Twitter metadata", () => {
    const data = buildProjectPageData("fraud", "zh");
    if (!data) throw new Error("Expected fraud project data");

    const { metadata } = data;

    expect(metadata.title).toBe("信途 | David Weng");
    expect(metadata.description).toBe(
      "面对学术体系中学姐的债务压迫与操控，两名国际学生一步步被推向金融欺诈，以及随之而来的后果。"
    );
    expect(metadata.canonical).toBe("/zh/projects/fraud");
    expect(metadata.languages).toEqual({
      en: "/projects/fraud",
      zh: "/zh/projects/fraud"
    });
    expect(metadata.openGraph.title).toBe("信途 | David Weng");
    expect(metadata.openGraph.description).toBe(metadata.description);
    expect(metadata.openGraph.url).toBe("/zh/projects/fraud");
    expect(metadata.openGraph.locale).toBe("zh");
    expect(metadata.openGraph.alternateLocale).toBe("en");
    expect(metadata.openGraph.images).toEqual([
      {
        url: "/projects/film-video/film/fraud/cover.avif",
        alt: "《信途》封面画面"
      }
    ]);
    expect(metadata.twitter.title).toBe("信途 | David Weng");
    expect(metadata.twitter.description).toBe(metadata.description);
    expect(metadata.twitter.images).toEqual(["/projects/film-video/film/fraud/cover.avif"]);
  });

  test("gourd metadata stays plain text even when the detail page summary contains inline links", () => {
    const englishData = buildProjectPageData("gourd", "en");
    const chineseData = buildProjectPageData("gourd", "zh");
    if (!englishData || !chineseData) throw new Error("Expected gourd project data");

    expect(englishData.metadata.description).toBe(
      'A short film made in high school, loosely adapted from "The Artist" by Shiga Naoya.'
    );
    expect(chineseData.metadata.description).toBe("高中拍摄的微电影，松散地改编自志贺直哉《清兵卫和葫芦》");
  });
});