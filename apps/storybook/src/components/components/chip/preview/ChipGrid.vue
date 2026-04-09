<script setup lang="ts">
import Chip from "../Chip.vue";
import ChipIndicator from "../ChipIndicator.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"light",
	"dark",
	"neutral",
] as const;
const variants = ["solid", "soft"] as const;
</script>

<template>
	<div class="chip-section">
		<div v-for="variant in variants" :key="variant">
			<div class="chip-label">{{ variant }}</div>
			<div class="chip-row">
				<Chip
					v-for="color in colors"
					:key="`${variant}-${color}`"
				>
					<div class="chip-target" />
					<ChipIndicator :color="color" :variant="variant" />
				</Chip>
			</div>
		</div>
	</div>
</template>
