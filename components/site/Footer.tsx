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
          <div className="site-footer__social" aria-label={locale === "zh" ? "社交链接" : "Social links"}>
            <a aria-label="LinkedIn" className="site-footer__social-link" href={contactContent.linkedinHref} rel="noreferrer" target="_blank">
              <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.94 8.5v8.56H4.1V8.5h2.84ZM5.52 4c.91 0 1.65.74 1.65 1.65S6.43 7.3 5.52 7.3a1.65 1.65 0 1 1 0-3.3Zm13.38 8.2v4.86h-2.83v-4.53c0-1.08-.02-2.48-1.5-2.48-1.51 0-1.74 1.18-1.74 2.4v4.6h-2.84V8.5h2.72v1.17h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.9 3.4 4.01Z" />
              </svg>
            </a>
            <a aria-label="Instagram" className="site-footer__social-link" href={contactContent.instagramHref} rel="noreferrer" target="_blank">
              <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.4 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
              </svg>
            </a>
            <a aria-label="GitHub" className="site-footer__social-link" href={contactContent.githubHref} rel="noreferrer" target="_blank">
              <svg className="site-footer__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.2-3.37-1.2-.45-1.13-1.1-1.43-1.1-1.43-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.32 1.08 2.89.82.09-.64.35-1.08.63-1.33-2.22-.26-4.56-1.11-4.56-4.95 0-1.1.39-2 .99-2.7-.1-.25-.43-1.3.1-2.7 0 0 .82-.26 2.7 1.02A9.3 9.3 0 0 1 12 6.8c.85 0 1.72.12 2.53.35 1.88-1.28 2.7-1.02 2.7-1.02.53 1.4.2 2.45.1 2.7.61.7.99 1.6.99 2.7 0 3.85-2.35 4.68-4.58 4.94.36.3.68.9.68 1.83v2.71c0 .26.18.58.68.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
