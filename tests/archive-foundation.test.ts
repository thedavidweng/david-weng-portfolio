import { existsSync } from "node:fs";
import { join } from "node:path";
import { archiveGroups, getArchiveStoragePath, isArchiveGroup } from "@/content/archives/_shared";
import { beatyBiodiversityMuseumArchive } from "@/content/archives/beaty-biodiversity-museum";
import { bcAiEcosystemArchive } from "@/content/archives/bc-ai-ecosystem";
import { theUpgradeAiArchive } from "@/content/archives/theupgrade-ai";
import { personalArchive } from "@/content/archives/personal";
import { clientWorkArchive } from "@/content/archives/client-work";
import { filmVideoArchive } from "@/content/archives/film-video";
import { personalVideoArchive } from "@/content/archives/personal-video";
import { legacyArchiveMap } from "@/content/archives/legacy-map";

test("defines the approved archive groups, collections, and directory skeleton", () => {
  expect(archiveGroups).toEqual([
    "beaty-biodiversity-museum",
    "bc-ai-ecosystem",
    "theupgrade-ai",
    "personal",
    "personal-video",
    "client-work",
    "film-video"
  ]);
  expect(isArchiveGroup("bc-ai-ecosystem")).toBe(true);
  expect(isArchiveGroup("film-video")).toBe(true);
  expect(isArchiveGroup("personal-video")).toBe(true);
  expect(isArchiveGroup("legacy")).toBe(false);
  expect(getArchiveStoragePath("beaty-biodiversity-museum")).toBe("client-work/beaty-biodiversity-museum");
  expect(getArchiveStoragePath("bc-ai-ecosystem")).toBe("client-work/bc-ai-ecosystem");
  expect(getArchiveStoragePath("theupgrade-ai")).toBe("client-work/theupgrade-ai");
  expect(getArchiveStoragePath("film-video")).toBe("film-video");

  expect(beatyBiodiversityMuseumArchive.group).toBe("beaty-biodiversity-museum");
  expect(bcAiEcosystemArchive.group).toBe("bc-ai-ecosystem");
  expect(theUpgradeAiArchive.group).toBe("theupgrade-ai");
  expect(personalArchive.group).toBe("personal");
  expect(clientWorkArchive.group).toBe("client-work");
  expect(filmVideoArchive.group).toBe("film-video");
  expect(personalVideoArchive.group).toBe("personal-video");

  expect(
    existsSync(join(process.cwd(), "public/projects/client-work/bc-ai-ecosystem/slides"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/client-work/theupgrade-ai/event-photos"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/client-work/beaty-biodiversity-museum/booklet"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/client-work/beaty-biodiversity-museum/signage"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/client-work/beaty-biodiversity-museum/report"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/client-work/beaty-biodiversity-museum/video"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/film-video/film/fraud"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/film-video/film/the-pills"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/film-video/film/gourd"))
  ).toBe(true);
  expect(
    existsSync(join(process.cwd(), "public/projects/personal-video/video"))
  ).toBe(true);
});

test("classifies current legacy projects into the approved archive groups", () => {
  expect(legacyArchiveMap["beaty-biodiversity-museum-annual-report-2022-2023"]).toBe(
    "beaty-biodiversity-museum"
  );
  expect(legacyArchiveMap["transcending-barriers"]).toBeUndefined();
  expect(legacyArchiveMap["davids-blog"]).toBe("personal");
  expect(legacyArchiveMap["fraud"]).toBe("film-video");
  expect(legacyArchiveMap["the-pills"]).toBe("film-video");
  expect(legacyArchiveMap["persona-5-style-campaign-video"]).toBeUndefined();
  expect(legacyArchiveMap["project-race"]).toBeUndefined();
});
