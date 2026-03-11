export const localizedRouteLocales = ["zh"] as const;

export type LocalizedRouteLocale = (typeof localizedRouteLocales)[number];

export function isLocalizedRouteLocale(value: string): value is LocalizedRouteLocale {
  return localizedRouteLocales.includes(value as LocalizedRouteLocale);
}

export function resolveLocalizedRouteLocale(value: string) {
  return isLocalizedRouteLocale(value) ? value : null;
}
