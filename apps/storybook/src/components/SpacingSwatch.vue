<script setup lang="ts">
import "./SpacingSwatch.styleframe?css";
import { spacingSwatch } from "./SpacingSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['spacing-swatch__preview', spacingSwatch({ variant: value })]" />
	</SwatchCard>
</template>
