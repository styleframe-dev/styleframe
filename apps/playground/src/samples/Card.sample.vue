<script setup lang="ts">
import { card, cardBody, cardFooter, cardHeader } from "./styleframe.config";

const props = withDefaults(
	defineProps<{
		color?: "light" | "dark" | "neutral";
		variant?: "solid" | "soft" | "subtle";
		size?: "sm" | "md" | "lg";
	}>(),
	{
		color: "light",
		variant: "solid",
		size: "md",
	},
);
</script>

<template>
	<article :class="card({ color: props.color, variant: props.variant, size: props.size })">
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
