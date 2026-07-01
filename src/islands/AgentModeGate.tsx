import { StrictMode, useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { Locale } from "@/types/content";
import { AgentView } from "@/src/islands/AgentView";

type AgentModeGateProps = {
  locale: Locale;
};

let agentRoot: Root | null = null;

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
    </StrictMode>
  );
}

export function AgentModeGate({ locale }: AgentModeGateProps) {
  const [showAgent, setShowAgent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") !== "agent") return;

    mountAgentModeGate(locale);
    setShowAgent(true);
  }, [locale]);

  if (!showAgent) return null;

  return null;
}

export default AgentModeGate;
