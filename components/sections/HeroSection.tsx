import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { heroContent, siteIdentity } from "@/content/site";

export function HeroSection() {
  return (
    <section className="hero section-shell" id="top">
      <Container>
        <div className="hero__frame">
          <div className="hero__grid">
            <div className="hero__content">
              <p className="hero__eyebrow">{heroContent.kicker}</p>
              <h1
                aria-label={heroContent.headline}
                className="hero__title"
              >
                <span>CUT MOTION.</span>
                <span>FRAME STILLS.</span>
                <span>BUILD SIGNAL.</span>
              </h1>
              <p className="hero__lede">{heroContent.support}</p>
              <p className="hero__support">{heroContent.supportSecondary}</p>
              <div className="hero__actions">
                <Link className="button button--signal" href="#projects">
                  Enter Selected Work
                </Link>
                <Link className="button button--ghost" href="#contact">
                  Open Contact
                </Link>
              </div>
            </div>
            <div className="hero__rail">
              <div className="hero__rail-head">
                <span className="hero__rail-label">Poster-first portfolio</span>
                <span className="hero__rail-code">[ 2026 EDITION ]</span>
              </div>
              <div className="hero__roles" aria-label="Professional roles">
                {siteIdentity.roles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
              <div className="hero__visual">
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
          </div>
          <div className="hero__ticker" aria-hidden="true">
            <span>VIDEO EDITING</span>
            <span>PHOTOGRAPHY</span>
            <span>GRAPHIC DESIGN</span>
            <span>CONTENTOPS</span>
            <span>AI-INTEGRATED WORKFLOWS</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
