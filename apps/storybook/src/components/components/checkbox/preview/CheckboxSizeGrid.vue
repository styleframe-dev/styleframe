<script setup lang="ts">
import Checkbox from "../Checkbox.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="checkbox-section">
		<div v-for="size in sizes" :key="size">
			<div class="checkbox-label">{{ size }}</div>
			<div class="checkbox-row">
				<Checkbox :size="size" :label="sizeTitles[size]" />
				<Checkbox :size="size" checked label="Checked" />
				<Checkbox :size="size" indeterminate label="Indeterminate" />
			</div>
		</div>
	</div>
</template>
