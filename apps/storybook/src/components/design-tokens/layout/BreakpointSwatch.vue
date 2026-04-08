<script setup lang="ts">
import { computed } from "vue";
import SwatchRow from "../../primitives/SwatchRow.vue";
import Progress from "../../components/progress/Progress.vue";
import ProgressBar from "../../components/progress/ProgressBar.vue";

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
		<Progress size="xs" :value="percentage">
			<ProgressBar color="primary" size="xs" :value="percentage" />
		</Progress>
	</SwatchRow>
</template>
