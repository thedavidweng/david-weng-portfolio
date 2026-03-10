import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { heroContent, siteIdentity } from "@/content/site";

export function HeroSection() {
  return (
    <section className="hero section-shell" id="top">
      <Container>
        <div className="hero__panel">
          <div className="hero__content">
            <p className="hero__eyebrow">{heroContent.kicker}</p>
            <h1 className="hero__title">{heroContent.headline}</h1>
            <p className="hero__lede">{heroContent.support}</p>
            <div className="hero__roles" aria-label="Professional roles">
              {siteIdentity.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
            <div className="hero__actions">
              <Link className="button button--primary" href="#projects">
                View Selected Work
              </Link>
              <Link className="button button--ghost" href="#contact">
                Contact
              </Link>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-main">
              <strong>{heroContent.visualHeadline}</strong>
              <span>{heroContent.visualCaption}</span>
            </div>
            <div className="hero__visual-detail">
              {heroContent.visualNotes.map((note) => (
                <article key={note.title}>
                  <strong>{note.title}</strong>
                  <p>{note.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
