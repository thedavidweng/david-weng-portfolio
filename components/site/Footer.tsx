import { Container } from "@/components/layout/Container";
import type { Locale } from "@/types/content";
import { contactContent, footerContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__inner">
          <span>{getLocalizedText(footerContent.copyright, locale)}</span>
          <span>{contactContent.emailDisplay}</span>
          <span>
            <a href={contactContent.linkedinHref} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            {" / "}
            <a href={contactContent.instagramHref} rel="noreferrer" target="_blank">
              Instagram
            </a>
            {" / "}
            <a href={contactContent.githubHref} rel="noreferrer" target="_blank">
              GitHub
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
