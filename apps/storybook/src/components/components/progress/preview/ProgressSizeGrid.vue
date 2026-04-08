<script setup lang="ts">
import Progress from "../Progress.vue";
import ProgressBar from "../ProgressBar.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>

<template>
	<div class="progress-section">
		<div v-for="size in sizes" :key="size">
			<div class="progress-label">{{ size }}</div>
			<div class="progress-row">
				<Progress :size="size" :value="65">
					<ProgressBar :size="size" :value="65" />
				</Progress>
			</div>
		</div>
	</div>
</template>
