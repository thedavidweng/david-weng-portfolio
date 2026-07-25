/**
 * Shared URL helpers used by Astro layouts, React islands, and test fixtures.
 *
 * All helpers are defensive: a malformed or relative `href` returns a safe
 * fallback instead of throwing, so a single bad content entry can never break
 * a build or render.
 */

export function getHostname(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
