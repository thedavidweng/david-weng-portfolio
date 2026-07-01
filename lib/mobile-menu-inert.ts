export function containsSiteHeader(element: HTMLElement): boolean {
  return element.classList.contains("site-header") || element.querySelector(".site-header") !== null;
}

export function getMobileMenuInertTargets(shell: HTMLElement): HTMLElement[] {
  return Array.from(shell.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && !containsSiteHeader(child)
  );
}

export function getMobileMenuPageShell(): HTMLElement | null {
  return document.getElementById("site-content") ?? document.querySelector<HTMLElement>(".site-shell");
}
