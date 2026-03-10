import Link from "next/link";
import Image from "next/image";
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
              <h1 aria-label={heroContent.headline} className="hero__title">
                {heroContent.headline}
              </h1>
              <p className="hero__lede">{heroContent.support}</p>
              <p className="hero__support">{heroContent.supportSecondary}</p>
              <dl className="hero__stats">
                {heroContent.stats.map((item) => (
                  <div key={item.label} className="hero__stat">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="hero__actions">
                <Link className="button button--signal" href="#projects">
                  {heroContent.primaryCta}
                </Link>
                <Link className="button button--ghost" href="/legacy/resume.pdf">
                  {heroContent.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="hero__rail">
              <div className="hero__rail-head">
                <span className="hero__rail-label">Current focus</span>
                <span className="hero__rail-code">[ 2026 EDITION ]</span>
              </div>
              <div className="hero__roles" aria-label="Professional roles">
                {siteIdentity.roles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
              <div className="hero__visual">
                <div className="hero__visual-main hero__visual-main--image">
                  <Image
                    alt="Portrait of David Weng"
                    className="hero__portrait"
                    fill
                    priority
                    sizes="(max-width: 1120px) 100vw, 34vw"
                    src={heroContent.profileImage}
                  />
                </div>
                <div className="hero__visual-main hero__visual-main--copy">
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
        </div>
      </Container>
    </section>
  );
}
