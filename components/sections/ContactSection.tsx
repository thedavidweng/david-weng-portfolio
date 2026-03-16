import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { contactContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type ContactSectionProps = {
  locale: Locale;
};

export function ContactSection({ locale }: ContactSectionProps) {
  return (
    <section className="section-shell" id="contact">
      <Container>
        <div className="contact__panel">
          <div className="contact__content">
            <p className="poster-section__eyebrow">{getLocalizedText(contactContent.eyebrow, locale)}</p>
            <h2 className="contact__title">{getLocalizedText(contactContent.title, locale)}</h2>
            <p className="contact__lead">{getLocalizedText(contactContent.lead, locale)}</p>
            <p className="contact__copy">{getLocalizedText(contactContent.body, locale)}</p>
            <div className="contact__actions">
              <Link className="button button--signal" href={`mailto:${contactContent.email}`}>
                {getLocalizedText(contactContent.emailLabel, locale)}
              </Link>
              <a className="button button--ghost" href={contactContent.linkedinHref} rel="noreferrer" target="_blank">
                LinkedIn<span className="visually-hidden"> (opens in new tab)</span>
              </a>
              <a className="button button--ghost" href={contactContent.instagramHref} rel="noreferrer" target="_blank">
                Instagram<span className="visually-hidden"> (opens in new tab)</span>
              </a>
            </div>
          </div>
          <div className="contact__rail">
            <p className="poster-section__eyebrow">{getLocalizedText(contactContent.bestForLabel, locale)}</p>
            <ul className="contact__list">
              {contactContent.inquiryTypes.map((item) => (
                <li key={item.title.en}>
                  <strong>{getLocalizedText(item.title, locale)}</strong>
                  <span>{getLocalizedText(item.copy, locale)}</span>
                </li>
              ))}
            </ul>
            <div className="contact__actions">
              <a className="button button--ghost" href={contactContent.githubHref} rel="noreferrer" target="_blank">
                GitHub<span className="visually-hidden"> (opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
