import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectDetailContent } from "@/content/projects";
import { ProjectMediaLightbox } from "@/src/islands/ProjectMediaLightbox";
import type { ProjectMediaItem } from "@/types/content";

const previewImages: ProjectMediaItem[] = [
  {
    type: "image",
    title: { en: "Still 01", zh: "剧照 01" },
    description: { en: "", zh: "" },
    src: "/projects/film/still-01.jpg",
    width: 1600,
    height: 900
  },
  {
    type: "image",
    title: { en: "Still 02", zh: "剧照 02" },
    description: { en: "", zh: "" },
    src: "/projects/film/still-02.jpg",
    width: 1600,
    height: 900
  }
];

test("renders nothing when the active index is null", () => {
  const { container } = render(
    <ProjectMediaLightbox
      activeIndex={null}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      items={previewImages}
      locale="en"
      onClose={() => undefined}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  expect(container).toBeEmptyDOMElement();
});

test("closes from the close button", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <ProjectMediaLightbox
      activeIndex={0}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      items={previewImages}
      locale="en"
      onClose={onClose}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  await user.click(screen.getByRole("button", { name: /close preview/i }));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("navigates with arrow keys and overlay controls when multiple images are available", async () => {
  const user = userEvent.setup();
  const onIndexChange = vi.fn();

  const { rerender } = render(
    <ProjectMediaLightbox
      activeIndex={0}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      items={previewImages}
      locale="en"
      onClose={() => undefined}
      onIndexChange={onIndexChange}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  await user.click(screen.getByRole("button", { name: /next image/i }));
  expect(onIndexChange).toHaveBeenCalledWith(1);

  await user.click(screen.getByRole("button", { name: /previous image/i }));
  expect(onIndexChange).toHaveBeenCalledWith(1);

  await user.keyboard("{ArrowRight}");
  expect(onIndexChange).toHaveBeenCalledWith(1);

  await user.keyboard("{ArrowLeft}");
  expect(onIndexChange).toHaveBeenCalledWith(1);

  rerender(
    <ProjectMediaLightbox
      activeIndex={1}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      items={[previewImages[1]!]}
      locale="en"
      onClose={() => undefined}
      onIndexChange={onIndexChange}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  expect(screen.queryByRole("button", { name: /next image/i })).not.toBeInTheDocument();
});
