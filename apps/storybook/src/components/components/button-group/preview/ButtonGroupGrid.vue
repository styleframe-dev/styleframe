<script setup lang="ts">
import ButtonGroup from "../ButtonGroup.vue";
import Button from "../../button/Button.vue";

const orientations = ["horizontal", "vertical"] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
</script>

<template>
	<div class="button-group-section">
		<div v-for="orientation in orientations" :key="orientation">
			<div class="button-group-label">{{ orientation }}</div>
			<div class="button-group-row">
				<ButtonGroup
					v-for="variant in variants"
					:key="`${orientation}-${variant}`"
					:orientation="orientation"
				>
					<Button
						:variant="variant"
						label="Left"
					/>
					<Button
						:variant="variant"
						label="Center"
					/>
					<Button
						:variant="variant"
						label="Right"
					/>
				</ButtonGroup>
			</div>
		</div>
	</div>
</template>
