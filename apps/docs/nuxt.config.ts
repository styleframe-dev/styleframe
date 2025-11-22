import type { NuxtI18nOptions } from "@nuxtjs/i18n";
import { createResolver, useNuxt } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ["../shared"],
	compatibilityDate: "2025-07-22",
	modules: [
		resolve("./modules/optimizeDeps"),
		"@nuxtjs/sitemap",
		"@nuxt/content",
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
	css: ["../shared/app/assets/css/main.css"],
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

			const i18nOptions = nuxt.options.i18n as NuxtI18nOptions;

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
	site: {
		url: "https://www.styleframe.dev",
		name: "Styleframe - Type-safe, Composable CSS in TypeScript",
	},
	llms: {
		domain: "https://styleframe.dev",
		title: "Styleframe",
	},
	routeRules: {
		"/docs": {
			redirect: "/docs/getting-started/introduction",
		},
	},
	runtimeConfig: {
		public: {
			baseUrl: "",
			posthog: {
				host: "",
				key: "",
				defaults: "",
			},
		},
	},
	/**
	 * @docs https://nuxt.com/modules/sitemap
	 */
	sitemap: {
		enabled: true,
		discoverImages: true,
		discoverVideos: true,
		autoI18n: true,
	},
});
