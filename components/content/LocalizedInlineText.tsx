import { Fragment } from "react";
import type { Locale, LocalizedInlineText } from "@/types/content";
import { getLocalizedValue } from "@/lib/i18n";

type LocalizedInlineTextProps = {
  locale: Locale;
  value: LocalizedInlineText;
  linkClassName?: string;
};

export function LocalizedInlineText({ locale, value, linkClassName }: LocalizedInlineTextProps) {
  const fragments = getLocalizedValue(value, locale);

  return fragments.map((fragment, index) => {
    if (fragment.type === "link") {
      return (
        <a
          key={`${fragment.href}-${index}`}
          className={linkClassName}
          href={fragment.href}
          rel="noreferrer"
          target="_blank"
        >
          {fragment.text}
          <span className="visually-hidden">(opens in new tab)</span>
        </a>
      );
    }

    return <Fragment key={`${fragment.text}-${index}`}>{fragment.text}</Fragment>;
  });
}
