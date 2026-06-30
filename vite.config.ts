import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    vinext({
      images: { optimizer: imagesOptimizer() }
    }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] }
    })
  ]
});