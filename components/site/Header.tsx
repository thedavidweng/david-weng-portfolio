import Link from "next/link";
import type { Locale } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { footerContent, navigationItems, siteIdentity, aboutContent } from "@/content/site";
import { getLocaleHomePath, getLocalizedText, toLocalePath } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  pathname: string;
};

export function Header({ locale, pathname }: HeaderProps) {
  const homePath = getLocaleHomePath(locale);
  const switchLabel = getLocalizedText(footerContent.languageLabel, locale);
  const externalWindowHint = getLocalizedText(footerContent.externalWindowHint, locale);
  const switchHref = toLocalePath(pathname, locale === "en" ? "zh" : "en");
  const resolveNavHref = (href: string) => (href.startsWith("http") ? href : `${homePath}${href}`);
  const isHomePath = pathname === "/" || pathname === "/zh/";

  return (
    <header className={`site-header${isHomePath ? " site-header--home" : ""}`}>
      <Container>
        <div className="site-header__inner">
          <Link className="site-header__brand" href={homePath}>
            <span className="site-header__title">{siteIdentity.name}</span>
          </Link>
          
          <nav className="site-header__nav" aria-label="Main navigation">
            {navigationItems.map((item) => {
              if (item.href === "#contact") return null; // We place Contact button on the right
              
              const label = getLocalizedText(item.label, locale);
              const isExternal = item.href.startsWith("http");

              return (
                <Link
                  key={item.href}
                  aria-label={isExternal ? `${label} (${externalWindowHint})` : undefined}
                  className="site-header__nav-link"
                  href={resolveNavHref(item.href)}
                  rel={isExternal ? "noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  {label}
                </Link>
              );
            })}
            <Link className="site-header__nav-link site-header__locale" href={switchHref}>
              {switchLabel}
            </Link>
          </nav>
          
          <div className="site-header__actions">
            <Link className="button button--ghost" href={aboutContent.resumeHref}>
              {getLocalizedText(aboutContent.resumeLabel, locale)}
            </Link>
            <Link className="button button--signal" href="#contact">
              {locale === "en" ? "CONTACT" : "联系"}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
