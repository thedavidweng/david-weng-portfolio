import { render, screen } from "@testing-library/react";
import { AgentModeGate } from "@/src/islands/AgentModeGate";

const originalLocation = window.location;

function setSearch(search: string) {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...originalLocation, search }
  });
}

beforeEach(() => {
  document.body.innerHTML = '<div id="site-content">Human homepage</div>';
});

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    value: originalLocation
  });
});

test("renders full agent view and hides human content when mode=agent", () => {
  setSearch("?mode=agent");

  render(<AgentModeGate locale="en" />);

  const siteContent = document.getElementById("site-content");
  expect(siteContent?.hidden).toBe(true);
  expect(screen.getByRole("heading", { name: /services/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /site navigation/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /machine-readable endpoints/i })).toBeInTheDocument();
  expect(screen.getByText(/Projects \(\d+\)/)).toBeInTheDocument();
});

test("does not render agent view without mode=agent query", () => {
  setSearch("");

  const { container } = render(<AgentModeGate locale="en" />);

  expect(container).toBeEmptyDOMElement();
  expect(document.getElementById("site-content")?.hidden).toBe(false);
});

test("renders localized chinese agent view when locale is zh", () => {
  setSearch("?mode=agent");

  render(<AgentModeGate locale="zh" />);

  expect(screen.getByRole("heading", { name: /项目/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /\/zh\/index\.md/ })).toBeInTheDocument();
});