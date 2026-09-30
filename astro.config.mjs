import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./lib/site-config.ts";

export default defineConfig({
  site: SITE_URL,
  output: "static",
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