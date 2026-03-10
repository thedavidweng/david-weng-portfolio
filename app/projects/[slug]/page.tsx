import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { projects } from "@/content/projects";
import { getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | David Weng"
    };
  }

  return {
    title: `${project.title} | David Weng`,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="project-page">
        <section className="project-hero">
          <Container>
            <div className="project-hero__frame">
              <div className="project-hero__header">
                <Link className="project-hero__back signal-control signal-control--nav" href="/#projects">
                  Back to projects
                </Link>
                <div className="project-hero__micro">
                  <span>{project.code}</span>
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
              <div className="project-hero__grid">
                <div className="project-hero__content">
                  <h1 className="project-hero__title">{project.title}</h1>
                  <p className="project-hero__summary">{project.summary}</p>
                  <p className="project-hero__roles">
                    {project.projectType} / {project.roles.join(" / ")}
                  </p>
                  <div className="project-detail__links">
                    {project.externalLinks.map((link) => (
                      <a
                        key={link.label}
                        className="button button--signal"
                        href={link.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div
                  className="project-hero__cover"
                  style={{
                    background: `linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 55%, ${project.coverPalette[2]})`
                  }}
                >
                  <div className="project-hero__word" aria-hidden="true">
                    {project.posterWord}
                  </div>
                  <div className="project-hero__cover-meta">
                    <span>{project.coverLabel}</span>
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="project-detail">
          <Container>
            <div className="project-detail__grid">
              <div className="signal-panel">
                <p className="poster-section__eyebrow">Highlights</p>
                <h2 className="project-detail__title">Why it matters</h2>
                <ul className="project-detail__list">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className="signal-panel">
                <p className="poster-section__eyebrow">Material</p>
                <h2 className="project-detail__title">Mixed-media structure</h2>
                <p className="project-card__summary">
                  The project is organized as a hybrid record of moving image, stills, documents, and external references.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="project-media">
          <Container>
            <div className="poster-section__intro">
              <p className="poster-section__eyebrow">Project Materials</p>
              <h2 className="poster-section__title">Archive components</h2>
            </div>
            <div className="project-media__grid">
              {project.media.map((item) => (
                <article key={item.title} className="project-media__card signal-panel">
                  <div className="project-media__badge">{item.type}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
