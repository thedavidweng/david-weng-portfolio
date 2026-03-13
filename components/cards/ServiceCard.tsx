import type { ServiceItem } from "@/types/content";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type ServiceCardProps = {
  index: number;
  locale: Locale;
  service: ServiceItem;
};

export function ServiceCard({ index, locale, service }: ServiceCardProps) {
  return (
    <article className={`service-card signal-panel${locale === "zh" ? " service-card--zh" : ""}`}>
      <span className="service-card__index">[{String(index + 1).padStart(2, "0")}]</span>
      <h3 className="service-card__title">{getLocalizedText(service.title, locale)}</h3>
      <p>{getLocalizedText(service.description, locale)}</p>
    </article>
  );
}
