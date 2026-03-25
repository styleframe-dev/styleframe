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
const variants = ["solid", "outline", "soft", "subtle"] as const;
</script>

<template>
	<div class="alert-section">
		<div v-for="variant in variants" :key="variant">
			<div class="alert-label">{{ variant }}</div>
			<div class="alert-row">
				<Alert
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:title="color"
				/>
			</div>
		</div>
	</div>
</template>
