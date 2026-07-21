import type { NuxtI18nOptions } from "@nuxtjs/i18n";
import { createResolver, useNuxt } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	extends: ["@uxfront/layer-docs"],
	compatibilityDate: "2025-07-22",
	modules: [
		resolve("./modules/optimizeDeps"),
		"@nuxtjs/sitemap",
		"@nuxt/content",
		// The shared layer used to ship OG image support; the theme package
		// does not, so styleframe registers it locally (see ogImage below).
		"nuxt-og-image",
		resolve("./modules/nonRouteCategories"),
		// Must run after the theme's `routing` module — see module docblock.
		resolve("./modules/useDocusI18nOverride"),
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
		/**
		 * Collapse to a single Tailwind pass. The layer registers its own
		 * `main.css` as a standalone CSS entry; this app re-imports that same
		 * base from its own `main.css` so the brand `@theme` compiles in the
		 * layer's Tailwind pass. Drop the layer's standalone registration here —
		 * two Tailwind entries each re-emit every base utility, and the later
		 * copy wins by source order at equal specificity, clobbering every
		 * `sm:`/`lg:` responsive variant (see `app/assets/css/main.css`).
		 */
		"modules:done": () => {
			const nuxt = useNuxt();
			nuxt.options.css = nuxt.options.css.filter(
				(entry) =>
					typeof entry !== "string" || !entry.includes("@uxfront/layer-docs"),
			);
		},
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
