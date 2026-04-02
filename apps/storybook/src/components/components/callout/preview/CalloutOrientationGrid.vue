<script setup lang="ts">
import Callout from "../Callout.vue";

const orientations = ["horizontal", "vertical"] as const;
</script>

<template>
	<div class="callout-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="callout-label">{{ orientation }}</div>
			<div class="callout-row">
				<Callout
					:orientation="orientation"
					:title="`${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`"
					:description="`This is a callout with the ${orientation} orientation.`"
				/>
			</div>
		</div>
	</div>
</template>
