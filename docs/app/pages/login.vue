<script setup lang="ts">
import { useSupabaseClient, useSupabaseUser } from "#imports";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const toast = useToast();

definePageMeta({
	layout: "default",
});

watchEffect(() => {
	if (user.value) {
		return navigateTo("/");
	}
});

const fields = [
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
		label: "GitHub",
		icon: "i-simple-icons-github",
		onClick: async () => {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "github",
				options: {
					redirectTo:
						"https://supabase-demo-gamma.vercel.app/confirm",
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

async function onSubmit(payload: {
	data: { email: string; password: string };
}) {
	const email = payload.data.email;
	const password = payload.data.password;

	await signIn(email, password);
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
	<UContainer
		class="h-[calc(100vh-var(--ui-header-height)-var(--ui-footer-height))] flex items-center justify-center px-4"
	>
		<UPageCard class="max-w-sm w-full">
			<UAuthForm
				title="Log in to styleframe"
				icon="i-lucide-user"
				:fields="fields"
				:providers="providers"
				@submit="onSubmit"
			>
				<template #footer>
					Don't have an account?
					<UButton variant="link" class="p-0" to="/signup">
						Sign up </UButton
					>.
				</template>
			</UAuthForm>
		</UPageCard>
	</UContainer>
</template>
