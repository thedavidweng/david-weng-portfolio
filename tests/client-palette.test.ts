import type { PaletteData } from "@/lib/palette-search";
import { initPalette } from "@/src/scripts/palette";

const data: PaletteData = {
  entries: [
    { group: "Pages", title: "Contact", hint: "Say hi", href: "#contact" },
    { group: "Pages", title: "Blog", hint: "Writing", href: "https://example.com/blog" },
    { group: "Actions", title: "Theme", hint: "Switch", action: "theme" },
    { group: "Actions", title: "Email", hint: "a@b.c", action: "copy" }
  ],
  labels: { lightTheme: "Light theme", darkTheme: "Dark theme", copied: "Copied!", empty: "Nothing found" },
  email: "a@b.c"
};

const writeText = vi.fn(() => Promise.resolve());
Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
const scrollIntoView = vi.fn();
Element.prototype.scrollIntoView = scrollIntoView;
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
HTMLDialogElement.prototype.close = function () {
  this.open = false;
};

initPalette();
document.body.innerHTML = `
  <button data-palette-open><kbd data-shortcut>⌘K</kbd></button>
  <section id="contact"></section>
  <textarea></textarea>
  <dialog id="palette"><input id="palette-input" /><ul id="palette-list"></ul></dialog>
  <script id="palette-data" type="application/json">${JSON.stringify(data)}</script>`;
initPalette();

const dialog = document.querySelector("dialog")!;
const input = document.querySelector("input")!;
const list = document.querySelector("ul")!;
const options = () => [...list.querySelectorAll<HTMLLIElement>(".palette__option")];
const key = (target: EventTarget, init: KeyboardEventInit) =>
  target.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, ...init }));
const type = (value: string) => {
  input.value = value;
  input.dispatchEvent(new Event("input"));
};
const open = () => document.querySelector<HTMLElement>("[data-shortcut]")!.click();

afterEach(() => {
  dialog.close();
  delete document.documentElement.dataset.theme;
  scrollIntoView.mockClear();
});

test("non-Apple platforms show the Ctrl shortcut", () => {
  expect(document.querySelector("[data-shortcut]")).toHaveTextContent("Ctrl K");
});

test("opening lists every entry under group headings with the first selected", () => {
  input.value = "stale";
  open();
  expect(dialog.open).toBe(true);
  expect(input.value).toBe("");
  expect(document.activeElement).toBe(input);
  expect([...list.querySelectorAll(".palette__group")].map((li) => li.textContent)).toEqual(["Pages", "Actions"]);
  expect(options().map((li) => li.querySelector("span")!.textContent)).toEqual(["Contact", "Blog", "Dark theme", "Email"]);
  expect(input).toHaveAttribute("aria-activedescendant", "palette-option-0");
  open();
  expect(options()).toHaveLength(4);
});

test("typing filters entries and shows an empty state", () => {
  open();
  type("blog");
  expect(options().map((li) => li.textContent)).toEqual(["BlogWriting"]);
  expect(list.querySelector(".palette__group")).toBeNull();
  type("zzz");
  expect(list).toHaveTextContent("Nothing found");
  expect(input).not.toHaveAttribute("aria-activedescendant");
  key(input, { key: "Enter" });
  expect(dialog.open).toBe(true);
});

test("arrow keys and pointer movement change the selection with wrap-around", () => {
  open();
  key(input, { key: "ArrowUp" });
  expect(input).toHaveAttribute("aria-activedescendant", "palette-option-3");
  expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
  key(input, { key: "ArrowDown" });
  expect(input).toHaveAttribute("aria-activedescendant", "palette-option-0");
  expect(list.scrollTop).toBe(0);
  key(input, { key: "ArrowDown", isComposing: true });
  expect(input).toHaveAttribute("aria-activedescendant", "palette-option-0");
  options()[2].querySelector("small")!.dispatchEvent(new MouseEvent("pointermove", { bubbles: true }));
  expect(options()[2]).toHaveAttribute("aria-selected", "true");
  list.querySelector(".palette__group")!.dispatchEvent(new MouseEvent("pointermove", { bubbles: true }));
  options()[2].dispatchEvent(new MouseEvent("pointermove", { bubbles: true }));
  expect(input).toHaveAttribute("aria-activedescendant", "palette-option-2");
});

test("Enter on a same-page link closes the palette and scrolls to the section", () => {
  open();
  key(input, { key: "Enter" });
  expect(dialog.open).toBe(false);
  expect(scrollIntoView).toHaveBeenCalledTimes(1);
  expect(location.hash).toBe("#contact");
});

test("an external link navigates away", () => {
  open();
  type("blog");
  key(input, { key: "Enter" });
  expect(dialog.open).toBe(false);
  expect(scrollIntoView).not.toHaveBeenCalled();
});

test("the theme entry toggles the theme and closes", () => {
  open();
  options()[2].click();
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(dialog.open).toBe(false);
  open();
  expect(options()[2]).toHaveTextContent("Light theme");
});

test("the copy entry copies the email, confirms, then closes", async () => {
  vi.useFakeTimers();
  open();
  options()[3].click();
  await vi.advanceTimersByTimeAsync(0);
  expect(writeText).toHaveBeenCalledWith("a@b.c");
  expect(options()[3]).toHaveTextContent("Copied!");
  expect(dialog.open).toBe(true);
  await vi.advanceTimersByTimeAsync(600);
  expect(dialog.open).toBe(false);
  writeText.mockRejectedValueOnce(new Error("denied"));
  open();
  options()[3].click();
  await vi.advanceTimersByTimeAsync(0);
  expect(options()[3]).toHaveTextContent("a@b.c");
  await vi.advanceTimersByTimeAsync(600);
  vi.useRealTimers();
});

test("keyboard shortcuts toggle the palette and the backdrop closes it", () => {
  key(document.body, { key: "k", metaKey: true });
  expect(dialog.open).toBe(true);
  key(document.body, { key: "K", ctrlKey: true });
  expect(dialog.open).toBe(false);
  key(document.querySelector("textarea")!, { key: "/" });
  expect(dialog.open).toBe(false);
  key(document.body, { key: "x" });
  expect(dialog.open).toBe(false);
  key(document.body, { key: "/" });
  expect(dialog.open).toBe(true);
  list.click();
  expect(dialog.open).toBe(true);
  dialog.click();
  expect(dialog.open).toBe(false);
});
