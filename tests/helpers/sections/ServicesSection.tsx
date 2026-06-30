import { servicesContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function ServicesSection({ locale }: { locale: Locale }) {
  return (
    <section className={`section-shell services${locale === "zh" ? " services--zh" : ""}`} id="services">
      <div className="container">
        <div className="poster-section__intro">
          <h2 className="poster-section__title">{getLocalizedText(servicesContent.title, locale)}</h2>
          <p className="poster-section__copy">{getLocalizedText(servicesContent.description, locale)}</p>
        </div>
        <div className={`services__grid${locale === "zh" ? " services__grid--zh" : ""}`}>
          {servicesContent.items.map((service, index) => (
            <article key={service.title.en} className={`service-card signal-panel${locale === "zh" ? " service-card--zh" : ""}`}>
              <span className="service-card__index">[{String(index + 1).padStart(2, "0")}]</span>
              <h3 className="service-card__title">{getLocalizedText(service.title, locale)}</h3>
              <p>{getLocalizedText(service.description, locale)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}