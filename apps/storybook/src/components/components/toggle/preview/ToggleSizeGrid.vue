<script setup lang="ts">
import Toggle from "../Toggle.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="toggle-section">
		<div v-for="size in sizes" :key="size">
			<div class="toggle-label">{{ size }}</div>
			<div class="toggle-row">
				<Toggle :size="size" variant="outline" :label="sizeTitles[size]" />
				<Toggle :size="size" variant="outline" pressed label="On" />
			</div>
		</div>
	</div>
</template>
