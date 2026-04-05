<script setup lang="ts">
import { navItem } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "ghost" | "link";
		size?: "sm" | "md" | "lg";
		active?: boolean;
		disabled?: boolean;
		href?: string;
	}>(),
	{},
);
</script>

<template>
	<a
		:class="[
			navItem({
				color: props.color,
				variant: props.variant,
				size: props.size,
			}),
			props.active && '-active',
			props.disabled && '-disabled',
		]"
		:href="props.href"
		:aria-disabled="props.disabled || undefined"
	>
		<slot />
	</a>
</template>
