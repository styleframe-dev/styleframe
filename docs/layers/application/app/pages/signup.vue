<script setup lang="ts">
import { useSupabaseClient, useSupabaseUser } from "#imports";
import type { AuthFormField } from "@nuxt/ui";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();

definePageMeta({
	layout: "auth",
});

useSeoMeta({
	title: "Sign Up",
	description: "Create an account to access all styleframe features",
});

watchEffect(() => {
	if (user.value) {
		return navigateTo("/");
	}
});

const fields: AuthFormField[] = [
	{
		name: "email",
		type: "text" as const,
		label: "Email",
		placeholder: "Enter your email",
		required: true,
	},
	{
		name: "password",
		label: "Password",
		type: "password" as const,
		placeholder: "Enter your password",
	},
];

const providers = [
	{
		label: "Sign up with GitHub",
		icon: "i-simple-icons-github",
		onClick: async () => {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "github",
				options: {
					redirectTo: `${runtimeConfig.public.baseUrl}/confirm`,
				},
			});
			if (error) displayError(error);
		},
	},
];

const signIn = async (email: string, password: string) => {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) displayError(error);
};

const signUp = async (email: string, password: string) => {
	const { error } = await supabase.auth.signUp({
		email,
		password,
	});
	if (error) displayError(error);
	else {
		toast.add({
			title: "Sign up successful",
			icon: "i-lucide-check-circle",
			color: "success",
		});
		await signIn(email, password);
	}
};

async function onSubmit(payload: {
	data: { email: string; password: string };
}) {
	const email = payload.data.email;
	const password = payload.data.password;

	await signUp(email, password);
}

const displayError = (error: Error) => {
	toast.add({
		title: "Error",
		description: error.message,
		icon: "i-lucide-alert-circle",
		color: "error",
	});
};
</script>

<template>
	<UPageCard class="max-w-sm w-full h-full mx-auto my-auto">
		<UAuthForm
			title="Sign up to styleframe"
			:fields="fields"
			:providers="providers"
			@submit="onSubmit"
		>
			<template #footer>
				Already have an account?
				<UButton variant="link" class="p-0" to="/login">
					Sign in </UButton
				>.
			</template>
		</UAuthForm>
	</UPageCard>
</template>
