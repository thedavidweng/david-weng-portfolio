import { StrictMode, useEffect, useState } from "react";
import type { Locale } from "@/types/content";
import { buildAgentData, SITE_URL } from "@/lib/agent-content";

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

  const data = buildAgentData(locale);

  return (
    <StrictMode>
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "2rem",
          maxWidth: "80ch",
          lineHeight: 1.7,
          color: "#1a1a1a",
          background: "#fff"
        }}
      >
        <header>
          <h1>
            {data.identity.name} — {data.identity.roles.join(", ")}
          </h1>
          <p>
            <strong>{data.hero.kicker}</strong>
          </p>
          <p>{data.hero.support}</p>
        </header>
        <hr style={{ margin: "2rem 0" }} />
        <section aria-labelledby="agent-services-heading">
          <h2 id="agent-services-heading">Services</h2>
          {data.services.map((s) => (
            <article key={s.name} style={{ marginBottom: "1.5rem" }}>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </article>
          ))}
        </section>
        <hr style={{ margin: "2rem 0" }} />
        <section aria-labelledby="agent-projects-heading">
          <h2 id="agent-projects-heading">Projects ({data.projects.length})</h2>
          <ul>
            {data.projects.map((p) => (
              <li key={p.slug}>
                <a href={p.url}>{p.title}</a>
              </li>
            ))}
          </ul>
        </section>
        <hr style={{ margin: "2rem 0" }} />
        <section aria-labelledby="agent-meta-heading">
          <h2 id="agent-meta-heading">Machine-Readable Endpoints</h2>
          <ul>
            <li>
              <a href={`${SITE_URL}/agent`}>/agent</a>
            </li>
            <li>
              <a href={`${SITE_URL}/llms.txt`}>/llms.txt</a>
            </li>
            <li>
              <a href={`${SITE_URL}/llms-full.txt`}>/llms-full.txt</a>
            </li>
            <li>
              <a href={`${SITE_URL}/index.md`}>/index.md</a>
            </li>
          </ul>
        </section>
      </div>
    </StrictMode>
  );
}
export default AgentModeGate;
