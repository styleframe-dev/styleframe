<script setup lang="ts">
import { computed } from "vue";
import { modalOverlay } from "virtual:styleframe";

const classes = computed(() => modalOverlay({}));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
