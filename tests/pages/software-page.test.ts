import { within } from "@testing-library/dom";
import { renderAstroPage } from "@/tests/helpers/render-astro";
import SoftwareLayout from "@/src/layouts/SoftwareLayout.astro";
import { contributions, softwareProjects, softwareTools } from "@/content/software";

test("renders the software page with projects, tools, contributions, roles, and contact", async () => {
  const doc = await renderAstroPage(SoftwareLayout, { locale: "en" });
  const page = within(doc.body);
  const main = doc.querySelector("#main-content") as HTMLElement;

  expect(doc.title).toBe("Software | David Weng");
  expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://davidweng.eu.org/software/");
  expect(page.getByRole("heading", { level: 1, name: /^software$/i })).toBeInTheDocument();
  expect(Array.from(main.querySelectorAll(":scope > section")).map((section) => section.id)).toEqual([
    "top",
    "software-projects",
    "tools",
    "contributions",
    "roles",
    "contact"
  ]);
  expect(main.dataset.githubUser).toBe("thedavidweng");
  expect(doc.querySelectorAll("#software-projects [data-repo]")).toHaveLength(softwareProjects.length);
  expect(doc.querySelectorAll("#tools [data-repo]")).toHaveLength(softwareTools.length);
  expect(doc.querySelectorAll(".upstream__item")).toHaveLength(contributions.length);
  expect(page.getByRole("link", { name: "OpenKara" })).toHaveAttribute("href", "https://github.com/thedavidweng/OpenKara");
  expect(page.getByRole("link", { name: /software/i, current: "page" })).toHaveAttribute("href", "/software/");
  expect(page.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh/software/");
});

test("renders the chinese software page", async () => {
  const doc = await renderAstroPage(SoftwareLayout, { locale: "zh" });

  expect(doc.documentElement.getAttribute("lang")).toBe("zh");
  expect(doc.title).toBe("软件 | David Weng");
  expect(within(doc.body).getByRole("link", { name: "EN" })).toHaveAttribute("href", "/software/");
});
