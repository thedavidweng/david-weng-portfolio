/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import path from "node:path";

export default getViteConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") }
  },
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    testTimeout: 15000,
    hookTimeout: 15000,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/**/*.test.{ts,tsx}"],
          exclude: ["tests/pages/**"]
        }
      },
      {
        extends: true,
        test: {
          name: "pages",
          environment: "node",
          include: ["tests/pages/**/*.test.{ts,tsx}"]
        }
      }
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      include: ["src/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/vitest.setup.ts",
        "tests/helpers/**"
      ]
    }
  }
});
