<script setup lang="ts">
import { computed } from "vue";
import { switchRecipe, switchField } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
		checked?: boolean;
		disabled?: boolean;
		label?: string;
	}>(),
	{
		size: "md",
	},
);

const wrapperClasses = computed(() => switchRecipe({ size: props.size }));
const fieldClasses = computed(() =>
	switchField({ color: props.color, size: props.size }),
);
</script>

<template>
	<label :class="wrapperClasses">
		<input
			type="checkbox"
			role="switch"
			:class="fieldClasses"
			:checked="checked"
			:disabled="disabled"
		/>
		<span v-if="$slots.default || label"
			><slot>{{ label }}</slot></span
		>
	</label>
</template>
