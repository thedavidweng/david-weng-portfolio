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
    <div className="error-page error-page--project">
      <h1 className="error-page__title">{isZh ? "页面加载出错" : "Something went wrong"}</h1>
      <p className="error-page__copy">
        {isZh
          ? "无法加载此项目页面，请重试或返回项目列表。"
          : "This project page could not be loaded. Try again or go back to the project list."}
      </p>
      <div className="error-page__actions">
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