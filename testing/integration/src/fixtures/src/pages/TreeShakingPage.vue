<script setup lang="ts">
import { badge } from "virtual:styleframe";

const defaultBadge = badge();
const variantBadge = badge({ color: "primary", variant: "solid" });
</script>

<template>
	<div>
		<span id="test-treeshake-used" :class="defaultBadge">Used Badge</span>
		<span id="test-treeshake-variant" :class="variantBadge">Variant Badge</span>
		<div id="test-treeshake-utility" class="_margin:sm">Scanned Utility</div>
	</div>
</template>
