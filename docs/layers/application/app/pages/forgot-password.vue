<script setup lang="ts">
import { useRuntimeConfig, useSupabaseClient } from "#imports";
import { ref } from "vue";

const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();
const email = ref("");

const requestResetPassword = async () => {
	const { data, error } = await supabase.auth.resetPasswordForEmail(
		email.value,
		{
			redirectTo: `${runtimeConfig.public.baseUrl}/reset-password`,
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
