<script setup lang="ts">
const user = useSupabaseUser();
const redirectInfo = useSupabaseCookieRedirect();

watch(
	user,
	() => {
		if (user.value) {
			// Get redirect path, and clear it from the cookie
			const path = redirectInfo.pluck();
			// Redirect to the saved path, or fallback to home
			return navigateTo(path || "/");
		}
	},
	{ immediate: true },
);
</script>

<template>
	<div>Waiting for login...</div>
</template>
