const root = document.documentElement;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const prefersDark = matchMedia("(prefers-color-scheme: dark)");

export const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : prefersDark.matches);

export function syncThemeColor(theme: string) {
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.media = meta.dataset.scheme === theme ? "all" : "not all";
  }
}

export function toggleTheme(x = innerWidth / 2, y = 0) {
  const apply = () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    syncThemeColor(root.dataset.theme);
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {}
    dispatchEvent(new Event("themechange"));
  };
  if (!document.startViewTransition || reducedMotion.matches) return apply();
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.dataset.themeTransition = "";
  const transition = document.startViewTransition(apply);
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 560, easing: "cubic-bezier(0.2, 0, 0, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
  transition.finished.finally(() => delete root.dataset.themeTransition);
}

export function initThemeToggle() {
  document.addEventListener("click", (event) => {
    const button = (event.target as Element).closest("[data-theme-toggle]");
    if (!button) return;
    const rect = button.getBoundingClientRect();
    toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  prefersDark.addEventListener("change", () => dispatchEvent(new Event("themechange")));
}
