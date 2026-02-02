declare module "virtual:styleframe" {
	import type { Styleframe } from "@styleframe/core";

	/**
	 * Returns the shared styleframe instance from styleframe.config.ts.
	 * All *.styleframe.ts files share the same instance.
	 */
	export function styleframe(): Styleframe;

	// Re-exports from all *.styleframe.ts files will be available here
	// TypeScript will infer the actual exports at build time
	export const h1: ReturnType<Styleframe["recipe"]>;
	export const buttonRecipe: ReturnType<Styleframe["recipe"]>;
	export const buttonSelector: string;
	export const badge: ReturnType<Styleframe["recipe"]>;
	export const badgeSelector: string;
}

declare module "virtual:styleframe.css" {
	const css: string;
	export default css;
}
