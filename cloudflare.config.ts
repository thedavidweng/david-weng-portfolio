import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "david-weng-portfolio",
		compatibilityDate: "2026-06-30",
		workersDev: false,
		previewUrls: true,
		assets: {
			htmlHandling: "auto-trailing-slash",
			notFoundHandling: "404-page",
		},
	},
});
