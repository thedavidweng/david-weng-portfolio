"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { getProjectCategories, projectLabel, projectSectionContent, projects } from "@/content/projects";
import { getLocalizedText, getProjectPath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type ProjectsSectionProps = {
  locale: Locale;
};

export function ProjectsSection({ locale }: ProjectsSectionProps) {
  const categories = useMemo(() => getProjectCategories(locale), [locale]);
  const [activeCategory, setActiveCategory] = useState(() => categories[0]?.id ?? "all");
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1
  });

  const visibleProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) => project.category.en === activeCategory);
  }, [activeCategory]);

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const handleViewportWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!emblaApi) {
        return;
      }

      const primaryDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (Math.abs(primaryDelta) < 12) {
        return;
      }

      if (primaryDelta > 0) {
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
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const frame = requestAnimationFrame(syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);
    emblaApi.on("select", syncCarouselState);

    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("reInit", syncCarouselState);
      emblaApi.off("select", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.reInit();
    emblaApi.scrollTo(0, true);

    const frame = requestAnimationFrame(syncCarouselState);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [activeCategory, emblaApi, syncCarouselState]);

  function scrollReel(direction: "next" | "previous") {
    if (!emblaApi) {
      return;
    }

    if (direction === "next") {
      emblaApi.scrollNext();
      return;
    }

    emblaApi.scrollPrev();
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
                onClick={() => setActiveCategory(category.id)}
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
            onWheel={handleViewportWheel}
            ref={viewportRef}
            role="region"
          >
            <div className="projects__reel">
              {visibleProjects.map((project) => (
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
                      <span className="project-card__cta">{getLocalizedText(projectSectionContent.openItemLabel, locale)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
