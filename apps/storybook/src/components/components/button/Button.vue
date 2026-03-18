<script setup lang="ts">
import { button } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
		variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		label?: string;
		disabled?: boolean;
	}>(),
	{
		color: "primary",
		variant: "solid",
		size: "md",
		label: "Button",
		disabled: false,
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
