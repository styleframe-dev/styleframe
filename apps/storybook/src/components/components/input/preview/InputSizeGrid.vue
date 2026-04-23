<script setup lang="ts">
import Input from "../Input.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="input-section">
		<div v-for="size in sizes" :key="size">
			<div class="input-label">{{ size }}</div>
			<div class="input-row">
				<Input :size="size" :placeholder="sizeTitles[size]" />
			</div>
		</div>
	</div>
</template>
