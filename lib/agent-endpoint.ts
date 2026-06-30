import { buildAgentData } from "@/lib/agent-content";
import type { Locale } from "@/types/content";

export function buildAgentEndpointPayload() {
  return {
    defaultLocale: "en" as const,
    locales: {
      en: buildAgentData("en"),
      zh: buildAgentData("zh")
    } satisfies Record<Locale, ReturnType<typeof buildAgentData>>
  };
}