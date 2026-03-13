"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
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
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
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
        An unexpected error occurred. You can try again or return to the homepage.
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button className="button" onClick={reset} type="button">
          Try again
        </button>
        <a className="button button--ghost" href="/">
          Go home
        </a>
      </div>
    </div>
  );
}
