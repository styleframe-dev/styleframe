<script setup lang="ts">
import Badge from "./Badge.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
</script>

<template>
	<div class="badge-section">
		<div v-for="variant in variants" :key="variant">
			<div class="badge-label">{{ variant }}</div>
			<div class="badge-row">
				<Badge
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
