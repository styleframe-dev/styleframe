import type { NavigationMenuItem } from "@nuxt/ui";

/**
 * Declare the brand `header` / `footer` config surface that the
 * `@uxfront/docs-theme@0.1.0` components read but the package itself does not
 * type.
 *
 * Why this shim exists: the theme's components read `appConfig.header.links`,
 * `appConfig.header.logo`, `appConfig.footer.credits` and
 * `appConfig.footer.links`, but the package declares none of them in its
 * `CustomAppConfig`. Those keys live only in this app's `app.config.ts`, and
 * neither Nuxt's `defu` layer-merge type nor the resolved `AppConfig` recovers
 * the array-typed keys (`links`) — so `header.links` / `footer.*` are missing
 * from the resolved type and the theme's `.vue` files fail `nuxt typecheck`
 * (TS2339). `main` is green only because it still consumes the locally-typed
 * `apps/shared` layer; the re-point onto the published package exposes the gap.
 *
 * How it works: keys are declared **optional** so they do not become required
 * on `AppConfigInput` (which `extends CustomAppConfig`) — a non-optional key
 * would force every `defineAppConfig` that omits it, including the package's
 * own, to fail (TS2345). The generated `MergedAppConfig<Resolved, Custom>`
 * type replaces an optional custom key wholesale (an optional property fails
 * its `extends Record<string, any>` deep-merge guard), so declaring the full
 * shape here surfaces every field the theme reads.
 *
 * Remove once `@uxfront/docs-theme` ships a release that declares these keys in
 * its own `CustomAppConfig` (tracked with the `i18n/` packaging fix for 0.1.1).
 */
type HeaderLink = NavigationMenuItem & { activeMatch?: string };

declare module "@nuxt/schema" {
	interface CustomAppConfig {
		header?: {
			title?: string;
			logo?: {
				light?: string;
				dark?: string;
				alt?: string;
			};
			links?: HeaderLink[];
		};
		footer?: {
			credits?: string;
			links?: NavigationMenuItem[];
		};
	}
}

export {};
