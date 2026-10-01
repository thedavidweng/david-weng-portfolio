import type { Locale } from "@/types/content";
import { buildAgentData } from "@/lib/agent-content";
import { SITE_URL } from "@/lib/site-config";

const panelStyle = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  padding: "2rem",
  maxWidth: "80ch",
  lineHeight: 1.7,
  color: "#1a1a1a",
  background: "#fff",
} as const;

const sectionDividerStyle = { margin: "2rem 0" } as const;

type AgentViewProps = {
  locale: Locale;
};

export function AgentView({ locale }: AgentViewProps) {
  const data = buildAgentData(locale);

  return (
    <div style={panelStyle}>
      <header>
        <h1>
          {data.identity.name}: {data.identity.roles.join(", ")}
        </h1>
        <p>
          <strong>{data.hero.kicker}</strong>
        </p>
        <p>{data.hero.support}</p>
      </header>

      <hr style={sectionDividerStyle} />

      <section aria-labelledby="services-heading">
        <h2 id="services-heading">Services</h2>
        {data.services.map((s) => (
          <article key={s.name} style={{ marginBottom: "1.5rem" }}>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </article>
        ))}
      </section>

      <hr style={sectionDividerStyle} />

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects ({data.projects.length})</h2>
        <ul>
          {data.projects.map((p) => (
            <li key={p.slug}>
              <a href={p.url}>{p.title}</a>
              <br />
              <small>
                {p.category} · {p.year} · {p.type}
                <br />
                {p.roles.join(", ")}
              </small>
            </li>
          ))}
        </ul>
      </section>

      <hr style={sectionDividerStyle} />

      <section aria-labelledby="software-heading">
        <h2 id="software-heading">Software</h2>
        <p>
          <a href={data.software.url}>{data.software.url}</a>
        </p>
        <ul>
          {[...data.software.projects, ...data.software.tools].map((item) => (
            <li key={item.name}>
              <a href={item.url}>{item.name}</a>: {item.description}
            </li>
          ))}
        </ul>
      </section>

      <hr style={sectionDividerStyle} />

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        <ul>
          <li>
            Email:{" "}
            <a href={`mailto:${data.contact.email}`}>
              {data.contact.emailDisplay}
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href={data.contact.linkedIn}>{data.contact.linkedIn}</a>
          </li>
          <li>
            Instagram:{" "}
            <a href={data.contact.instagram}>{data.contact.instagram}</a>
          </li>
          <li>
            GitHub: <a href={data.contact.github}>{data.contact.github}</a>
          </li>
          <li>
            Homepage:{" "}
            <a href={data.contact.homepage}>{data.contact.homepage}</a>
          </li>
        </ul>
      </section>

      <hr style={sectionDividerStyle} />

      <section aria-labelledby="nav-heading">
        <h2 id="nav-heading">Site Navigation</h2>
        <ul>
          {data.navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <hr style={sectionDividerStyle} />

      <section aria-labelledby="meta-heading">
        <h2 id="meta-heading">Machine-Readable Endpoints</h2>
        <ul>
          {data.meta.endpoints.map((endpoint) => (
            <li key={endpoint.url}>
              <a href={endpoint.url}>{endpoint.url.replace(SITE_URL, "")}</a>:{" "}
              {endpoint.description}
            </li>
          ))}
        </ul>
      </section>

      <hr style={sectionDividerStyle} />

      <footer>
        <p>
          <small>
            This is an agent-optimized view of {SITE_URL}. For the full
            experience, visit the <a href={SITE_URL}>homepage</a>. Available in:
            English, 中文
          </small>
        </p>
      </footer>
    </div>
  );
}
