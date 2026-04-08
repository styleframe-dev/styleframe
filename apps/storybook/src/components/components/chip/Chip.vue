<script setup lang="ts">
import { computed } from "vue";
import { chip } from "virtual:styleframe";

const classes = computed(() => chip({}));
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
