<script setup lang="ts">
import Spinner from "../Spinner.vue";

const colors = ["primary", "light", "dark", "neutral"] as const;
</script>

<template>
	<div class="spinner-section">
		<div v-for="color in colors" :key="color">
			<div class="spinner-label">{{ color }}</div>
			<div class="spinner-row">
				<Spinner :color="color" />
			</div>
		</div>
	</div>
</template>
