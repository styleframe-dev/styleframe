<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
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
