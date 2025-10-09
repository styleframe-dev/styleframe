import { extendViteConfig, createResolver, useNuxt } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-22",
	devtools: { enabled: true },
	modules: [
		resolve("./modules/config"),
		resolve("./modules/routing"),
		resolve("./modules/css"),
		"@nuxt/ui",
		"@nuxt/eslint",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@nuxt/content",
		"@nuxtjs/robots",
		"nuxt-og-image",
		"nuxt-llms",
		() => {
			// Update @nuxt/content optimizeDeps options
			extendViteConfig((config) => {
				config.optimizeDeps ||= {};
				config.optimizeDeps.include ||= [];
				config.optimizeDeps.include.push("@nuxt/content > slugify");
				config.optimizeDeps.include = config.optimizeDeps.include.map((id) =>
					id.replace(/^@nuxt\/content > /, "docus > @nuxt/content > "),
				);
			});
		},
	],
	content: {
		build: {
			markdown: {
				highlight: {
					langs: [
						"bash",
						"diff",
						"json",
						"js",
						"ts",
						"html",
						"css",
						"vue",
						"shell",
						"mdc",
						"md",
						"yaml",
					],
				},
				remarkPlugins: {
					"remark-mdc": {
						options: {
							autoUnwrap: true,
						},
					},
				},
			},
		},
	},
	css: ["~/assets/css/main.css"],
	nitro: {
		prerender: {
			crawlLinks: true,
			failOnError: false,
			autoSubfolderIndex: false,
		},
	},
	hooks: {
		"nitro:config"(nitroConfig) {
			const nuxt = useNuxt();

			const i18nOptions = nuxt.options.i18n;

			const routes: string[] = [];
			if (!i18nOptions) {
				routes.push("/");
			} else {
				routes.push(
					...(i18nOptions.locales?.map((locale) =>
						typeof locale === "string" ? `/${locale}` : `/${locale.code}`,
					) || []),
				);
			}

			nitroConfig.prerender = nitroConfig.prerender || {};
			nitroConfig.prerender.routes = nitroConfig.prerender.routes || [];
			nitroConfig.prerender.routes.push(...(routes || []));
		},
	},
	icon: {
		provider: "iconify",
	},
	llms: {
		domain: "https://styleframe.dev",
		title: "Styleframe",
	},
});
