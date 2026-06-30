import { heroContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function HeroSection({ locale }: { locale: Locale }) {
  const headline = getLocalizedText(heroContent.headline, locale);

  return (
    <section className={`hero section-shell${locale === "zh" ? " hero--zh" : ""}`} id="top">
      <div className="container">
        <div className="hero__frame">
          <div className="hero__content hero__content--stage">
            <div className="hero__stage">
              <p className="hero__eyebrow">{getLocalizedText(heroContent.kicker, locale)}</p>
              <h1 aria-label={headline} className="hero__title">{headline}</h1>
              <div className="hero__copy">
                <p className="hero__lede">{getLocalizedText(heroContent.support, locale)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}