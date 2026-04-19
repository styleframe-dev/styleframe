import type { ContentNavigationItem } from "@nuxt/content";
import type { DocsSection } from "~/utils/docsSections";

export type DocsSectionLink = DocsSection & {
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
		DOCS_SECTIONS.map((section) => {
			const tree = navigation?.value?.[section.key];
			const firstPath = findFirstLeafPath(tree);
			return {
				...section,
				to: firstPath || `/docs/${section.slug}`,
				active: route.params.section === section.slug,
			};
		}),
	);

	const activeSection = computed(() =>
		sections.value.find((section) => section.active),
	);

	return { sections, activeSection };
}
