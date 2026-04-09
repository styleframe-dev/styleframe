<script setup lang="ts">
import { computed } from "vue";
import { spinnerOverlay } from "virtual:styleframe";

const classes = computed(() => spinnerOverlay({}));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
