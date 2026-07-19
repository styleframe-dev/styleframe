import type { NavigationMenuItem } from "@nuxt/ui";

/**
 * Declare the brand-supplied header navigation links on `AppConfig` so the
 * `@uxfront/docs-theme` component that reads them (`AppHeaderCTA` →
 * `header.links`) type-checks.
 *
 * Why this is needed: the theme's `config` module seeds
 * `nuxt.options.appConfig.header = { title }`, so the generated
 * `ResolvedAppConfig` computes `header` as `Defu<{ title }, [{ title, logo,
 * links }, ...]>`. defu's *type* merge drops the array-typed `links` key from
 * that result (it keeps the object-typed `logo`), so `header.links` is missing
 * from the resolved type even though it exists at runtime.
 *
 * `MergedAppConfig` deep-merges a key only when the `CustomAppConfig` side is a
 * non-optional object (`Custom[K] extends Record<string, any>`); an optional
 * (`| undefined`) property fails that check and replaces the resolved value
 * wholesale. So `header` must be declared non-optional here — that triggers the
 * recursive merge, preserving the resolved `title`/`logo` while adding `links`.
 *
 * `footer.links` needs no augmentation: `footer` isn't seeded by the config
 * module, so its resolved type already carries both `credits` and `links`.
 */
declare module "@nuxt/schema" {
	interface CustomAppConfig {
		header: {
			links?: Array<NavigationMenuItem & { activeMatch?: string }>;
		};
	}
}

export {};
