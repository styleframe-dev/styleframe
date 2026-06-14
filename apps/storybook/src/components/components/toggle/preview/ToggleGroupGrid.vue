<script setup lang="ts">
import ToggleGroup from "../ToggleGroup.vue";
import Toggle from "../Toggle.vue";

const orientations = ["horizontal", "vertical"] as const;
</script>

<template>
	<div class="toggle-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="toggle-label">{{ orientation }}</div>
			<ToggleGroup :orientation="orientation">
				<Toggle variant="outline" pressed label="Left" />
				<Toggle variant="outline" label="Center" />
				<Toggle variant="outline" label="Right" />
			</ToggleGroup>
		</div>
	</div>
</template>
