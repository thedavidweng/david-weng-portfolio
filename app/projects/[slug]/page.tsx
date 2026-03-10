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
            <div className="project-hero__grid">
              <div>
                <Link className="project-hero__back" href="/#projects">
                  Back to projects
                </Link>
                <p className="section-heading__eyebrow">
                  {project.category} / {project.year}
                </p>
                <h1 className="project-hero__title">{project.title}</h1>
                <p className="project-hero__summary">{project.summary}</p>
                <p className="project-hero__roles">
                  {project.projectType} · Role: {project.roles.join(" / ")}
                </p>
              </div>
              <div
                className="project-hero__cover"
                style={{
                  background: `linear-gradient(145deg, ${project.coverPalette[0]}, ${project.coverPalette[1]} 55%, ${project.coverPalette[2]})`
                }}
              >
                <div className="project-hero__cover-meta">
                  <span>{project.coverLabel}</span>
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="project-detail">
          <Container>
            <div className="project-detail__grid">
              <div>
                <h2 className="project-detail__title">Highlights</h2>
                <ul className="project-detail__list">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="project-detail__title">External Links</h2>
                <div className="project-detail__links">
                  {project.externalLinks.map((link) => (
                    <a
                      key={link.label}
                      className="button button--dark"
                      href={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="project-media">
          <Container>
            <div className="section-heading">
              <p className="section-heading__eyebrow">Project Materials</p>
              <h2 className="section-heading__title">A mixed-media project structure.</h2>
            </div>
            <div className="project-media__grid">
              {project.media.map((item) => (
                <article key={item.title} className="project-media__card">
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
