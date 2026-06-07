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
