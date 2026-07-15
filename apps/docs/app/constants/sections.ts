export const DOCS_SECTIONS = [
	{
		key: "gettingStarted",
		slug: "getting-started",
		folder: [
			"01.getting-started",
			"08.tooling",
			"09.integrations",
			"10.migration",
		],
		rootFolder: 0,
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
			"04.elements",
			"05.components",
			"06.utilities",
			"07.modifiers",
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

/**
 * Sub-tabs rendered for the `theme` section. The single `theme` content
 * collection and its `/docs/theme/...` URLs are unchanged; these descriptors
 * only split the subnav into separate tabs, each rendering a slice of the
 * theme navigation tree. `folders` are the URL segments after `theme`.
 */
export const THEME_SUBSECTIONS = [
	{
		slug: "design-tokens",
		label: "Design Tokens",
		icon: "i-lucide-palette",
		folders: ["design-tokens"],
	},
	{
		slug: "elements",
		label: "Elements",
		icon: "i-lucide-type",
		folders: ["elements"],
	},
	{
		slug: "components",
		label: "Components",
		icon: "i-lucide-box",
		folders: ["components"],
	},
	{
		slug: "utilities",
		label: "Utilities",
		icon: "i-lucide-wrench",
		folders: ["utilities", "modifiers"],
	},
] as const;

export type ThemeSubsection = (typeof THEME_SUBSECTIONS)[number];

/** Segment after `/docs/theme/`, robust to an i18n locale prefix. */
export function themeSegmentFromPath(path: string): string | undefined {
	return path.match(/\/docs\/theme\/([^/]+)/)?.[1];
}

export function findThemeSubsection(path: string): ThemeSubsection {
	const segment = themeSegmentFromPath(path);
	return (
		THEME_SUBSECTIONS.find((sub) =>
			(sub.folders as readonly string[]).includes(segment ?? ""),
		) ?? THEME_SUBSECTIONS[0]
	);
}
