<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const route = useRoute();
const navigationMap =
	inject<Ref<Record<string, ContentNavigationItem[]> | null>>("navigation");

const navigation = computed<ContentNavigationItem[]>(() => {
	const section = findDocsSectionBySlug(route.params.section as string);
	if (!section) return [];
	return navigationMap?.value?.[section.key] ?? [];
});
</script>

<template>
	<UContentNavigation highlight :navigation="navigation">
		<template #link-title="{ link }">
			{{ link.title }}
			<ProIcon v-if="link.pro" />
		</template>
	</UContentNavigation>
</template>
