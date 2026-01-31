<script setup lang="ts">
import { computed } from "vue";
import "./SpacingSwatch.styleframe?css";
import { spacingPreview } from "./SpacingSwatch.styleframe?ts";
import { spacingValues, type Spacing } from "./SpacingSwatch.styleframe";

const props = defineProps<{
	spacing: Spacing;
}>();

const value = computed(() => spacingValues[props.spacing]);
</script>

<template>
	<div class="spacing-swatch">
		<div class="spacing-swatch__name">{{ spacing }}</div>
		<div class="spacing-swatch__value">{{ value }}</div>
		<div
			:class="['spacing-swatch__preview', spacingPreview({ spacing })]"
		/>
	</div>
</template>
