<script setup lang="ts">
import Callout from "../Callout.vue";

const colors = [
	"neutral",
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"light",
	"dark",
] as const;
const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="callout-section">
		<div v-for="size in sizes" :key="size">
			<div class="callout-label">{{ size }}</div>
			<div class="callout-row">
				<Callout
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
					:title="`${sizeTitles[size]} ${color.charAt(0).toUpperCase() + color.slice(1)}`"
					:description="`This is a ${size} ${color} callout.`"
				/>
			</div>
		</div>
	</div>
</template>
