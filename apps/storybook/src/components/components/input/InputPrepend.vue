<script setup lang="ts">
import { computed } from "vue";
import { inputPrepend } from "virtual:styleframe";

const classes = computed(() => inputPrepend());
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
