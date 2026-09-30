const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const random = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const shapes: ((u: number, r: () => number) => number)[] = [
  (u, r) => Math.max(0, Math.sin(u * 23 + 1.2)) ** 0.6 * (u > 0.08 ? 1 : 0.15) * (0.35 + 0.65 * r()),
  (u, r) => (u > 0.05 ? 1 : 0) * (Math.exp(-((u * 64) % 1) * 7) * 0.9 + 0.12 * r()),
  (u, r) => 0.28 + 0.32 * (0.5 + 0.5 * Math.sin(u * 11)) + 0.18 * r(),
  (u, r) => (0.18 + 0.42 * Math.abs(Math.sin(u * 5.3 + 0.7))) * (0.55 + 0.45 * r())
];

const clock = (seconds: number) =>
  [Math.floor(seconds / 60), seconds % 60].map((n) => String(n).padStart(2, "0")).join(":");

export function initStems() {
  const canvas = document.querySelector<HTMLCanvasElement>("#stems");
  const timecode = document.querySelector("#timecode");
  const context = canvas?.getContext("2d");
  if (!canvas || !timecode || !context) return;

  const bar = 3;
  const step = bar + 2;
  const padX = 16;
  const padY = 14;
  const duration = 212;
  const loop = 24000;

  let width = 0;
  let height = 0;
  let bars: number[][] = [];
  let colors: string[] = [];
  let rest = "";
  let head = 0.38;
  let scrub: number | null = null;
  let visible = false;
  let raf = 0;
  let last = 0;

  function readColors() {
    colors = [...document.querySelectorAll("[data-stem]")].map((el) => getComputedStyle(el).color);
    rest = getComputedStyle(canvas!).color;
  }

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    ({ width, height } = canvas!.getBoundingClientRect());
    canvas!.width = Math.round(width * ratio);
    canvas!.height = Math.round(height * ratio);
    context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(40, Math.floor((width - padX * 2) / step));
    bars = shapes.map((shape, i) => {
      const r = random(1337 + i * 97);
      return Array.from({ length: count }, (_, k) => Math.min(1, shape(k / count, r)));
    });
    draw(performance.now());
  }

  function draw(now: number) {
    if (!bars.length) return;
    context!.clearRect(0, 0, width, height);
    const rowHeight = (height - padY * 2) / bars.length;
    const position = scrub ?? head;
    const playhead = padX + position * bars[0].length * step;
    bars.forEach((row, s) => {
      const middle = padY + rowHeight * (s + 0.5);
      row.forEach((level, k) => {
        const x = padX + k * step;
        const played = x < playhead;
        const near = Math.max(0, 1 - Math.abs(x - playhead) / 60);
        const wobble = played && !reducedMotion.matches ? 1 + 0.18 * near * Math.sin(now / 90 + k * 0.7 + s) : 1;
        const half = Math.max(1.5, level * rowHeight * 0.42 * wobble);
        context!.fillStyle = played ? colors[s] : rest;
        context!.globalAlpha = played ? 0.55 + 0.45 * Math.max(near, 0.6) : 1;
        context!.beginPath();
        context!.rect(x, middle - half, bar, half * 2);
        context!.fill();
      });
    });
    context!.globalAlpha = 1;
    context!.fillStyle = colors[0];
    context!.fillRect(playhead - 0.5, 6, 1, height - 12);
    const text = `${clock(Math.floor(position * duration))} / ${clock(duration)}`;
    if (timecode!.textContent !== text) timecode!.textContent = text;
  }

  function frame(now: number) {
    raf = 0;
    if (!visible || document.hidden) return;
    if (scrub === null && !reducedMotion.matches) head = (head + (now - (last || now)) / loop) % 1;
    last = now;
    draw(now);
    if (!reducedMotion.matches) raf = requestAnimationFrame(frame);
  }

  function play() {
    if (raf) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  function seek(event: PointerEvent) {
    if (!bars.length) return;
    const rect = canvas!.getBoundingClientRect();
    scrub = Math.min(1, Math.max(0, (event.clientX - rect.left - padX) / (bars[0].length * step)));
    play();
  }

  canvas.addEventListener("pointermove", seek);
  canvas.addEventListener("pointerdown", seek);
  canvas.addEventListener("pointerleave", () => {
    if (scrub !== null) head = scrub;
    scrub = null;
    play();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    play();
  }).observe(canvas);
  new ResizeObserver(resize).observe(canvas);
  document.addEventListener("visibilitychange", play);
  reducedMotion.addEventListener("change", play);
  addEventListener("themechange", () => {
    readColors();
    draw(performance.now());
  });
  readColors();
}
