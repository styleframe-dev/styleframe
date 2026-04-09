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
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
	<div class="chip-section">
		<div v-for="size in sizes" :key="size">
			<div class="chip-label">{{ size }}</div>
			<div class="chip-row">
				<Chip
					v-for="color in colors"
					:key="`${size}-${color}`"
				>
					<div class="chip-target" />
					<ChipIndicator :color="color" :size="size" />
				</Chip>
			</div>
		</div>
	</div>
</template>
