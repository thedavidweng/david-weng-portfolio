import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./lib/site-config.ts";

const vitest = process.env.VITEST === "true";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  ...(vitest
    ? {}
    : {
        session: false,
        adapter: cloudflare({
          imageService: "passthrough",
          prerenderEnvironment: "node",
        }),
      }),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", zh: "zh" }
      },
      filter: (page) => !page.endsWith(".md") && page !== "/agent"
    })
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto"
  },
  vite: {
    resolve: {
      alias: { "@": new URL("./", import.meta.url).pathname }
    }
  }
});