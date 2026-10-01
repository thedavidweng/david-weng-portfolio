export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function initCopyButtons() {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    const label = button.querySelector("span")!;
    const idle = label.textContent;
    let timer = 0;
    button.addEventListener("click", async () => {
      if (!(await copyText(button.dataset.copy!))) return;
      clearTimeout(timer);
      button.dataset.copied = "";
      label.textContent = button.dataset.copiedLabel ?? idle;
      timer = window.setTimeout(() => {
        delete button.dataset.copied;
        label.textContent = idle;
      }, 1600);
    });
  }
}

export function initSpotlight() {
  document.addEventListener("pointermove", (event) => {
    const card = (event.target as Element).closest?.<HTMLElement>("[data-spotlight] > *");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
}
