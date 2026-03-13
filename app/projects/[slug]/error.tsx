"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ProjectError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Project page error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
        gap: "1.5rem",
        textAlign: "center",
        background: "var(--bg)",
        color: "var(--text)"
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
          fontWeight: 400,
          margin: 0
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-soft)",
          fontSize: "0.95rem",
          maxWidth: "420px",
          lineHeight: 1.6,
          margin: 0
        }}
      >
        This project page could not be loaded. Try again or go back to the project list.
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button className="button" onClick={reset} type="button">
          Try again
        </button>
        <Link className="button button--ghost" href="/#projects">
          Back to projects
        </Link>
      </div>
    </div>
  );
}
