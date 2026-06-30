import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://davidweng.eu.org",
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