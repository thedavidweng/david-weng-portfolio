import { describe, expect, test } from "vitest";
import {
  BOUNDARY_DRAG_THRESHOLD_PX,
  BOUNDARY_DRAG_VELOCITY_PX_PER_MS,
  BOUNDARY_IDLE_RESET_MS,
  BOUNDARY_WHEEL_THRESHOLD,
  ELASTIC_MAX_OFFSET_PX,
  ELASTIC_MIN_SCALE_X,
  buildProjectCategoryGroups,
  canAdvanceWheelBoundary,
  computeElasticPull,
  getCategoryBySnap,
  resolveBoundaryRelease,
  orderedProjects
} from "@/lib/project-carousel";

describe("project carousel grouping", () => {
  test("orders the homepage project rail by explicit category sequence without an all bucket", () => {
    const groups = buildProjectCategoryGroups("en");

    expect(groups.map((group) => group.id)).toEqual([
      "Client",
      "Film",
      "Video",
      "Writing"
    ]);
    expect(groups.map((group) => group.label)).toEqual([
      "Client",
      "Film",
      "Video",
      "Writing"
    ]);
    expect(orderedProjects.map((project) => project.category.en)).toEqual([
      "Client",
      "Client",
      "Client",
      "Film",
      "Film",
      "Film",
      "Video",
      "Video",
      "Writing"
    ]);
  });

  test("maps snap indices back to the owning category", () => {
    const groups = buildProjectCategoryGroups("zh");

    expect(getCategoryBySnap(groups, 0)?.label).toBe("客户");
    expect(getCategoryBySnap(groups, 3)?.label).toBe("电影");
    expect(getCategoryBySnap(groups, 6)?.label).toBe("视频");
    expect(getCategoryBySnap(groups, 8)?.label).toBe("写作");
  });
});

describe("project carousel elastic boundary", () => {
  test("converts overscroll into a capped elastic offset and squish", () => {
    const response = computeElasticPull(120);

    expect(response.offset).toBeLessThanOrEqual(ELASTIC_MAX_OFFSET_PX);
    expect(response.offset).toBeGreaterThan(0);
    expect(response.scaleX).toBeGreaterThanOrEqual(ELASTIC_MIN_SCALE_X);
    expect(response.scaleX).toBeLessThan(1);
  });

  test("snaps back on weak release and advances on a strong release", () => {
    expect(
      resolveBoundaryRelease({
        dragDistance: BOUNDARY_DRAG_THRESHOLD_PX - 10,
        dragVelocity: BOUNDARY_DRAG_VELOCITY_PX_PER_MS - 0.08
      })
    ).toBe("snap-back");

    expect(
      resolveBoundaryRelease({
        dragDistance: BOUNDARY_DRAG_THRESHOLD_PX + 10,
        dragVelocity: BOUNDARY_DRAG_VELOCITY_PX_PER_MS - 0.2
      })
    ).toBe("advance");
  });

  test("requires extra wheel intent at category boundaries and resets after idle", () => {
    const initialState = { direction: 1 as const, intent: 0, lastEventAt: 0, offset: 0 };

    const partial = canAdvanceWheelBoundary(initialState, {
      delta: BOUNDARY_WHEEL_THRESHOLD - 40,
      direction: 1,
      isAtBoundary: true,
      now: 100
    });
    expect(partial.allowed).toBe(false);
    expect(partial.state.intent).toBe(BOUNDARY_WHEEL_THRESHOLD - 40);
    expect(partial.state.offset).toBeGreaterThan(0);

    const crossed = canAdvanceWheelBoundary(partial.state, {
      delta: 50,
      direction: 1,
      isAtBoundary: true,
      now: 140
    });
    expect(crossed.allowed).toBe(true);
    expect(crossed.state.intent).toBe(0);

    const reset = canAdvanceWheelBoundary(
      { direction: 1, intent: BOUNDARY_WHEEL_THRESHOLD - 10, lastEventAt: 0, offset: 14 },
      {
        delta: 20,
        direction: 1,
        isAtBoundary: true,
        now: BOUNDARY_IDLE_RESET_MS + 10
      }
    );
    expect(reset.allowed).toBe(false);
    expect(reset.state.intent).toBe(20);
    expect(reset.state.offset).toBeGreaterThan(0);
  });
});
