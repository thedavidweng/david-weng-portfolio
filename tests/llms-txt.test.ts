import { projects } from "@/content/projects";
import { generateLlmsTxt } from "@/lib/llms-txt";

test("llms.txt lists every project from content/projects.ts", () => {
  const output = generateLlmsTxt();

  for (const project of projects) {
    expect(output).toContain(`https://davidweng.eu.org/projects/${project.slug}`);
    expect(output).toContain(project.title.en);
  }

  const projectUrlCount = (output.match(/https:\/\/davidweng\.eu\.org\/projects\//g) ?? []).length;
  expect(projectUrlCount).toBe(projects.length);
});