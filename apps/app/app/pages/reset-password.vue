<script setup lang="ts">
const supabase = useSupabaseClient();
const newPassword = ref("");

const updateUserPassword = async () => {
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword.value,
	});
	if (error) console.log(error);
};
</script>

<template>
	<div>
		<input v-model="newPassword" type="password" />
		<button @click="updateUserPassword">Update Password</button>
	</div>
</template>
