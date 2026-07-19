import { readdirSync } from "node:fs";
import type { NuxtI18nOptions } from "@nuxtjs/i18n";
import { createResolver, useNuxt } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// One prerendered detail route per changelog entry. The version-numbered slugs
// (e.g. /changelog/1.0.0) end in what the Nitro crawler reads as a file
// extension, so it skips them when following links — we list them explicitly so
// every release page lands in the static output, readable with no JS.
const changelogRoutes = readdirSync(resolve("./content/changelog"))
	.filter((file) => file.endsWith(".md"))
	.map((file) => `/changelog/${file.replace(/\.md$/, "")}`);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ["../shared"],
	compatibilityDate: "2025-07-22",
	modules: [
		resolve("./modules/optimizeDeps"),
		"@nuxtjs/sitemap",
		"@nuxt/content",
		resolve("./modules/nonRouteCategories"),
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
						"tsx",
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
	css: ["./app/assets/css/main.css"],
	imports: {
		dirs: ["constants"],
	},
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
			nitroConfig.prerender.routes.push(...changelogRoutes);
		},
	},
	site: {
		url: "https://www.styleframe.dev",
		name: "Styleframe — The Design Systems Styling Engine",
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
	 * Prerendering bakes every OG image at build time, so no runtime
	 * generation endpoint is needed (or exposed unsigned).
	 * @docs https://nuxtseo.com/og-image/guides/zero-runtime
	 */
	ogImage: {
		zeroRuntime: true,
	},
	/**
	 * @docs https://nuxt.com/modules/sitemap
	 */
	sitemap: {
		enabled: true,
		discoverImages: true,
		discoverVideos: true,
		autoI18n: true,
		exclude: ["/pricing", "/pro"],
	},
});
