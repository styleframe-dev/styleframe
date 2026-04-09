<script setup lang="ts">
import Chip from "../Chip.vue";
import ChipIndicator from "../ChipIndicator.vue";

const positions = [
	"top-right",
	"top-left",
	"bottom-right",
	"bottom-left",
] as const;
</script>

<template>
	<div class="chip-section">
		<div v-for="position in positions" :key="position">
			<div class="chip-label">{{ position }}</div>
			<div class="chip-row">
				<Chip>
					<div class="chip-target" />
					<ChipIndicator :position="position" />
				</Chip>
			</div>
		</div>
	</div>
</template>
