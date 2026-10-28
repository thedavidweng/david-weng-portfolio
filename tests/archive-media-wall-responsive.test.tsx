import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import { ArchiveMediaWall } from "@/src/islands/ArchiveMediaWall";
import { MockResizeObserver } from "@/tests/helpers/dom-observers";
import { wallLabels } from "@/tests/helpers/wall-labels";
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


test("server-rendered archive hydrates before enabling the responsive album", async () => {
  const originalResizeObserver = globalThis.ResizeObserver;
  // @ts-expect-error simulate server without ResizeObserver
  delete globalThis.ResizeObserver;
  const container = document.createElement("div");
  const view = <ArchiveMediaWall locale="en" items={archiveItems} {...wallLabels} />;
  container.innerHTML = renderToString(view);
  globalThis.ResizeObserver = MockResizeObserver as typeof ResizeObserver;
  document.body.append(container);
  const onRecoverableError = vi.fn();
  let root: ReturnType<typeof hydrateRoot>;
  await act(async () => { root = hydrateRoot(container, view, { onRecoverableError }); });
  expect(onRecoverableError).not.toHaveBeenCalled();
  await act(async () => root.unmount());
  container.remove();
  globalThis.ResizeObserver = originalResizeObserver;
});
