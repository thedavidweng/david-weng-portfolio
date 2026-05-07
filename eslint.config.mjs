import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/dist/**",
      "**/.claude/**",
      "docs/plans/**",
      "*.log",
      "*.tsbuildinfo"
    ]
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    settings: {
      react: {
        version: "19.2"
      }
    }
  }
];

export default eslintConfig;
