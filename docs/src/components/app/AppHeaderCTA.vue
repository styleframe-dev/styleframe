<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: "Docs",
		to: "/getting-started/introduction",
		active: route.path.startsWith("/getting-started"),
	},
	{
		label: "Pricing",
		to: "/pricing",
		active: route.path.startsWith("/pricing"),
	},
	{
		label: "Releases",
		target: "_blank",
		to: "https://github.com/styleframe-dev/styleframe/releases",
	},
]);
</script>

<template>
	<UNavigationMenu :items="items" />
</template>
