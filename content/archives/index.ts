import type { ArchiveCollection, ArchiveGroup } from "@/types/content";
import { beatyBiodiversityMuseumArchive } from "@/content/archives/beaty-biodiversity-museum";
import { bcAiEcosystemArchive } from "@/content/archives/bc-ai-ecosystem";
import { theUpgradeAiArchive } from "@/content/archives/theupgrade-ai";
import { personalArchive } from "@/content/archives/personal";
import { clientWorkArchive } from "@/content/archives/client-work";
import { researchPublicationArchive } from "@/content/archives/research-publication";
import { filmVideoArchive } from "@/content/archives/film-video";

export const archiveCollections: Record<ArchiveGroup, ArchiveCollection> = {
  "beaty-biodiversity-museum": beatyBiodiversityMuseumArchive,
  "bc-ai-ecosystem": bcAiEcosystemArchive,
  "theupgrade-ai": theUpgradeAiArchive,
  personal: personalArchive,
  "client-work": clientWorkArchive,
  "research-publication": researchPublicationArchive,
  "film-video": filmVideoArchive
};

export function getArchiveCollection(group: ArchiveGroup) {
  return archiveCollections[group];
}
