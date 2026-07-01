
import { StrictMode, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import type { Locale } from "@/types/content";
import { Container } from "@/src/islands/_shared/Container";
import { footerContent, navigationItems, siteIdentity, aboutContent, contactContent } from "@/content/site";
import { getLocaleHomePath, getLocalizedText, toLocalePath } from "@/lib/i18n";
import { createHeaderScrollController } from "@/lib/header-scroll";
import {
  getMobileMenuInertTargets,
  getMobileMenuPageShell
} from "@/lib/mobile-menu-inert";

const MOBILE_MENU_CLOSE_MS = 380;

type HeaderProps = {
  locale: Locale;
  pathname: string;
};

function subscribeToDesktopViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 761px)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getDesktopViewportSnapshot() {
  return window.matchMedia("(min-width: 761px)").matches;
}

function getDesktopViewportServerSnapshot() {
  return false;
}

function MobileMenuPanel({
  locale,
  menuLabel,
  switchHref,
  switchLabel,
  externalWindowHint,
  resolveNavHref,
  closeMenu,
  menuAnimatedOpen,
  panelRef
}: {
  locale: Locale;
  menuLabel: string;
  switchHref: string;
  switchLabel: string;
  externalWindowHint: string;
  resolveNavHref: (href: string) => string;
  closeMenu: () => void;
  menuAnimatedOpen: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
}) {
  const motionClass = menuAnimatedOpen ? "site-header__menu-backdrop--open" : "site-header__menu-backdrop--closed";
  const panelMotionClass = menuAnimatedOpen ? "site-header__menu-panel--open" : "site-header__menu-panel--closed";

  return (
    <>
      <button
        aria-hidden="true"
        className={`site-header__menu-backdrop ${motionClass}`}
        onClick={closeMenu}
        tabIndex={-1}
        type="button"
      />
      <div
        className={`site-header__menu-panel ${panelMotionClass}`}
        id="site-mobile-menu-panel"
        ref={panelRef}
      >
        <h2 className="visually-hidden">{menuLabel}</h2>
        <nav className="site-header__nav" aria-label="Main navigation">
          {navigationItems.map((item) => {
            if (item.href === "#contact") return null;

            const label = getLocalizedText(item.label, locale);
            const isExternal = item.href.startsWith("http");

            return (
              <a
                key={item.href}
                aria-label={isExternal ? `${label} (${externalWindowHint})` : undefined}
                className="site-header__nav-link"
                href={resolveNavHref(item.href)}
                onClick={closeMenu}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                {label}
              </a>
            );
          })}
          <a className="site-header__nav-link site-header__locale" href={switchHref}>
            {switchLabel}
          </a>
        </nav>

        <div className="site-header__social" aria-label={locale === "zh" ? "社交链接" : "Social links"}>
          <a aria-label="LinkedIn" className="site-header__social-link" href={contactContent.linkedinHref} rel="noreferrer" target="_blank">
            <svg className="site-header__social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.94 8.5v8.56H4.1V8.5h2.84ZM5.52 4c.91 0 1.65.74 1.65 1.65S6.43 7.3 5.52 7.3a1.65 1.65 0 1 1 0-3.3Zm13.38 8.2v4.86h-2.83v-4.53c0-1.08-.02-2.48-1.5-2.48-1.51 0-1.74 1.18-1.74 2.4v4.6h-2.84V8.5h2.72v1.17h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.9 3.4 4.01Z" />
            </svg>
          </a>
          <a aria-label="Instagram" className="site-header__social-link" href={contactContent.instagramHref} rel="noreferrer" target="_blank">
            <svg className="site-header__social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.4 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
            </svg>
          </a>
          <a aria-label="GitHub" className="site-header__social-link" href={contactContent.githubHref} rel="noreferrer" target="_blank">
            <svg className="site-header__social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.2-3.37-1.2-.45-1.13-1.1-1.43-1.1-1.43-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.32 1.08 2.89.82.09-.64.35-1.08.63-1.33-2.22-.26-4.56-1.11-4.56-4.95 0-1.1.39-2 .99-2.7-.1-.25-.43-1.3.1-2.7 0 0 .82-.26 2.7 1.02A9.3 9.3 0 0 1 12 6.8c.85 0 1.72.12 2.53.35 1.88-1.28 2.7-1.02 2.7-1.02.53 1.4.2 2.45.1 2.7.61.7.99 1.6.99 2.7 0 3.85-2.35 4.68-4.58 4.94.36.3.68.9.68 1.83v2.71c0 .26.18.58.68.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
        </div>

        <div className="site-header__actions">
          <a className="button button--ghost" href={aboutContent.homepageHref}>
            {getLocalizedText(aboutContent.homepageLabel, locale)}
          </a>
          <a className="button button--signal" href="#contact">
            {locale === "en" ? "CONTACT" : "联系"}
          </a>
        </div>
      </div>
    </>
  );
}

export function Header({ locale, pathname }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [menuAnimatedOpen, setMenuAnimatedOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const scrollControllerRef = useRef<ReturnType<typeof createHeaderScrollController> | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  if (scrollControllerRef.current === null) {
    scrollControllerRef.current = createHeaderScrollController();
  }

  const latestScrollYRef = useRef(0);
  const mobileMenuOpenRef = useRef(mobileMenuOpen);
  mobileMenuOpenRef.current = mobileMenuOpen;
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getDesktopViewportServerSnapshot
  );
  const menuOpen = mobileMenuOpen && !isDesktop;
  const homePath = getLocaleHomePath(locale);
  const switchLabel = getLocalizedText(footerContent.languageLabel, locale);
  const externalWindowHint = getLocalizedText(footerContent.externalWindowHint, locale);
  const switchHref = toLocalePath(pathname, locale === "en" ? "zh" : "en");
  const resolveNavHref = (href: string) => (href.startsWith("http") ? href : `${homePath}${href}`);
  const isHomePath = pathname === "/" || pathname === "/zh/";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let pendingFrame: number | null = null;

    const updateFromScroll = () => {
      pendingFrame = null;
      const next = scrollControllerRef.current!.update(latestScrollYRef.current);
      setHeaderScrolled((current) => (current === next.scrolled ? current : next.scrolled));
      setHeaderVisible((current) => {
        const desired = mobileMenuOpenRef.current ? true : next.visible;
        return current === desired ? current : desired;
      });
    };

    const requestFrame = () => {
      if (pendingFrame !== null) {
        return;
      }
      pendingFrame = window.requestAnimationFrame(updateFromScroll);
    };

    const handleScroll = () => {
      latestScrollYRef.current = window.scrollY;
      requestFrame();
    };

    latestScrollYRef.current = window.scrollY;
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (pendingFrame !== null) {
        window.cancelAnimationFrame(pendingFrame);
      }
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setMenuRendered(false);
      setMenuAnimatedOpen(false);
      return;
    }

    if (menuOpen) {
      setMenuRendered(true);
      const frame = window.requestAnimationFrame(() => {
        setMenuAnimatedOpen(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (!menuRendered) {
      return;
    }

    setMenuAnimatedOpen(false);
    const timer = window.setTimeout(() => {
      setMenuRendered(false);
    }, MOBILE_MENU_CLOSE_MS);

    return () => window.clearTimeout(timer);
  }, [isDesktop, menuOpen, menuRendered]);

  useEffect(() => {
    const shell = getMobileMenuPageShell();

    if (!shell) {
      return;
    }

    const targets = getMobileMenuInertTargets(shell);

    if (menuRendered) {
      for (const target of targets) {
        target.setAttribute("aria-hidden", "true");
        target.inert = true;
      }

      return () => {
        for (const target of targets) {
          target.removeAttribute("aria-hidden");
          target.inert = false;
        }
      };
    }

    for (const target of targets) {
      target.removeAttribute("aria-hidden");
      target.inert = false;
    }
  }, [menuRendered]);

  useEffect(() => {
    if (!menuRendered || !menuAnimatedOpen) {
      return;
    }

    const panel = menuPanelRef.current;

    if (!panel) {
      return;
    }

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        return;
      }

      if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuToggleRef.current?.focus();
    };
  }, [menuAnimatedOpen, menuRendered]);

  const menuLabel = locale === "zh" ? "主菜单" : "Main menu";
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <StrictMode>
    <header
      className={`site-header${isHomePath ? " site-header--home" : ""}${menuRendered ? " site-header--menu-open" : ""}${headerVisible ? " site-header--visible" : " site-header--hidden"}${headerScrolled ? " site-header--scrolled" : ""}`}
    >
      <Container>
        <div className="site-header__inner">
          <a className="site-header__brand" href={homePath}>
            <span className="site-header__title">{siteIdentity.name}</span>
          </a>

          <button
            aria-controls="site-mobile-menu-panel"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? (locale === "zh" ? "关闭菜单" : "Close menu") : locale === "zh" ? "打开菜单" : "Open menu"}
            className="site-header__menu-toggle"
            onClick={() => setMobileMenuOpen((open) => !open)}
            ref={menuToggleRef}
            type="button"
          >
            <span className="site-header__menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className="site-header__menu">
            <div className="site-header__menu-panel site-header__menu-panel--desktop">
              <nav className="site-header__nav" aria-label="Main navigation">
                {navigationItems.map((item) => {
                  if (item.href === "#contact") return null;

                  const label = getLocalizedText(item.label, locale);
                  const isExternal = item.href.startsWith("http");

                  return (
                    <a
                      key={item.href}
                      aria-label={isExternal ? `${label} (${externalWindowHint})` : undefined}
                      className="site-header__nav-link"
                      href={resolveNavHref(item.href)}
                      rel={isExternal ? "noreferrer" : undefined}
                      target={isExternal ? "_blank" : undefined}
                    >
                      {label}
                    </a>
                  );
                })}
                <a className="site-header__nav-link site-header__locale" href={switchHref}>
                  {switchLabel}
                </a>
              </nav>

              <div className="site-header__social" aria-label={locale === "zh" ? "社交链接" : "Social links"}>
                <a aria-label="LinkedIn" className="site-header__social-link" href={contactContent.linkedinHref} rel="noreferrer" target="_blank">
                  <svg className="site-header__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.94 8.5v8.56H4.1V8.5h2.84ZM5.52 4c.91 0 1.65.74 1.65 1.65S6.43 7.3 5.52 7.3a1.65 1.65 0 1 1 0-3.3Zm13.38 8.2v4.86h-2.83v-4.53c0-1.08-.02-2.48-1.5-2.48-1.51 0-1.74 1.18-1.74 2.4v4.6h-2.84V8.5h2.72v1.17h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.9 3.4 4.01Z" />
                  </svg>
                </a>
                <a aria-label="Instagram" className="site-header__social-link" href={contactContent.instagramHref} rel="noreferrer" target="_blank">
                  <svg className="site-header__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.4 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z" />
                  </svg>
                </a>
                <a aria-label="GitHub" className="site-header__social-link" href={contactContent.githubHref} rel="noreferrer" target="_blank">
                  <svg className="site-header__social-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.2-3.37-1.2-.45-1.13-1.1-1.43-1.1-1.43-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.32 1.08 2.89.82.09-.64.35-1.08.63-1.33-2.22-.26-4.56-1.11-4.56-4.95 0-1.1.39-2 .99-2.7-.1-.25-.43-1.3.1-2.7 0 0 .82-.26 2.7 1.02A9.3 9.3 0 0 1 12 6.8c.85 0 1.72.12 2.53.35 1.88-1.28 2.7-1.02 2.7-1.02.53 1.4.2 2.45.1 2.7.61.7.99 1.6.99 2.7 0 3.85-2.35 4.68-4.58 4.94.36.3.68.9.68 1.83v2.71c0 .26.18.58.68.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
              </div>

              <div className="site-header__actions">
                <a className="button button--ghost" href={aboutContent.homepageHref}>
                  {getLocalizedText(aboutContent.homepageLabel, locale)}
                </a>
                <a className="button button--signal" href="#contact">
                  {locale === "en" ? "CONTACT" : "联系"}
                </a>
              </div>
            </div>
          </div>

          {menuRendered ? (
            <MobileMenuPanel
              closeMenu={closeMenu}
              externalWindowHint={externalWindowHint}
              locale={locale}
              menuAnimatedOpen={menuAnimatedOpen}
              menuLabel={menuLabel}
              panelRef={menuPanelRef}
              resolveNavHref={resolveNavHref}
              switchHref={switchHref}
              switchLabel={switchLabel}
            />
          ) : null}
        </div>
      </Container>
    </header>
    </StrictMode>
  );
}
export default Header;
