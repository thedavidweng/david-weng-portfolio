import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (accept.includes("text/markdown")) {
    const url = request.nextUrl.clone();
    const originalPath = url.pathname;

    url.pathname = "/api/markdown";

    const response = NextResponse.rewrite(url);

    response.headers.set("x-markdown-original-path", originalPath);
    response.headers.set("Vary", "Accept");

    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|brand/).*)"]
};
