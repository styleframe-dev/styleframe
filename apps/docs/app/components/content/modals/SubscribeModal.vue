<script setup lang="ts">
import SubscribeForm from "~/components/forms/SubscribeForm.vue";
import type { MailingListUserGroup } from "~/types/subscribe";

withDefaults(
	defineProps<{
		group?: MailingListUserGroup;
		title?: string;
		cta?: string;
	}>(),
	{
		group: "",
		title: "Modal with title",
		cta: "Call to Action",
	},
);

const open = ref(false);

function onSuccess() {
	open.value = false;
}
</script>
<template>
	<UModal :title v-model:open="open">
		<UButton :label="cta" color="neutral" variant="outline" />

		<template #body>
			<SubscribeForm :group="group" @success="onSuccess" />
		</template>
	</UModal>
</template>
