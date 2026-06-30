import { aboutContent, contactContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function ContactSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-shell" id="contact">
      <div className="container">
        <div className="contact-hero">
          <h2 className="contact-hero__title">
            {getLocalizedText(contactContent.title, locale)}{" "}
            <span>{getLocalizedText(contactContent.unseenLabel, locale)}</span>
          </h2>
          <div className="contact-hero__actions">
            <a className="contact-hero__button contact-hero__button--primary" href={`mailto:${contactContent.email}`}>
              {getLocalizedText(contactContent.emailLabel, locale)}
            </a>
            <a className="contact-hero__button" href={aboutContent.homepageHref}>
              {getLocalizedText(aboutContent.homepageLabel, locale)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}