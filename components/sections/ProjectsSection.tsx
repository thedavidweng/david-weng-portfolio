"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { projects, projectSectionContent } from "@/content/projects";

const categories = ["All", ...new Set(projects.map((project) => project.category))];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="section-shell" id="projects">
      <Container>
        <div className="projects__layout">
          <div className="poster-section__intro">
            <p className="poster-section__eyebrow">{projectSectionContent.eyebrow}</p>
            <h2 className="poster-section__title">{projectSectionContent.title}</h2>
            <p className="poster-section__copy">{projectSectionContent.description}</p>
          </div>
          <div className="projects__filters" role="toolbar" aria-label="Project filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-chip${activeCategory === category ? " filter-chip--active" : ""}`}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="projects__grid">
            {visibleProjects.map((project) => (
              <Link
                key={project.slug}
                aria-label={`Open project ${project.title}`}
                className="project-card signal-panel"
                href={`/projects/${project.slug}`}
                style={{
                  ["--project-cover" as string]: `linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 58%, ${project.coverPalette[2]})`
                }}
              >
                <div aria-hidden="true" className="project-card__word">
                  {project.posterWord}
                </div>
                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span>{project.code}</span>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__summary">{project.teaser}</p>
                  <div className="project-card__footer">
                    <span>{project.coverLabel}</span>
                    <span className="project-card__cta">Open archive item</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
