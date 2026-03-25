<script setup lang="ts">
import Alert from "./Alert.vue";

const orientations = ["horizontal", "vertical"] as const;
</script>

<template>
	<div class="alert-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="alert-label">{{ orientation }}</div>
			<div class="alert-row">
				<Alert :orientation="orientation" />
			</div>
		</div>
	</div>
</template>
