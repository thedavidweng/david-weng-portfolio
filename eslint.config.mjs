import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/dist/**",
      "docs/plans/**",
      "*.log",
      "*.tsbuildinfo"
    ]
  },
  ...nextCoreWebVitals,
  ...nextTypeScript
];

export default eslintConfig;
