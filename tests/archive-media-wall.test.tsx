import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectDetailContent } from "@/content/projects";
import { ArchiveMediaWall } from "@/src/islands/ArchiveMediaWall";
import type { ProjectMediaItem } from "@/types/content";

const wallLabels = {
  photoCreditLabel: projectDetailContent.photoCreditLabel,
  previewLabel: projectDetailContent.previewLabel,
  previewDialogLabel: projectDetailContent.previewDialogLabel,
  closePreviewLabel: projectDetailContent.closePreviewLabel
};

const archiveItems: ProjectMediaItem[] = [
  {
    type: "image",
    title: { en: "April meetup slides", zh: "四月聚会幻灯片" },
    description: { en: "", zh: "" },
    src: "/projects/client-work/bc-ai-ecosystem/april-meetup-slides.jpg",
    width: 1600,
    height: 900,
    credit: {
      label: { en: "Michelle Diamond", zh: "Michelle Diamond" },
      href: "https://example.com/michelle"
    }
  },
  {
    type: "image",
    title: { en: "Launch video still", zh: "发布视频静帧" },
    description: { en: "", zh: "" },
    src: "/projects/client-work/bc-ai-ecosystem/launch-video-still.jpg",
    width: 1280,
    height: 720,
    href: "https://www.youtube.com/watch?v=launch-video"
  },
  {
    type: "image",
    title: { en: "Annual report PDF", zh: "年度报告 PDF" },
    description: { en: "", zh: "" },
    src: "/projects/client-work/bc-ai-ecosystem/annual-report-cover.jpg",
    width: 1200,
    height: 1600,
    href: "not-a-valid-url",
    layout: "portrait"
  }
];

test("archive media wall renders credit, YouTube, and generic overlay links", async () => {
  const user = userEvent.setup();

  render(<ArchiveMediaWall locale="en" items={archiveItems} {...wallLabels} />);

  expect(screen.getByText(/Photo credit:/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Michelle Diamond/i })).toHaveAttribute(
    "href",
    "https://example.com/michelle"
  );
  expect(screen.getAllByRole("link", { name: /YouTube/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^Open/i }).length).toBeGreaterThan(0);

  await user.click(screen.getByRole("button", { name: /Preview April meetup slides/i }));

  const lightbox = screen.getByRole("dialog", { name: /image preview/i });
  expect(lightbox).toHaveClass("project-media__lightbox");
  expect(within(lightbox).getByRole("img", { name: /April meetup slides/i })).toBeInTheDocument();
});

test("archive media wall falls back to the static album layout without ResizeObserver", () => {
  const originalResizeObserver = globalThis.ResizeObserver;

  // @ts-expect-error test-only cleanup of the enhancement gate
  delete globalThis.ResizeObserver;

  try {
    const { container } = render(<ArchiveMediaWall locale="en" items={archiveItems} {...wallLabels} />);

    expect(container.querySelector(".project-media__wall--rows")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Preview Launch video still/i })).toBeInTheDocument();
  } finally {
    globalThis.ResizeObserver = originalResizeObserver;
  }
});
