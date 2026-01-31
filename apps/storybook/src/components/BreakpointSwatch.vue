<script setup lang="ts">
import { computed } from "vue";
import "./BreakpointSwatch.styleframe?css";

const props = defineProps<{
	name: string;
	value: string;
	width: number;
}>();

const maxBreakpoint = 1440;

const barWidth = computed(() => {
	const percentage = Math.max(10, (props.width / maxBreakpoint) * 100);
	return `${percentage}%`;
});
</script>

<template>
	<div class="breakpoint-swatch">
		<div class="breakpoint-swatch__name">{{ name }}</div>
		<div class="breakpoint-swatch__value">{{ value }}</div>
		<div class="breakpoint-swatch__bar-container">
			<div class="breakpoint-swatch__bar" :style="{ width: barWidth }" />
		</div>
	</div>
</template>
