<script setup lang="ts">
import RadioGroup from "../RadioGroup.vue";
import Radio from "../Radio.vue";

const orientations = ["vertical", "horizontal"] as const;
</script>

<template>
	<div class="radio-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="radio-label">{{ orientation }}</div>
			<RadioGroup :orientation="orientation">
				<Radio :name="`rgg-${orientation}`" checked label="Email" />
				<Radio :name="`rgg-${orientation}`" label="SMS" />
				<Radio :name="`rgg-${orientation}`" label="Push notifications" />
			</RadioGroup>
		</div>
	</div>
</template>
