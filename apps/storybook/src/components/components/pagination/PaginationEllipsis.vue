<script setup lang="ts">
import { paginationEllipsis } from "virtual:styleframe";

const props = withDefaults(
	defineProps<{
		size?: "sm" | "md" | "lg";
	}>(),
	{},
);
</script>

<template>
	<span
		:class="paginationEllipsis({ size: props.size })"
		aria-hidden="true"
	>
		<slot>…</slot>
	</span>
</template>
