import { render, screen, within } from "@testing-library/react";
import { HomePageView } from "@/components/pages/HomePageView";

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

test("renders the english homepage with a switch to the chinese route", () => {
  const { container } = render(<HomePageView locale="en" pathname="/" />);

  expect(
    screen.getByRole("heading", {
      name: /video, design, and content operations/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view projects/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^resume$/i })).toHaveAttribute("href", "/documents/resume.pdf");
  expect(screen.queryByRole("link", { name: /view portfolio/i })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^blog$/i })).toHaveAttribute("href", "https://blog.davidweng.eu.org/");
  expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh");
  expect(screen.queryByRole("heading", { name: /^what i do$/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^about$/i })).not.toBeInTheDocument();
  const hero = container.querySelector(".hero");
  expect(hero).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__grid")).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__grid .hero__capabilities")).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__grid .hero__capabilities .services__grid")).toBeTruthy();
  expect(within(hero as HTMLElement).queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/video editing & post-production/i)).toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/I create image sets with narrative weight for portraits, live events, and editorial coverage\./i)).toBeInTheDocument();
  expect(screen.queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^selected projects$/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^about$/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();
  expect(screen.getByText(/^03 \/ contact$/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /email me/i })).toBeInTheDocument();
}, 10000);

test("renders the chinese homepage with a switch back to the english route", () => {
  const { container } = render(<HomePageView locale="zh" pathname="/zh/" />);

  expect(screen.getByRole("heading", { name: /影像剪辑\s*视觉设计\s*内容运营/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /查看项目/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /简历/i })).toHaveAttribute("href", "/documents/resume.pdf");
  expect(screen.queryByRole("link", { name: /查看作品集/i })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^博客$/i })).toHaveAttribute("href", "https://blog.davidweng.eu.org/");
  expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: /^能力$/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^关于$/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^我能做什么$/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^我能做什么$/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^精选项目$/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^关于我$/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^联系$/i })).toBeInTheDocument();
  expect(screen.getByText(/^03 \/ 联系$/i)).toBeInTheDocument();
  expect(screen.getByText(/从概念、拍摄到后期与发布，完成完整的视觉内容交付/i)).toBeInTheDocument();
  expect(container.querySelector(".hero.hero--zh")).toBeTruthy();
  const hero = container.querySelector(".hero");
  expect(hero).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__grid")).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__grid .hero__capabilities")).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__grid .hero__capabilities .services__grid")).toBeTruthy();
  expect(within(hero as HTMLElement).queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/视频剪辑与后期制作/i)).toBeInTheDocument();
  expect(screen.queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/摄影与视觉叙事/i)).toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/为人物写真、现场活动与编辑报道拍摄具有叙事感的图像。/i)).toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/平面与品牌设计/i)).toBeInTheDocument();
  expect(within(hero as HTMLElement).getByText(/AI 整合创意流程/i)).toBeInTheDocument();
  expect(screen.queryByText(/video editing & post-production/i)).not.toBeInTheDocument();
}, 10000);
