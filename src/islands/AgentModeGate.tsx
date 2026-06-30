import { StrictMode, useEffect, useState } from "react";
import type { Locale } from "@/types/content";
import { AgentView } from "@/src/islands/AgentView";

type AgentModeGateProps = {
  locale: Locale;
};

export function AgentModeGate({ locale }: AgentModeGateProps) {
  const [showAgent, setShowAgent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") !== "agent") return;

    const siteContent = document.getElementById("site-content");
    if (siteContent) {
      siteContent.hidden = true;
    }
    setShowAgent(true);
  }, []);

  if (!showAgent) return null;

  return (
    <StrictMode>
      <AgentView locale={locale} />
    </StrictMode>
  );
}

export default AgentModeGate;