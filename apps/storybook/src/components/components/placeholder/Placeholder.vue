<script setup lang="ts">
import { placeholder } from "virtual:styleframe";

const classes = placeholder();
</script>

<template>
	<div :class="classes">
		<slot />
	</div>
</template>
