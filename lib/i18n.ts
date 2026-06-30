import type { Locale, LocalizedText, LocalizedValue } from "@/types/content";

const locales: Locale[] = ["en", "zh"];

export function localized<T>(en: T, zh: T): LocalizedValue<T> {
  return { en, zh };
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedValue<T>(value: LocalizedValue<T>, locale: Locale): T {
  return value[locale];
}

export function getLocalizedText(value: LocalizedText, locale: Locale): string {
  return getLocalizedValue(value, locale);
}

export function getLocaleHomePath(locale: Locale): string {
  return locale === "zh" ? "/zh/" : "/";
}

export function getProjectPath(locale: Locale, slug: string): string {
  return locale === "zh" ? `/zh/projects/${slug}` : `/projects/${slug}`;
}

export function toLocalePath(pathname: string, locale: Locale): string {
  const normalized = pathname === "/zh" ? "/zh/" : pathname;

  if (locale === "zh") {
    if (normalized === "/") {
      return "/zh/";
    }

    return normalized.startsWith("/zh/") ? normalized : `/zh${normalized}`;
  }

  if (normalized === "/zh/" || normalized === "/zh") {
    return "/";
  }

  return normalized.startsWith("/zh/") ? normalized.replace(/^\/zh/, "") : normalized;
}

export const localizedRouteLocales = ["zh"] as const;

export type LocalizedRouteLocale = (typeof localizedRouteLocales)[number];

function isLocalizedRouteLocale(value: string): value is LocalizedRouteLocale {
  return localizedRouteLocales.includes(value as LocalizedRouteLocale);
}

export function resolveLocalizedRouteLocale(value: string) {
  return isLocalizedRouteLocale(value) ? value : null;
}
