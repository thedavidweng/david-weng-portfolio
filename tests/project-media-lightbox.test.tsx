import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectDetailContent } from "@/content/projects";
import { ProjectMediaLightbox } from "@/src/islands/ProjectMediaLightbox";
import type { ProjectMediaItem } from "@/types/content";

const previewImage: ProjectMediaItem = {
  type: "image",
  title: { en: "Still 01", zh: "剧照 01" },
  description: { en: "", zh: "" },
  src: "/projects/film/still-01.jpg",
  width: 1600,
  height: 900
};

const secondPreviewImage: ProjectMediaItem = {
  type: "image",
  title: { en: "Still 02", zh: "剧照 02" },
  description: { en: "", zh: "" },
  src: "/projects/film/still-02.jpg",
  width: 1600,
  height: 900
};

test("renders nothing when the active item is not a previewable image", () => {
  const { container } = render(
    <ProjectMediaLightbox
      activeItem={{
        type: "video",
        title: { en: "Clip", zh: "片段" },
        description: { en: "", zh: "" },
        href: "https://www.youtube.com/watch?v=example"
      }}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      locale="en"
      onClose={() => undefined}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  expect(container).toBeEmptyDOMElement();
});

test("closes from the close button, backdrop click, and Escape cancel", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <ProjectMediaLightbox
      activeItem={previewImage}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      locale="en"
      onClose={onClose}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  const dialog = screen.getByRole("dialog", { name: /image preview/i });

  await user.click(screen.getByRole("button", { name: /close preview/i }));
  expect(onClose).toHaveBeenCalledTimes(1);

  onClose.mockClear();
  await user.click(dialog.querySelector(".project-media__lightbox-backdrop") as HTMLElement);
  expect(onClose).toHaveBeenCalledTimes(1);

  onClose.mockClear();
  dialog.dispatchEvent(new Event("cancel", { bubbles: true, cancelable: true }));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("navigates with arrow keys and overlay controls when multiple images are available", async () => {
  const user = userEvent.setup();
  const onNext = vi.fn();
  const onPrevious = vi.fn();

  const { rerender } = render(
    <ProjectMediaLightbox
      activeItem={previewImage}
      canNavigate
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      locale="en"
      onClose={() => undefined}
      onNext={onNext}
      onPrevious={onPrevious}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  await user.click(screen.getByRole("button", { name: /next image/i }));
  expect(onNext).toHaveBeenCalledTimes(1);

  await user.click(screen.getByRole("button", { name: /previous image/i }));
  expect(onPrevious).toHaveBeenCalledTimes(1);

  await user.keyboard("{ArrowRight}");
  expect(onNext).toHaveBeenCalledTimes(2);

  await user.keyboard("{ArrowLeft}");
  expect(onPrevious).toHaveBeenCalledTimes(2);

  rerender(
    <ProjectMediaLightbox
      activeItem={secondPreviewImage}
      canNavigate={false}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      locale="en"
      onClose={() => undefined}
      onNext={onNext}
      onPrevious={onPrevious}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  expect(screen.queryByRole("button", { name: /next image/i })).not.toBeInTheDocument();
  onNext.mockClear();
  onPrevious.mockClear();

  await user.keyboard("{ArrowRight}");
  await user.keyboard("{ArrowLeft}");
  expect(onNext).not.toHaveBeenCalled();
  expect(onPrevious).not.toHaveBeenCalled();
});

test("closes when the backdrop receives Enter or Space", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <ProjectMediaLightbox
      activeItem={previewImage}
      closePreviewLabel={projectDetailContent.closePreviewLabel}
      locale="en"
      onClose={onClose}
      previewDialogLabel={projectDetailContent.previewDialogLabel}
    />
  );

  const backdrop = screen
    .getByRole("dialog", { name: /image preview/i })
    .querySelector(".project-media__lightbox-backdrop") as HTMLElement;

  backdrop.focus();
  await user.keyboard("{Enter}");
  expect(onClose).toHaveBeenCalledTimes(1);

  onClose.mockClear();
  await user.keyboard(" ");
  expect(onClose).toHaveBeenCalledTimes(1);
});
