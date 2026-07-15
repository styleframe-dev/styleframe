<script setup lang="ts">
import { computed } from "vue";
import { toastContent } from "virtual:styleframe";

const classes = computed(() => toastContent());
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
