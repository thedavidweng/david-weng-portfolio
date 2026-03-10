import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders the poster-first homepage structure and core information architecture", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      name: /cut motion\. frame stills\. build signal\./i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /enter selected work/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^what i do$/i })).toBeInTheDocument();
  expect(screen.getByText("[01]")).toBeInTheDocument();
  expect(screen.getByText(/video editing & post-production/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^selected projects$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^about$/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /^contact$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /email me/i })).toBeInTheDocument();
});
