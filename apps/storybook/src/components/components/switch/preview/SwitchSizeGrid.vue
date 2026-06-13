<script setup lang="ts">
import Switch from "../Switch.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="switch-section">
		<div v-for="size in sizes" :key="size">
			<div class="switch-label">{{ size }}</div>
			<div class="switch-row">
				<Switch :size="size" :label="sizeTitles[size]" />
				<Switch :size="size" checked label="On" />
			</div>
		</div>
	</div>
</template>
