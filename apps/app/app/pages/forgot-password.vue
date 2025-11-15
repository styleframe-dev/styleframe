<script setup lang="ts">
import { useRuntimeConfig, useSupabaseClient } from "#imports";
import type { AuthFormField } from "@nuxt/ui";

const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();
const toast = useToast();

definePageMeta({
	layout: "auth",
});

useSeoMeta({
	title: "Forgot Password",
	description: "Reset your styleframe account password",
});

const fields: AuthFormField[] = [
	{
		name: "email",
		type: "text" as const,
		label: "Email",
		placeholder: "Enter your email",
		required: true,
	},
];

const requestResetPassword = async (payload: { data: { email: string } }) => {
	const email = payload.data.email;

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${runtimeConfig.public.baseUrl}/reset-password`,
	});

	if (error) {
		toast.add({
			title: "Error",
			description: error.message,
			icon: "i-lucide-alert-circle",
			color: "error",
		});
	} else {
		toast.add({
			title: "Check your email",
			description: "We've sent you a password reset link",
			icon: "i-lucide-check-circle",
			color: "success",
		});
	}
};
</script>

<template>
	<UPageCard class="max-w-sm w-full h-full mx-auto my-auto">
		<UAuthForm
			title="Reset your password"
			:fields="fields"
			:providers="[]"
			submit-button="Send reset link"
			@submit="requestResetPassword"
		>
			<template #footer>
				Remember your password?
				<UButton variant="link" class="p-0" to="/login">
					Sign in </UButton
				>.
			</template>
		</UAuthForm>
	</UPageCard>
</template>
