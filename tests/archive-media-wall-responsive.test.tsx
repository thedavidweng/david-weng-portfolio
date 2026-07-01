import { render, screen } from "@testing-library/react";
import { projectDetailContent } from "@/content/projects";
import { ArchiveMediaWall } from "@/src/islands/ArchiveMediaWall";
import type { ProjectMediaItem } from "@/types/content";

const { rowsAlbumSpy } = vi.hoisted(() => ({
  rowsAlbumSpy: vi.fn(
    (props: {
      spacing?: (containerWidth: number) => number;
      targetRowHeight?: (containerWidth: number) => number;
    }) => {
      expect(props.spacing?.(700)).toBe(12);
      expect(props.spacing?.(900)).toBe(18);
      expect(props.targetRowHeight?.(700)).toBe(180);
      expect(props.targetRowHeight?.(1000)).toBe(240);
      expect(props.targetRowHeight?.(1400)).toBe(320);

      return <div data-testid="rows-album" />;
    }
  )
}));

vi.mock("react-photo-album", async (importOriginal) => {
  const mod = await importOriginal<typeof import("react-photo-album")>();

  return {
    ...mod,
    RowsPhotoAlbum: rowsAlbumSpy
  };
});

const wallLabels = {
  photoCreditLabel: projectDetailContent.photoCreditLabel,
  previewLabel: projectDetailContent.previewLabel,
  previewDialogLabel: projectDetailContent.previewDialogLabel,
  closePreviewLabel: projectDetailContent.closePreviewLabel
};

const archiveItems: ProjectMediaItem[] = [
  {
    type: "image",
    title: { en: "Launch video still", zh: "发布视频静帧" },
    description: { en: "", zh: "" },
    src: "/projects/client-work/bc-ai-ecosystem/launch-video-still.jpg",
    width: 1280,
    height: 720,
    href: "https://www.youtube.com/watch?v=launch-video"
  }
];

test("archive media wall wires responsive row sizing hooks into RowsPhotoAlbum", () => {
  class MockResizeObserver {
    disconnect() {
      return undefined;
    }

    observe() {
      return undefined;
    }

    unobserve() {
      return undefined;
    }
  }

  const originalResizeObserver = globalThis.ResizeObserver;
  globalThis.ResizeObserver = MockResizeObserver as typeof ResizeObserver;

  try {
    render(<ArchiveMediaWall locale="en" items={archiveItems} {...wallLabels} />);

    expect(screen.getByTestId("rows-album")).toBeInTheDocument();
    expect(rowsAlbumSpy).toHaveBeenCalled();
  } finally {
    globalThis.ResizeObserver = originalResizeObserver;
  }
});
