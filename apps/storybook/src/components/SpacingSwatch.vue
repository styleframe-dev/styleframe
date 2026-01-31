<script setup lang="ts">
import { computed } from "vue";
import "./SpacingSwatch.styleframe?css";
import { spacingPreview } from "./SpacingSwatch.styleframe?ts";
import { spacingValues, type Spacing } from "./SpacingSwatch.styleframe";
import SwatchRow from "./primitives/SwatchRow.vue";

const props = defineProps<{
	spacing: Spacing;
}>();

const value = computed(() => spacingValues[props.spacing]);
</script>

<template>
	<SwatchRow :name="spacing" :value="value">
		<div
			:class="['spacing-swatch__preview', spacingPreview({ spacing })]"
		/>
	</SwatchRow>
</template>
