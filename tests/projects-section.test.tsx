import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/src/islands/ProjectsSection";
import { projects } from "@/content/projects";
import { buildCarouselProjects } from "@/lib/build-carousel-projects";

const carouselProjects = buildCarouselProjects(projects);
import { installObserverMocks } from "@/tests/helpers/dom-observers";
import { installNativeScrollLayout } from "@/tests/helpers/projects-scroll";

installObserverMocks();

test("renders a responsive reel with legacy project content and filtering controls", async () => {
  const user = userEvent.setup();

  const { container } = render(<ProjectsSection locale="en" projects={carouselProjects} />);
  installNativeScrollLayout(container);

  const topbar = container.querySelector(".projects__topbar");
  const filterToolbar = container.querySelector(".projects__filters");
  const reelControls = container.querySelector(".projects__reel-controls");

  expect(topbar).toBeTruthy();
  expect(filterToolbar?.parentElement).toBe(topbar);
  expect(reelControls?.parentElement).toBe(topbar);

  expect(screen.getByRole("toolbar", { name: /project categories/i })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: /projects carousel/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /^all$/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("button").slice(0, 3).map((button) => button.textContent)).toEqual([
    "Client",
    "Film",
    "Video"
  ]);
  expect(screen.getByRole("button", { name: /next projects/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project archive for beaty biodiversity museum/i
    })
  ).toBeInTheDocument();
  expect(screen.queryByText("View project")).not.toBeInTheDocument();
  expect(screen.queryByText("Open archive item")).not.toBeInTheDocument();
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

  expect(screen.queryByRole("button", { name: /^writing$/i })).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", {
      name: /open project transcending barriers/i
    })
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /^video$/i }));

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

  await user.click(screen.getByRole("button", { name: /^film$/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /^film$/i })).toHaveClass("filter-chip--active");
    expect(screen.getByRole("button", { name: /^film$/i })).toHaveAttribute("aria-pressed", "true");
  });
  expect(
    screen.getByRole("link", {
      name: /open project gourd/i
    })
  ).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^The Artist$/i })).not.toBeInTheDocument();
});

test("renders localized labels and links in chinese", async () => {
  const user = userEvent.setup();

  const { container } = render(<ProjectsSection locale="zh" projects={carouselProjects} />);
  installNativeScrollLayout(container);

  expect(screen.getByRole("toolbar", { name: /项目分类/i })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: /项目轮播/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^客户$/i })).toHaveClass("filter-chip--active");
  expect(screen.queryByRole("button", { name: /^全部$/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("button").slice(0, 3).map((button) => button.textContent)).toEqual([
    "客户",
    "电影",
    "视频"
  ]);
  expect(screen.getByRole("button", { name: /下一组项目/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /Beaty Biodiversity Museum 档案/i
    })
  ).toHaveAttribute("href", "/zh/projects/beaty-biodiversity-museum-annual-report-2022-2023");
  expect(screen.queryByText("查看项目")).not.toBeInTheDocument();
  expect(screen.queryByText("打开项目档案")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", {
      name: /open project david's blog/i
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", {
      name: /open project transcending barriers/i
    })
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^电影$/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^视频$/i })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /^写作$/i })).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /^视频$/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /^视频$/i })).toHaveClass("filter-chip--active");
    expect(screen.getByRole("button", { name: /^视频$/i })).toHaveAttribute("aria-pressed", "true");
  });
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

  await user.click(screen.getByRole("button", { name: /^电影$/i }));

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /^电影$/i })).toHaveClass("filter-chip--active");
    expect(screen.getByRole("button", { name: /^电影$/i })).toHaveAttribute("aria-pressed", "true");
  });
  expect(
    screen.getByRole("link", {
      name: /清兵卫/i
    })
  ).toHaveAttribute("href", "/zh/projects/gourd");
});
