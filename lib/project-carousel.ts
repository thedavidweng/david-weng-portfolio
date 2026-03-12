import { projects } from "@/content/projects";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale, ProjectItem } from "@/types/content";

export const PROJECT_CATEGORY_SEQUENCE = ["Client", "Film / Video", "Writing"] as const;

export const BOUNDARY_DRAG_THRESHOLD_PX = 96;
export const BOUNDARY_DRAG_VELOCITY_PX_PER_MS = 0.58;
export const BOUNDARY_WHEEL_THRESHOLD = 220;
export const BOUNDARY_IDLE_RESET_MS = 240;
export const ELASTIC_MAX_OFFSET_PX = 28;
export const ELASTIC_MIN_SCALE_X = 0.94;

export type ProjectCategoryId = (typeof PROJECT_CATEGORY_SEQUENCE)[number];

export type ProjectCategoryGroup = {
  id: ProjectCategoryId;
  label: string;
  startIndex: number;
  endIndex: number;
};

export type WheelBoundaryState = {
  direction: -1 | 0 | 1;
  intent: number;
  lastEventAt: number;
  offset: number;
};

type WheelBoundaryInput = {
  delta: number;
  direction: -1 | 1;
  isAtBoundary: boolean;
  now: number;
};

type BoundaryReleaseInput = {
  dragDistance: number;
  dragVelocity: number;
};

export const orderedProjects: ProjectItem[] = PROJECT_CATEGORY_SEQUENCE.flatMap((categoryId) =>
  projects.filter((project) => project.category.en === categoryId)
);

export function buildProjectCategoryGroups(locale: Locale): ProjectCategoryGroup[] {
  return PROJECT_CATEGORY_SEQUENCE.reduce<ProjectCategoryGroup[]>((groups, categoryId) => {
    const startIndex = orderedProjects.findIndex((project) => project.category.en === categoryId);

    if (startIndex === -1) {
      return groups;
    }

    const categoryProjects = orderedProjects.filter((project) => project.category.en === categoryId);
    const endIndex = startIndex + categoryProjects.length - 1;

    groups.push({
      id: categoryId,
      label: getLocalizedText(categoryProjects[0].category, locale),
      startIndex,
      endIndex
    });

    return groups;
  }, []);
}

export function getCategoryBySnap(groups: ProjectCategoryGroup[], snapIndex: number) {
  return groups.find((group) => snapIndex >= group.startIndex && snapIndex <= group.endIndex) ?? null;
}

export function isSnapAtCategoryBoundary(
  groups: ProjectCategoryGroup[],
  snapIndex: number,
  direction: -1 | 1
) {
  const category = getCategoryBySnap(groups, snapIndex);

  if (!category) {
    return false;
  }

  return direction === 1 ? snapIndex === category.endIndex : snapIndex === category.startIndex;
}

export function computeElasticPull(distance: number) {
  if (distance <= 0) {
    return {
      offset: 0,
      scaleX: 1
    };
  }

  const normalized = distance / (distance + BOUNDARY_DRAG_THRESHOLD_PX * 0.55);
  const offset = Math.min(ELASTIC_MAX_OFFSET_PX, normalized * ELASTIC_MAX_OFFSET_PX);
  const scaleProgress = offset / ELASTIC_MAX_OFFSET_PX;
  const scaleX = Math.max(ELASTIC_MIN_SCALE_X, 1 - scaleProgress * (1 - ELASTIC_MIN_SCALE_X));

  return {
    offset,
    scaleX
  };
}

export function resolveBoundaryRelease({ dragDistance, dragVelocity }: BoundaryReleaseInput) {
  return dragDistance >= BOUNDARY_DRAG_THRESHOLD_PX || dragVelocity >= BOUNDARY_DRAG_VELOCITY_PX_PER_MS
    ? "advance"
    : "snap-back";
}

export function canAdvanceWheelBoundary(state: WheelBoundaryState, input: WheelBoundaryInput) {
  if (!input.isAtBoundary) {
    return {
      allowed: true,
      state: createWheelBoundaryState()
    };
  }

  const directionChanged = state.direction !== 0 && state.direction !== input.direction;
  const expired = input.now - state.lastEventAt > BOUNDARY_IDLE_RESET_MS;
  const nextIntent = directionChanged || expired ? input.delta : state.intent + input.delta;

  if (nextIntent >= BOUNDARY_WHEEL_THRESHOLD) {
    return {
      allowed: true,
      state: createWheelBoundaryState()
    };
  }

  return {
    allowed: false,
    state: {
      direction: input.direction,
      intent: nextIntent,
      lastEventAt: input.now,
      offset: computeElasticPull(nextIntent).offset
    }
  };
}

export function createWheelBoundaryState(): WheelBoundaryState {
  return {
    direction: 0,
    intent: 0,
    lastEventAt: 0,
    offset: 0
  };
}
