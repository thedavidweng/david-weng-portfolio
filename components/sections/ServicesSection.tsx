import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { servicesContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type ServicesSectionProps = {
  locale: Locale;
};

export function ServicesSection({ locale }: ServicesSectionProps) {
  return (
    <section className={`section-shell services${locale === "zh" ? " services--zh" : ""}`} id="services">
      <Container>
        <div className="poster-section__intro">
          <h2 className="poster-section__title">{getLocalizedText(servicesContent.title, locale)}</h2>
          <p className="poster-section__copy">{getLocalizedText(servicesContent.description, locale)}</p>
        </div>
        <div className={`services__grid${locale === "zh" ? " services__grid--zh" : ""}`}>
          {servicesContent.items.map((service, index) => (
            <ServiceCard key={service.title.en} index={index} locale={locale} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
