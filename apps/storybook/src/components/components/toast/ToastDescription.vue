<script setup lang="ts">
import { computed } from "vue";
import { toastDescription } from "virtual:styleframe";

const classes = computed(() => toastDescription());
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
