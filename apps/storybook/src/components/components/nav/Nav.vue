<script setup lang="ts">
import { nav } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		orientation?: "horizontal" | "vertical";
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);
</script>

<template>
	<nav
		:class="
			nav({
				orientation: props.orientation,
				size: props.size,
			})
		"
	>
		<slot />
	</nav>
</template>
