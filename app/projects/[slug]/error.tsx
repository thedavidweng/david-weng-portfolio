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
    <div className="error-page error-page--project">
      <h1 className="error-page__title">Something went wrong</h1>
      <p className="error-page__copy">
        This project page could not be loaded. Try again or go back to the project list.
      </p>
      <div className="error-page__actions">
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