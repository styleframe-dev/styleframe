<script setup lang="ts">
import ToggleGroup from "../ToggleGroup.vue";
import Toggle from "../Toggle.vue";

const orientations = ["vertical", "horizontal"] as const;
</script>

<template>
	<div class="toggle-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="toggle-label">{{ orientation }}</div>
			<ToggleGroup :orientation="orientation">
				<Toggle checked label="Email" />
				<Toggle label="SMS" />
				<Toggle label="Push notifications" />
			</ToggleGroup>
		</div>
	</div>
</template>
