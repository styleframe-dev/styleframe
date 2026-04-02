<script setup lang="ts">
import { button } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		label?: string;
		disabled?: boolean;
	}>(),
	{
	},
);
</script>

<template>
	<button
		:class="button({ color: props.color, variant: props.variant, size: props.size })"
		:disabled="props.disabled"
	>
		{{ props.label }}
	</button>
</template>
