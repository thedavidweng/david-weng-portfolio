import {
  StrictMode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import type { Locale } from "@/types/content";
import { Container } from "@/src/islands/_shared/Container";
import {
  footerContent,
  headerContent,
  navigationItems,
  siteIdentity,
  aboutContent,
  contactContent,
} from "@/content/site";
import { getLocaleHomePath, getLocalizedText, toLocalePath } from "@/lib/i18n";
import { createHeaderScrollController } from "@/lib/header-scroll";
import {
  getMobileMenuInertTargets,
  getMobileMenuPageShell,
} from "@/lib/mobile-menu-inert";
import { SOCIAL_ICON_PATHS } from "@/src/icons";

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

type NavItemProps = {
  href: string;
  label: string;
  externalWindowHint: string;
  resolveNavHref: (href: string) => string;
  onClick?: () => void;
};

function NavItem({
  href,
  label,
  externalWindowHint,
  resolveNavHref,
  onClick,
}: NavItemProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      aria-label={isExternal ? `${label} (${externalWindowHint})` : undefined}
      className="site-header__nav-link"
      href={resolveNavHref(href)}
      onClick={onClick}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {label}
    </a>
  );
}

type NavLinksProps = {
  locale: Locale;
  externalWindowHint: string;
  resolveNavHref: (href: string) => string;
  switchHref: string;
  switchLabel: string;
  onNavClick?: () => void;
};

function NavLinks({
  locale,
  externalWindowHint,
  resolveNavHref,
  switchHref,
  switchLabel,
  onNavClick,
}: NavLinksProps) {
  return (
    <nav className="site-header__nav" aria-label="Main navigation">
      {navigationItems.map((item) => {
        if (item.href === "#contact") return null;

        return (
          <NavItem
            externalWindowHint={externalWindowHint}
            href={item.href}
            key={item.href}
            label={getLocalizedText(item.label, locale)}
            onClick={onNavClick}
            resolveNavHref={resolveNavHref}
          />
        );
      })}
      <a
        className="site-header__nav-link site-header__locale"
        href={switchHref}
      >
        {switchLabel}
      </a>
    </nav>
  );
}

type SocialLinksProps = {
  socialLinksLabel: string;
};

function SocialLinks({ socialLinksLabel }: SocialLinksProps) {
  return (
    <div className="site-header__social" aria-label={socialLinksLabel}>
      <a
        aria-label="LinkedIn"
        className="site-header__social-link"
        href={contactContent.linkedinHref}
        rel="noreferrer"
        target="_blank"
      >
        <svg
          className="site-header__social-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={SOCIAL_ICON_PATHS.linkedin} />
        </svg>
      </a>
      <a
        aria-label="Instagram"
        className="site-header__social-link"
        href={contactContent.instagramHref}
        rel="noreferrer"
        target="_blank"
      >
        <svg
          className="site-header__social-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={SOCIAL_ICON_PATHS.instagram} />
        </svg>
      </a>
      <a
        aria-label="GitHub"
        className="site-header__social-link"
        href={contactContent.githubHref}
        rel="noreferrer"
        target="_blank"
      >
        <svg
          className="site-header__social-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={SOCIAL_ICON_PATHS.github} />
        </svg>
      </a>
    </div>
  );
}

type HeaderActionsProps = {
  locale: Locale;
  contactButtonLabel: string;
};

function HeaderActions({ locale, contactButtonLabel }: HeaderActionsProps) {
  return (
    <div className="site-header__actions">
      <a className="button button--ghost" href={aboutContent.homepageHref}>
        {getLocalizedText(aboutContent.homepageLabel, locale)}
      </a>
      <a className="button button--signal" href="#contact">
        {contactButtonLabel}
      </a>
    </div>
  );
}

type MobileMenuPanelProps = {
  locale: Locale;
  menuLabel: string;
  switchHref: string;
  switchLabel: string;
  externalWindowHint: string;
  socialLinksLabel: string;
  contactButtonLabel: string;
  resolveNavHref: (href: string) => string;
  closeMenu: () => void;
  menuAnimatedOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

function MobileMenuPanel({
  locale,
  menuLabel,
  switchHref,
  switchLabel,
  externalWindowHint,
  socialLinksLabel,
  contactButtonLabel,
  resolveNavHref,
  closeMenu,
  menuAnimatedOpen,
  dialogRef,
}: MobileMenuPanelProps) {
  const motionClass = menuAnimatedOpen
    ? "site-header__menu-backdrop--open"
    : "site-header__menu-backdrop--closed";
  const panelMotionClass = menuAnimatedOpen
    ? "site-header__menu-panel--open"
    : "site-header__menu-panel--closed";

  return (
    <>
      <button
        aria-hidden="true"
        className={`site-header__menu-backdrop ${motionClass}`}
        onClick={closeMenu}
        tabIndex={-1}
        type="button"
      />
      <dialog
        aria-labelledby="site-mobile-menu-label"
        className={`site-header__menu-panel ${panelMotionClass}`}
        id="site-mobile-menu-panel"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        ref={dialogRef}
      >
        <h2 className="visually-hidden" id="site-mobile-menu-label">
          {menuLabel}
        </h2>
        <NavLinks
          externalWindowHint={externalWindowHint}
          locale={locale}
          onNavClick={closeMenu}
          resolveNavHref={resolveNavHref}
          switchHref={switchHref}
          switchLabel={switchLabel}
        />
        <SocialLinks socialLinksLabel={socialLinksLabel} />
        <HeaderActions
          contactButtonLabel={contactButtonLabel}
          locale={locale}
        />
      </dialog>
    </>
  );
}

export function Header({ locale, pathname }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [menuAnimatedOpen, setMenuAnimatedOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const scrollControllerRef = useRef<ReturnType<
    typeof createHeaderScrollController
  > | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDialogElement>(null);

  if (scrollControllerRef.current === null) {
    scrollControllerRef.current = createHeaderScrollController();
  }

  const latestScrollYRef = useRef(0);
  const mobileMenuOpenRef = useRef(mobileMenuOpen);
  mobileMenuOpenRef.current = mobileMenuOpen;
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getDesktopViewportServerSnapshot,
  );
  const menuOpen = mobileMenuOpen && !isDesktop;
  const homePath = getLocaleHomePath(locale);
  const switchLabel = getLocalizedText(footerContent.languageLabel, locale);
  const externalWindowHint = getLocalizedText(
    footerContent.externalWindowHint,
    locale,
  );
  const switchHref = toLocalePath(pathname, locale === "en" ? "zh" : "en");
  const resolveNavHref = useCallback(
    (href: string) => (href.startsWith("http") ? href : `${homePath}${href}`),
    [homePath],
  );
  const isHomePath = pathname === "/" || pathname === "/zh/";

  const menuLabel = getLocalizedText(headerContent.menuLabel, locale);
  const openMenuLabel = getLocalizedText(headerContent.openMenuLabel, locale);
  const closeMenuLabel = getLocalizedText(headerContent.closeMenuLabel, locale);
  const socialLinksLabel = getLocalizedText(
    headerContent.socialLinksLabel,
    locale,
  );
  const contactButtonLabel = getLocalizedText(
    headerContent.contactButtonLabel,
    locale,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let pendingFrame: number | null = null;

    const updateFromScroll = () => {
      pendingFrame = null;
      const next = scrollControllerRef.current!.update(
        latestScrollYRef.current,
      );
      setHeaderScrolled((current) =>
        current === next.scrolled ? current : next.scrolled,
      );
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
    if (!menuRendered) {
      return;
    }

    const dialog = menuDialogRef.current;

    // Use show() (non-modal) instead of showModal(): the custom focus trap,
    // inert management, and backdrop/toggle close handlers below already
    // provide modal behavior. showModal() would inert the entire document
    // outside the <dialog>, breaking the external backdrop button and
    // hamburger toggle — the only close paths on touch devices (no Escape).
    if (!dialog || typeof dialog.show !== "function") {
      return;
    }

    if (!dialog.open) {
      dialog.show();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [menuRendered]);

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

    const panel = menuDialogRef.current;

    if (!panel) {
      return;
    }

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  const closeMenu = () => setMobileMenuOpen(false);

  const sharedNavProps = {
    externalWindowHint,
    locale,
    resolveNavHref,
    switchHref,
    switchLabel,
  };

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
              aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
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
                <NavLinks {...sharedNavProps} />
                <SocialLinks socialLinksLabel={socialLinksLabel} />
                <HeaderActions
                  contactButtonLabel={contactButtonLabel}
                  locale={locale}
                />
              </div>
            </div>

            {menuRendered ? (
              <MobileMenuPanel
                closeMenu={closeMenu}
                contactButtonLabel={contactButtonLabel}
                externalWindowHint={externalWindowHint}
                locale={locale}
                menuAnimatedOpen={menuAnimatedOpen}
                menuLabel={menuLabel}
                dialogRef={menuDialogRef}
                resolveNavHref={resolveNavHref}
                socialLinksLabel={socialLinksLabel}
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
