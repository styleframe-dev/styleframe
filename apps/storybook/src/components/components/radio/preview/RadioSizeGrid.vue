<script setup lang="ts">
import Radio from "../Radio.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="radio-section">
		<div v-for="size in sizes" :key="size">
			<div class="radio-label">{{ size }}</div>
			<div class="radio-row">
				<Radio :size="size" :label="sizeTitles[size]" />
				<Radio :size="size" checked label="Checked" />
				<Radio :size="size" disabled label="Disabled" />
			</div>
		</div>
	</div>
</template>
