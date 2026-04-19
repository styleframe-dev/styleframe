<script setup lang="ts">
import Component from "./Component.vue";
</script>

<template>
	<main class="stage">
		<div class="stack">
			<Component
				title="Styleframe Playground"
				body="Edit styleframe.config.ts, App.vue, or Component.vue on the left. The preview, CSS, and runtime JS rebuild as you type."
			/>
			<Component
				title="Recipes, live"
				body="This card uses the card, card-header, and card-body recipes from @styleframe/theme."
				variant="soft"
			/>
		</div>
	</main>
</template>
