"use client";

import Link from "next/link";
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
    <div className="error-page error-page--global">
      <h1 className="error-page__title">Something went wrong</h1>
      <p className="error-page__copy">
        An unexpected error occurred. You can try again or return to the homepage.
      </p>
      <div className="error-page__actions">
        <button className="button" onClick={reset} type="button">
          Try again
        </button>
        <Link className="button button--ghost" href="/">
          Go home
        </Link>
      </div>
    </div>
  );
}