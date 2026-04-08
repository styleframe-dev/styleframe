<script setup lang="ts">
import Skeleton from "../Skeleton.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
	<div class="skeleton-section">
		<div v-for="size in sizes" :key="size">
			<div class="skeleton-label">{{ size }}</div>
			<div class="skeleton-row">
				<Skeleton :size="size" style="width: 100%" />
			</div>
		</div>
	</div>
</template>
