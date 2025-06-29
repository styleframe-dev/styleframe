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
} satisfies NuxtConfig;
