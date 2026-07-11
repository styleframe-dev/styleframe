<script setup lang="ts">
import { computed } from "vue";
import { toastTitle } from "virtual:styleframe";

const classes = computed(() => toastTitle());
</script>

<template>
	<strong :class="classes">
		<slot />
	</strong>
</template>
