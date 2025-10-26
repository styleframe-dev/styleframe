<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");

const requestResetPassword = async () => {
	const { data, error } = await supabase.auth.resetPasswordForEmail(
		email.value,
		{
			redirectTo: "https://example.com/password/update",
		},
	);
	if (error) console.log(error);
};
</script>

<template>
	<div>
		<input v-model="email" type="email" />
		<button @click="requestResetPassword">Reset Password</button>
	</div>
</template>
