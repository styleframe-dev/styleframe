<script setup lang="ts">
import Button from "./Button.vue";
import Card from "./Card.vue";
</script>

<template>
	<main class="stage">
		<div class="stack">
			<Card>
				<template #header>
					<strong>Styleframe Playground</strong>
				</template>
				<p class="_margin:0">
                  Edit styleframe.config.ts, App.vue, Card.vue, or Button.vue on the left, 
                  then click Run <span class="_color:gray-500">(or press Ctrl/Cmd+S)</span> to rebuild the preview, CSS, and runtime JS.
                </p>
				<template #footer>
					Made with <span class="_color:primary">♥</span>
                  	<div class="_display:flex _gap:0.5 _margin-left:auto _flex-wrap:wrap">
					    <Button color="primary" variant="solid" label="Confirm" />
					    <Button color="primary" variant="outline" label="Cancel" />
				    </div>
				</template>
			</Card>
		</div>
	</main>
</template>
