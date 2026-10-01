import { searchPalette, type PaletteEntry } from "@/lib/palette-search";
import { buildPaletteData, resolveNavHref } from "@/lib/search-index";
import { fillTemplate, formatAgo } from "@/lib/relative-time";

const entries: PaletteEntry[] = [
  { group: "Work", title: "Beaty Studio", hint: "Client · 2024", keywords: "photography" },
  { group: "Software", title: "OpenKara", hint: "Karaoke app", keywords: "Rust" },
  { group: "Tools", title: "yt-karaoke", hint: "Go CLI" }
];

test("an empty query returns every entry in order", () => {
  expect(searchPalette(entries, "  ")).toEqual(entries);
});

test("every word must match across title, hint, group, and keywords", () => {
  expect(searchPalette(entries, "karaoke rust").map((entry) => entry.title)).toEqual(["OpenKara"]);
  expect(searchPalette(entries, "PHOTO").map((entry) => entry.title)).toEqual(["Beaty Studio"]);
});

test("title prefix matches rank ahead of title substrings and other fields", () => {
  expect(searchPalette(entries, "karaoke").map((entry) => entry.title)).toEqual(["yt-karaoke", "OpenKara"]);
  expect(searchPalette(entries, "kara").map((entry) => entry.title)).toEqual(["OpenKara", "yt-karaoke"]);
});

test("nav hrefs resolve per locale and hash links point at the localized homepage", () => {
  expect(resolveNavHref("#contact", "zh")).toBe("/zh/#contact");
  expect(resolveNavHref("/software/", "zh")).toBe("/zh/software/");
  expect(resolveNavHref("https://blog.davidweng.eu.org/", "zh")).toBe("https://blog.davidweng.eu.org/");
});

test("the palette language entry keeps the visitor on the same page", () => {
  const data = buildPaletteData("en", "/software/");
  expect(data.entries.find((entry) => entry.hint === "中文")?.href).toBe("/zh/software/");
});

test("relative time uses the locale and caps future dates at now", () => {
  const now = Date.parse("2026-03-10T00:00:00Z");
  expect(formatAgo("2026-03-07T00:00:00Z", "en", now)).toBe("3 days ago");
  expect(formatAgo("2026-03-09T00:00:00Z", "zh", now)).toBe("昨天");
  expect(formatAgo("2026-04-01T00:00:00Z", "en", now)).toBe("now");
  expect(fillTemplate("Pushed {time} to {repo}", { time: "today", repo: "OpenKara" })).toBe("Pushed today to OpenKara");
});
