import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectPageFixture } from "@/tests/helpers/ProjectPageFixture";

test("renders localized chinese project detail content and language switch", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  render(<ProjectPageFixture locale="zh" pathname="/zh/projects/fraud" project={project} />);

  expect(screen.getByRole("heading", { name: /^信途$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/projects/fraud");
  expect(screen.getByRole("link", { name: /返回项目列表/i })).toHaveAttribute("href", "/zh/#projects");
  expect(screen.queryByRole("heading", { name: /项目价值/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /档案墙/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /混合媒介结构/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /演职人员/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /^翁佳宸/i })[0]).toHaveAttribute("href", "https://www.imdb.com/name/nm16014585/");
  expect(screen.getAllByRole("link", { name: /^陈镘伊/i })[0]).toHaveAttribute("href", "https://www.imdb.com/name/nm16014588/");
  expect(screen.getAllByRole("link", { name: /IMDb/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /豆瓣/i }).length).toBeGreaterThan(0);
}, 15000);

test("renders dedicated film pages with full posters, linked credits, and horizontal still rails", async () => {
  const user = userEvent.setup();
  const thePills = getProjectBySlug("the-pills");
  const gourd = getProjectBySlug("gourd");

  if (!thePills || !gourd) {
    throw new Error("Expected film/video projects to exist");
  }

  const { unmount } = render(<ProjectPageFixture locale="en" pathname="/projects/the-pills" project={thePills} />);
  const englishCredits = screen.getByRole("heading", { name: /^Cast and Crew$/i }).closest(".project-film__credits");

  if (!englishCredits) {
    throw new Error("Expected The Pills credits panel to render");
  }

  expect(screen.getByRole("heading", { name: /^The Pills$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Cast and Crew$/i })).toBeInTheDocument();
  expect(screen.getAllByRole("img", { name: /The Pills main poster/i }).length).toBeGreaterThan(0);
  expect(within(englishCredits as HTMLElement).getAllByRole("link", { name: /^David Weng/i })[0]).toHaveAttribute(
    "href",
    "https://www.imdb.com/name/nm16014585/"
  );
  expect(screen.getByRole("heading", { name: /^Stills$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Posters$/i })).toBeInTheDocument();
  expect(screen.queryByTitle(/The Pills/i)).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(document.querySelector(".project-film__stills-rail")).toBeTruthy();
  await user.click(screen.getByRole("button", { name: /Preview The Pills still 01/i }));
  expect(screen.getByRole("dialog", { name: /Image preview/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Close preview/i })).toHaveTextContent("X");
  unmount();

  render(<ProjectPageFixture locale="zh" pathname="/zh/projects/gourd" project={gourd} />);

  expect(screen.getByRole("heading", { name: /^清兵卫$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /演职人员/i })).toBeInTheDocument();
  expect(screen.getByText(/^孙梓涵$/)).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^孙梓涵$/ })).not.toBeInTheDocument();
  expect(screen.getAllByRole("img", { name: /清兵卫主海报/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /^剧照$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^海报$/i })).toBeInTheDocument();
  expect(document.querySelectorAll(".project-film__stills-item").length).toBeGreaterThan(0);
  await user.click(screen.getByRole("button", { name: /预览 清兵卫剧照 01/i }));
  expect(screen.getByRole("button", { name: /关闭预览/i })).toHaveTextContent("X");
}, 15000);

test("renders gourd film release links on the english detail page", async () => {
  const project = getProjectBySlug("gourd");

  if (!project) {
    throw new Error("Expected gourd project to exist");
  }

  render(<ProjectPageFixture locale="en" pathname="/projects/gourd" project={project} />);

  expect(screen.getByRole("heading", { name: /^Gourd$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /IMDb/i })).toHaveAttribute(
    "href",
    "https://www.imdb.com/title/tt35677249/"
  );
  expect(screen.getByRole("link", { name: /FilmFreeway/i })).toHaveAttribute(
    "href",
    "https://filmfreeway.com/GOURD"
  );
});

test("renders linked rich-text summary on the english gourd detail page", () => {
  const project = getProjectBySlug("gourd");

  if (!project) {
    throw new Error("Expected gourd project to exist");
  }

  const { container } = render(<ProjectPageFixture locale="en" pathname="/projects/gourd" project={project} />);
  const summary = container.querySelector(".project-hero__summary");

  expect(summary).toHaveTextContent('A short film made in high school, loosely adapted from "The Artist(opens in new tab)" by Shiga Naoya.');
  expect(screen.getByRole("link", { name: /^The Artist/i })).toHaveAttribute(
    "href",
    "https://en.wikisource.org/wiki/Modern_Japanese_Stories/The_Artist"
  );
});

test("renders linked rich-text summary on the chinese gourd detail page", () => {
  const project = getProjectBySlug("gourd");

  if (!project) {
    throw new Error("Expected gourd project to exist");
  }

  const { container } = render(<ProjectPageFixture locale="zh" pathname="/zh/projects/gourd" project={project} />);
  const summary = container.querySelector(".project-hero__summary");

  expect(summary).toHaveTextContent("高中拍摄的微电影，松散地改编自志贺直哉《清兵卫和葫芦》(opens in new tab)");
  expect(screen.getByRole("link", { name: /清兵卫和葫芦/i })).toHaveAttribute(
    "href",
    "https://ja.wikipedia.org/wiki/%E6%B8%85%E5%85%B5%E8%A1%9B%E3%81%A8%E7%93%A2%E7%AE%AA"
  );
});

test("renders non-YouTube film projects as release-info pages without generic case-study blocks", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  render(<ProjectPageFixture locale="en" pathname="/projects/fraud" project={project} />);

  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(screen.queryByTitle(/FRAÜD/i)).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Cast and Crew$/i })).toBeInTheDocument();
  expect(screen.getAllByRole("img", { name: /FRAÜD main poster/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /IMDb/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /Douban/i }).length).toBeGreaterThan(0);
  expect(document.querySelector(".project-film__posters-rail")).toBeTruthy();
});

test("renders dedicated film hero blocks in intro-poster-credits order for mobile-specific layout control", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  const { container } = render(<ProjectPageFixture locale="en" pathname="/projects/fraud" project={project} />);

  const introBlock = container.querySelector(".project-film__intro");
  const posterBlock = container.querySelector(".project-film__poster");
  const creditsBlock = container.querySelector(".project-film__credits-wrap");

  expect(introBlock).toBeTruthy();
  expect(posterBlock).toBeTruthy();
  expect(creditsBlock).toBeTruthy();
  expect(introBlock?.compareDocumentPosition(posterBlock as Node)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(posterBlock?.compareDocumentPosition(creditsBlock as Node)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test("renders article projects as branded handoff pages to the published Beacon article", () => {
  const project = getProjectBySlug("transcending-barriers");

  if (!project) {
    throw new Error("Expected transcending barriers project to exist");
  }

  const { container } = render(
    <ProjectPageFixture locale="en" pathname="/projects/transcending-barriers" project={project} />
  );

  expect(screen.getByRole("heading", { name: /Transcending Barriers/i })).toBeInTheDocument();
  expect(container.querySelector(".project-page--external-handoff")).toBeTruthy();
  expect(container.querySelector(".project-hero__cover")).toBeFalsy();
  expect(screen.getByText(/Published in Beacon: Journal of Media Studies/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Beacon: Journal of Media Studies$/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /Read on Beacon/i
    })
  ).toHaveAttribute(
    "href",
    "https://beaconjournal.arts.ubc.ca/transcending-barriers-viewing-practices-of-games-of-thrones-in-china-india-and-russia/"
  );
  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
});

test("renders archive-backed BC + AI Ecosystem media with event photo credit", () => {
  const project = getProjectBySlug("designs-for-bc-ai-ecosystem");

  if (!project) {
    throw new Error("Expected BC + AI Ecosystem project to exist");
  }

  const { container } = render(
    <ProjectPageFixture locale="en" pathname="/projects/designs-for-bc-ai-ecosystem" project={project} />
  );

  expect(screen.getByRole("heading", { name: /Archive for BC \+ AI Ecosystem/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /April speaker graphic/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /January meetup photo/i })).toBeInTheDocument();
  expect(container.querySelector(".project-media__wall")).toBeTruthy();
  expect(container.querySelector(".react-photo-album--rows")).toBeTruthy();
  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Archives$/i })).toBeInTheDocument();
  expect(screen.queryByText(/The archive is prepared to hold square social assets/i)).not.toBeInTheDocument();
  expect(container.querySelectorAll(".project-media__wall-overlay").length).toBeGreaterThan(0);
  expect(screen.queryByRole("heading", { name: /April meetup slides/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/Square social graphic from the January campaign set/i)).not.toBeInTheDocument();
  const creditLinks = screen.getAllByRole("link", { name: /Michelle Diamond/i });
  expect(creditLinks.length).toBeGreaterThan(0);
  creditLinks.forEach((link) => {
    expect(link).toHaveAttribute("href", "https://www.instagram.com/diamondsedgephotography/");
    expect(link.closest(".project-media__wall-overlay")).toBeTruthy();
  });
  const youtubeLinks = screen.getAllByRole("link", { name: /^YouTube/i });
  expect(youtubeLinks.length).toBe(7);
  expect(youtubeLinks[0]).toHaveAttribute("href", "https://youtu.be/ZN-IywZzAp0");
  youtubeLinks.forEach((link) => {
    expect(link.closest(".project-media__wall-overlay")).toBeTruthy();
  });
}, 15000);

test("renders Beaty archive with a static works wall above a separate video section", () => {
  const project = getProjectBySlug("beaty-biodiversity-museum-annual-report-2022-2023");

  if (!project) {
    throw new Error("Expected Beaty annual report project to exist");
  }

  const { container } = render(
    <ProjectPageFixture
      locale="en"
      pathname="/projects/beaty-biodiversity-museum-annual-report-2022-2023"
      project={project}
    />
  );

  expect(screen.getByRole("heading", { name: /Archive for Beaty Biodiversity Museum/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Print \/ Editorial \/ Static Works$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Video Works$/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Preview Beaty annual report archive spread/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Preview Visitor guide \(Chinese edition\)/i })).toBeInTheDocument();
  expect(container.querySelectorAll(".project-media__wall").length).toBe(1);
  const watchLinks = screen.getAllByRole("link", { name: /Watch on YouTube/i });
  expect(watchLinks).toHaveLength(4);
  expect(container.querySelectorAll(".project-media__video-card .project-media__badge").length).toBe(0);
  expect(watchLinks[0]).toHaveAttribute(
    "href",
    "https://youtu.be/HaaFUnupWOM"
  );
  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
});

test("renders commissioned and personal video archives as video-card collections", () => {
  const commissioned = getProjectBySlug("commissioned-video-work");
  const personalVideo = getProjectBySlug("personal-video-projects");

  if (!commissioned || !personalVideo) {
    throw new Error("Expected commissioned and personal video archives to exist");
  }

  const { container, unmount } = render(
    <ProjectPageFixture locale="en" pathname="/projects/commissioned-video-work" project={commissioned} />
  );

  expect(screen.getByRole("heading", { name: /^Commissioned Video Work$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Video Works$/i })).toBeInTheDocument();
  expect(container.querySelectorAll(".project-media__video-card")).toHaveLength(2);
  expect(container.querySelectorAll(".project-media__wall").length).toBe(0);
  unmount();

  render(
    <ProjectPageFixture locale="en" pathname="/projects/personal-video-projects" project={personalVideo} />
  );

  expect(screen.getByRole("heading", { name: /^Personal Video Projects$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^Video Works$/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /Watch on YouTube/i })).toHaveLength(3);
});

test("opens the YARL image lightbox when an archive image is clicked", async () => {
  const user = userEvent.setup();
  const project = getProjectBySlug("designs-for-bc-ai-ecosystem");

  if (!project) {
    throw new Error("Expected BC + AI Ecosystem project to exist");
  }

  render(<ProjectPageFixture locale="en" pathname="/projects/designs-for-bc-ai-ecosystem" project={project} />);

  await user.click(screen.getByRole("button", { name: /Preview April meetup slides/i }));

  const lightbox = screen.getByRole("dialog", { name: /Image preview/i });
  expect(lightbox).toHaveClass("project-media__lightbox");
  expect(within(lightbox).getByRole("img", { name: /April meetup slides/i })).toBeInTheDocument();
});

test("clicking the slide backdrop closes the YARL image lightbox", async () => {
  const user = userEvent.setup();
  const project = getProjectBySlug("designs-for-bc-ai-ecosystem");

  if (!project) {
    throw new Error("Expected BC + AI Ecosystem project to exist");
  }

  render(
    <ProjectPageFixture locale="en" pathname="/projects/designs-for-bc-ai-ecosystem" project={project} />
  );

  await user.click(screen.getByRole("button", { name: /Preview April meetup slides/i }));

  const slideBackdrop = document.querySelector(".yarl__slide:not([inert])");

  expect(slideBackdrop).toBeTruthy();
  fireEvent.pointerDown(slideBackdrop as HTMLElement, { isPrimary: true, pointerId: 1 });
  fireEvent.pointerUp(slideBackdrop as HTMLElement, { isPrimary: true, pointerId: 1 });
  await waitFor(() => {
    expect(screen.queryByRole("dialog", { name: /Image preview/i })).not.toBeInTheDocument();
  });
});

test("does not mount an open YARL lightbox before any project media is opened", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  const { container } = render(<ProjectPageFixture locale="en" pathname="/projects/fraud" project={project} />);

  expect(screen.queryByRole("dialog", { name: /Image preview/i })).not.toBeInTheDocument();
  expect(container.querySelectorAll(".yarl__portal_open")).toHaveLength(0);
});

test("archive project pages render readable title casing instead of poster-style uppercase", () => {
  const project = getProjectBySlug("personal-video-projects");

  if (!project) {
    throw new Error("Expected personal video archive project to exist");
  }

  const { container } = render(
    <ProjectPageFixture locale="en" pathname="/projects/personal-video-projects" project={project} />
  );

  const title = container.querySelector(".project-page--archive .project-hero__title");

  expect(title).toBeTruthy();
  expect(title?.textContent).toBe("Personal Video Projects");
  expect(title?.textContent).not.toMatch(/^[A-Z0-9\s/&+.'-]+$/);
});

test("archive project pages render a bottom-anchored catalog ledger with roles and format metadata", () => {
  const project = getProjectBySlug("beaty-biodiversity-museum-annual-report-2022-2023");

  if (!project) {
    throw new Error("Expected Beaty archive project to exist");
  }

  const { container } = render(
    <ProjectPageFixture
      locale="en"
      pathname="/projects/beaty-biodiversity-museum-annual-report-2022-2023"
      project={project}
    />
  );

  expect(screen.getByLabelText(/client 2023/i)).toBeInTheDocument();
  expect(screen.getByText("Graphic Design")).toBeInTheDocument();
  expect(screen.getByText("Editorial Layout")).toBeInTheDocument();
  expect(screen.queryByText("Archive Curation")).not.toBeInTheDocument();
  expect(screen.queryByText("Formats")).not.toBeInTheDocument();
  expect(container.querySelector(".project-hero__archive-watermark")).toHaveTextContent("BEATY");
  expect(container.querySelector(".project-hero__cover-meta--archive span")).toHaveTextContent(
    "Annual report, signage & booklets"
  );
  expect(container.querySelectorAll(".project-hero__cover-meta--archive span")).toHaveLength(1);
});
