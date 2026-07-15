<script setup lang="ts">
import Toast from "../Toast.vue";

const orientations = ["horizontal", "vertical"] as const;
</script>

<template>
	<div class="toast-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="toast-label">{{ orientation }}</div>
			<div class="toast-row">
				<Toast
					:orientation="orientation"
					:title="`${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`"
					:description="`This is a toast with the ${orientation} orientation.`"
				/>
			</div>
		</div>
	</div>
</template>
