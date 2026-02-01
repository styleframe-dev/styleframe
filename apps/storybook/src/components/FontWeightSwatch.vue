<script setup lang="ts">
import "./FontWeightSwatch.styleframe?css";
import { fontWeightSwatch } from "./FontWeightSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<span :class="['font-weight-swatch__preview', fontWeightSwatch({ variant: value })]">
			The quick brown fox jumps over the lazy dog
		</span>
	</SwatchCard>
</template>
