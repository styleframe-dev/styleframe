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
} satisfies NuxtConfig;
