<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigationMap =
	inject<Ref<Record<string, ContentNavigationItem[]> | null>>("navigation");

const navigation = computed<ContentNavigationItem[]>(() =>
	navigationMap?.value ? Object.values(navigationMap.value).flat() : [],
);
</script>

<template>
	<AppHeaderCTA
		highlight
		variant="link"
		orientation="vertical"
		class="min-sm:hidden mb-4 -ml-2"
	/>
	<UContentNavigation highlight variant="link" :navigation="navigation" />
</template>
