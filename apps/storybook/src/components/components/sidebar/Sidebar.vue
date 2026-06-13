<script setup lang="ts">
import { computed } from "vue";
import { sidebar } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		collapsed?: boolean;
	}>(),
	{},
);

const classes = computed(() =>
	sidebar({
		color: props.color,
		variant: props.variant,
		size: props.size,
		collapsed: props.collapsed ? "true" : "false",
	}),
);
</script>

<template>
	<aside :class="classes">
		<slot />
	</aside>
</template>
