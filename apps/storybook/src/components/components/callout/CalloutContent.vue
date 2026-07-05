<script setup lang="ts">
import { computed } from "vue";
import { calloutContent } from "virtual:styleframe";

const classes = computed(() => calloutContent());
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
