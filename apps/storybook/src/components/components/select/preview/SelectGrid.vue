<script setup lang="ts">
import Select from "../Select.vue";
import SelectChip from "../SelectChip.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "ghost"] as const;
</script>

<template>
	<div class="select-section">
		<div v-for="variant in variants" :key="variant">
			<div class="select-caption">{{ variant }}</div>
			<div class="select-row">
				<Select
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
				>
					<SelectChip :color="color" size="md">Apple</SelectChip>
					<SelectChip :color="color" size="md">Banana</SelectChip>
				</Select>
			</div>
		</div>
	</div>
</template>
