import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

test("filters project cards by category", async () => {
  const user = userEvent.setup();

  render(<ProjectsSection />);

  await user.click(screen.getByRole("button", { name: /film/i }));

  expect(screen.getByText(/afterimage city/i)).toBeInTheDocument();
  expect(screen.queryByText(/signal relay/i)).not.toBeInTheDocument();
});
