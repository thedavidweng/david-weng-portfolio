import { searchPalette, type PaletteData, type PaletteEntry } from "@/lib/palette-search";
import { isDark, toggleTheme } from "@/src/scripts/theme";
import { copyText } from "@/src/scripts/ui";

const h = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]>, ...children: Node[]) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
};

export function initPalette() {
  const dialog = document.querySelector<HTMLDialogElement>("#palette");
  const input = document.querySelector<HTMLInputElement>("#palette-input");
  const list = document.querySelector<HTMLUListElement>("#palette-list");
  const source = document.querySelector("#palette-data");
  if (!dialog || !input || !list || !source?.textContent) return;

  const data = JSON.parse(source.textContent) as PaletteData;
  let results: PaletteEntry[] = [];
  let options: HTMLLIElement[] = [];
  let active = 0;

  if (!/Mac|iPhone|iPad/.test(navigator.platform)) {
    for (const kbd of document.querySelectorAll("[data-shortcut]")) kbd.textContent = "Ctrl K";
  }

  const titleOf = (entry: PaletteEntry) =>
    entry.action === "theme" ? (isDark() ? data.labels.lightTheme : data.labels.darkTheme) : entry.title;

  function go(href: string) {
    dialog!.close();
    const url = new URL(href, location.href);
    const samePage = url.origin === location.origin && url.pathname === location.pathname && url.hash;
    if (!samePage) return location.assign(url);
    document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
    history.replaceState(null, "", url.hash);
  }

  async function run(entry: PaletteEntry, option: HTMLLIElement) {
    if (entry.href) return go(entry.href);
    if (entry.action === "theme") {
      dialog!.close();
      return toggleTheme();
    }
    if (await copyText(data.email)) option.querySelector("small")!.textContent = data.labels.copied;
    setTimeout(() => dialog!.close(), 600);
  }

  function select(index: number) {
    if (!options.length) return input!.removeAttribute("aria-activedescendant");
    active = (index + options.length) % options.length;
    options.forEach((option, i) => option.setAttribute("aria-selected", String(i === active)));
    input!.setAttribute("aria-activedescendant", options[active].id);
  }

  function render() {
    const query = input!.value;
    results = searchPalette(data.entries, query);
    options = results.map((entry, i) =>
      h(
        "li",
        { className: "palette__option", id: `palette-option-${i}`, role: "option" } as Partial<HTMLLIElement>,
        h("span", { textContent: titleOf(entry) }),
        h("small", { textContent: entry.hint })
      )
    );
    const items = options.flatMap((option, i) =>
      !query.trim() && results[i].group !== results[i - 1]?.group
        ? [h("li", { className: "palette__group", role: "presentation", textContent: results[i].group } as Partial<HTMLLIElement>), option]
        : [option]
    );
    list!.replaceChildren(
      ...(items.length ? items : [h("li", { className: "palette__empty", role: "presentation", textContent: data.labels.empty } as Partial<HTMLLIElement>)])
    );
    list!.scrollTop = 0;
    select(0);
  }

  function move(delta: number) {
    select(active + delta);
    if (active === 0) list!.scrollTop = 0;
    else options[active]?.scrollIntoView({ block: "nearest" });
  }

  function open() {
    if (dialog!.open) return;
    input!.value = "";
    render();
    dialog!.showModal();
    input!.focus();
  }

  const indexOf = (event: Event) => options.indexOf((event.target as Element).closest(".palette__option") as HTMLLIElement);

  input.addEventListener("input", render);
  input.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      move(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      void run(results[active], options[active]);
    }
  });
  list.addEventListener("pointermove", (event) => {
    const index = indexOf(event);
    if (index !== -1 && index !== active) select(index);
  });
  list.addEventListener("click", (event) => {
    const index = indexOf(event);
    if (index !== -1) void run(results[index], options[index]);
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener("click", (event) => {
    if ((event.target as Element).closest("[data-palette-open]")) open();
  });
  addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    const typing = target.closest?.("input, textarea, select") || target.isContentEditable;
    if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (dialog.open) dialog.close();
      else open();
    } else if (event.key === "/" && !typing && !dialog.open) {
      event.preventDefault();
      open();
    }
  });
}
