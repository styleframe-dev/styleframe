import type { ContentNavigationItem } from "@nuxt/content";

export type DocsSectionLink = {
	label: string;
	icon: string;
	slug: string;
	to: string;
	active: boolean;
};

function findFirstLeafPath(
	items: ContentNavigationItem[] | undefined,
): string | undefined {
	if (!items?.length) return undefined;
	for (const item of items) {
		if (item.page !== false && item.path) return item.path;
		if (item.children?.length) {
			const nested = findFirstLeafPath(item.children);
			if (nested) return nested;
		}
	}
	return items[0]?.path;
}

/**
 * Local override of the layer's `useDocsSections`.
 *
 * The delta is the `theme` branch: styleframe splits one content collection into
 * four sub-header tabs via `THEME_SUBSECTIONS`, which is a styleframe content
 * shape, not a theme feature. The rest of the shape — including
 * `hasSectionSwitcher` — must stay identical to the layer copy, since the
 * layer's `AppSubHeader` consumes it.
 */
export function useDocsSections() {
	const route = useRoute();
	const navigation =
		inject<Ref<Record<string, ContentNavigationItem[]> | null>>("navigation");

	const sections = computed<DocsSectionLink[]>(() =>
		DOCS_SECTIONS.flatMap((section): DocsSectionLink[] => {
			if (section.key === "theme") {
				const tree = navigation?.value?.[section.key] ?? [];
				const isThemeRoute = route.params.section === section.slug;
				const activeSegment = themeSegmentFromPath(route.path);
				return THEME_SUBSECTIONS.map((sub) => {
					const folders = sub.folders as readonly string[];
					const groups = tree.filter((group) =>
						folders.includes(themeSegmentFromPath(group.path ?? "") ?? ""),
					);
					const firstPath = findFirstLeafPath(groups);
					return {
						label: sub.label,
						icon: sub.icon,
						slug: sub.slug,
						to: firstPath || `/docs/${section.slug}/${sub.folders[0]}`,
						active: isThemeRoute && folders.includes(activeSegment ?? ""),
					};
				});
			}

			const tree = navigation?.value?.[section.key];
			const firstPath = findFirstLeafPath(tree);
			return [
				{
					label: section.label,
					icon: section.icon,
					slug: section.slug,
					to: firstPath || `/docs/${section.slug}`,
					active: route.params.section === section.slug,
				},
			];
		}),
	);

	const activeSection = computed(() =>
		sections.value.find((section) => section.active),
	);

	/**
	 * Whether the section switcher is worth rendering. A single section (or none)
	 * gives the reader nothing to switch between, so the sub-header is suppressed
	 * entirely rather than rendering an empty bar.
	 */
	const hasSectionSwitcher = computed(() => sections.value.length > 1);

	return { sections, activeSection, hasSectionSwitcher };
}
