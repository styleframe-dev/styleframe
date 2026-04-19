<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { hamburgerMenu, hamburgerMenuBars } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		size?: "sm" | "md" | "lg";
		animation?:
			| "close"
			| "arrow-left"
			| "arrow-right"
			| "arrow-up"
			| "arrow-down"
			| "plus"
			| "minus";
		modelValue?: boolean;
	}>(),
	{
		modelValue: false,
	},
);

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const isActive = ref(props.modelValue);

watch(
	() => props.modelValue,
	(val) => {
		isActive.value = val;
	},
);

function onClick() {
	isActive.value = !isActive.value;
	emit("update:modelValue", isActive.value);
}

const containerClasses = computed(() =>
	hamburgerMenu({
		color: props.color,
		size: props.size,
		animation: props.animation,
		active: isActive.value,
	}),
);

const barsClasses = computed(() =>
	hamburgerMenuBars({
		size: props.size,
		animation: props.animation,
		active: isActive.value,
	}),
);
</script>

<template>
	<div
		:class="containerClasses"
		role="button"
		tabindex="0"
		:aria-expanded="isActive"
		aria-label="Toggle menu"
		@click="onClick"
		@keydown.enter="onClick"
		@keydown.space.prevent="onClick"
	>
		<span :class="barsClasses" />
	</div>
</template>
