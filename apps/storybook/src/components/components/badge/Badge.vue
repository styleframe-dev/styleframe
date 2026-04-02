<script setup lang="ts">
import { computed } from "vue";
import { badge } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		label?: string;
	}>(),
	{
	},
);

const classes = computed(() =>
	badge({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<span :class="classes">
		{{ props.label }}
	</span>
</template>
