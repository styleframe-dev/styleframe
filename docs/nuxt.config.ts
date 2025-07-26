import { extendViteConfig } from "@nuxt/kit";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: [
		"@nuxt/eslint",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@nuxt/ui-pro",
		"@nuxt/content",
		"@nuxtjs/robots",
		"nuxt-og-image",
		"nuxt-llms",
		"./modules/default-configs",
		() => {
			// Update @nuxt/content optimizeDeps options
			extendViteConfig((config) => {
				config.optimizeDeps ||= {};
				config.optimizeDeps.include ||= [];
				config.optimizeDeps.include.push("@nuxt/content > slugify");
			});
		},
	],
	css: ["~/assets/css/main.css"],
	nitro: {
		prerender: {
			routes: ["/"],
			crawlLinks: true,
			failOnError: false,
			autoSubfolderIndex: false,
		},
	},
	icon: {
		provider: "iconify",
	},
	llms: {
		domain: "https://styleframe.dev",
	},
});
