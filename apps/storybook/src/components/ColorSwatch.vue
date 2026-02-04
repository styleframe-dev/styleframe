<script setup lang="ts">
import { colorSwatch } from "virtual:styleframe";
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
