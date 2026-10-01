import { copyText, initCopyButtons, initSpotlight } from "@/src/scripts/ui";

const writeText = vi.fn();
Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });

afterEach(() => {
  writeText.mockReset();
  vi.useRealTimers();
  document.body.innerHTML = "";
});

test("copyText reports whether the clipboard accepted the text", async () => {
  writeText.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("denied"));
  await expect(copyText("hi")).resolves.toBe(true);
  expect(writeText).toHaveBeenCalledWith("hi");
  await expect(copyText("hi")).resolves.toBe(false);
});

test("copy buttons confirm a copy, then reset after a delay", async () => {
  vi.useFakeTimers();
  document.body.innerHTML = `
    <button data-copy="a@b.c" data-copied-label="Copied"><span>Copy</span></button>
    <button data-copy="x"><span>Plain</span></button>`;
  initCopyButtons();
  const [labelled, plain] = document.querySelectorAll("button");
  writeText.mockResolvedValue(undefined);
  labelled.click();
  await vi.advanceTimersByTimeAsync(0);
  expect(writeText).toHaveBeenCalledWith("a@b.c");
  expect(labelled).toHaveAttribute("data-copied");
  expect(labelled).toHaveTextContent("Copied");
  labelled.click();
  await vi.advanceTimersByTimeAsync(1000);
  expect(labelled).toHaveTextContent("Copied");
  await vi.advanceTimersByTimeAsync(600);
  expect(labelled).not.toHaveAttribute("data-copied");
  expect(labelled).toHaveTextContent("Copy");
  plain.click();
  await vi.advanceTimersByTimeAsync(0);
  expect(plain).toHaveTextContent("Plain");
  writeText.mockRejectedValue(new Error("denied"));
  labelled.click();
  await vi.advanceTimersByTimeAsync(0);
  expect(labelled).not.toHaveAttribute("data-copied");
});

test("spotlight cards track the pointer position relative to the card", () => {
  document.body.innerHTML = `<div data-spotlight><article><p>body</p></article></div><p id="outside">x</p>`;
  initSpotlight();
  const card = document.querySelector("article")!;
  vi.spyOn(card, "getBoundingClientRect").mockReturnValue({ left: 10, top: 20 } as DOMRect);
  card.querySelector("p")!.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, clientX: 50, clientY: 70 }));
  expect(card.style.getPropertyValue("--mx")).toBe("40px");
  expect(card.style.getPropertyValue("--my")).toBe("50px");
  document.querySelector("#outside")!.dispatchEvent(new MouseEvent("pointermove", { bubbles: true }));
  document.dispatchEvent(new MouseEvent("pointermove"));
  expect(document.querySelector<HTMLElement>("#outside")!.style.getPropertyValue("--mx")).toBe("");
});
