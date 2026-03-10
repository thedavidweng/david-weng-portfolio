import type { ServiceItem } from "@/types/content";

type ServiceCardProps = {
  index: number;
  service: ServiceItem;
};

export function ServiceCard({ index, service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-card__index">{String(index + 1).padStart(2, "0")}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  );
}
