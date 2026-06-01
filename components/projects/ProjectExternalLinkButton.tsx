export function ProjectExternalLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a className="button button--signal project-link-button" href={href} rel="noreferrer" target="_blank">
      <span>{label}</span>
      <ProjectLinkIcon type={href.includes("youtu") ? "youtube" : "external"} />
      <span className="visually-hidden">(opens in new tab)</span>
    </a>
  );
}

function ProjectLinkIcon({ type }: { type: "youtube" | "external" }) {
  if (type === "youtube") {
    return (
      <svg aria-hidden="true" className="project-link-button__icon" viewBox="0 0 24 24">
        <path
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.5 15.7V8.3l6.4 3.7-6.4 3.7Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="project-link-button__icon" viewBox="0 0 24 24">
      <path
        d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3Zm4 14v4H3V6h4v2H5v11h11v-2h2Z"
        fill="currentColor"
      />
    </svg>
  );
}
