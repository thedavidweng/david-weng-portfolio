import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectDetailContent } from "@/content/project-detail";
import { getProjectBySlug } from "@/lib/projects";
import { FilmMediaRail } from "@/src/islands/FilmMediaRail";

const filmRailProps = {
  cardClassName: "project-film__stills-item",
  closePreviewLabel: projectDetailContent.closePreviewLabel,
  imageClassName: "project-film__rail-image project-film__rail-image--still",
  locale: "en" as const,
  previewDialogLabel: projectDetailContent.previewDialogLabel,
  previewLabel: projectDetailContent.previewLabel,
  railClassName: "project-film__stills-rail",
  sizes: "(max-width: 760px) 80vw, 34vw"
};

test("film media rail opens previews and cycles across stills", async () => {
  const user = userEvent.setup();
  const project = getProjectBySlug("the-pills");

  if (!project?.film?.stills.length) {
    throw new Error("Expected The Pills stills to exist");
  }

  render(<FilmMediaRail {...filmRailProps} items={project.film.stills} />);

  const firstStill = project.film.stills.find((item) => item.type === "image" && item.src);

  if (!firstStill) {
    throw new Error("Expected at least one still image");
  }

  await user.click(
    screen.getByRole("button", {
      name: new RegExp(`Preview ${firstStill.title.en}`, "i")
    })
  );

  const lightbox = screen.getByRole("dialog", { name: /image preview/i });
  expect(lightbox).toHaveClass("project-media__lightbox");
  const activeImage = () => lightbox.querySelector(".yarl__slide:not([inert]) img");

  expect(within(lightbox).getByRole("img", { name: new RegExp(firstStill.title.en, "i") })).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /next image/i }));
  expect(activeImage()).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /previous image/i }));
  expect(activeImage()).toHaveAttribute("alt", firstStill.title.en);

  await user.keyboard("{ArrowRight}");
  expect(activeImage()).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /close preview/i }));
  expect(screen.queryByRole("dialog", { name: /image preview/i })).not.toBeInTheDocument();
});

test("film media rail ignores non-image items when building previews", () => {
  render(
    <FilmMediaRail
      {...filmRailProps}
      items={[
        {
          type: "video",
          title: { en: "Behind the scenes", zh: "幕后" },
          description: { en: "", zh: "" },
          href: "https://www.youtube.com/watch?v=example"
        },
        {
          type: "image",
          title: { en: "Poster frame", zh: "海报帧" },
          description: { en: "", zh: "" },
          src: "/projects/film/poster-frame.jpg",
          width: 1000,
          height: 1500
        }
      ]}
    />
  );

  expect(screen.getAllByRole("button", { name: /preview/i })).toHaveLength(1);
  expect(screen.queryByRole("button", { name: /behind the scenes/i })).not.toBeInTheDocument();
});
