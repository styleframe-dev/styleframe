<script setup lang="ts">
import "./ColorSwatch.styleframe?css";
import { colorSwatch } from "./ColorSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['color-swatch__preview', colorSwatch({ variant: value })]" />
	</SwatchCard>
</template>
