import { installMatchMedia } from "./helpers/match-media";

const reduce = "(prefers-reduced-motion: reduce)";
const dark = "(prefers-color-scheme: dark)";
const media = installMatchMedia();
const { isDark, toggleTheme, initThemeToggle } = await import("@/src/scripts/theme");
const root = document.documentElement;

afterEach(() => {
  delete root.dataset.theme;
  media.set(reduce, false);
  media.set(dark, false);
  Reflect.deleteProperty(document, "startViewTransition");
  vi.restoreAllMocks();
});

test("isDark follows the explicit theme, then the system preference", () => {
  expect(isDark()).toBe(false);
  media.set(dark, true);
  expect(isDark()).toBe(true);
  root.dataset.theme = "light";
  expect(isDark()).toBe(false);
});

test("toggleTheme flips the theme, persists it, and announces the change", () => {
  const listener = vi.fn();
  addEventListener("themechange", listener);
  toggleTheme();
  expect(root.dataset.theme).toBe("dark");
  expect(localStorage.getItem("theme")).toBe("dark");
  expect(listener).toHaveBeenCalledTimes(1);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  toggleTheme();
  expect(root.dataset.theme).toBe("light");
  removeEventListener("themechange", listener);
});

test("toggleTheme points the browser bar color at the chosen theme", () => {
  document.head.innerHTML = `
    <meta name="theme-color" content="#100e0d" media="(prefers-color-scheme: dark)" data-scheme="dark" />
    <meta name="theme-color" content="#fcfbfa" media="(prefers-color-scheme: light)" data-scheme="light" />`;
  const [darkMeta, lightMeta] = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  toggleTheme();
  expect([darkMeta.media, lightMeta.media]).toEqual(["all", "not all"]);
  toggleTheme();
  expect([darkMeta.media, lightMeta.media]).toEqual(["not all", "all"]);
  document.head.innerHTML = "";
});

test("toggleTheme reveals the new theme with a circular view transition", async () => {
  const animate = vi.fn();
  root.animate = animate;
  const startViewTransition = vi.fn((update: () => void) => {
    update();
    return { ready: Promise.resolve(), finished: Promise.resolve() };
  });
  Object.assign(document, { startViewTransition });
  toggleTheme(10, 20);
  expect(root.dataset.themeTransition).toBe("");
  expect(root.dataset.theme).toBe("dark");
  await vi.waitFor(() => expect(root.dataset.themeTransition).toBeUndefined());
  expect(animate).toHaveBeenCalledWith(
    expect.objectContaining({ clipPath: [expect.stringContaining("circle(0px at 10px 20px)"), expect.any(String)] }),
    expect.objectContaining({ pseudoElement: "::view-transition-new(root)" })
  );
});

test("a rejected transition and reduced motion both still apply the theme", async () => {
  const startViewTransition = vi.fn((update: () => void) => {
    update();
    return { ready: Promise.reject(new Error("skipped")), finished: Promise.resolve() };
  });
  Object.assign(document, { startViewTransition });
  toggleTheme();
  await vi.waitFor(() => expect(root.dataset.themeTransition).toBeUndefined());
  expect(root.dataset.theme).toBe("dark");
  media.set(reduce, true);
  toggleTheme();
  expect(startViewTransition).toHaveBeenCalledTimes(1);
  expect(root.dataset.theme).toBe("light");
});

test("initThemeToggle wires toggle buttons and system theme changes", () => {
  document.body.innerHTML = `<button data-theme-toggle><span>icon</span></button><p>other</p>`;
  initThemeToggle();
  document.querySelector("p")!.click();
  expect(root.dataset.theme).toBeUndefined();
  document.querySelector("span")!.click();
  expect(root.dataset.theme).toBe("dark");
  const listener = vi.fn();
  addEventListener("themechange", listener);
  media.fire(dark);
  expect(listener).toHaveBeenCalledTimes(1);
  removeEventListener("themechange", listener);
});
