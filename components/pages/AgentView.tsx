import type { Locale } from "@/types/content";
import {
  siteIdentity,
  heroContent,
  servicesContent,
  contactContent,
  aboutContent,
  navigationItems
} from "@/content/site";
import { projects } from "@/content/projects";
import { getLocalizedText, getLocalizedValue } from "@/lib/i18n";

type AgentViewProps = {
  locale: Locale;
};

const SITE_URL = "https://davidweng.eu.org";

export function AgentView({ locale }: AgentViewProps) {
  const headline = getLocalizedText(heroContent.support, locale);
  const services = servicesContent.items;
  const nav = navigationItems;

  return (
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
        <h1>{siteIdentity.name} — {getLocalizedValue(siteIdentity.roles, locale).join(", ")}</h1>
        <p><strong>{getLocalizedText(heroContent.kicker, locale)}</strong></p>
        <p>{headline}</p>
      </header>

      <hr style={{ margin: "2rem 0" }} />

      <section aria-labelledby="services-heading">
        <h2 id="services-heading">Services</h2>
        {services.map((s, i) => (
          <article key={i} style={{ marginBottom: "1.5rem" }}>
            <h3>{getLocalizedText(s.title, locale)}</h3>
            <p>{getLocalizedText(s.description, locale)}</p>
          </article>
        ))}
      </section>

      <hr style={{ margin: "2rem 0" }} />

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects ({projects.length})</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <a href={`${SITE_URL}/projects/${p.slug}`}>
                {p.code} {getLocalizedText(p.title, locale)}
              </a>
              <br />
              <small>
                {getLocalizedText(p.category, locale)} · {p.year} · {getLocalizedText(p.projectType, locale)}
                <br />
                {getLocalizedValue(p.roles, locale).join(", ")}
              </small>
            </li>
          ))}
        </ul>
      </section>

      <hr style={{ margin: "2rem 0" }} />

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        <ul>
          <li>Email: <a href={`mailto:${contactContent.email}`}>{contactContent.emailDisplay}</a></li>
          <li>LinkedIn: <a href={contactContent.linkedinHref}>{contactContent.linkedinHref}</a></li>
          <li>Instagram: <a href={contactContent.instagramHref}>{contactContent.instagramHref}</a></li>
          <li>GitHub: <a href={contactContent.githubHref}>{contactContent.githubHref}</a></li>
          <li>Homepage: <a href={aboutContent.homepageHref}>{aboutContent.homepageHref}</a></li>
        </ul>
      </section>

      <hr style={{ margin: "2rem 0" }} />

      <section aria-labelledby="nav-heading">
        <h2 id="nav-heading">Site Navigation</h2>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{getLocalizedText(item.label, locale)}</a>
            </li>
          ))}
        </ul>
      </section>

      <hr style={{ margin: "2rem 0" }} />

      <section aria-labelledby="meta-heading">
        <h2 id="meta-heading">Machine-Readable Endpoints</h2>
        <ul>
          <li><a href={`${SITE_URL}/agent`}>/agent</a> — JSON representation of this page</li>
          <li><a href={`${SITE_URL}/llms.txt`}>/llms.txt</a> — LLM discovery file</li>
          <li><a href={`${SITE_URL}/llms-full.txt`}>/llms-full.txt</a> — Complete site documentation</li>
          <li><a href={`${SITE_URL}/index.md`}>/index.md</a> — Markdown version of homepage</li>
          <li><a href={`${SITE_URL}/sitemap.xml`}>/sitemap.xml</a> — XML sitemap</li>
          <li><a href={`${SITE_URL}/robots.txt`}>/robots.txt</a> — Robots policy</li>
        </ul>
      </section>

      <hr style={{ margin: "2rem 0" }} />

      <footer>
        <p>
          <small>
            This is an agent-optimized view of {SITE_URL}. For the full experience, visit the <a href={SITE_URL}>homepage</a>.
            Available in: English, 中文
          </small>
        </p>
      </footer>
    </div>
  );
}
