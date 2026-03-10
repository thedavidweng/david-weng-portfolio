import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

test("renders the homepage positioning and core sections", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      name: /i build visual stories, content systems, and creative workflows/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /view selected work/i })).toBeInTheDocument();
  expect(screen.getByText(/video editing & post-production/i)).toBeInTheDocument();
  expect(screen.getByText(/selected projects/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /email me/i })).toBeInTheDocument();
});
