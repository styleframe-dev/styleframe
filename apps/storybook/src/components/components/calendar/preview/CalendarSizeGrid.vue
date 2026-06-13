<script setup lang="ts">
import Calendar from "../Calendar.vue";

const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
	<div class="calendar-stories-grid">
		<div v-for="size in sizes" :key="size" class="calendar-stories-section">
			<div class="calendar-stories-label">{{ size }}</div>
			<Calendar :size="size" selected="2026-06-18" />
		</div>
	</div>
</template>
