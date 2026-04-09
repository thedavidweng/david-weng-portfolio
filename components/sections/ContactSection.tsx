import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { aboutContent, contactContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type ContactSectionProps = {
  locale: Locale;
};

export function ContactSection({ locale }: ContactSectionProps) {
  return (
    <section className="section-shell" id="contact">
      <Container>
        <div className="contact-hero">
          <h2 className="contact-hero__title">
            {getLocalizedText(contactContent.title, locale)}{" "}
            <span>{getLocalizedText(contactContent.unseenLabel, locale)}</span>
          </h2>
          <div className="contact-hero__actions">
            <Link className="contact-hero__button contact-hero__button--primary" href={`mailto:${contactContent.email}`}>
              {getLocalizedText(contactContent.emailLabel, locale)}
            </Link>
            <Link className="contact-hero__button" href={aboutContent.resumeHref}>
              {getLocalizedText(aboutContent.resumeLabel, locale)}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
