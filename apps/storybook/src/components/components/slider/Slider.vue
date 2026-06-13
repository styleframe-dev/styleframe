<script setup lang="ts">
import { computed } from "vue";
import {
	slider,
	sliderRange,
	sliderThumb,
	sliderTrack,
} from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		color?:
			| "primary"
			| "secondary"
			| "success"
			| "info"
			| "warning"
			| "error"
			| "light"
			| "dark"
			| "neutral";
		size?: "xs" | "sm" | "md" | "lg" | "xl";
		orientation?: "horizontal" | "vertical";
		disabled?: boolean;
		value?: number;
	}>(),
	{ orientation: "horizontal", value: 60 },
);

const rootClasses = computed(() =>
	slider({
		size: props.size,
		orientation: props.orientation,
		disabled: props.disabled ? "true" : "false",
	}),
);

const trackClasses = computed(() =>
	sliderTrack({
		size: props.size,
		orientation: props.orientation,
	}),
);

const rangeClasses = computed(() => [
	sliderRange({
		color: props.color,
		orientation: props.orientation,
	}),
	`slider-range-demo--${props.orientation}`,
]);

const thumbClasses = computed(() => [
	sliderThumb({
		color: props.color,
		size: props.size,
	}),
	`slider-thumb-demo--${props.orientation}`,
]);
</script>

<template>
	<span :class="rootClasses">
		<span :class="trackClasses">
			<span :class="rangeClasses" />
		</span>
		<span
			:class="thumbClasses"
			role="slider"
			tabindex="0"
			:aria-orientation="orientation"
			:aria-valuemin="0"
			:aria-valuemax="100"
			:aria-valuenow="value"
			:aria-disabled="disabled || undefined"
		/>
	</span>
</template>
