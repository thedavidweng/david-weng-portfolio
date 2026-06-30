import { projects } from "@/content/projects";
import { buildAgentEndpointPayload } from "@/lib/agent-endpoint";
import { buildAgentData } from "@/lib/agent-content";
import { generateLlmsFull } from "@/lib/llms-full";
import { generateLlmsTxt } from "@/lib/llms-txt";
import { generateIndexMd } from "@/lib/index-md";

test("buildAgentEndpointPayload includes english and chinese locale data", () => {
  const payload = buildAgentEndpointPayload();

  expect(payload.defaultLocale).toBe("en");
  expect(payload.locales.en.projects).toHaveLength(projects.length);
  expect(payload.locales.zh.projects).toHaveLength(projects.length);
  expect(payload.locales.en.identity.name).toBe("David Weng");
  expect(payload.locales.zh.identity.roles.length).toBeGreaterThan(0);
  expect(payload.locales.en.meta.agentEndpoint).toBe("https://davidweng.eu.org/agent");
});

test("buildAgentData returns structured JSON with all projects", () => {
  const data = buildAgentData("en");

  expect(data.projects).toHaveLength(projects.length);
  expect(data.identity.name).toBe("David Weng");
  expect(data.meta.agentEndpoint).toBe("https://davidweng.eu.org/agent");
});

test("agent content generators include services and projects", () => {
  const llmsTxt = generateLlmsTxt();
  const llmsFull = generateLlmsFull();
  const indexMd = generateIndexMd("en");

  expect(llmsTxt).toContain("## Projects");
  expect(llmsFull).toContain("## Services");
  expect(indexMd).toContain("## Agent Endpoints");

  for (const project of projects) {
    expect(llmsFull).toContain(project.slug);
    expect(indexMd).toContain(project.slug);
  }
});