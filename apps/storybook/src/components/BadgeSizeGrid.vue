<script setup lang="ts">
import Badge from "./Badge.vue";

const colors = ["primary", "secondary", "success", "info", "warning", "danger"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
	<div class="badge-section">
		<div v-for="size in sizes" :key="size">
			<div class="badge-label">{{ size }}</div>
			<div class="badge-row">
				<Badge
					v-for="color in colors"
					:key="`${size}-${color}`"
					:color="color"
					:size="size"
					:label="color"
				/>
			</div>
		</div>
	</div>
</template>
