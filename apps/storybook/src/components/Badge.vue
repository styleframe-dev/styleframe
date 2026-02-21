<script setup lang="ts">
import { badge } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
		variant?: "solid" | "outline" | "soft" | "subtle";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		label?: string;
	}>(),
	{
		color: "primary",
		variant: "solid",
		size: "sm",
		label: "Badge",
	},
);
</script>

<template>
	<span :class="badge({ color: props.color, variant: props.variant, size: props.size })">
		{{ props.label }}
	</span>
</template>
