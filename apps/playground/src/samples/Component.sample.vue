<script setup>
import { card, cardBody, cardHeader, cardFooter } from "./styleframe.config";

const props = defineProps({
	variant: { type: String, default: "solid" },
	size: { type: String, default: "md" },
});
</script>

<template>
	<article :class="card({ color: 'light', variant: props.variant, size: props.size })">
		<header :class="cardHeader()">
			<slot name="header" />
		</header>
		<div :class="cardBody()">
			<slot />
		</div>
		<footer :class="cardFooter()">
			<slot name="footer" />
		</footer>
	</article>
</template>
