"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProjectError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ locale?: string }>();
  const isZh = params?.locale === "zh";

  useEffect(() => {
    console.error("Project page error:", error);
  }, [error]);

  const backHref = isZh ? "/zh/#projects" : "/#projects";

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
        {isZh ? "页面加载出错" : "Something went wrong"}
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
        {isZh
          ? "无法加载此项目页面，请重试或返回项目列表。"
          : "This project page could not be loaded. Try again or go back to the project list."}
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button className="button" onClick={reset} type="button">
          {isZh ? "重试" : "Try again"}
        </button>
        <a className="button button--ghost" href={backHref}>
          {isZh ? "返回项目" : "Back to projects"}
        </a>
      </div>
    </div>
  );
}
