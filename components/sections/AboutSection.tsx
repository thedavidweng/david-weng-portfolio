import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { aboutContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type AboutSectionProps = {
  locale: Locale;
};

export function AboutSection({ locale }: AboutSectionProps) {
  return (
    <section className="section-shell" id="about">
      <Container>
        <div className="about__panel">
          <div className="about__content">
            <p className="poster-section__eyebrow">{getLocalizedText(aboutContent.eyebrow, locale)}</p>
            <h2 className="about__title">{getLocalizedText(aboutContent.title, locale)}</h2>
            <p className="about__lead">{getLocalizedText(aboutContent.lead, locale)}</p>
            <p className="about__copy">{getLocalizedText(aboutContent.body, locale)}</p>
            <p className="about__copy">{getLocalizedText(aboutContent.bodySecondary, locale)}</p>
            <div className="about__actions">
              <Link className="button button--ghost" href={aboutContent.resumeHref}>
                {getLocalizedText(aboutContent.resumeLabel, locale)}
              </Link>
            </div>
          </div>
          <div className="about__rail">
            <p className="poster-section__eyebrow">{getLocalizedText(aboutContent.focusLabel, locale)}</p>
            <div className="about__stats">
              {aboutContent.stats.map((stat) => (
                <div key={stat.label.en} className="about__stat">
                  <strong>{stat.value}</strong>
                  <span>{getLocalizedText(stat.label, locale)}</span>
                </div>
              ))}
            </div>
            <div className="about__actions">
              <Link className="button button--signal" href={aboutContent.linkedinHref}>
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
