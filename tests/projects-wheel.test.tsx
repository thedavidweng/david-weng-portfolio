import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

const scrollNext = vi.fn();
const scrollPrev = vi.fn();
const scrollTo = vi.fn();
const selectedScrollSnap = vi.fn(() => 0);
const canScrollNext = vi.fn(() => true);
const canScrollPrev = vi.fn(() => true);

function createEventBus() {
  const listeners = new Map<string, Set<() => void>>();

  return {
    emit(event: string) {
      listeners.get(event)?.forEach((handler) => handler());
    },
    off(event: string, handler: () => void) {
      listeners.get(event)?.delete(handler);
    },
    on(event: string, handler: () => void) {
      const handlers = listeners.get(event) ?? new Set<() => void>();
      handlers.add(handler);
      listeners.set(event, handlers);
    }
  };
}

const eventBus = createEventBus();

beforeEach(() => {
  scrollNext.mockClear();
  scrollPrev.mockClear();
  scrollTo.mockClear();
  canScrollNext.mockReturnValue(true);
  canScrollPrev.mockReturnValue(true);
  selectedScrollSnap.mockReturnValue(0);
});

vi.mock("embla-carousel-react", () => ({
  default: () => [
    () => undefined,
    {
      canScrollNext,
      canScrollPrev,
      off: eventBus.off,
      on: eventBus.on,
      reInit: () => undefined,
      scrollNext,
      scrollPrev,
      scrollTo,
      selectedScrollSnap
    }
  ]
}));

test("ignores vertical wheel gestures so page scroll stays vertical", () => {
  selectedScrollSnap.mockReturnValue(1);
  render(<ProjectsSection locale="en" />);

  const region = screen.getByRole("region", { name: /projects carousel/i });
  scrollTo.mockClear();

  fireEvent.wheel(region, { deltaY: 120 });
  fireEvent.wheel(region, { deltaY: -120 });

  expect(scrollNext).not.toHaveBeenCalled();
  expect(scrollPrev).not.toHaveBeenCalled();
});

test("ignores diagonal gestures when vertical movement is dominant", () => {
  selectedScrollSnap.mockReturnValue(1);
  render(<ProjectsSection locale="en" />);

  const region = screen.getByRole("region", { name: /projects carousel/i });

  fireEvent.wheel(region, { deltaX: 6, deltaY: 12 });
  fireEvent.wheel(region, { deltaX: -6, deltaY: -12 });

  expect(scrollNext).not.toHaveBeenCalled();
  expect(scrollPrev).not.toHaveBeenCalled();
});

test("scrolls immediately on horizontal wheel gestures", () => {
  selectedScrollSnap.mockReturnValue(2);

  render(<ProjectsSection locale="en" />);

  const region = screen.getByRole("region", { name: /projects carousel/i });
  scrollTo.mockClear();

  fireEvent.wheel(region, { deltaX: 1, deltaY: 0 });
  fireEvent.wheel(region, { deltaX: -1, deltaY: 0 });

  expect(scrollNext).toHaveBeenCalledTimes(1);
  expect(scrollPrev).toHaveBeenCalledTimes(1);
});
