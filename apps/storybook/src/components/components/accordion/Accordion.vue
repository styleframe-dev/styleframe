<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { accordion } from "virtual:styleframe";
import {
	accordionKey,
	type AccordionColor,
	type AccordionSize,
	type AccordionVariant,
} from "./context";

const props = withDefaults(
	defineProps<{
		color?: AccordionColor;
		variant?: AccordionVariant;
		size?: AccordionSize;
		type?: "single" | "multiple";
		defaultValue?: string | string[];
	}>(),
	{ type: "single" },
);

function toArray(value: string | string[] | undefined): string[] {
	if (value == null) return [];
	return Array.isArray(value) ? [...value] : [value];
}

const openValues = ref<string[]>(toArray(props.defaultValue));

function toggle(value: string) {
	const isOpen = openValues.value.includes(value);
	if (props.type === "multiple") {
		openValues.value = isOpen
			? openValues.value.filter((v) => v !== value)
			: [...openValues.value, value];
	} else {
		openValues.value = isOpen ? [] : [value];
	}
}

provide(accordionKey, {
	openValues,
	toggle,
	color: computed(() => props.color),
	variant: computed(() => props.variant),
	size: computed(() => props.size),
});

const classes = computed(() =>
	accordion({ color: props.color, variant: props.variant, size: props.size }),
);
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
