"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
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
          <SectionHeading
            eyebrow={projectSectionContent.eyebrow}
            title={projectSectionContent.title}
            description={projectSectionContent.description}
          />
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
                className="project-card"
                href={`/projects/${project.slug}`}
                style={{
                  ["--project-cover" as string]: `linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 58%, ${project.coverPalette[2]})`
                }}
              >
                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__summary">{project.teaser}</p>
                  <span className="project-card__cta">View project</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
