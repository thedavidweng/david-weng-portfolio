import { readFileSync } from "node:fs";
import { join } from "node:path";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/src/islands/Header";

function renderHeaderInProductionShell() {
  document.body.innerHTML = `
    <div id="site-content" class="site-shell site-shell--en site-shell--home">
      <a class="skip-link" href="#main-content">Skip to content</a>
      <div id="header-host"></div>
      <main id="main-content">Page content</main>
      <footer>Footer</footer>
    </div>
  `;

  const headerHost = document.getElementById("header-host");

  if (!headerHost) {
    throw new Error("Expected header host element");
  }

  return render(<Header locale="en" pathname="/" />, { container: headerHost });
}

async function openMobileMenu(user: ReturnType<typeof userEvent.setup>) {
  const toggle = screen.getByRole("button", { name: /open menu/i });

  await user.click(toggle);

  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
}

function getMobileMenuPanel() {
  const panel = document.getElementById("site-mobile-menu-panel");

  if (!panel) {
    throw new Error("Expected mobile menu panel to render");
  }

  return panel;
}

function installThemeColorMeta() {
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.remove();

  const themeColor = document.createElement("meta");
  themeColor.name = "theme-color";
  themeColor.content = "#070607";
  document.head.append(themeColor);

  return themeColor;
}

test("mobile menu inerts only non-header page content inside site-content", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  try {
    renderHeaderInProductionShell();

    const toggle = screen.getByRole("button", { name: /open menu/i });
    const siteContent = document.getElementById("site-content");
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    const headerHost = document.getElementById("header-host");

    await openMobileMenu(user);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(siteContent?.inert).not.toBe(true);
    expect(siteContent).not.toHaveAttribute("aria-hidden");
    expect(main?.inert).toBe(true);
    expect(main).toHaveAttribute("aria-hidden", "true");
    expect(footer?.inert).toBe(true);
    expect(footer).toHaveAttribute("aria-hidden", "true");
    expect(headerHost?.inert).not.toBe(true);
    expect(headerHost).not.toHaveAttribute("aria-hidden");
    expect(getMobileMenuPanel()).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /main menu/i })).toHaveAttribute(
      "aria-labelledby",
      "site-mobile-menu-label"
    );

    await user.keyboard("{Escape}");

    await act(async () => {
      vi.advanceTimersByTime(380);
    });

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      expect(main?.inert).toBe(false);
      expect(main).not.toHaveAttribute("aria-hidden");
      expect(footer?.inert).toBe(false);
      expect(footer).not.toHaveAttribute("aria-hidden");
    });
  } finally {
    vi.useRealTimers();
  }
});

test("mobile menu keeps Safari browser chrome dark", async () => {
  const user = userEvent.setup();
  const themeColor = installThemeColorMeta();

  try {
    renderHeaderInProductionShell();
    await openMobileMenu(user);

    expect(themeColor).toHaveAttribute("content", "#070607");

    await user.keyboard("{Escape}");

    expect(themeColor).toHaveAttribute("content", "#070607");
  } finally {
    themeColor.remove();
  }
});

test("base layout enables a standalone mobile menu without recoloring Safari", () => {
  const layoutSource = readFileSync(
    join(process.cwd(), "src/layouts/BaseLayout.astro"),
    "utf8",
  );
  const manifest = JSON.parse(
    readFileSync(join(process.cwd(), "public/site.webmanifest"), "utf8"),
  );
  const globalStyles = readFileSync(
    join(process.cwd(), "src/styles/global.css"),
    "utf8",
  );

  expect(layoutSource).toContain(
    '<meta name="theme-color" content="#070607" />',
  );
  expect(layoutSource).toContain('rel="manifest" href="/site.webmanifest"');
  expect(layoutSource).toContain('name="mobile-web-app-capable"');
  expect(layoutSource).toContain('name="apple-mobile-web-app-capable"');
  expect(layoutSource).toContain(
    'name="apple-mobile-web-app-status-bar-style" content="black-translucent"',
  );
  expect(manifest).toMatchObject({
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#070607",
    theme_color: "#070607",
  });
  expect(globalStyles).toContain("height: 100vh;\n    height: 100dvh;");
  expect(globalStyles).toContain("calc(env(safe-area-inset-top) + 5.5rem)");
  expect(globalStyles).toContain("calc(env(safe-area-inset-bottom) + 1.2rem)");
});

test("mobile menu remains keyboard reachable when rendered inside site-content", async () => {
  const user = userEvent.setup();

  renderHeaderInProductionShell();
  await openMobileMenu(user);

  const panel = getMobileMenuPanel();
  const focusable = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  expect(document.activeElement).toBe(first);

  await user.tab({ shift: true });
  expect(document.activeElement).toBe(last);

  await user.tab();
  expect(document.activeElement).toBe(first);
});
