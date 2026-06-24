<script setup lang="ts">
import InputDate from "../InputDate.vue";

const sizes = ["sm", "md", "lg"] as const;
const sizeTitles: Record<string, string> = {
	sm: "Small",
	md: "Medium",
	lg: "Large",
};
</script>

<template>
	<div class="input-date-section">
		<div v-for="size in sizes" :key="size">
			<div class="input-date-label">{{ sizeTitles[size] }}</div>
			<div class="input-date-row">
				<InputDate :size="size" />
			</div>
		</div>
	</div>
</template>
