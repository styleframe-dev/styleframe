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
		icon: "i-lucide-code-xml",
	},
	{
		key: "theme",
		slug: "theme",
		folder: [
			"03.design-tokens",
			"04.components",
			"05.utilities",
			"06.modifiers",
		],
		label: "Theme",
		icon: "i-lucide-palette",
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
