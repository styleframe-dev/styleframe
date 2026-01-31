<script setup lang="ts">
import { computed } from "vue";
import "./BreakpointSwatch.styleframe?css";
import SwatchRow from "./primitives/SwatchRow.vue";
import ProgressBar from "./primitives/ProgressBar.vue";

const props = defineProps<{
	name: string;
	value: string;
	width: number;
}>();

const maxBreakpoint = 1440;

const percentage = computed(() =>
	Math.max(10, (props.width / maxBreakpoint) * 100),
);
</script>

<template>
	<SwatchRow :name="name" :value="value" uppercase>
		<ProgressBar :percentage="percentage" />
	</SwatchRow>
</template>
