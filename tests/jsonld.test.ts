import { getProjectBySlug } from "@/lib/projects";
import {
  buildCreativeWorkSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  buildWebSiteSchema
} from "@/lib/jsonld";
import { servicesContent } from "@/content/site";

test("buildPersonSchema exposes identity, services catalog, and social links", () => {
  const schema = buildPersonSchema("en");

  expect(schema["@type"]).toBe("Person");
  expect(schema.name).toBeTruthy();
  expect(schema.jobTitle).toBeTruthy();
  expect(schema.sameAs).toEqual(
    expect.arrayContaining([
      "https://www.linkedin.com/in/thedavidweng/",
      "https://www.instagram.com/davidwengpro/",
      "https://github.com/thedavidweng",
      "https://thedavidweng.github.io/"
    ])
  );
  expect(schema.knowsAbout).toContain("Content Operations");
  expect(schema.hasOfferCatalog.itemListElement).toHaveLength(servicesContent.items.length);
});

test("buildOrganizationSchema and buildWebSiteSchema expose site metadata", () => {
  const organization = buildOrganizationSchema("zh");
  const website = buildWebSiteSchema("en");

  expect(organization["@type"]).toBe("Organization");
  expect(organization.logo).toBe("https://davidweng.eu.org/brand/og-image.png");
  expect(organization.makesOffer).toHaveLength(servicesContent.items.length);
  expect(website["@type"]).toBe("WebSite");
  expect(website.inLanguage).toEqual(["en", "zh"]);
});

test("buildCreativeWorkSchema includes cover image URLs when available", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  const schema = buildCreativeWorkSchema(project, "en");

  expect(schema["@type"]).toBe("CreativeWork");
  expect(schema.name).toBe(project.title.en);
  expect(schema.dateCreated).toBe(project.year);
  expect(schema.image).toBe(`https://davidweng.eu.org${project.coverImage}`);
  expect(schema.thumbnailUrl).toBe(`https://davidweng.eu.org${project.coverImage}`);
});
