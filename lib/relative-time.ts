const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60]
];

export function formatAgo(iso: string, locale: string, now = Date.now()): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const seconds = Math.min(0, (Date.parse(iso) - now) / 1000);
  const match = units.find(([, size]) => -seconds >= size);
  return match ? rtf.format(Math.round(seconds / match[1]), match[0]) : rtf.format(0, "second");
}

export const fillTemplate = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
