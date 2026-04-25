<script setup lang="ts">
import { computed } from "vue";
import { inputAppend } from "virtual:styleframe";

const classes = computed(() => inputAppend());
</script>

<template>
	<span :class="classes">
		<slot />
	</span>
</template>
