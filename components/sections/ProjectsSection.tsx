"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { Container } from "@/components/layout/Container";
import { projectLabel, projectSectionContent } from "@/content/projects";
import { getLocalizedText, getProjectPath } from "@/lib/i18n";
import {
  buildProjectCategoryGroups,
  canAdvanceWheelBoundary,
  computeElasticPull,
  createWheelBoundaryState,
  getCategoryBySnap,
  isSnapAtCategoryBoundary,
  orderedProjects,
  resolveBoundaryRelease
} from "@/lib/project-carousel";
import type { Locale } from "@/types/content";

type ProjectsSectionProps = {
  locale: Locale;
};

type DragGesture = {
  startedAt: number;
  startSnap: number;
  startX: number;
  direction: -1 | 0 | 1;
  boundaryActive: boolean;
};

const ELASTIC_RELEASE_MS = 260;
const ELASTIC_ADVANCE_DELAY_MS = 32;
const WHEEL_RELEASE_DELAY_MS = 110;

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const categoryGroups = useMemo(() => buildProjectCategoryGroups(locale), [locale]);
  const categories = useMemo(
    () => categoryGroups.map((group) => ({ id: group.id, label: group.label })),
    [categoryGroups]
  );
  const [activeCategory, setActiveCategory] = useState(() => categoryGroups[0]?.id ?? "Client");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [elasticClassName, setElasticClassName] = useState("");
  const dragGestureRef = useRef<DragGesture | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const releaseTimeoutRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);
  const wheelReleaseTimeoutRef = useRef<number | null>(null);
  const wheelBoundaryStateRef = useRef(createWheelBoundaryState());
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    container: ".projects__reel",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1
  });

  const clearTimeoutRef = useCallback((timeoutRef: MutableRefObject<number | null>) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const writeElasticVisual = useCallback(
    (direction: -1 | 1, distance: number, release = false) => {
      const shell = shellRef.current;

      if (!shell) {
        return;
      }

      const pull = computeElasticPull(distance);
      const translate = direction === 1 ? -pull.offset : pull.offset;

      clearTimeoutRef(releaseTimeoutRef);
      shell.style.setProperty("--projects-elastic-offset", `${translate}px`);
      shell.style.setProperty("--projects-elastic-scale", pull.scaleX.toString());
      shell.style.setProperty(
        "--projects-elastic-origin",
        direction === 1 ? "right center" : "left center"
      );
      setElasticClassName(release ? "projects__track-shell--elastic projects__track-shell--release" : "projects__track-shell--elastic");
    },
    [clearTimeoutRef]
  );

  const resetElasticVisual = useCallback(
    (release = true) => {
      const shell = shellRef.current;

      if (!shell) {
        return;
      }

      clearTimeoutRef(releaseTimeoutRef);
      shell.style.setProperty("--projects-elastic-offset", "0px");
      shell.style.setProperty("--projects-elastic-scale", "1");

      if (!release) {
        setElasticClassName("");
        return;
      }

      setElasticClassName("projects__track-shell--elastic projects__track-shell--release");
      releaseTimeoutRef.current = window.setTimeout(() => {
        setElasticClassName("");
        releaseTimeoutRef.current = null;
      }, ELASTIC_RELEASE_MS);
    },
    [clearTimeoutRef]
  );

  const resetWheelBoundary = useCallback(() => {
    wheelBoundaryStateRef.current = createWheelBoundaryState();
    clearTimeoutRef(wheelReleaseTimeoutRef);
  }, [clearTimeoutRef]);

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    const activeGroup = getCategoryBySnap(categoryGroups, emblaApi.selectedScrollSnap());

    if (activeGroup) {
      setActiveCategory(activeGroup.id);
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [categoryGroups, emblaApi]);

  const handleViewportWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!emblaApi) {
        return;
      }

      const primaryDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (Math.abs(primaryDelta) < 12) {
        return;
      }

      const direction: -1 | 1 = primaryDelta > 0 ? 1 : -1;
      const currentSnap = emblaApi.selectedScrollSnap();
      const boundaryAttempt = isSnapAtCategoryBoundary(categoryGroups, currentSnap, direction);

      if (boundaryAttempt) {
        const canContinue = direction === 1 ? emblaApi.canScrollNext() : emblaApi.canScrollPrev();

        if (!canContinue) {
          return;
        }

        event.preventDefault();
        const wheelGate = canAdvanceWheelBoundary(wheelBoundaryStateRef.current, {
          delta: Math.abs(primaryDelta),
          direction,
          isAtBoundary: true,
          now: Date.now()
        });
        wheelBoundaryStateRef.current = wheelGate.state;

        if (!wheelGate.allowed) {
          writeElasticVisual(direction, wheelGate.state.offset, false);
          clearTimeoutRef(wheelReleaseTimeoutRef);
          wheelReleaseTimeoutRef.current = window.setTimeout(() => {
            resetElasticVisual(true);
            wheelReleaseTimeoutRef.current = null;
          }, WHEEL_RELEASE_DELAY_MS);
          return;
        }

        resetElasticVisual(true);
        resetWheelBoundary();
        emblaApi.scrollTo(currentSnap + direction);
        return;
      }

      resetWheelBoundary();
      resetElasticVisual(false);

      if (direction === 1) {
        if (!emblaApi.canScrollNext()) {
          return;
        }

        event.preventDefault();
        emblaApi.scrollNext();
        return;
      }

      if (!emblaApi.canScrollPrev()) {
        return;
      }

      event.preventDefault();
      emblaApi.scrollPrev();
    },
    [
      categoryGroups,
      clearTimeoutRef,
      emblaApi,
      resetElasticVisual,
      resetWheelBoundary,
      writeElasticVisual
    ]
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const frame = requestAnimationFrame(syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("settle", syncCarouselState);

    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("reInit", syncCarouselState);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("settle", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.reInit();
    emblaApi.scrollTo(categoryGroups[0]?.startIndex ?? 0, true);

    const frame = requestAnimationFrame(syncCarouselState);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [categoryGroups, emblaApi, syncCarouselState]);

  useEffect(() => {
    return () => {
      clearTimeoutRef(releaseTimeoutRef);
      clearTimeoutRef(advanceTimeoutRef);
      clearTimeoutRef(wheelReleaseTimeoutRef);
    };
  }, [clearTimeoutRef]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!emblaApi || !event.isPrimary) {
        return;
      }

      resetWheelBoundary();
      clearTimeoutRef(advanceTimeoutRef);
      resetElasticVisual(false);
      dragGestureRef.current = {
        startedAt: performance.now(),
        startSnap: emblaApi.selectedScrollSnap(),
        startX: event.clientX,
        direction: 0,
        boundaryActive: false
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [clearTimeoutRef, emblaApi, resetElasticVisual, resetWheelBoundary]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!emblaApi || !dragGestureRef.current || !event.isPrimary) {
        return;
      }

      const gesture = dragGestureRef.current;
      const deltaX = event.clientX - gesture.startX;

      if (Math.abs(deltaX) < 4) {
        return;
      }

      const direction: -1 | 1 = deltaX < 0 ? 1 : -1;
      const isBoundaryStart = isSnapAtCategoryBoundary(categoryGroups, gesture.startSnap, direction);
      const canContinue = direction === 1 ? emblaApi.canScrollNext() : emblaApi.canScrollPrev();

      if (!isBoundaryStart || !canContinue) {
        if (gesture.boundaryActive) {
          gesture.boundaryActive = false;
          gesture.direction = 0;
          resetElasticVisual(false);
        }

        return;
      }

      gesture.direction = direction;
      gesture.boundaryActive = true;
      writeElasticVisual(direction, Math.abs(deltaX), false);
      emblaApi.scrollTo(gesture.startSnap, true);

      if (event.cancelable) {
        event.preventDefault();
      }
    },
    [categoryGroups, emblaApi, resetElasticVisual, writeElasticVisual]
  );

  const handlePointerRelease = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
      cancelled = false
    ) => {
      if (!event.isPrimary) {
        return;
      }

      const gesture = dragGestureRef.current;
      dragGestureRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);

      if (!emblaApi || !gesture) {
        return;
      }

      if (!gesture.boundaryActive || cancelled || gesture.direction === 0) {
        resetElasticVisual(cancelled);
        return;
      }

      const deltaX = event.clientX - gesture.startX;
      const dragDistance = Math.abs(deltaX);
      const dragVelocity = dragDistance / Math.max(performance.now() - gesture.startedAt, 1);
      const releaseAction = resolveBoundaryRelease({ dragDistance, dragVelocity });

      resetElasticVisual(true);

      if (releaseAction === "advance") {
        clearTimeoutRef(advanceTimeoutRef);
        advanceTimeoutRef.current = window.setTimeout(() => {
          emblaApi.scrollTo(gesture.startSnap + gesture.direction);
          advanceTimeoutRef.current = null;
        }, ELASTIC_ADVANCE_DELAY_MS);
        return;
      }

      emblaApi.scrollTo(gesture.startSnap, true);
    },
    [clearTimeoutRef, emblaApi, resetElasticVisual]
  );

  function scrollReel(direction: "next" | "previous") {
    if (!emblaApi) {
      return;
    }

    resetWheelBoundary();
    resetElasticVisual(false);

    if (direction === "next") {
      emblaApi.scrollNext();
      return;
    }

    emblaApi.scrollPrev();
  }

  function scrollToCategory(categoryId: string) {
    const nextCategory = categoryGroups.find((group) => group.id === categoryId);

    if (!nextCategory) {
      return;
    }

    setActiveCategory(nextCategory.id);
    resetWheelBoundary();
    resetElasticVisual(false);

    if (!emblaApi) {
      return;
    }

    emblaApi.scrollTo(nextCategory.startIndex);
  }

  return (
    <section className="section-shell" id="projects">
      <Container>
        <div className="projects__layout">
          <div className="poster-section__intro">
            <p className="poster-section__eyebrow">{getLocalizedText(projectSectionContent.eyebrow, locale)}</p>
            <h2 className="poster-section__title">{getLocalizedText(projectSectionContent.title, locale)}</h2>
            <p className="poster-section__copy">{getLocalizedText(projectSectionContent.description, locale)}</p>
          </div>
          <div
            className="projects__filters"
            role="toolbar"
            aria-label={getLocalizedText(projectSectionContent.filtersLabel, locale)}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-chip${activeCategory === category.id ? " filter-chip--active" : ""}`}
                onClick={() => scrollToCategory(category.id)}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="projects__reel-controls">
            <button
              aria-label={getLocalizedText(projectSectionContent.previousLabel, locale)}
              className="reel-nav"
              disabled={!canScrollPrev}
              onClick={() => scrollReel("previous")}
              type="button"
            >
              {locale === "zh" ? "上一组" : "Prev"}
            </button>
            <button
              aria-label={getLocalizedText(projectSectionContent.nextLabel, locale)}
              className="reel-nav"
              disabled={!canScrollNext}
              onClick={() => scrollReel("next")}
              type="button"
            >
              {locale === "zh" ? "下一组" : "Next"}
            </button>
          </div>
          <div
            aria-label={getLocalizedText(projectSectionContent.carouselLabel, locale)}
            className="projects__viewport"
            onPointerCancel={(event) => handlePointerRelease(event, true)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={(event) => handlePointerRelease(event)}
            onWheel={handleViewportWheel}
            ref={viewportRef}
            role="region"
          >
            <div className={`projects__track-shell ${elasticClassName}`.trim()} ref={shellRef}>
              <div className="projects__reel">
                {orderedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    aria-label={`Open project ${projectLabel(project.title, locale)}`}
                    className="project-card projects__slide signal-panel"
                    href={getProjectPath(locale, project.slug)}
                    style={{
                      ["--project-cover" as string]: project.coverImage
                        ? `linear-gradient(180deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.8)), url(${project.coverImage}), linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 58%, ${project.coverPalette[2]})`
                        : `linear-gradient(180deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.8)), linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 58%, ${project.coverPalette[2]})`
                    }}
                  >
                    <div aria-hidden="true" className="project-card__word">
                      {project.posterWord}
                    </div>
                    <div className="project-card__content">
                      <div className="project-card__meta">
                        <span>{project.code}</span>
                        <span>{projectLabel(project.category, locale)}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="project-card__title">{projectLabel(project.title, locale)}</h3>
                      <p className="project-card__summary">{projectLabel(project.teaser, locale)}</p>
                      <div className="project-card__footer">
                        <span>{projectLabel(project.coverLabel, locale)}</span>
                        <span className="project-card__cta">
                          {getLocalizedText(projectSectionContent.openItemLabel, locale)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
