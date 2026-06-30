import { projects } from "@/content/projects";

test("every project slug has english and chinese static paths", () => {
  for (const project of projects) {
    expect(project.slug).toBeTruthy();
    expect(`/projects/${project.slug}`).toMatch(/^\/projects\/[\w-]+$/);
    expect(`/zh/projects/${project.slug}`).toMatch(/^\/zh\/projects\/[\w-]+$/);
  }

  expect(projects.length).toBeGreaterThan(0);
});