export interface CosmeticCategoryMeta {
	title: string;
	icon?: string | false;
	defaultOpen?: boolean;
	order: number;
}

declare module "nuxt/schema" {
	interface AppConfig {
		cosmeticCategories?: Record<string, CosmeticCategoryMeta>;
	}
}
