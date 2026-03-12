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
  const switchHref = toLocalePath(pathname, locale === "en" ? "zh" : "en");
  const resolveNavHref = (href: string) => (href.startsWith("http") ? href : `${homePath}${href}`);
  const isHomePath = pathname === "/" || pathname === "/zh/";

  return (
    <header className={`site-header${isHomePath ? " site-header--home" : ""}`}>
      <Container>
        <div className="site-header__inner">
          <Link className="site-header__brand signal-control" href={homePath}>
            <span className="site-header__mark" aria-hidden="true">
              {"//"}
            </span>
            <span className="site-header__title">{siteIdentity.name}</span>
            <span className="site-header__subtitle">{getLocalizedText(siteIdentity.brandLine, locale)}</span>
          </Link>
          <nav className="site-header__nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                className="signal-control signal-control--nav"
                href={resolveNavHref(item.href)}
              >
                {getLocalizedText(item.label, locale)}
              </Link>
            ))}
            <Link className="signal-control signal-control--nav site-header__locale" href={switchHref}>
              {switchLabel}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
