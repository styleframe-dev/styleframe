<script setup lang="ts">
import { computed } from "vue";
import { selectOption } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		selected?: boolean;
		disabled?: boolean;
		label?: string;
	}>(),
	{
		selected: false,
		disabled: false,
	},
);

const classes = computed(() =>
	selectOption({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<li
		role="option"
		:aria-selected="selected ? 'true' : 'false'"
		:aria-disabled="disabled ? 'true' : undefined"
		:class="classes"
	>
		<span v-if="$slots.icon" class="select-icon" aria-hidden="true">
			<slot name="icon" />
		</span>
		<slot>{{ props.label }}</slot>
		<span class="select-option-check" aria-hidden="true">&checkmark;</span>
	</li>
</template>
