import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/src/islands/Header";

beforeEach(() => {
  document.body.innerHTML = '<div id="site-content">Page content</div>';
});

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

test("mobile menu marks page content inert and closes on Escape", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

  try {
    render(<Header locale="en" pathname="/" />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    const siteContent = document.getElementById("site-content");

    await openMobileMenu(user);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(siteContent?.inert).toBe(true);
    expect(siteContent).toHaveAttribute("aria-hidden", "true");
    expect(getMobileMenuPanel()).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await act(async () => {
      vi.advanceTimersByTime(380);
    });

    await waitFor(() => {
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      expect(siteContent?.inert).toBe(false);
      expect(siteContent).not.toHaveAttribute("aria-hidden");
    });
  } finally {
    vi.useRealTimers();
  }
});

test("mobile menu traps focus between first and last focusable controls", async () => {
  const user = userEvent.setup();

  render(<Header locale="en" pathname="/" />);
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
