import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Suspense, lazy, startTransition } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProjectsSection } from "@/src/islands/ProjectsSection";
import { projects } from "@/content/projects";
import { buildCarouselProjects } from "@/lib/build-carousel-projects";

const carouselProjects = buildCarouselProjects(projects);
import { installNativeScrollLayout } from "@/tests/helpers/projects-scroll";

const loadReplacement = vi.fn(() => new Promise<{ default: () => null }>(() => {}));
const SuspendReplacement = lazy(loadReplacement);

test("resize keeps the committed carousel usable while a replacement render suspends", async () => {
  const { container, rerender } = render(
    <Suspense fallback="Loading projects">
      <ProjectsSection locale="en" projects={carouselProjects} />
    </Suspense>,
  );
  const { scrollTo } = installNativeScrollLayout(container);

  startTransition(() => rerender(
    <Suspense fallback="Loading projects">
      <ProjectsSection locale="en" projects={carouselProjects.slice(0, 1)} />
      <SuspendReplacement />
    </Suspense>,
  ));
  await waitFor(() => expect(loadReplacement).toHaveBeenCalled());
  expect(screen.queryByText("Loading projects")).not.toBeInTheDocument();

  fireEvent(window, new Event("resize"));
  fireEvent.click(screen.getByRole("button", { name: /^video$/i }));

  expect(scrollTo).toHaveBeenLastCalledWith({ behavior: "smooth", left: 1920 });
});

test("a committed category replacement resets navigation to its first slide", () => {
  const { container, rerender } = render(<ProjectsSection locale="en" projects={carouselProjects} />);
  const { viewport } = installNativeScrollLayout(container);
  fireEvent.click(screen.getByRole("button", { name: /^video$/i }));

  rerender(<ProjectsSection locale="en" projects={carouselProjects.slice(0, 1)} />);

  expect(viewport.scrollLeft).toBe(0);
  expect(screen.getByRole("button", { name: /previous projects/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /next projects/i })).toBeDisabled();
});

test("projects section no longer imports embla or intercepts wheel gestures directly", () => {
  const source = readFileSync(join(process.cwd(), "src/islands/ProjectsSection.tsx"), "utf8");

  expect(source).not.toContain("embla-carousel-react");
  expect(source).not.toContain("useEmblaCarousel");
  expect(source).not.toContain("onWheel=");
});

test("clicking a category chip scrolls natively to the first slide in that group", () => {
  const { container } = render(<ProjectsSection locale="en" projects={carouselProjects} />);
  const { scrollTo } = installNativeScrollLayout(container);
  const videoButton = screen.getByRole("button", { name: /^video$/i });

  fireEvent.click(videoButton);

  expect(scrollTo).toHaveBeenCalledWith({ behavior: "smooth", left: 1920 });
  expect(videoButton).toHaveClass("filter-chip--active");
  expect(videoButton).toHaveAttribute("aria-pressed", "true");
});

test("prev and next buttons move by adjacent slides and reflect boundary states", async () => {
  const { container } = render(<ProjectsSection locale="en" projects={carouselProjects} />);
  const { scrollTo, viewport } = installNativeScrollLayout(container);
  const previousButton = screen.getByRole("button", { name: /previous projects/i });
  const nextButton = screen.getByRole("button", { name: /next projects/i });

  expect(previousButton).toBeDisabled();
  expect(nextButton).toBeEnabled();
  expect(screen.getByRole("button", { name: /^client$/i })).toHaveAttribute("aria-pressed", "true");

  fireEvent.click(nextButton);

  expect(scrollTo).toHaveBeenLastCalledWith({ behavior: "smooth", left: 320 });

  viewport.scrollLeft = 2560;
  fireEvent.scroll(viewport);

  await waitFor(() => {
    expect(previousButton).toBeEnabled();
    expect(nextButton).toBeDisabled();
  });
});

test("active category follows native horizontal scroll position", async () => {
  const { container } = render(<ProjectsSection locale="en" projects={carouselProjects} />);
  const { viewport } = installNativeScrollLayout(container);

  viewport.scrollLeft = 960;
  fireEvent.scroll(viewport);
  await waitFor(() => {
    const filmButton = screen.getByRole("button", { name: /^film$/i });

    expect(filmButton).toHaveClass("filter-chip--active");
    expect(filmButton).toHaveAttribute("aria-pressed", "true");
  });

  viewport.scrollLeft = 1920;
  fireEvent.scroll(viewport);
  await waitFor(() => {
    const videoButton = screen.getByRole("button", { name: /^video$/i });

    expect(videoButton).toHaveClass("filter-chip--active");
    expect(videoButton).toHaveAttribute("aria-pressed", "true");
  });

  viewport.scrollLeft = 2240;
  fireEvent.scroll(viewport);
  await waitFor(() => {
    const videoButton = screen.getByRole("button", { name: /^video$/i });

    expect(videoButton).toHaveClass("filter-chip--active");
    expect(videoButton).toHaveAttribute("aria-pressed", "true");
  });
});
