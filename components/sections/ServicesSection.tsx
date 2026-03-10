import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { servicesContent } from "@/content/site";

export function ServicesSection() {
  return (
    <section className="section-shell" id="services">
      <Container>
        <div className="poster-section__intro">
          <p className="poster-section__eyebrow">{servicesContent.eyebrow}</p>
          <h2 className="poster-section__title">{servicesContent.title}</h2>
          <p className="poster-section__copy">{servicesContent.description}</p>
        </div>
        <div className="services__grid">
          {servicesContent.items.map((service, index) => (
            <ServiceCard key={service.title} index={index} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
