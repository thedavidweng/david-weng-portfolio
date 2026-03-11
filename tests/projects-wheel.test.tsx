import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

const scrollNext = vi.fn();
const scrollPrev = vi.fn();

vi.mock("embla-carousel-react", () => ({
  default: () => [
    () => undefined,
    {
      canScrollNext: () => true,
      canScrollPrev: () => true,
      off: () => undefined,
      on: () => undefined,
      reInit: () => undefined,
      scrollNext,
      scrollPrev,
      scrollTo: () => undefined
    }
  ]
}));

test("maps wheel input on the projects reel to embla navigation", () => {
  render(<ProjectsSection locale="en" />);

  const region = screen.getByRole("region", { name: /selected projects carousel/i });

  fireEvent.wheel(region, { deltaY: 120 });
  fireEvent.wheel(region, { deltaY: -120 });

  expect(scrollNext).toHaveBeenCalledTimes(1);
  expect(scrollPrev).toHaveBeenCalledTimes(1);
});
