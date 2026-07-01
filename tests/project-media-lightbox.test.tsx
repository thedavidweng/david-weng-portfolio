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

const lightboxProps = {
  closePreviewLabel: projectDetailContent.closePreviewLabel,
  locale: "en" as const,
  previewDialogLabel: projectDetailContent.previewDialogLabel
};

test("renders nothing when the active index is null", () => {
  const { container } = render(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={null}
      items={previewImages}
      onClose={() => undefined}
    />
  );

  expect(container).toBeEmptyDOMElement();
});

test("opens a YARL lightbox with the active slide image", () => {
  render(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={0}
      items={previewImages}
      onClose={() => undefined}
    />
  );

  const lightbox = screen.getByRole("dialog", { name: /image preview/i });
  expect(lightbox).toHaveClass("project-media__lightbox");
  expect(lightbox.querySelector(".yarl__slide:not([inert]) img")).toHaveAttribute("alt", "Still 01");
});

test("closes from the custom close button", async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();

  render(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={0}
      items={previewImages}
      onClose={onClose}
    />
  );

  await user.click(screen.getByRole("button", { name: /close preview/i }));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("reports carousel navigation through onIndexChange", async () => {
  const user = userEvent.setup();
  let activeIndex = 0;
  const onIndexChange = vi.fn((index: number) => {
    activeIndex = index;
  });

  const { rerender } = render(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={activeIndex}
      items={previewImages}
      onClose={() => undefined}
      onIndexChange={onIndexChange}
    />
  );

  await user.click(screen.getByRole("button", { name: /next image/i }));
  expect(onIndexChange).toHaveBeenLastCalledWith(1);
  rerender(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={activeIndex}
      items={previewImages}
      onClose={() => undefined}
      onIndexChange={onIndexChange}
    />
  );

  await user.click(screen.getByRole("button", { name: /previous image/i }));
  expect(onIndexChange).toHaveBeenLastCalledWith(0);
  rerender(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={activeIndex}
      items={previewImages}
      onClose={() => undefined}
      onIndexChange={onIndexChange}
    />
  );

  await user.keyboard("{ArrowRight}");
  expect(onIndexChange).toHaveBeenLastCalledWith(1);
  rerender(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={activeIndex}
      items={previewImages}
      onClose={() => undefined}
      onIndexChange={onIndexChange}
    />
  );

  await user.keyboard("{ArrowLeft}");
  expect(onIndexChange).toHaveBeenLastCalledWith(0);

  rerender(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={0}
      items={[previewImages[0]!]}
      onClose={() => undefined}
      onIndexChange={onIndexChange}
    />
  );

  expect(screen.getByRole("button", { name: /next image/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /previous image/i })).toBeDisabled();
});

test("localizes navigation labels for non-English locales", () => {
  render(
    <ProjectMediaLightbox
      {...lightboxProps}
      activeIndex={0}
      items={previewImages}
      locale="zh"
      onClose={() => undefined}
    />
  );

  expect(screen.getByRole("button", { name: /下一张/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /上一张/i })).toBeInTheDocument();
});
