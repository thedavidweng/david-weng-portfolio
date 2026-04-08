import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { aboutContent, heroContent, siteIdentity } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type HeroSectionProps = {
  locale: Locale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className={`hero section-shell${locale === "zh" ? " hero--zh" : ""}`} id="top">
      <Container>
        <div className="hero__frame">
          <div className="hero__content hero__content--stage">
            <div className="hero__stage">
              <p className="hero__eyebrow">{getLocalizedText(heroContent.kicker, locale)}</p>
              <h1 aria-label={getLocalizedText(heroContent.headline, locale)} className="hero__title">
                {getLocalizedText(heroContent.headline, locale)}
              </h1>
              <div className="hero__copy">
                <p className="hero__lede">{getLocalizedText(heroContent.support, locale)}</p>
                {getLocalizedText(heroContent.supportSecondary, locale) ? (
                  <p className="hero__support">{getLocalizedText(heroContent.supportSecondary, locale)}</p>
                ) : null}
              </div>
              <div className="hero__meta">
                <div className="hero__roles" aria-label="Professional roles">
                  {siteIdentity.roles[locale].map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </div>
                <div className="hero__actions">
                  <Link className="button button--signal" href="#projects">
                    {getLocalizedText(heroContent.primaryCta, locale)}
                  </Link>
                  <Link className="button button--ghost" href={aboutContent.resumeHref}>
                    {getLocalizedText(aboutContent.resumeLabel, locale)}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
