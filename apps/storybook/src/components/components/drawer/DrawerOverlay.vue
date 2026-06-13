<script setup lang="ts">
import { computed } from "vue";
import { drawerOverlay } from "virtual:styleframe";

const classes = computed(() => drawerOverlay({}));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
