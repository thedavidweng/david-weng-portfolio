import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectPageView } from "@/components/pages/ProjectPageView";

test("renders localized chinese project detail content and language switch", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  render(<ProjectPageView locale="zh" pathname="/zh/projects/fraud" project={project} />);

  expect(screen.getByRole("heading", { name: /^FRAÜD$/i })).toBeInTheDocument();
  expect(screen.getByText(/围绕国际学生欺诈与压力展开的剧情片/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/projects/fraud");
  expect(screen.getByRole("link", { name: /返回项目列表/i })).toHaveAttribute("href", "/zh#projects");
  expect(screen.queryByRole("heading", { name: /项目价值/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /档案墙/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /混合媒介结构/i })).not.toBeInTheDocument();
  expect(screen.queryByTitle(/FRAÜD/i)).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /IMDb/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /豆瓣/i }).length).toBeGreaterThan(0);
});

test("renders video-first detail pages with embedded players and no repeated still cards", () => {
  const thePills = getProjectBySlug("the-pills");
  const persona5 = getProjectBySlug("persona-5-style-campaign-video");

  if (!thePills || !persona5) {
    throw new Error("Expected film/video projects to exist");
  }

  const { unmount } = render(<ProjectPageView locale="en" pathname="/projects/the-pills" project={thePills} />);

  expect(screen.getByTitle(/The Pills/i)).toHaveAttribute("src", expect.stringContaining("/embed/J0LGfoZQ-0Q"));
  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/^Available on$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Where the work is published, listed, or available to view outside this site\./i)).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Poster Artwork/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /FilmFreeway/i }).length).toBeGreaterThan(0);
  unmount();

  render(
    <ProjectPageView
      locale="en"
      pathname="/projects/persona-5-style-campaign-video"
      project={persona5}
    />
  );

  expect(screen.getByTitle(/Persona 5 Style Campaign Video/i)).toHaveAttribute(
    "src",
    expect.stringContaining("/embed/kdPPnUPtH-E")
  );
  expect(screen.queryByRole("heading", { name: /Campaign Still/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/^Available on$/i)).not.toBeInTheDocument();
});

test("renders non-YouTube film projects as release-info pages without generic case-study blocks", () => {
  const project = getProjectBySlug("fraud");

  if (!project) {
    throw new Error("Expected fraud project to exist");
  }

  render(<ProjectPageView locale="en" pathname="/projects/fraud" project={project} />);

  expect(screen.queryByRole("heading", { name: /Why it matters/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^Archives$/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/^Available on$/i)).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /Poster Artwork/i })).not.toBeInTheDocument();
  expect(screen.queryByTitle(/FRAÜD/i)).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /IMDb/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /Douban/i }).length).toBeGreaterThan(0);
});

test("renders article projects as branded handoff pages to the published Beacon article", () => {
  const project = getProjectBySlug("transcending-barriers");

  if (!project) {
    throw new Error("Expected transcending barriers project to exist");
  }

  const { container } = render(
    <ProjectPageView locale="en" pathname="/projects/transcending-barriers" project={project} />
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
    <ProjectPageView locale="en" pathname="/projects/designs-for-bc-ai-ecosystem" project={project} />
  );

  expect(screen.getByRole("heading", { name: /Archive for BC \+ AI Ecosystem/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /April speaker graphic/i })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /January meetup event photo/i })).toBeInTheDocument();
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
  const youtubeLinks = screen.getAllByRole("link", { name: /^YouTube$/i });
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
    <ProjectPageView
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

test("opens a centered preview dialog when an archive image is clicked", async () => {
  const user = userEvent.setup();
  const project = getProjectBySlug("designs-for-bc-ai-ecosystem");

  if (!project) {
    throw new Error("Expected BC + AI Ecosystem project to exist");
  }

  render(<ProjectPageView locale="en" pathname="/projects/designs-for-bc-ai-ecosystem" project={project} />);

  await user.click(screen.getByRole("button", { name: /Preview April meetup slides/i }));

  const dialog = screen.getByRole("dialog", { name: /Image preview/i });
  expect(dialog).toBeInTheDocument();
  expect(within(dialog).getByRole("img", { name: /April meetup slides/i })).toBeInTheDocument();
});
