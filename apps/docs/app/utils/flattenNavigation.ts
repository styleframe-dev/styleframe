import type { ContentNavigationItem } from "@nuxt/content";

/**
 * Flatten navigation items that are false-positive groups.
 * Nuxt Content's index detection regex matches filenames containing "index"
 * as a substring (e.g. "z-index"), incorrectly nesting them as groups.
 * This flattens groups with a single child sharing the same path.
 */
export function flattenNavigation(
	items: ContentNavigationItem[],
): ContentNavigationItem[] {
	return items.map((item) => {
		if (item.children?.length === 1 && item.children[0].path === item.path) {
			const { children: _, ...parent } = item;
			return { ...parent, ...item.children[0], children: undefined };
		}

		if (item.children?.length) {
			return { ...item, children: flattenNavigation(item.children) };
		}

		return item;
	});
}
