import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { servicesContent } from "@/content/site";

export function ServicesSection() {
  return (
    <section className="section-shell" id="services">
      <Container>
        <SectionHeading
          eyebrow={servicesContent.eyebrow}
          title={servicesContent.title}
          description={servicesContent.description}
        />
        <div className="services__grid">
          {servicesContent.items.map((service, index) => (
            <ServiceCard key={service.title} index={index} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
