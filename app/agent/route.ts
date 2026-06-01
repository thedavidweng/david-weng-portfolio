import { NextResponse } from "next/server";
import { buildAgentData } from "@/lib/agent-content";

export async function GET() {
  return new NextResponse(JSON.stringify(buildAgentData("en"), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
