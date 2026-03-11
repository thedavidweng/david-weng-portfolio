import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

class MockIntersectionObserver {
  disconnect() {
    return undefined;
  }

  observe() {
    return undefined;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return undefined;
  }
}

class MockResizeObserver {
  disconnect() {
    return undefined;
  }

  observe() {
    return undefined;
  }

  unobserve() {
    return undefined;
  }
}

beforeAll(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver
  });
  Object.defineProperty(window, "ResizeObserver", {
    configurable: true,
    value: MockResizeObserver
  });
  Object.defineProperty(globalThis, "ResizeObserver", {
    configurable: true,
    value: MockResizeObserver
  });
});

test("renders a responsive reel with legacy project content and filtering controls", async () => {
  const user = userEvent.setup();

  render(<ProjectsSection locale="en" />);

  expect(screen.getByRole("region", { name: /selected projects carousel/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /previous projects/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /previous projects/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /next projects/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project designs for beaty biodiversity museum/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project designs for bc \+ ai ecosystem/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project designs for theupgrade\.ai/i
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /research/i }));

  expect(
    screen.getByRole("link", {
      name: /open project transcending barriers/i
    })
  ).toBeInTheDocument();
  expect(screen.queryByText(/fraüd/i)).not.toBeInTheDocument();
});

test("renders localized labels and links in chinese", () => {
  render(<ProjectsSection locale="zh" />);

  expect(screen.getByRole("toolbar", { name: /项目筛选/i })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: /精选项目轮播/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^设计$/i })).toHaveClass("filter-chip--active");
  expect(screen.getByRole("button", { name: /^全部$/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /上一组项目/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /下一组项目/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project designs for beaty biodiversity museum/i
    })
  ).toHaveAttribute("href", "/zh/projects/beaty-biodiversity-museum-annual-report-2022-2023");
  expect(
    screen.queryByRole("link", {
      name: /open project transcending barriers/i
    })
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /电影\s*\/\s*视频/i })).toBeInTheDocument();
});
