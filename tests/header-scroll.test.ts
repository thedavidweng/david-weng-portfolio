import { describe, expect, test } from "vitest";
import { createHeaderScrollController } from "@/lib/header-scroll";

describe("createHeaderScrollController", () => {
  test("keeps header visible near top and while scrolling short distances", () => {
    const controller = createHeaderScrollController();

    expect(controller.update(0)).toEqual({ visible: true, scrolled: false });
    expect(controller.update(8)).toEqual({ visible: true, scrolled: false });
    expect(controller.update(20)).toEqual({ visible: true, scrolled: true });
  });

  test("hides after sustained downward scroll and reveals on upward scroll", () => {
    const controller = createHeaderScrollController();

    controller.update(0);
    controller.update(20);
    controller.update(35);
    expect(controller.update(52)).toEqual({ visible: false, scrolled: true });

    controller.update(44);
    expect(controller.update(38)).toEqual({ visible: true, scrolled: true });
  });

  test("resets to visible when returning to top zone", () => {
    const controller = createHeaderScrollController();

    controller.update(0);
    controller.update(25);
    controller.update(40);
    controller.update(60);
    expect(controller.update(60)).toEqual({ visible: false, scrolled: true });
    expect(controller.update(6)).toEqual({ visible: true, scrolled: false });
  });
});
