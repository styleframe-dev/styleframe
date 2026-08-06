/**
 * Duplicate of the layer's `app/types/non-route-categories.ts`, kept only
 * because `modules/nonRouteCategories.ts` imports it by relative path at build
 * time and the layer publishes no subpath export for it. Deletes itself the day
 * that module moves into `@uxfront/layer-docs`.
 */
export interface NonRouteCategoryMeta {
	title: string;
	icon?: string | false;
	defaultOpen?: boolean;
	order: number;
}

declare module "nuxt/schema" {
	interface AppConfig {
		nonRouteCategories?: Record<string, NonRouteCategoryMeta>;
	}
}
