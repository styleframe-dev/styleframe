<script setup lang="ts">
import { computed } from "vue";
import { textareaPrepend } from "virtual:styleframe";

const classes = computed(() => textareaPrepend());
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
