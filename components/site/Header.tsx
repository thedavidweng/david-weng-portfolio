import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { navigationItems, siteIdentity } from "@/content/site";

export function Header() {
  return (
    <header className="site-header">
      <Container>
        <div className="site-header__inner">
          <Link className="site-header__brand" href="/">
            <span className="site-header__title">{siteIdentity.name}</span>
            <span className="site-header__subtitle">{siteIdentity.brandLine}</span>
          </Link>
          <nav className="site-header__nav" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
