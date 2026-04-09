import type { Locale } from "@/types/content";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

type HomePageViewProps = {
  locale: Locale;
  pathname: string;
};

export function HomePageView({ locale, pathname }: HomePageViewProps) {
  return (
    <div className={`site-shell site-shell--${locale} site-shell--home`}>
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
