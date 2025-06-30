import type { NuxtConfig } from "nuxt/schema";

export default {
	/**
	 * @docs https://www.docus.dev/concepts/configuration#global-configuration
	 */
	site: {
		name: "styleframe",
	},
	srcDir: "./src",
	css: ["~/app/assets/css/main.css"],

	/**
	 * @docs https://content.nuxt.com/docs/studio/setup#enable-the-full-editing-experience
	 */
	content: {
		preview: {
			api: "https://api.nuxt.studio",
		},
	},

	/**
	 * @docs https://www.docus.dev/concepts/llms
	 */
	llms: {
		domain: "https://styleframe.dev",
		title: "Styleframe",
		description:
			"Write composable, type-safe, future-proof Design Systems code using styleframe's powerful TypeScript CSS API.",
		full: {
			title: "Styleframe",
			description:
				"Write composable, type-safe, future-proof Design Systems code using styleframe's powerful TypeScript CSS API.",
		},
	},

	/**
	 * @docs https://nuxt.com/docs/guide/going-further/runtime-config
	 */
	runtimeConfig: {
		public: {
			posthogPublicKey: "phc_Vu3wqbMj8M5iWzvEulIXlK5U0A3hqkb5rlVM1DLtZsb",
			posthogHost: "https://www.styleframe.dev/posthog",
			posthogDefaults: "2025-05-24",
		},
	},

	/**
	 * https://nitro.build/guide/routing#route-rules
	 * @TODO Look into using this for proxying PostHog requests
	 */
	// nitro: {
	// 	routeRules: {
	// 		"/posthog/**": {
	// 			proxy: "https://eu.i.posthog.com",
	// 			cors: true,
	// 		},
	// 	},
	// },
} satisfies NuxtConfig;
