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

	return { sections, activeSection };
}
