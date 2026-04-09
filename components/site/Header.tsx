import Link from "next/link";
import type { Locale } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { footerContent, navigationItems, siteIdentity } from "@/content/site";
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
  const descriptor = getLocalizedText(siteIdentity.brandLine, locale);

  return (
    <header className={`site-header${isHomePath ? " site-header--home" : ""}`}>
      <Container>
        <div className="site-header__inner">
          <Link className="site-header__brand" href={homePath}>
            <span className="site-header__title">{siteIdentity.name}</span>
          </Link>
          <p className="site-header__descriptor">{descriptor}</p>
          <nav className="site-header__nav" aria-label="Main navigation">
            {navigationItems.map((item) => {
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
        </div>
      </Container>
    </header>
  );
}
