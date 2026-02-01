<script setup lang="ts">
import "./BorderStyleSwatch.styleframe?css";
import { borderStyleSwatch } from "./BorderStyleSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['border-style-swatch__preview', borderStyleSwatch({ variant: value })]" />
	</SwatchCard>
</template>
