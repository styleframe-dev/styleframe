<script setup lang="ts">
import Button from "../Button.vue";

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
	<div class="button-section">
		<div v-for="size in sizes" :key="size">
			<div class="button-label">{{ size }}</div>
			<div class="button-row">
				<Button
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
