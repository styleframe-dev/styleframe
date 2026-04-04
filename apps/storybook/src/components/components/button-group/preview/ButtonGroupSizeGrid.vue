<script setup lang="ts">
import ButtonGroup from "../ButtonGroup.vue";
import Button from "../../button/Button.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;
</script>

<template>
	<div class="button-group-section">
		<div v-for="size in sizes" :key="size">
			<div class="button-group-label">{{ size }}</div>
			<div class="button-group-row">
				<ButtonGroup
					v-for="color in colors"
					:key="`${size}-${color}`"
				>
					<Button
						:size="size"
						:color="color"
						label="Left"
					/>
					<Button
						:size="size"
						:color="color"
						label="Center"
					/>
					<Button
						:size="size"
						:color="color"
						label="Right"
					/>
				</ButtonGroup>
			</div>
		</div>
	</div>
</template>
