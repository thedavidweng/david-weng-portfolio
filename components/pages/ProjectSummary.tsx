import { LocalizedInlineText } from "@/components/content/LocalizedInlineText";
import { projectLabel } from "@/content/projects";
import type { Locale, ProjectItem } from "@/types/content";

type ProjectSummaryProps = {
  locale: Locale;
  project: ProjectItem;
};

export function ProjectSummary({ locale, project }: ProjectSummaryProps) {
  if (project.detailSummary) {
    return (
      <LocalizedInlineText
        locale={locale}
        value={project.detailSummary}
        linkClassName="project-hero__summary-link"
      />
    );
  }

  return projectLabel(project.summary, locale);
}