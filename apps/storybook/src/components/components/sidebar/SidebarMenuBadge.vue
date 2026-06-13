<script setup lang="ts">
import { computed } from "vue";
import { sidebarMenuBadge } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() => sidebarMenuBadge({ size: props.size }));
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
