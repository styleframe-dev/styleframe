<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { sections } = useDocsSections();

const items = computed<NavigationMenuItem[]>(() =>
	sections.value.map((section) => ({
		label: section.label,
		to: section.to,
		active: section.active,
	})),
);
</script>

<template>
	<div class="border-t border-default max-lg:hidden">
		<UContainer class="py-1">
			<UNavigationMenu
				:items="items"
				:ui="{ root: 'overflow-x-auto no-scrollbar' }"
			/>
		</UContainer>
	</div>
</template>
