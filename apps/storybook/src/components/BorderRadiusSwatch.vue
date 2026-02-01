<script setup lang="ts">
import "./BorderRadiusSwatch.styleframe?css";
import { borderRadiusSwatch } from "./BorderRadiusSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<div :class="['border-radius-swatch__preview', borderRadiusSwatch({ variant: value })]" />
	</SwatchCard>
</template>
