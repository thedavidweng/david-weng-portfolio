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

  expect(screen.getByRole("toolbar", { name: /project categories/i })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: /projects carousel/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /^all$/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("button").slice(0, 3).map((button) => button.textContent)).toEqual([
    "Client / Organization",
    "Film / Video",
    "Writing"
  ]);
  expect(screen.getByRole("button", { name: /previous projects/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /previous projects/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /next projects/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project archive for beaty biodiversity museum/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project archive for bc \+ ai ecosystem/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project archive for theupgrade\.ai/i
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /writing/i }));

  expect(screen.getByRole("button", { name: /writing/i })).toHaveClass("filter-chip--active");
  expect(
    screen.getByRole("link", {
      name: /open project transcending barriers/i
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /film\s*\/\s*video/i }));

  expect(
    screen.getByRole("link", {
      name: /open project commissioned video work/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project personal video projects/i
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("link", {
      name: /open project persona 5 style campaign video/i
    })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project gourd/i
    })
  ).toBeInTheDocument();
});

test("renders localized labels and links in chinese", async () => {
  const user = userEvent.setup();

  render(<ProjectsSection locale="zh" />);

  expect(screen.getByRole("toolbar", { name: /项目分类/i })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: /项目轮播/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^客户\s*\/\s*机构$/i })).toHaveClass("filter-chip--active");
  expect(screen.queryByRole("button", { name: /^全部$/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("button").slice(0, 3).map((button) => button.textContent)).toEqual([
    "客户 / 机构",
    "电影 / 视频",
    "写作"
  ]);
  expect(screen.getByRole("button", { name: /上一组项目/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /下一组项目/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /Beaty Biodiversity Museum 档案/i
    })
  ).toHaveAttribute("href", "/zh/projects/beaty-biodiversity-museum-annual-report-2022-2023");
  expect(
    screen.queryByRole("link", {
      name: /open project david's blog/i
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", {
      name: /open project transcending barriers/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /电影\s*\/\s*视频/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^写作$/i })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /电影\s*\/\s*视频/i }));

  expect(screen.getByRole("button", { name: /电影\s*\/\s*视频/i })).toHaveClass("filter-chip--active");
  expect(
    screen.getByRole("link", {
      name: /委托视频项目/i
    })
  ).toHaveAttribute("href", "/zh/projects/commissioned-video-work");
  expect(
    screen.getByRole("link", {
      name: /个人视频项目/i
    })
  ).toHaveAttribute("href", "/zh/projects/personal-video-projects");
  expect(
    screen.queryByRole("link", {
      name: /persona 5/i
    })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /清兵卫/i
    })
  ).toHaveAttribute("href", "/zh/projects/gourd");
});
