import { defineNuxtModule, extendViteConfig } from "@nuxt/kit";

export default defineNuxtModule({
	async setup() {
		// Update @nuxt/content optimizeDeps options
		extendViteConfig((config) => {
			config.optimizeDeps ||= {};
			config.optimizeDeps.include ||= [];
			config.optimizeDeps.include.push("@nuxt/content > slugify");
			config.optimizeDeps.include = config.optimizeDeps.include.map(
				(id: string) =>
					id.replace(/^@nuxt\/content > /, "docus > @nuxt/content > "),
			);
		});
	},
});
