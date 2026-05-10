import { NextResponse } from "next/server";
import {
  siteIdentity,
  servicesContent,
  contactContent,
  aboutContent
} from "@/content/site";
import { projects } from "@/content/projects";

const SITE_URL = "https://davidweng.eu.org";

export async function GET() {
  const agentData = {
    identity: {
      name: siteIdentity.name,
      fullName: siteIdentity.fullName,
      roles: siteIdentity.roles.en
    },
    location: {
      city: "Vancouver",
      country: "Canada",
      workingScope: "Global"
    },
    services: servicesContent.items.map((s) => ({
      name: s.title.en,
      description: s.description.en
    })),
    projects: projects.map((p) => ({
      slug: p.slug,
      title: p.title.en,
      category: p.category.en,
      year: p.year,
      type: p.projectType.en,
      roles: p.roles.en,
      summary: p.summary.en,
      url: `${SITE_URL}/projects/${p.slug}`
    })),
    contact: {
      email: contactContent.email,
      emailDisplay: contactContent.emailDisplay,
      linkedIn: contactContent.linkedinHref,
      instagram: contactContent.instagramHref,
      github: contactContent.githubHref,
      homepage: aboutContent.homepageHref
    },
    meta: {
      website: SITE_URL,
      blog: "https://blog.davidweng.eu.org/",
      languages: ["en", "zh"],
      sitemap: `${SITE_URL}/sitemap.xml`,
      llmsTxt: `${SITE_URL}/llms.txt`,
      robotsTxt: `${SITE_URL}/robots.txt`,
      agentEndpoint: `${SITE_URL}/agent`,
      markdownVersion: `${SITE_URL}/index.md`
    }
  };

  return new NextResponse(JSON.stringify(agentData, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
