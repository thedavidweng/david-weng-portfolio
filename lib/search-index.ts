import { projects } from "@/content/projects";
import { projectSectionContent } from "@/content/project-section";
import { blogUrl, contactContent, footerContent, navigationItems, paletteContent } from "@/content/site";
import { repoUrl, resumeHref, softwarePageContent, softwareProjects, softwareTools } from "@/content/software";
import { getLocaleHomePath, getLocalizedText, getLocalizedValue, getProjectPath, getSoftwarePath, toLocalePath } from "@/lib/i18n";
import { orderProjectsByCategory } from "@/lib/project-carousel";
import type { PaletteData, PaletteEntry } from "@/lib/palette-search";
import type { Locale } from "@/types/content";

const host = (href: string) => new URL(href).host.replace(/^www\./, "");

export function resolveNavHref(href: string, locale: Locale): string {
  if (href.startsWith("http")) return href;
  if (href.startsWith("#")) return `${getLocaleHomePath(locale)}${href}`;
  return toLocalePath(href, locale);
}

export function buildPaletteData(locale: Locale, pathname: string): PaletteData {
  const t = (value: { en: string; zh: string }) => getLocalizedText(value, locale);
  const groups = paletteContent.groups;
  const actions = paletteContent.actions;
  const otherLocale = locale === "en" ? "zh" : "en";

  const sections: PaletteEntry[] = navigationItems.map((item) => ({
    group: t(groups.sections),
    title: t(item.label),
    hint: item.href.startsWith("http") ? host(item.href) : item.href,
    href: resolveNavHref(item.href, locale)
  }));

  const work: PaletteEntry[] = orderProjectsByCategory(projects).map((project) => ({
    group: t(groups.work),
    title: t(project.title),
    hint: `${t(project.category)} · ${project.year}`,
    keywords: [t(project.teaser), ...getLocalizedValue(project.roles, locale), project.posterWord].join(" "),
    href: getProjectPath(locale, project.slug)
  }));

  const software: PaletteEntry[] = softwareProjects.map((project) => ({
    group: t(groups.software),
    title: project.repo,
    hint: t(project.description),
    keywords: [project.language, ...getLocalizedValue(project.tags, locale)].join(" "),
    href: repoUrl(project.repo)
  }));

  const tools: PaletteEntry[] = softwareTools.map((tool) => ({
    group: t(groups.tools),
    title: tool.repo,
    hint: t(tool.description),
    keywords: "Go CLI",
    href: repoUrl(tool.repo)
  }));

  const links: PaletteEntry[] = [
    {
      group: t(groups.links),
      title: t(projectSectionContent.software.title),
      hint: getSoftwarePath(locale),
      href: getSoftwarePath(locale)
    },
    { group: t(groups.links), title: t(softwarePageContent.resumeLabel), hint: host(resumeHref), href: resumeHref },
    { group: t(groups.links), title: t(navigationItems[4].label), hint: host(blogUrl), href: blogUrl },
    {
      group: t(groups.links),
      title: t(actions.language),
      hint: getLocalizedText(footerContent.languageLabel, locale),
      href: toLocalePath(pathname, otherLocale)
    }
  ];

  const social: PaletteEntry[] = contactContent.socials.map((item) => ({
    group: t(groups.social),
    title: item.label,
    hint: host(item.href),
    href: item.href
  }));

  const commands: PaletteEntry[] = [
    { group: t(groups.actions), title: t(actions.darkTheme), hint: t(actions.theme), action: "theme" },
    { group: t(groups.actions), title: t(actions.copyEmail), hint: contactContent.email, action: "copy" },
    {
      group: t(groups.actions),
      title: t(actions.sendEmail),
      hint: contactContent.email,
      href: `mailto:${contactContent.email}`
    }
  ];

  return {
    entries: [...sections, ...work, ...software, ...tools, ...links, ...social, ...commands],
    labels: {
      lightTheme: t(actions.lightTheme),
      darkTheme: t(actions.darkTheme),
      copied: t(actions.copied),
      empty: t(paletteContent.empty)
    },
    email: contactContent.email
  };
}
