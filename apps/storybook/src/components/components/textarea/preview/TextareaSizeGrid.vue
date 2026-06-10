<script setup lang="ts">
import Textarea from "../Textarea.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="textarea-section">
		<div v-for="size in sizes" :key="size">
			<div class="textarea-label">{{ size }}</div>
			<div class="textarea-row">
				<Textarea :size="size" :rows="3" :placeholder="sizeTitles[size]" />
			</div>
		</div>
	</div>
</template>
