<script setup lang="ts">
import { computed } from "vue";
import "./ScaleSwatch.styleframe?css";

const props = defineProps<{
	name: string;
	value: string;
	ratio: number;
}>();

const baseHeight = 10;
const powers = [0, 1, 2, 3, 4];

const barHeights = computed(() =>
	powers.map((power) => `${baseHeight * Math.pow(props.ratio, power)}px`),
);
</script>

<template>
	<div class="scale-swatch">
		<div class="scale-swatch__name">{{ name }}</div>
		<div class="scale-swatch__value">{{ value }}</div>
		<div class="scale-swatch__bars">
			<div
				v-for="(height, index) in barHeights"
				:key="index"
				class="scale-swatch__bar"
				:style="{ height }"
			/>
		</div>
	</div>
</template>
