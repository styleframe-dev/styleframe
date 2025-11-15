<script lang="ts" setup>
const links = [
	{
		label: "Privacy",
		to: "/privacy",
	},
	{
		label: "Terms",
		to: "/terms",
	},
	{
		label: "License",
		to: "/license",
	},
];
</script>

<template>
	<UNavigationMenu orientation="horizontal" :items="links" />
</template>
