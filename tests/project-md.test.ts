import { getProjectBySlug } from "@/lib/projects";
import { generateProjectMd } from "@/lib/project-md";

test("generateProjectMd renders english project markdown with highlights and canonical link", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  const markdown = generateProjectMd(project, "en");

  expect(markdown).toContain("# FRAÜD");
  expect(markdown).toContain("**Category**: Film");
  expect(markdown).toContain(`**Year**: ${project.year}`);
  expect(markdown).toContain("## Highlights");
  expect(project.highlights.en[0]).toBeTruthy();
  expect(markdown).toContain(project.highlights.en[0]!);
  expect(markdown).toContain("[View full project](https://davidweng.eu.org/projects/fraud)");
});

test("generateProjectMd renders chinese project markdown on the zh path", () => {
  const project = getProjectBySlug("gourd");

  if (!project) {
    throw new Error("Expected gourd project to exist");
  }

  const markdown = generateProjectMd(project, "zh");

  expect(markdown).toContain(`# ${project.title.zh}`);
  expect(markdown).toContain("**Category**:");
  expect(markdown).toContain(project.category.zh);
  expect(markdown).toContain("[View full project](https://davidweng.eu.org/zh/projects/gourd)");
});
