import { projects } from "@/content/projects";
import { buildAgentEndpointPayload, buildAgentData } from "@/lib/agent-content";
import { generateIndexMd, generateLlmsFull } from "@/lib/site-markdown";
import { generateLlmsTxt } from "@/lib/llms-txt";
import { GET as getAgent } from "@/src/pages/agent";
import { GET as getLlmsTxt } from "@/src/pages/llms.txt";

test("agent payload and locale data include every project in both languages", () => {
  const payload = buildAgentEndpointPayload();
  const english = buildAgentData("en");
  const chinese = buildAgentData("zh");

  expect(payload.defaultLocale).toBe("en");
  expect(payload.locales.en.projects).toHaveLength(projects.length);
  expect(payload.locales.zh.projects).toHaveLength(projects.length);
  expect(payload.locales.en.identity.name).toBe("David Weng");
  expect(payload.locales.zh.identity.roles.length).toBeGreaterThan(0);
  expect(payload.locales.en.meta.endpoints.map((endpoint) => endpoint.url)).toContain(
    "https://davidweng.eu.org/agent"
  );

  expect(english.projects).toHaveLength(projects.length);
  expect(english.identity.name).toBe("David Weng");
  expect(chinese.projects).toHaveLength(projects.length);
  expect(chinese.identity.name).toBe("David Weng");
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

test("agent and llms.txt routes return typed bodies without route-level cache headers", async () => {
  const agent = await getAgent({} as never);
  const llms = await getLlmsTxt({} as never);

  expect(agent.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
  expect(agent.headers.get("Cache-Control")).toBeNull();
  expect(agent.headers.get("X-Robots-Tag")).toBeNull();
  expect(JSON.parse(await agent.text())).toEqual(buildAgentEndpointPayload());

  expect(llms.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  expect(llms.headers.get("Cache-Control")).toBeNull();
  expect(await llms.text()).toBe(generateLlmsTxt());
});
