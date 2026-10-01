import { installMatchMedia } from "./helpers/match-media";

const reduce = "(prefers-reduced-motion: reduce)";
const media = installMatchMedia();
const { initStems } = await import("@/src/scripts/stems");

const frames: FrameRequestCallback[] = [];
let intersect: IntersectionObserverCallback = () => undefined;
let resize: ResizeObserverCallback = () => undefined;
const context = {
  setTransform: vi.fn(),
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  rect: vi.fn(),
  fill: vi.fn(),
  fillRect: vi.fn(),
  fillStyle: "",
  globalAlpha: 1
};

vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => frames.push(callback));
vi.stubGlobal(
  "IntersectionObserver",
  class {
    constructor(callback: IntersectionObserverCallback) {
      intersect = callback;
    }
    observe() {}
  }
);
vi.stubGlobal(
  "ResizeObserver",
  class {
    constructor(callback: ResizeObserverCallback) {
      resize = callback;
    }
    observe() {}
  }
);

const runFrame = (now: number) => frames.shift()?.(now);
const setVisible = (isIntersecting: boolean) =>
  intersect([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
const pointer = (type: string, clientX = 0) => canvas.dispatchEvent(new MouseEvent(type, { clientX }));

let canvas: HTMLCanvasElement;
let timecode: HTMLElement;

beforeAll(() => {
  document.body.innerHTML = `<canvas id="stems" style="color: gray"></canvas><output id="timecode"></output>
    <i data-stem style="color: red"></i><i data-stem style="color: blue"></i>`;
  canvas = document.querySelector("canvas")!;
  timecode = document.querySelector("output")!;
  vi.spyOn(canvas, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, width: 416, height: 120 } as DOMRect);
});

test("does nothing without a 2d canvas context", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValueOnce(null);
  initStems();
  expect(context.setTransform).not.toHaveBeenCalled();
});

test("draws, animates, scrubs, and pauses the stems timeline", () => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context as unknown as CanvasRenderingContext2D);
  initStems();
  pointer("pointermove", 100);
  dispatchEvent(new Event("themechange"));
  expect(context.clearRect).not.toHaveBeenCalled();
  expect(frames).toHaveLength(0);

  resize([], {} as ResizeObserver);
  expect(canvas.width).toBe(416);
  expect(context.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  expect(timecode).toHaveTextContent("01:20 / 03:32");

  runFrame(0);
  setVisible(true);
  runFrame(1000);
  runFrame(13000);
  expect(timecode).toHaveTextContent("03:06 / 03:32");

  pointer("pointermove", 16);
  runFrame(14000);
  expect(timecode).toHaveTextContent("00:00 / 03:32");
  pointer("pointerdown", 9999);
  runFrame(15000);
  expect(timecode).toHaveTextContent("03:32 / 03:32");
  pointer("pointerleave");
  pointer("pointerleave");
  runFrame(16000);
  expect(timecode).toHaveTextContent("00:08 / 03:32");

  context.clearRect.mockClear();
  dispatchEvent(new Event("themechange"));
  expect(context.clearRect).toHaveBeenCalledTimes(1);

  setVisible(false);
  runFrame(17000);
  expect(frames).toHaveLength(0);
  document.dispatchEvent(new Event("visibilitychange"));
  runFrame(17500);
  expect(frames).toHaveLength(0);

  media.set(reduce, true);
  media.fire(reduce);
  setVisible(true);
  runFrame(30000);
  expect(frames).toHaveLength(0);
  expect(timecode).toHaveTextContent("00:08 / 03:32");
});
