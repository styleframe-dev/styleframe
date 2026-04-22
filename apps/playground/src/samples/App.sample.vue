<script setup lang="ts">
import Component from "./Component.vue";
</script>

<template>
	<main class="stage">
		<div class="stack">
			<Component>
				<template #header>
					Styleframe Playground
				</template>
				<p class="_margin:0">Edit styleframe.config.ts, App.vue, or Component.vue on the left, then click Run (or press Ctrl/Cmd+S) to rebuild the preview, CSS, and runtime JS.</p>
				<template #footer>
					Made with Styleframe
				</template>
			</Component>
		</div>
	</main>
</template>
