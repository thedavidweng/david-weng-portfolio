export type PaletteAction = "theme" | "copy";

export type PaletteEntry = {
  group: string;
  title: string;
  hint: string;
  keywords?: string;
  href?: string;
  action?: PaletteAction;
};

export type PaletteData = {
  entries: PaletteEntry[];
  labels: { lightTheme: string; darkTheme: string; copied: string; empty: string };
  email: string;
};

export function searchPalette(entries: PaletteEntry[], rawQuery: string): PaletteEntry[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return entries;
  const words = query.split(/\s+/);
  const rank = ({ title }: PaletteEntry) => {
    const text = title.toLowerCase();
    return text.startsWith(query) ? 0 : text.includes(query) ? 1 : 2;
  };
  return entries
    .filter((entry) => {
      const text = `${entry.title} ${entry.hint} ${entry.group} ${entry.keywords ?? ""}`.toLowerCase();
      return words.every((word) => text.includes(word));
    })
    .toSorted((a, b) => rank(a) - rank(b));
}
