export default defineAppConfig({
	/**
	 * Styleframe brand palette for the Pro dashboard. The `apps/shared` layer
	 * ships neutral defaults; this consumer supplies its palette (merged over
	 * them by Nuxt's `defu` layer merge). Pairs with the teal `@theme` in
	 * `app/assets/css/main.css`.
	 */
	ui: {
		colors: {
			primary: "teal",
			neutral: "zinc",
		},
	},
});
