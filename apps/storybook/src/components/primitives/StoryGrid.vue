<script setup lang="ts">
withDefaults(
	defineProps<{
		items?: string[];
		layout?: "grid" | "list";
	}>(),
	{
		items: () => [],
		layout: "grid",
	},
);
</script>

<template>
	<div :class="['story-grid', `story-grid--${layout}`]">
		<template v-for="item in items" :key="item">
			<slot :item="item" />
		</template>
	</div>
</template>
