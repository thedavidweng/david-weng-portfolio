import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

test("renders a responsive reel with legacy project content and filtering controls", async () => {
  const user = userEvent.setup();

  render(<ProjectsSection />);

  expect(screen.getByRole("button", { name: /previous projects/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /next projects/i })).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /open project beaty biodiversity museum annual report 2022-2023/i
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /research/i }));

  expect(
    screen.getByRole("link", {
      name: /open project transcending barriers/i
    })
  ).toBeInTheDocument();
  expect(screen.queryByText(/fraüd/i)).not.toBeInTheDocument();
});
