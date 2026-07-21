import { defineNuxtModule, createResolver } from "@nuxt/kit";

/**
 * Pin the `useDocusI18n` auto-import to this app's local composable.
 *
 * The `@uxfront/layer-docs` layer's `routing` module registers `useDocusI18n`
 * from the package itself, whose copy statically imports
 * `../../i18n/locales/en.json`. That locale file is not shipped in the
 * published package (its `files` array omits `i18n/`), so bundling the package
 * copy fails to resolve. This app already ships a working `useDocusI18n` that
 * resolves the JSON from its own `i18n/locales/`, so we repoint the import to
 * it. Remove this module once the package ships its `i18n/` locales.
 */
export default defineNuxtModule({
	meta: {
		name: "use-docus-i18n-override",
	},
	setup(_options, nuxt) {
		const { resolve } = createResolver(import.meta.url);
		const local = resolve("../app/composables/useDocusI18n");

		nuxt.hook("imports:extend", (imports) => {
			const kept = imports.filter((i) => i.name !== "useDocusI18n");
			imports.length = 0;
			imports.push(...kept, { name: "useDocusI18n", from: local });
		});
	},
});
