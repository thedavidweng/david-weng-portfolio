import {
  containsSiteHeader,
  getMobileMenuInertTargets
} from "@/lib/mobile-menu-inert";

test("containsSiteHeader matches header roots and astro island wrappers", () => {
  const shell = document.createElement("div");
  const island = document.createElement("astro-island");
  const header = document.createElement("header");
  header.className = "site-header";
  island.append(header);
  shell.append(island);

  expect(containsSiteHeader(header)).toBe(true);
  expect(containsSiteHeader(island)).toBe(true);
});

test("getMobileMenuInertTargets excludes the header subtree but keeps main and footer", () => {
  const shell = document.createElement("div");
  shell.id = "site-content";

  const skipLink = document.createElement("a");
  skipLink.className = "skip-link";
  skipLink.href = "#main-content";

  const island = document.createElement("astro-island");
  const header = document.createElement("header");
  header.className = "site-header";
  island.append(header);

  const main = document.createElement("main");
  main.id = "main-content";

  const footer = document.createElement("footer");

  shell.append(skipLink, island, main, footer);

  expect(getMobileMenuInertTargets(shell).map((element) => element.tagName)).toEqual(["A", "MAIN", "FOOTER"]);
});
