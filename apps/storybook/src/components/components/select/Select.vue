<script setup lang="ts">
import { computed, useSlots } from "vue";
import { select } from "virtual:styleframe";
import SelectArrow from "./SelectArrow.vue";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "ghost";
		size?: "sm" | "md" | "lg";
		invalid?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		open?: boolean;
		placeholder?: string;
		modelValue?: string;
	}>(),
	{
		size: "md",
		placeholder: "Select an option",
	},
);

const slots = useSlots();

const classes = computed(() => [
	select({
		color: props.color,
		variant: props.variant,
		size: props.size,
		invalid: props.invalid ? "true" : "false",
		disabled: props.disabled ? "true" : "false",
		readonly: props.readonly ? "true" : "false",
	}),
	{ "-open": props.open },
]);
</script>

<template>
	<div
		role="combobox"
		aria-haspopup="listbox"
		:aria-expanded="open ? 'true' : 'false'"
		:class="classes"
	>
		<span v-if="slots.icon" class="select-icon" aria-hidden="true">
			<slot name="icon" />
		</span>
		<template v-if="slots.default">
			<slot />
		</template>
		<span v-else class="select-value" :class="{ '-placeholder': !modelValue }">
			{{ modelValue || placeholder }}
		</span>
		<SelectArrow :size="size" />
	</div>
</template>
