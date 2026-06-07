import type { ContentNavigationItem } from "@nuxt/content";
import type { NonRouteCategoryMeta } from "~/types/non-route-categories";

/**
 * Rebuilds the sidebar grouping for non-route categories.
 *
 * Pages under a `route: false` folder are flattened in the URL, so the native
 * navigation tree lists them as direct children with the category level gone.
 * This re-nests each such page under a synthetic group node (rendered as a
 * non-navigating accordion header), matching pages to categories by `stem`.
 */
export function foldNonRouteCategories(
	items: ContentNavigationItem[],
	categories: Record<string, NonRouteCategoryMeta>,
): ContentNavigationItem[] {
	return items.map((node) => {
		if (!node.children?.length) {
			return node;
		}
		const passthrough: ContentNavigationItem[] = [];
		const groups = new Map<
			string,
			{ meta: NonRouteCategoryMeta; children: ContentNavigationItem[] }
		>();
		for (const child of node.children) {
			const dir = child.stem
				? child.stem.split("/").slice(0, -1).join("/")
				: "";
			const meta = categories[dir];
			if (meta && child.page !== false) {
				const group = groups.get(dir) ?? { meta, children: [] };
				group.children.push(child);
				groups.set(dir, group);
			} else {
				passthrough.push(foldNonRouteCategories([child], categories)[0]!);
			}
		}
		const groupNodes = [...groups.values()]
			.sort(
				(a, b) =>
					a.meta.order - b.meta.order ||
					a.meta.title.localeCompare(b.meta.title),
			)
			.map(({ meta, children }) => ({
				title: meta.title,
				...(meta.icon ? { icon: meta.icon } : {}),
				...(meta.defaultOpen !== undefined
					? { defaultOpen: meta.defaultOpen }
					: {}),
				page: false as const,
				children,
			})) as ContentNavigationItem[];
		return { ...node, children: [...passthrough, ...groupNodes] };
	});
}
