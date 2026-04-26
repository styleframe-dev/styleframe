<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: "Docs",
		to: "/docs/getting-started/introduction",
		active: route.path.startsWith("/docs"),
	},
	{
		label: "Releases",
		target: "_blank",
		to: "https://github.com/styleframe-dev/styleframe/releases",
	},
	{
		label: "Log in",
		to: "https://app.styleframe.dev",
	},
]);
</script>

<template>
	<UNavigationMenu :items="items" />
</template>
