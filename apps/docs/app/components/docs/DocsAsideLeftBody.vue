<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const route = useRoute();
const navigationMap =
	inject<Ref<Record<string, ContentNavigationItem[]> | null>>("navigation");

const navigation = computed<ContentNavigationItem[]>(() => {
	const section = findDocsSectionBySlug(route.params.section as string);
	if (!section) return [];
	const tree = navigationMap?.value?.[section.key] ?? [];
	if (section.key !== "theme") return tree;
	const folders = findThemeSubsection(route.path).folders as readonly string[];
	return tree.filter((group) =>
		folders.includes(themeSegmentFromPath(group.path ?? "") ?? ""),
	);
});

// Remount the accordion whenever the rendered navigation slice changes. Theme
// subsections share one section param ("theme") but show different group sets,
// so keying by section alone leaves the accordion's open state stale on subnav
// switches. Including the theme subsection forces a fresh "all open" default.
const navigationKey = computed(() => {
	const section = route.params.section as string;
	return section === "theme"
		? `theme:${findThemeSubsection(route.path).slug}`
		: section;
});
</script>

<template>
	<UContentNavigation :key="navigationKey" highlight :navigation="navigation">
		<template #link-title="{ link }">
			{{ link.title }}
			<ProIcon v-if="link.pro" />
		</template>
	</UContentNavigation>
</template>
