<script setup lang="ts">
import { button } from "./styleframe.config";

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
		variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		label?: string;
		disabled?: boolean;
	}>(),
	{
		color: "primary",
		variant: "solid",
		size: "md",
	},
);
</script>

<template>
	<button
		type="button"
		:class="button({ color: props.color, variant: props.variant, size: props.size })"
		:disabled="props.disabled"
	>
		<slot>{{ props.label }}</slot>
	</button>
</template>
