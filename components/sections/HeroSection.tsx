import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { aboutContent, heroContent, navigationItems, servicesContent, siteIdentity } from "@/content/site";
import { getLocalizedText, getLocaleHomePath } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type HeroSectionProps = {
  locale: Locale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const homePath = getLocaleHomePath(locale);

  return (
    <section className={`hero section-shell${locale === "zh" ? " hero--zh" : ""}`} id="top">
      <Container>
        <div className="hero__frame">
          <div className="hero__grid" id="services">
            <div className="hero__content hero__content--compact">
              <p className="hero__eyebrow">{getLocalizedText(heroContent.kicker, locale)}</p>
              <h1 aria-label={getLocalizedText(heroContent.headline, locale)} className="hero__title">
                {getLocalizedText(heroContent.headline, locale)}
              </h1>
              <p className="hero__lede">{getLocalizedText(heroContent.support, locale)}</p>
              {getLocalizedText(heroContent.supportSecondary, locale) ? (
                <p className="hero__support">{getLocalizedText(heroContent.supportSecondary, locale)}</p>
              ) : null}
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
            <div className="hero__capabilities">
              {/* Capabilities live inside the hero on purpose: this keeps the first screen
                  focused and uses the right column for scan-friendly proof instead of a separate section. */}
              <div className="hero__capabilities-intro">
                <p className="poster-section__eyebrow">{getLocalizedText(servicesContent.eyebrow, locale)}</p>
                <p className="hero__capabilities-copy">{getLocalizedText(servicesContent.description, locale)}</p>
              </div>
              <div className={`services__grid${locale === "zh" ? " services__grid--zh" : ""}`}>
                {servicesContent.items.map((service, index) => (
                  <ServiceCard key={service.title.en} index={index} locale={locale} service={service} />
                ))}
              </div>
            </div>
          </div>
          <nav className="hero__mobile-nav" aria-label="Home section navigation">
            {navigationItems.map((item) => {
              const href = item.href.startsWith("http") ? item.href : `${homePath}${item.href}`;

              return (
                <Link
                  key={item.href}
                  className="hero__mobile-nav-link"
                  href={href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {getLocalizedText(item.label, locale)}
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </section>
  );
}
