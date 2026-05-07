import { NextRequest, NextResponse } from "next/server";
import TurndownService from "turndown";

const BASE_URL = "https://davidweng.eu.org";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*"
});

turndown.addRule("remove-skip-link", {
  filter: (node) =>
    node instanceof HTMLElement &&
    node.classList.contains("skip-link"),
  replacement: () => ""
});

turndown.addRule("remove-empty-links", {
  filter: (node) => {
    if (node.nodeName !== "A") return false;
    const anchor = node as HTMLAnchorElement;
    return !anchor.textContent?.trim() && !anchor.getAttribute("aria-label");
  },
  replacement: () => ""
});

export async function GET(request: NextRequest) {
  const originalPath =
    request.headers.get("x-markdown-original-path") || "/";
  const htmlUrl = `${BASE_URL}${originalPath}`;

  try {
    const htmlRes = await fetch(htmlUrl, {
      headers: {
        Accept: "text/html"
      }
    });

    if (!htmlRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch page" },
        { status: htmlRes.status }
      );
    }

    const html = await htmlRes.text();
    const markdown = turndown.turndown(html);

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(markdown.length)
      }
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to convert page to markdown" },
      { status: 500 }
    );
  }
}
