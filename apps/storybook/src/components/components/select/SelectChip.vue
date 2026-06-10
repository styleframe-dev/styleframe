<script setup lang="ts">
import { computed } from "vue";
import { selectChip } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "outline" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
		label?: string;
	}>(),
	{},
);

defineEmits<{
	remove: [];
}>();

const classes = computed(() =>
	selectChip({
		color: props.color,
		variant: props.variant,
		size: props.size,
	}),
);
</script>

<template>
	<span :class="classes">
		<slot>{{ props.label }}</slot>
		<button
			type="button"
			class="select-chip-remove"
			aria-label="Remove"
			@click="$emit('remove')"
		>
			&times;
		</button>
	</span>
</template>
