type HeaderScrollState = {
  visible: boolean;
  scrolled: boolean;
};

type HeaderScrollController = {
  update: (nextScrollY: number) => HeaderScrollState;
};

const TOP_VISIBILITY_ZONE = 12;
const SCROLLED_THRESHOLD = 8;
const HIDE_DISTANCE = 28;
const REVEAL_DISTANCE = 12;

export function createHeaderScrollController(): HeaderScrollController {
  let lastY = 0;
  let downDistance = 0;
  let upDistance = 0;
  let visible = true;

  const update = (nextScrollY: number): HeaderScrollState => {
    const normalizedY = Math.max(0, nextScrollY);
    const delta = normalizedY - lastY;

    if (normalizedY <= TOP_VISIBILITY_ZONE) {
      visible = true;
      downDistance = 0;
      upDistance = 0;
    } else if (delta > 0) {
      downDistance += delta;
      upDistance = 0;
      if (downDistance >= HIDE_DISTANCE) {
        visible = false;
        downDistance = 0;
      }
    } else if (delta < 0) {
      upDistance += Math.abs(delta);
      downDistance = 0;
      if (upDistance >= REVEAL_DISTANCE) {
        visible = true;
        upDistance = 0;
      }
    }

    lastY = normalizedY;

    return {
      visible,
      scrolled: normalizedY > SCROLLED_THRESHOLD
    };
  };

  return { update };
}
