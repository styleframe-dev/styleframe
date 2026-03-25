<script setup lang="ts">
import Alert from "./Alert.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
	"light",
	"dark",
	"neutral",
] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="alert-section">
		<div v-for="size in sizes" :key="size">
			<div class="alert-label">{{ size }}</div>
			<div class="alert-row">
				<Alert
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
					:title="color"
				/>
			</div>
		</div>
	</div>
</template>
