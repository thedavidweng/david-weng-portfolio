import { render, screen, within } from "@testing-library/react";
import { HomePageFixture } from "@/tests/helpers/HomePageFixture";
import { installObserverMocks } from "@/tests/helpers/dom-observers";

installObserverMocks();

test("renders the english homepage with a switch to the chinese route", () => {
  const { container } = render(<HomePageFixture locale="en" pathname="/" />);
  const mainChildren = Array.from(container.querySelector("#main-content")?.children ?? []).map((node) =>
    (node as HTMLElement).id
  );
  const hero = container.querySelector(".hero");

  expect(
    screen.getByRole("heading", {
      name: /^portfolio$/i
    })
  ).toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByRole("link", { name: /view projects/i })).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByRole("link", { name: /^resume$/i })).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByRole("link", { name: /^home$/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /view portfolio/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /blog/i })[0]).toHaveAttribute(
    "href",
    "https://blog.davidweng.eu.org/"
  );
  expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/zh/");
  expect(container.querySelector(".site-header__descriptor")).toBeFalsy();
  expect(container.querySelector(".site-header__mark")).toBeFalsy();
  expect(screen.queryByRole("link", { name: /^about$/i })).not.toBeInTheDocument();
  expect(mainChildren).toEqual(["top", "projects", "services", "contact"]);
  const services = container.querySelector("#services");
  const contact = container.querySelector("#contact");
  expect(hero).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__mobile-nav")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__grid")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__capabilities")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__roles")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__actions")).toBeFalsy();
  expect(within(hero as HTMLElement).queryByText(/working with teams and collaborators/i)).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(services).toBeTruthy();
  expect(within(services as HTMLElement).getByRole("heading", { name: /^what i do$/i })).toBeInTheDocument();
  expect(within(services as HTMLElement).getByText(/video editing & post-production/i)).toBeInTheDocument();
  expect(
    within(services as HTMLElement).getByText(
      /I create image sets with narrative weight for portraits, live events, and editorial coverage\./i
    )
  ).toBeInTheDocument();
  expect(screen.queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^projects$/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^about$/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/^01 \/ core capabilities$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^02 \/ archive$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^03 \/ contact$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^best for$/i)).not.toBeInTheDocument();
  expect(contact).toBeTruthy();
  expect(within(contact as HTMLElement).getByRole("heading", { level: 2 })).toBeInTheDocument();
  expect(within(contact as HTMLElement).getByRole("link", { name: /email me/i })).toBeInTheDocument();
  expect(within(contact as HTMLElement).getByRole("link", { name: /^home$/i })).toHaveAttribute("href", "https://thedavidweng.github.io/");
  expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
  expect(container.querySelector(".site-shell--home")).toBeTruthy();
  expect(container.querySelector(".site-main--home")).toBeTruthy();
  expect(container.querySelector(".site-header--home")).toBeTruthy();
});

test("renders the chinese homepage with a switch back to the english route", () => {
  const { container } = render(<HomePageFixture locale="zh" pathname="/zh/" />);
  const mainChildren = Array.from(container.querySelector("#main-content")?.children ?? []).map((node) =>
    (node as HTMLElement).id
  );
  const hero = container.querySelector(".hero");

  expect(screen.getByRole("heading", { name: /^portfolio$/i })).toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByRole("link", { name: /查看项目/i })).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByRole("link", { name: /简历/i })).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByRole("link", { name: /主页/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /查看作品集/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /博客/i })[0]).toHaveAttribute(
    "href",
    "https://blog.davidweng.eu.org/"
  );
  expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/");
  expect(container.querySelector(".site-header__descriptor")).toBeFalsy();
  expect(container.querySelector(".site-header__mark")).toBeFalsy();
  expect(screen.getAllByRole("link", { name: /^能力$/i })[0]).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^关于$/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: /^我能做什么$/i })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^项目$/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^关于我$/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/^01 \/ 核心能力$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^02 \/ 档案$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^03 \/ 联系$/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/^适合合作$/i)).not.toBeInTheDocument();
  expect(screen.getByText(/视频剪辑、摄影、平面设计。从概念到交付。/i)).toBeInTheDocument();
  expect(container.querySelector(".hero.hero--zh")).toBeTruthy();
  expect(mainChildren).toEqual(["top", "projects", "services", "contact"]);
  const services = container.querySelector("#services");
  expect(hero).toBeTruthy();
  expect((hero as HTMLElement).querySelector(".hero__mobile-nav")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__grid")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__capabilities")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__roles")).toBeFalsy();
  expect((hero as HTMLElement).querySelector(".hero__actions")).toBeFalsy();
  expect(within(hero as HTMLElement).queryByText(/与需要高完成度、可直接发布的视觉内容的团队与合作者协作。/i)).not.toBeInTheDocument();
  expect(within(hero as HTMLElement).queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(services).toBeTruthy();
  expect(screen.queryByAltText(/portrait of david weng/i)).not.toBeInTheDocument();
  expect(within(services as HTMLElement).getByText(/视频剪辑与后期制作/i)).toBeInTheDocument();
  expect(within(services as HTMLElement).getByText(/摄影与视觉叙事/i)).toBeInTheDocument();
  expect(within(services as HTMLElement).getByText(/为人物写真、现场活动与编辑报道拍摄具有叙事感的图像。/i)).toBeInTheDocument();
  expect(within(services as HTMLElement).getByText(/平面与品牌系统设计/i)).toBeInTheDocument();
  expect(within(services as HTMLElement).getByText(/AI 整合与实验性项目/i)).toBeInTheDocument();
  expect(screen.queryByText(/video editing & post-production/i)).not.toBeInTheDocument();
  const contact = container.querySelector("#contact");
  expect(contact).toBeTruthy();
  expect(within(contact as HTMLElement).getByRole("heading", { level: 2 })).toBeInTheDocument();
  expect(within(contact as HTMLElement).getByRole("link", { name: /主页/i })).toHaveAttribute("href", "https://thedavidweng.github.io/");
});
