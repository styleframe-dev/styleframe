<script setup lang="ts">
import type { ContentNavigationItem, PageCollections } from "@nuxt/content";

const props = defineProps<{
	navigation?: ContentNavigationItem[];
}>();

const { locale, isEnabled } = useDocusI18n();

// FTS5 indexes one collection at a time; our docs are split across a
// collection per top-level section (and per locale), so we hand
// `useSearchCollection` the whole set and let it index and query them together.
const collections = computed(() =>
	DOCS_SECTIONS.map(
		(section) =>
			(isEnabled.value
				? `docs_${section.key}_${locale.value}`
				: `docs_${section.key}`) as keyof PageCollections,
	),
);

const {
	search,
	status: searchStatus,
	init,
} = useSearchCollection(collections, {
	immediate: false,
	ignoredTags: ["style"],
});

// Build the SQLite FTS5 index lazily: only when the palette first opens, so
// the search payload never loads on pages the reader never searches from.
const { open } = useContentSearch();
watch(open, (value) => {
	if (value && searchStatus.value === "idle") {
		init();
	}
});

// Empty-state shortcuts shown before the reader types anything.
const links = computed(() =>
	props.navigation
		?.filter((item) => item.children?.length)
		.map((item) => ({
			label: item.title,
			icon: item.icon as string | undefined,
			to: item.children![0]!.path,
		})),
);
</script>

<template>
	<LazyUContentSearch
		:search="search"
		:search-status="searchStatus"
		:links="links"
		:navigation="navigation"
	/>
</template>
