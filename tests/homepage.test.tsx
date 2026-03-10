import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders the homepage with legacy-driven content and compact positioning", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      name: /video, design, and content systems with cinematic discipline/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view projects/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /view resume/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /^what i do$/i })).toBeInTheDocument();
  expect(screen.getByText(/video editing & post-production/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^selected projects$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^about$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /email me/i })).toBeInTheDocument();
});
