import type { Locale, ProjectItem } from "@/types/content";
import { SITE_URL } from "@/lib/agent-content";
import { getLocalizedText } from "@/lib/i18n";

export function generateProjectMd(project: ProjectItem, locale: Locale): string {
  const path = locale === "en" ? `/projects/${project.slug}` : `/zh/projects/${project.slug}`;

  return `# ${getLocalizedText(project.title, locale)}

**Category**: ${getLocalizedText(project.category, locale)}
**Year**: ${project.year}
**Type**: ${getLocalizedText(project.projectType, locale)}
**Roles**: ${project.roles[locale].join(", ")}

${getLocalizedText(project.summary, locale)}

## Highlights

${project.highlights[locale].map((h) => `- ${h}`).join("\n")}

---

[View full project](${SITE_URL}${path})
`;
}