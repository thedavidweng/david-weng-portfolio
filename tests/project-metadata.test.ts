import { describe, expect, test } from "vitest";
import { generateMetadata as generateEnglishProjectMetadata } from "@/app/projects/[slug]/page";
import { generateMetadata as generateLocalizedProjectMetadata } from "@/app/[locale]/projects/[slug]/page";

describe("project page metadata", () => {
  test("english project pages expose project-specific canonical, Open Graph, and Twitter metadata", async () => {
    const metadata = await generateEnglishProjectMetadata({
      params: Promise.resolve({ slug: "fraud" })
    });

    expect(metadata.title).toBe("FRAÜD | David Weng");
    expect(metadata.description).toBe(
      "Facing debt and manipulation from their senior in academia, two international students are pushed toward financial fraud and the fallout that follows."
    );
    expect(metadata.alternates?.canonical).toBe("/projects/fraud");
    expect(metadata.openGraph?.title).toBe("FRAÜD | David Weng");
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.url).toBe("/projects/fraud");
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/projects/film-video/film/fraud/cover.avif",
        alt: "FRAÜD cover frame"
      }
    ]);
    expect(metadata.twitter?.title).toBe("FRAÜD | David Weng");
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.twitter?.images).toEqual(["/projects/film-video/film/fraud/cover.avif"]);
  });

  test("localized project pages expose localized canonical, alternates, Open Graph, and Twitter metadata", async () => {
    const metadata = await generateLocalizedProjectMetadata({
      params: Promise.resolve({ locale: "zh", slug: "fraud" })
    });

    expect(metadata.title).toBe("信途 | David Weng");
    expect(metadata.description).toBe(
      "面对学术体系中学姐的债务压迫与操控，两名国际学生一步步被推向金融欺诈，以及随之而来的后果。"
    );
    expect(metadata.alternates?.canonical).toBe("/zh/projects/fraud");
    expect(metadata.alternates?.languages).toEqual({
      en: "/projects/fraud",
      zh: "/zh/projects/fraud"
    });
    expect(metadata.openGraph?.title).toBe("信途 | David Weng");
    expect(metadata.openGraph?.description).toBe(metadata.description);
    expect(metadata.openGraph?.url).toBe("/zh/projects/fraud");
    expect(metadata.openGraph?.locale).toBe("zh");
    expect(metadata.openGraph?.alternateLocale).toBe("en");
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/projects/film-video/film/fraud/cover.avif",
        alt: "《信途》封面画面"
      }
    ]);
    expect(metadata.twitter?.title).toBe("信途 | David Weng");
    expect(metadata.twitter?.description).toBe(metadata.description);
    expect(metadata.twitter?.images).toEqual(["/projects/film-video/film/fraud/cover.avif"]);
  });

  test("gourd metadata stays plain text even when the detail page summary contains inline links", async () => {
    const englishMetadata = await generateEnglishProjectMetadata({
      params: Promise.resolve({ slug: "gourd" })
    });
    const chineseMetadata = await generateLocalizedProjectMetadata({
      params: Promise.resolve({ locale: "zh", slug: "gourd" })
    });

    expect(englishMetadata.description).toBe(
      'A short film made in high school, loosely adapted from "The Artist" by Shiga Naoya.'
    );
    expect(chineseMetadata.description).toBe("高中拍摄的微电影，松散地改编自志贺直哉《清兵卫和葫芦》");
  });
});
