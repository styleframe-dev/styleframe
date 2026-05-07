<script setup lang="ts">
import { paginationItem } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
		size?: "sm" | "md" | "lg";
		active?: boolean;
		disabled?: boolean;
		href?: string;
		ariaLabel?: string;
	}>(),
	{},
);
</script>

<template>
	<a
		v-if="props.href !== undefined"
		:class="
			paginationItem({
				color: props.color,
				variant: props.variant,
				size: props.size,
				active: props.active ? 'true' : 'false',
				disabled: props.disabled ? 'true' : 'false',
			})
		"
		:href="props.disabled ? undefined : props.href"
		:aria-current="props.active ? 'page' : undefined"
		:aria-disabled="props.disabled || undefined"
		:aria-label="props.ariaLabel"
	>
		<slot />
	</a>
	<button
		v-else
		type="button"
		:class="
			paginationItem({
				color: props.color,
				variant: props.variant,
				size: props.size,
				active: props.active ? 'true' : 'false',
				disabled: props.disabled ? 'true' : 'false',
			})
		"
		:disabled="props.disabled"
		:aria-current="props.active ? 'page' : undefined"
		:aria-label="props.ariaLabel"
	>
		<slot />
	</button>
</template>
