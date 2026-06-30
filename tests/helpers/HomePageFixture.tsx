import { ContactSection } from "@/tests/helpers/sections/ContactSection";
import { HeroSection } from "@/tests/helpers/sections/HeroSection";
import { ServicesSection } from "@/tests/helpers/sections/ServicesSection";
import { Footer } from "@/tests/helpers/sections/Footer";
import { Header } from "@/src/islands/Header";
import { ProjectsSection } from "@/src/islands/ProjectsSection";
import { JsonLd } from "@/tests/helpers/JsonLd";
import { buildOrganizationSchema } from "@/lib/jsonld";
import type { Locale } from "@/types/content";

type HomePageFixtureProps = {
  locale: Locale;
  pathname: string;
};

export function HomePageFixture({ locale, pathname }: HomePageFixtureProps) {
  return (
    <div className={`site-shell site-shell--${locale} site-shell--home`}>
      <JsonLd data={buildOrganizationSchema(locale)} />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header locale={locale} pathname={pathname} />
      <main className="site-main--home" id="main-content">
        <HeroSection locale={locale} />
        <ProjectsSection locale={locale} />
        <ServicesSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}