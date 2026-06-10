<script setup lang="ts">
import { computed } from "vue";
import { textareaAppend } from "virtual:styleframe";

const classes = computed(() => textareaAppend());
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
