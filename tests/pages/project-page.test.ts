import { within } from "@testing-library/dom";
import { renderAstroPage } from "@/tests/helpers/render-astro";
import ProjectLayout from "@/src/layouts/ProjectLayout.astro";
import { buildProjectPageData } from "@/lib/project-pages";

async function renderProjectPage(slug: string, locale: "en" | "zh") {
  const data = buildProjectPageData(slug, locale);
  if (!data) throw new Error(`Expected ${slug} project to exist`);

  const doc = await renderAstroPage(ProjectLayout, { locale, ...data });
  return { doc, page: within(doc.body) };
}

test("renders localized chinese project detail content and language switch", async () => {
  const { doc, page } = await renderProjectPage("fraud", "zh");

  expect(doc.documentElement.getAttribute("lang")).toBe("zh");
  expect(page.getByRole("heading", { name: /^信途$/i })).toBeInTheDocument();
  expect(page.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/projects/fraud");
  expect(page.getByRole("link", { name: /返回项目列表/i })).toHaveAttribute("href", "/zh/#projects");
  expect(page.queryByRole("heading", { name: /项目价值/i })).not.toBeInTheDocument();
  expect(page.queryByRole("heading", { name: /档案墙/i })).not.toBeInTheDocument();
  expect(page.queryByRole("heading", { name: /混合媒介结构/i })).not.toBeInTheDocument();
  expect(page.getByRole("heading", { name: /演职人员/i })).toBeInTheDocument();
  expect(page.getAllByRole("link", { name: /^翁佳宸/i })[0]).toHaveAttribute("href", "https://www.imdb.com/name/nm16014585/");
  expect(page.getAllByRole("link", { name: /^陈镘伊/i })[0]).toHaveAttribute("href", "https://www.imdb.com/name/nm16014588/");
  expect(page.getAllByRole("link", { name: /IMDb/i }).length).toBeGreaterThan(0);
  expect(page.getAllByRole("link", { name: /豆瓣/i }).length).toBeGreaterThan(0);
});

test("renders dedicated film pages with full posters, linked credits, and horizontal still rails", async () => {
  const thePills = await renderProjectPage("the-pills", "en");
  const englishCredits = thePills.page
    .getByRole("heading", { name: /^Cast and Crew$/i })
    .closest(".project-film__credits");

  if (!englishCredits) {
    throw new Error("Expected The Pills credits panel to render");
  }

  expect(thePills.page.getByRole("heading", { name: /^The Pills$/i })).toBeInTheDocument();
  expect(thePills.page.getAllByRole("img", { name: /The Pills main poster/i }).length).toBeGreaterThan(0);
  expect(within(englishCredits as HTMLElement).getAllByRole("link", { name: /^David Weng/i })[0]).toHaveAttribute(
    "href",
    "https://www.imdb.com/name/nm16014585/"
  );
  expect(thePills.page.getByRole("heading", { name: /^Stills$/i })).toBeInTheDocument();
  expect(thePills.page.getByRole("heading", { name: /^Posters$/i })).toBeInTheDocument();
  expect(thePills.page.queryByTitle(/The Pills/i)).not.toBeInTheDocument();
  expect(thePills.page.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(thePills.page.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(thePills.doc.querySelector(".project-film__stills-rail")).toBeTruthy();
  expect(thePills.page.getByRole("button", { name: /Preview The Pills still 01/i })).toBeInTheDocument();

  const gourd = await renderProjectPage("gourd", "zh");

  expect(gourd.page.getByRole("heading", { name: /^清兵卫$/i })).toBeInTheDocument();
  expect(gourd.page.getByRole("heading", { name: /演职人员/i })).toBeInTheDocument();
  expect(gourd.page.getByText(/^孙梓涵$/)).toBeInTheDocument();
  expect(gourd.page.queryByRole("link", { name: /^孙梓涵$/ })).not.toBeInTheDocument();
  expect(gourd.page.getAllByRole("img", { name: /清兵卫主海报/i }).length).toBeGreaterThan(0);
  expect(gourd.page.getByRole("heading", { name: /^剧照$/i })).toBeInTheDocument();
  expect(gourd.page.getByRole("heading", { name: /^海报$/i })).toBeInTheDocument();
  expect(gourd.doc.querySelectorAll(".project-film__stills-item").length).toBeGreaterThan(0);
  expect(gourd.page.getByRole("button", { name: /预览 清兵卫剧照 01/i })).toBeInTheDocument();
});

test("renders gourd film release links on the english detail page", async () => {
  const { page } = await renderProjectPage("gourd", "en");

  expect(page.getByRole("heading", { name: /^Gourd$/i })).toBeInTheDocument();
  expect(page.getByRole("link", { name: /IMDb/i })).toHaveAttribute(
    "href",
    "https://www.imdb.com/title/tt35677249/"
  );
  expect(page.getByRole("link", { name: /FilmFreeway/i })).toHaveAttribute(
    "href",
    "https://filmfreeway.com/GOURD"
  );
});

test("renders linked rich-text summary on the english gourd detail page", async () => {
  const { doc, page } = await renderProjectPage("gourd", "en");
  const summary = doc.querySelector(".project-hero__summary");

  expect(summary).toHaveTextContent(
    'A short film made in high school, loosely adapted from "The Artist(opens in new tab)" by Shiga Naoya.'
  );
  expect(page.getByRole("link", { name: /^The Artist/i })).toHaveAttribute(
    "href",
    "https://en.wikisource.org/wiki/Modern_Japanese_Stories/The_Artist"
  );
});

test("renders linked rich-text summary on the chinese gourd detail page", async () => {
  const { doc, page } = await renderProjectPage("gourd", "zh");
  const summary = doc.querySelector(".project-hero__summary");

  expect(summary).toHaveTextContent("高中拍摄的微电影，松散地改编自志贺直哉《清兵卫和葫芦》(opens in new tab)");
  expect(page.getByRole("link", { name: /清兵卫和葫芦/i })).toHaveAttribute(
    "href",
    "https://ja.wikipedia.org/wiki/%E6%B8%85%E5%85%B5%E8%A1%9B%E3%81%A8%E7%93%A2%E7%AE%AA"
  );
});

test("renders non-YouTube film projects as release-info pages without generic case-study blocks", async () => {
  const { doc, page } = await renderProjectPage("fraud", "en");

  expect(page.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(page.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(page.queryByTitle(/FRAÜD/i)).not.toBeInTheDocument();
  expect(page.getByRole("heading", { name: /^Cast and Crew$/i })).toBeInTheDocument();
  expect(page.getAllByRole("img", { name: /FRAÜD main poster/i }).length).toBeGreaterThan(0);
  expect(page.getAllByRole("link", { name: /IMDb/i }).length).toBeGreaterThan(0);
  expect(page.getAllByRole("link", { name: /Douban/i }).length).toBeGreaterThan(0);
  expect(doc.querySelector(".project-film__posters-rail")).toBeTruthy();
});

test("renders dedicated film hero blocks in intro-poster-credits order for mobile-specific layout control", async () => {
  const { doc } = await renderProjectPage("fraud", "en");

  const introBlock = doc.querySelector(".project-film__intro");
  const posterBlock = doc.querySelector(".project-film__poster");
  const creditsBlock = doc.querySelector(".project-film__credits-wrap");

  expect(introBlock).toBeTruthy();
  expect(posterBlock).toBeTruthy();
  expect(creditsBlock).toBeTruthy();
  expect(introBlock?.compareDocumentPosition(posterBlock as Node)).toBe(4);
  expect(posterBlock?.compareDocumentPosition(creditsBlock as Node)).toBe(4);
});

test("renders article projects as branded handoff pages to the published Beacon article", async () => {
  const { doc, page } = await renderProjectPage("transcending-barriers", "en");

  expect(page.getByRole("heading", { name: /Transcending Barriers/i })).toBeInTheDocument();
  expect(doc.querySelector(".project-page--external-handoff")).toBeTruthy();
  expect(doc.querySelector(".project-hero__cover")).toBeFalsy();
  expect(page.getByText(/Published in Beacon: Journal of Media Studies/i)).toBeInTheDocument();
  expect(page.getByRole("heading", { name: /^Beacon: Journal of Media Studies$/i })).toBeInTheDocument();
  expect(page.getByRole("link", { name: /Read on Beacon/i })).toHaveAttribute(
    "href",
    "https://beaconjournal.arts.ubc.ca/transcending-barriers-viewing-practices-of-games-of-thrones-in-china-india-and-russia/"
  );
  expect(page.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(page.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
});

test("renders archive-backed BC + AI Ecosystem media with event photo credit", async () => {
  const { doc, page } = await renderProjectPage("designs-for-bc-ai-ecosystem", "en");

  expect(page.getByRole("heading", { name: /Archive for BC \+ AI Ecosystem/i })).toBeInTheDocument();
  expect(page.getByRole("img", { name: /April speaker graphic/i })).toBeInTheDocument();
  expect(page.getByRole("img", { name: /January meetup photo/i })).toBeInTheDocument();
  expect(doc.querySelector(".project-media__wall")).toBeTruthy();
  expect(doc.querySelector(".react-photo-album--rows")).toBeTruthy();
  expect(page.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(page.getByRole("heading", { name: /^Archives$/i })).toBeInTheDocument();
  expect(page.queryByText(/The archive is prepared to hold square social assets/i)).not.toBeInTheDocument();
  expect(doc.querySelectorAll(".project-media__wall-overlay").length).toBeGreaterThan(0);
  expect(page.queryByRole("heading", { name: /April meetup slides/i })).not.toBeInTheDocument();
  expect(page.queryByText(/Square social graphic from the January campaign set/i)).not.toBeInTheDocument();
  const creditLinks = page.getAllByRole("link", { name: /Michelle Diamond/i });
  expect(creditLinks.length).toBeGreaterThan(0);
  creditLinks.forEach((link) => {
    expect(link).toHaveAttribute("href", "https://www.instagram.com/diamondsedgephotography/");
    expect(link.closest(".project-media__wall-overlay")).toBeTruthy();
  });
  const youtubeLinks = page.getAllByRole("link", { name: /^YouTube/i });
  expect(youtubeLinks.length).toBe(7);
  expect(youtubeLinks[0]).toHaveAttribute("href", "https://youtu.be/ZN-IywZzAp0");
  youtubeLinks.forEach((link) => {
    expect(link.closest(".project-media__wall-overlay")).toBeTruthy();
  });
});

test("renders Beaty archive with a static works wall above a separate video section", async () => {
  const { doc, page } = await renderProjectPage("beaty-biodiversity-museum-annual-report-2022-2023", "en");

  expect(page.getByRole("heading", { name: /Archive for Beaty Biodiversity Museum/i })).toBeInTheDocument();
  expect(page.getByRole("heading", { name: /^Print \/ Editorial \/ Static Works$/i })).toBeInTheDocument();
  expect(page.getByRole("heading", { name: /^Video Works$/i })).toBeInTheDocument();
  expect(page.getByRole("button", { name: /Preview Beaty annual report archive spread/i })).toBeInTheDocument();
  expect(page.getByRole("button", { name: /Preview Visitor guide \(Chinese edition\)/i })).toBeInTheDocument();
  expect(doc.querySelectorAll(".project-media__wall").length).toBe(1);
  const watchLinks = page.getAllByRole("link", { name: /Watch on YouTube/i });
  expect(watchLinks).toHaveLength(4);
  expect(doc.querySelectorAll(".project-media__video-card .project-media__badge").length).toBe(0);
  expect(watchLinks[0]).toHaveAttribute("href", "https://youtu.be/HaaFUnupWOM");
  expect(page.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
});

test("renders commissioned and personal video archives as video-card collections", async () => {
  const commissioned = await renderProjectPage("commissioned-video-work", "en");

  expect(commissioned.page.getByRole("heading", { name: /^Commissioned Video Work$/i })).toBeInTheDocument();
  expect(commissioned.page.getByRole("heading", { name: /^Video Works$/i })).toBeInTheDocument();
  expect(commissioned.doc.querySelectorAll(".project-media__video-card")).toHaveLength(2);
  expect(commissioned.doc.querySelectorAll(".project-media__wall").length).toBe(0);

  const personalVideo = await renderProjectPage("personal-video-projects", "en");

  expect(personalVideo.page.getByRole("heading", { name: /^Personal Video Projects$/i })).toBeInTheDocument();
  expect(personalVideo.page.getByRole("heading", { name: /^Video Works$/i })).toBeInTheDocument();
  expect(personalVideo.page.getAllByRole("link", { name: /Watch on YouTube/i })).toHaveLength(3);
});

test("does not render an open image lightbox before any project media is opened", async () => {
  const { doc } = await renderProjectPage("designs-for-bc-ai-ecosystem", "en");

  expect(doc.querySelectorAll(".yarl__portal_open")).toHaveLength(0);
  expect(doc.querySelector('[role="dialog"]')).toBeFalsy();
});

test("archive project pages render readable title casing instead of poster-style uppercase", async () => {
  const { doc } = await renderProjectPage("personal-video-projects", "en");

  const title = doc.querySelector(".project-page--archive .project-hero__title");

  expect(title).toBeTruthy();
  expect(title?.textContent).toBe("Personal Video Projects");
  expect(title?.textContent).not.toMatch(/^[A-Z0-9\s/&+.'-]+$/);
});

test("archive project pages render a bottom-anchored catalog ledger with roles and format metadata", async () => {
  const { doc, page } = await renderProjectPage("beaty-biodiversity-museum-annual-report-2022-2023", "en");

  expect(page.getByLabelText(/client 2023/i)).toBeInTheDocument();
  expect(page.getByText("Graphic Design")).toBeInTheDocument();
  expect(page.getByText("Editorial Layout")).toBeInTheDocument();
  expect(page.queryByText("Archive Curation")).not.toBeInTheDocument();
  expect(page.queryByText("Formats")).not.toBeInTheDocument();
  expect(doc.querySelector(".project-hero__archive-watermark")).toHaveTextContent("BEATY");
  expect(doc.querySelector(".project-hero__cover-meta--archive span")).toHaveTextContent(
    "Annual report, signage & booklets"
  );
  expect(doc.querySelectorAll(".project-hero__cover-meta--archive span")).toHaveLength(1);
});
