export const DOCS_SECTIONS = [
	{
		key: "gettingStarted",
		slug: "getting-started",
		folder: "01.getting-started",
		label: "Getting Started",
		icon: "i-lucide-rocket",
	},
	{
		key: "api",
		slug: "api",
		folder: "02.api",
		label: "API Reference",
		icon: "i-lucide-braces",
	},
	{
		key: "designTokens",
		slug: "design-tokens",
		folder: "03.design-tokens",
		label: "Design Tokens",
		icon: "i-lucide-palette",
	},
	{
		key: "components",
		slug: "components",
		folder: "04.components",
		label: "Components",
		icon: "i-lucide-component",
	},
	{
		key: "utilities",
		slug: "utilities",
		folder: "05.utilities",
		label: "Utilities",
		icon: "i-lucide-wand",
	},
	{
		key: "resources",
		slug: "resources",
		folder: "06.resources",
		label: "Resources",
		icon: "i-lucide-book-open",
	},
] as const;

export type DocsSection = (typeof DOCS_SECTIONS)[number];
export type DocsSectionKey = DocsSection["key"];
export type DocsSectionSlug = DocsSection["slug"];

export const DOCS_SECTION_SLUGS = DOCS_SECTIONS.map(
	(section) => section.slug,
) as readonly DocsSectionSlug[];

export function findDocsSectionBySlug(slug: string): DocsSection | undefined {
	return DOCS_SECTIONS.find((section) => section.slug === slug);
}
