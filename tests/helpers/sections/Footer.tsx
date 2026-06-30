import { contactContent, footerContent } from "@/content/site";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <span>{getLocalizedText(footerContent.copyright, locale)}</span>
          <span>{contactContent.emailDisplay}</span>
        </div>
      </div>
    </footer>
  );
}