<script setup lang="ts">
import { computed } from "vue";
import { dropdownItem } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		active?: boolean;
		disabled?: boolean;
		label?: string;
	}>(),
	{},
);

const classes = computed(() =>
	dropdownItem({
		color: props.color,
		variant: props.variant,
		size: props.size,
		active: props.active ? "true" : "false",
		disabled: props.disabled ? "true" : "false",
	}),
);
</script>

<template>
	<div :class="classes" role="menuitem" :aria-disabled="disabled || undefined">
		{{ props.label }}
		<slot />
	</div>
</template>
