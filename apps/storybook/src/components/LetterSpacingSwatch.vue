<script setup lang="ts">
import "./LetterSpacingSwatch.styleframe?css";
import { letterSpacingSwatch } from "./LetterSpacingSwatch.styleframe?ts";
import SwatchCard from "./primitives/SwatchCard.vue";

const props = defineProps<{
	name: string;
	value: string;
}>();
</script>

<template>
	<SwatchCard :name="name">
		<span :class="['letter-spacing-swatch__preview', letterSpacingSwatch({ variant: value })]">
			Letter Spacing
		</span>
	</SwatchCard>
</template>
