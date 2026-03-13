import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const siteUrl = "https://davidweng.eu.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.flatMap((project) => [
    {
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const
    },
    {
      url: `${siteUrl}/zh/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const
    }
  ]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/zh/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    ...projectEntries
  ];
}
