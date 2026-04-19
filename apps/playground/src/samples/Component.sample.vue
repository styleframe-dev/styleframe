<script setup>
import { card, cardBody, cardHeader } from "./styleframe.config";

const props = defineProps({
	title: { type: String, required: true },
	body: { type: String, required: true },
	variant: { type: String, default: "solid" },
	size: { type: String, default: "md" },
});
</script>

<template>
	<article :class="card({ color: 'light', variant: props.variant, size: props.size })">
		<header :class="cardHeader()">{{ props.title }}</header>
		<div :class="cardBody()">{{ props.body }}</div>
	</article>
</template>
