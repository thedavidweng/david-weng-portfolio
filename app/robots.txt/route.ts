import { NextResponse } from "next/server";

const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://davidweng.eu.org/sitemap.xml

Content-Signal: ai-train=no, search=yes, ai-input=no
`;

export async function GET() {
  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
