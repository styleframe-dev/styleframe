<script setup lang="ts">
import "./BorderWidthSwatch.styleframe?css";
import { borderWidthSwatch } from "./BorderWidthSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['border-width-swatch__preview', borderWidthSwatch({ variant: value })]" />
	</SwatchCard>
</template>
