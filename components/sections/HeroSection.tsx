import { Container } from "@/components/layout/Container";
import { heroContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type HeroSectionProps = {
  locale: Locale;
};

function renderHeadline(locale: Locale) {
  if (locale === "zh") {
    return (
      <>
        <span className="hero__title-line">影像剪辑</span>
        <span className="hero__title-line">视觉设计</span>
        <span className="hero__title-line hero__title-line--accent">内容运营</span>
      </>
    );
  }

  return (
    <>
      <span className="hero__title-line">Video, Design,</span>
      <span className="hero__title-line">And Content</span>
      <span className="hero__title-line hero__title-line--accent">Operations.</span>
    </>
  );
}

export function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className={`hero section-shell${locale === "zh" ? " hero--zh" : ""}`} id="top">
      <Container>
        <div className="hero__frame">
          <div className="hero__content hero__content--stage">
            <div className="hero__stage">
              <p className="hero__eyebrow">{getLocalizedText(heroContent.kicker, locale)}</p>
              <h1 aria-label={getLocalizedText(heroContent.headline, locale)} className="hero__title">
                {renderHeadline(locale)}
              </h1>
              <div className="hero__copy">
                <p className="hero__lede">{getLocalizedText(heroContent.support, locale)}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
