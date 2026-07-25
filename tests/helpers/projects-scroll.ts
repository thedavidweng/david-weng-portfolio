import { fireEvent, screen } from "@testing-library/react";

export function installNativeScrollLayout(container: HTMLElement) {
  const viewport = screen.getByRole("region", { name: /projects carousel|项目轮播/i }) as HTMLDivElement;
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
