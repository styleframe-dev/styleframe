<script setup lang="ts">
import ButtonGroup from "../ButtonGroup.vue";
import Button from "../../button/Button.vue";

const variants = ["solid", "outline", "soft", "subtle", "ghost", "link"] as const;
const colors = ["primary", "secondary", "success", "info", "warning", "danger"] as const;
</script>

<template>
	<div class="button-group-section">
		<div v-for="variant in variants" :key="variant">
			<div class="button-group-label">{{ variant }}</div>
			<div class="button-group-row">
				<ButtonGroup
					v-for="color in colors"
					:key="`${variant}-${color}`"
				>
					<Button
						:variant="variant"
						:color="color"
						label="Left"
					/>
					<Button
						:variant="variant"
						:color="color"
						label="Center"
					/>
					<Button
						:variant="variant"
						:color="color"
						label="Right"
					/>
				</ButtonGroup>
			</div>
		</div>
	</div>
</template>
