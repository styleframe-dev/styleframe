<script setup lang="ts">
import { computed } from "vue";
import { chipIndicator } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?:
			| "primary"
			| "secondary"
			| "success"
			| "info"
			| "warning"
			| "error"
			| "light"
			| "dark"
			| "neutral";
		variant?: "solid" | "soft";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
		inset?: boolean;
		text?: string | number;
	}>(),
	{},
);

const classes = computed(() =>
	chipIndicator({
		color: props.color,
		variant: props.variant,
		size: props.size,
		position: props.position,
		inset: props.inset !== undefined ? String(props.inset) as "true" | "false" : undefined,
	}),
);
</script>

<template>
	<span :class="classes">
		{{ text }}
	</span>
</template>
