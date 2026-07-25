import {
  StrictMode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PortfolioImage } from "@/src/islands/_shared/PortfolioImage";
import { projectSectionContent } from "@/content/project-section";
import { getLocalizedText, getProjectPath } from "@/lib/i18n";
import {
  buildProjectCategoryGroups,
  getCategoryBySnap,
  orderedProjects,
} from "@/lib/project-carousel";
import type { Locale } from "@/types/content";

type ProjectsSectionProps = {
  locale: Locale;
};

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const categoryGroups = useMemo(
    () => buildProjectCategoryGroups(locale),
    [locale],
  );
  const categories = useMemo(
    () => categoryGroups.map((group) => ({ id: group.id, label: group.label })),
    [categoryGroups],
  );
  const categoryKey = categories.map((category) => category.id).join("|");
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const slideOffsetsRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevCategoryKeyRef = useRef(categoryKey);

  if (categoryKey !== prevCategoryKeyRef.current) {
    prevCategoryKeyRef.current = categoryKey;

    if (activeIndex !== 0) {
      setActiveIndex(0);
    }
  }

  const activeCategory = useMemo(
    () =>
      getCategoryBySnap(categoryGroups, activeIndex)?.id ??
      categoryGroups[0]?.id ??
      "Client",
    [activeIndex, categoryGroups],
  );
  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < orderedProjects.length - 1;

  const syncScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    const slideOffsets = slideOffsetsRef.current;

    if (!viewport || slideOffsets.length === 0) {
      return;
    }

    const scrollLeft = viewport.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideOffsets.forEach((offsetLeft, index) => {
      const distance = Math.abs(offsetLeft - scrollLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex,
    );
  }, []);

  const scheduleScrollSyncRef = useRef<() => void>(() => {});

  const measureSlideOffsets = useCallback(() => {
    slideRefs.current = slideRefs.current.slice(0, orderedProjects.length);
    slideOffsetsRef.current = slideRefs.current.map(
      (slide) => slide?.offsetLeft ?? 0,
    );
  }, []);

  const measureSlidesRef = useRef(measureSlideOffsets);
  measureSlidesRef.current = () => {
    measureSlideOffsets();
    scheduleScrollSyncRef.current();
  };

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;
      const clampedIndex = Math.max(
        0,
        Math.min(index, orderedProjects.length - 1),
      );
      const slide = slideRefs.current[clampedIndex];
      const targetOffset =
        slideOffsetsRef.current[clampedIndex] ?? slide?.offsetLeft ?? 0;

      if (!viewport || !slide) {
        return;
      }

      setActiveIndex(clampedIndex);

      if (typeof viewport.scrollTo === "function") {
        viewport.scrollTo({ left: targetOffset, behavior });
      } else {
        viewport.scrollLeft = targetOffset;
      }

      scheduleScrollSyncRef.current();
    },
    [],
  );

  const prevMeasuredCategoryKeyRef = useRef(categoryKey);

  useLayoutEffect(() => {
    measureSlideOffsets();
    const viewport = viewportRef.current;

    if (prevMeasuredCategoryKeyRef.current !== categoryKey) {
      prevMeasuredCategoryKeyRef.current = categoryKey;

      if (viewport) {
        viewport.scrollLeft = 0;
      }
    }
  }, [categoryKey, measureSlideOffsets]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    let pendingFrame: number | null = null;

    const scheduleScrollSync = () => {
      if (pendingFrame !== null) {
        return;
      }

      pendingFrame = window.requestAnimationFrame(() => {
        pendingFrame = null;
        syncScrollState();
      });
    };

    scheduleScrollSyncRef.current = scheduleScrollSync;

    const handleScroll = () => scheduleScrollSync();
    const handleResize = () => measureSlidesRef.current();

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (pendingFrame !== null) {
        window.cancelAnimationFrame(pendingFrame);
      }
    };
  }, [syncScrollState]);

  function scrollReel(direction: "next" | "previous") {
    const delta = direction === "next" ? 1 : -1;
    scrollToIndex(activeIndex + delta);
  }

  function scrollToCategory(categoryId: string) {
    const nextCategory = categoryGroups.find(
      (group) => group.id === categoryId,
    );

    if (!nextCategory) {
      return;
    }

    scrollToIndex(nextCategory.startIndex);
  }

  return (
    <StrictMode>
      <section className="section-shell" id="projects">
        <div className="container">
          <div className="projects__layout">
            <div className="poster-section__intro">
              <h2 className="poster-section__title">
                {getLocalizedText(projectSectionContent.title, locale)}
              </h2>
              <p className="poster-section__copy">
                {getLocalizedText(projectSectionContent.description, locale)}
              </p>
            </div>
            <div className="projects__topbar">
              <div
                className="projects__filters"
                role="toolbar"
                aria-label={getLocalizedText(
                  projectSectionContent.filtersLabel,
                  locale,
                )}
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    aria-controls="projects-carousel"
                    aria-pressed={activeCategory === category.id}
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
                  aria-label={getLocalizedText(
                    projectSectionContent.previousLabel,
                    locale,
                  )}
                  aria-controls="projects-carousel"
                  className="reel-nav"
                  disabled={!canScrollPrev}
                  onClick={() => scrollReel("previous")}
                  type="button"
                >
                  {getLocalizedText(
                    projectSectionContent.previousButtonText,
                    locale,
                  )}
                </button>
                <button
                  aria-label={getLocalizedText(
                    projectSectionContent.nextLabel,
                    locale,
                  )}
                  aria-controls="projects-carousel"
                  className="reel-nav"
                  disabled={!canScrollNext}
                  onClick={() => scrollReel("next")}
                  type="button"
                >
                  {getLocalizedText(
                    projectSectionContent.nextButtonText,
                    locale,
                  )}
                </button>
              </div>
            </div>
            <section
              aria-label={getLocalizedText(
                projectSectionContent.carouselLabel,
                locale,
              )}
              className="projects__viewport"
              id="projects-carousel"
              ref={viewportRef}
            >
              <div className="projects__reel">
                {orderedProjects.map((project, index) => (
                  <a
                    key={project.slug}
                    aria-label={`Open project ${getLocalizedText(project.title, locale)}`}
                    className="project-card projects__slide signal-panel"
                    href={getProjectPath(locale, project.slug)}
                    ref={(node) => {
                      slideRefs.current[index] = node;
                    }}
                    style={{
                      ["--project-cover-palette" as string]: `linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 58%, ${project.coverPalette[2]})`,
                    }}
                  >
                    <div aria-hidden="true" className="project-card__backdrop">
                      {project.coverImage ? (
                        <PortfolioImage
                          alt=""
                          className="project-card__image"
                          fill
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "low"}
                          sizes="(max-width: 760px) 82vw, (max-width: 1320px) 31vw, 388px"
                          src={project.coverImage}
                          width={project.coverWidth}
                        />
                      ) : null}
                    </div>
                    <div aria-hidden="true" className="project-card__word">
                      {project.posterWord}
                    </div>
                    <div className="project-card__content">
                      <div className="project-card__meta">
                        <span>{project.code}</span>
                        <span>
                          {getLocalizedText(project.category, locale)}
                        </span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="project-card__title">
                        {getLocalizedText(project.title, locale)}
                      </h3>
                      <p className="project-card__summary">
                        {getLocalizedText(project.teaser, locale)}
                      </p>
                      <div className="project-card__footer">
                        <span>
                          {getLocalizedText(project.coverLabel, locale)}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </StrictMode>
  );
}

export default ProjectsSection;
