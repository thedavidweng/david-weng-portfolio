import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { aboutContent } from "@/content/site";

export function AboutSection() {
  return (
    <section className="section-shell" id="about">
      <Container>
        <div className="about__panel">
          <div className="about__content">
            <p className="section-heading__eyebrow">{aboutContent.eyebrow}</p>
            <h2 className="about__title">{aboutContent.title}</h2>
            <p className="about__copy">{aboutContent.body}</p>
            <p className="about__copy">{aboutContent.bodySecondary}</p>
            <div className="about__actions">
              <Link className="button button--ghost" href={aboutContent.resumeHref}>
                View Resume
              </Link>
              <Link className="button button--ghost" href={aboutContent.cvHref}>
                View CV
              </Link>
            </div>
          </div>
          <div className="about__rail">
            <p className="section-heading__eyebrow">Practice Focus</p>
            <div className="about__stats">
              {aboutContent.stats.map((stat) => (
                <div key={stat.label} className="about__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="about__actions">
              <Link className="button button--primary" href={aboutContent.linkedinHref}>
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
