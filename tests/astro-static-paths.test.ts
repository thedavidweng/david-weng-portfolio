import { projects } from "@/content/projects";
import { getProjectMarkdownStaticPaths, getProjectPageStaticPaths } from "@/lib/astro-static-paths";

test("getProjectPageStaticPaths returns every project slug for english and chinese", () => {
  const enPaths = getProjectPageStaticPaths("en");
  const zhPaths = getProjectPageStaticPaths("zh");

  expect(enPaths).toHaveLength(projects.length);
  expect(zhPaths).toHaveLength(projects.length);

  for (const project of projects) {
    const enEntry = enPaths.find((entry) => entry.params.slug === project.slug);
    const zhEntry = zhPaths.find((entry) => entry.params.slug === project.slug);

    expect(enEntry).toBeDefined();
    expect(zhEntry).toBeDefined();
    expect(enEntry?.props.pathname).toBe(`/projects/${project.slug}`);
    expect(zhEntry?.props.pathname).toBe(`/zh/projects/${project.slug}`);
    expect(enEntry?.props.project.slug).toBe(project.slug);
    expect(zhEntry?.props.project.slug).toBe(project.slug);
  }
});

test("getProjectMarkdownStaticPaths returns markdown routes for every slug", () => {
  const mdPaths = getProjectMarkdownStaticPaths();

  expect(mdPaths).toHaveLength(projects.length);
  expect(mdPaths.map((entry) => entry.params.slug).toSorted()).toEqual(
    projects.map((project) => project.slug).toSorted()
  );
});