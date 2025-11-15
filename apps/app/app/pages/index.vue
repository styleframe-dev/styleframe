<script setup lang="ts">
useSeoMeta({
	title: "Dashboard",
	description: "Welcome to your Styleframe Pro Dashboard!",
});
</script>

<template>
	<main class="my-10">
		<h1 class="text-xl font-bold">Welcome!</h1>
		<p>Activate your styleframe license here</p>
		<LicenseActivationCard class="mt-10" />
	</main>
</template>
