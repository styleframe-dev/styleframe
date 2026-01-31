<script setup lang="ts">
import { computed } from "vue";
import "./ScaleSwatch.styleframe?css";
import SwatchRow from "./primitives/SwatchRow.vue";
import BarChart from "./primitives/BarChart.vue";

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
	<SwatchRow :name="name" :value="value">
		<BarChart :heights="barHeights" />
	</SwatchRow>
</template>
