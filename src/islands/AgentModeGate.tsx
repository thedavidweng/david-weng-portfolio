import { StrictMode, useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { Locale } from "@/types/content";
import { AgentView } from "@/src/islands/AgentView";

/**
 * Module-level singleton ensuring that repeated calls unmount the previous
 * React tree before mounting a new one, preventing leaked roots.
 */
let agentRoot: Root | null = null;

/**
 * Mount the agent-mode panel into a dedicated root element.
 *
 * Called directly from an inline <script> in src/layouts/HomeLayout.astro
 * when ?mode=agent is present in the URL. The panel replaces the normal
 * site content with a simplified, agent-optimized HTML view.
 */
export function mountAgentModeGate(locale: Locale) {
  const siteContent = document.getElementById("site-content");

  if (siteContent) {
    siteContent.hidden = true;
  }

  let host = document.getElementById("agent-mode-root");

  if (!host) {
    host = document.createElement("div");
    host.id = "agent-mode-root";
    document.body.appendChild(host);
  }

  if (agentRoot) {
    agentRoot.unmount();
  }

  agentRoot = createRoot(host);
  agentRoot.render(
    <StrictMode>
      <AgentView locale={locale} />
    </StrictMode>,
  );
}

type AgentModeGateProps = {
  locale: Locale;
};

/**
 * Testable React wrapper around `mountAgentModeGate`.
 *
 * In production, the homepage pages call `mountAgentModeGate` directly via an
 * inline <script> tag (not as a hydrated Astro island). This component exists
 * so that the gate's `?mode=agent` query-param check and mounting behavior can
 * be tested with React Testing Library.
 */
export function AgentModeGate({ locale }: AgentModeGateProps) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") !== "agent") return;

    mountAgentModeGate(locale);
  }, [locale]);

  return null;
}
