export default defineAppConfig({
	/**
	 * Neutral shell defaults. This layer ships NO product branding — consuming
	 * apps supply title, logos, socials, GitHub, footer, TOC links and palette
	 * via their own `app.config.ts` (merged over these defaults by Nuxt's `defu`
	 * layer merge). `modules/config.ts` also fills `seo`/`header`/`github` from
	 * the consumer's `package.json` + git as fallbacks.
	 *
	 * @docs https://www.docus.dev/concepts/configuration#global-configuration
	 */
	toc: {
		// Title of the main table of contents
		title: "On this page",
	},

	/**
	 * Opt-out flags for the layer's client plugins. Defaults keep them on so an
	 * existing consumer is unchanged; a consumer opts out by setting `false`.
	 */
	analytics: {
		// PostHog analytics plugin (production only, requires a runtime key).
		enabled: true,
	},
	i18nRedirect: {
		// Redirect `/` to `/{locale}` (only fires when i18n is configured).
		enabled: true,
	},
});
