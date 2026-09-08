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
	extends: ["@uxfront/layer-docs"],
	compatibilityDate: "2025-07-22",
	modules: [
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
		// `@uxfront/layer-docs` ships a `request`-hook plugin that 302s the site
		// root to `/llms.txt` when the client sends `Accept: text/markdown` or a
		// `curl/*` user agent. Two reasons it is off here (UXF-286):
		//
		// 1. It never runs on our production deploy. Vercel serves the
		//    prerendered `index.html` from the CDN, so Nitro never sees `/`.
		//    Leaving it on makes the node-server output — what a self-hosted
		//    deploy and every local production check run — disagree with the
		//    live site on the one route that matters most.
		// 2. The `curl/*` sniff is not content negotiation. `curl` is what
		//    humans, health checks, and smoke tests speak HTTP with, and
		//    `curl -I https://styleframe.dev/` returning a redirect to a text
		//    file is how this was reported as a broken home page.
		//
		// `/llms.txt` and `/llms-full.txt` are still built and served; agents
		// reach them through the `llms.txt` convention, not through a redirect.
		// Remove this once the layer drops the user-agent branch upstream.
		ignore: ["plugins/llms-redirect.ts"],
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
