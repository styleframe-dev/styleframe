<script setup lang="ts">
import { computed } from "vue";
import { placeholder } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);

const classes = computed(() =>
	placeholder({
		size: props.size,
	}),
);
</script>

<template>
	<div :class="classes">
		<svg
			style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none"
			preserveAspectRatio="none"
		>
			<defs>
				<pattern
					id="placeholder-pattern"
					x="0"
					y="0"
					width="16"
					height="16"
					patternUnits="userSpaceOnUse"
				>
					<line x1="0" y1="0" x2="16" y2="16" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
					<line x1="16" y1="0" x2="0" y2="16" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#placeholder-pattern)" />
		</svg>
		<span style="position: relative; z-index: 1">
			<slot />
		</span>
	</div>
</template>
