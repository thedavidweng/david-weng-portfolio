import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProjectsSection } from "@/src/islands/ProjectsSection";

function installNativeScrollLayout(container: HTMLElement) {
  const viewport = screen.getByRole("region", { name: /projects carousel/i }) as HTMLDivElement;
  const slides = Array.from(container.querySelectorAll(".projects__slide")) as HTMLAnchorElement[];
  const slideWidth = 320;

  Object.defineProperty(viewport, "scrollLeft", {
    configurable: true,
    value: 0,
    writable: true
  });

  Object.defineProperty(viewport, "clientWidth", {
    configurable: true,
    value: 960
  });

  Object.defineProperty(viewport, "scrollWidth", {
    configurable: true,
    value: slides.length * slideWidth
  });

  slides.forEach((slide, index) => {
    Object.defineProperty(slide, "offsetLeft", {
      configurable: true,
      get: () => index * slideWidth
    });
  });

  const scrollTo = vi.fn((options?: number | ScrollToOptions) => {
    const left = typeof options === "object" ? (options?.left ?? 0) : (options ?? 0);

    viewport.scrollLeft = left;
    fireEvent.scroll(viewport);
  });

  Object.defineProperty(viewport, "scrollTo", {
    configurable: true,
    value: scrollTo
  });

  fireEvent(window, new Event("resize"));

  return { scrollTo, viewport };
}

test("projects section no longer imports embla or intercepts wheel gestures directly", () => {
  const source = readFileSync(join(process.cwd(), "src/islands/ProjectsSection.tsx"), "utf8");

  expect(source).not.toContain("embla-carousel-react");
  expect(source).not.toContain("useEmblaCarousel");
  expect(source).not.toContain("onWheel=");
});

test("clicking a category chip scrolls natively to the first slide in that group", () => {
  const { container } = render(<ProjectsSection locale="en" />);
  const { scrollTo } = installNativeScrollLayout(container);
  const videoButton = screen.getByRole("button", { name: /^video$/i });

  fireEvent.click(videoButton);

  expect(scrollTo).toHaveBeenCalledWith({ behavior: "smooth", left: 1920 });
  expect(videoButton).toHaveClass("filter-chip--active");
  expect(videoButton).toHaveAttribute("aria-pressed", "true");
});

test("prev and next buttons move by adjacent slides and reflect boundary states", async () => {
  const { container } = render(<ProjectsSection locale="en" />);
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
  const { container } = render(<ProjectsSection locale="en" />);
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

  viewport.scrollLeft = 2560;
  fireEvent.scroll(viewport);
  await waitFor(() => {
    const writingButton = screen.getByRole("button", { name: /^writing$/i });

    expect(writingButton).toHaveClass("filter-chip--active");
    expect(writingButton).toHaveAttribute("aria-pressed", "true");
  });
});
