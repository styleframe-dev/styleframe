<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { useLocalStorage } from "@vueuse/core";
import * as z from "zod";
import type { MailingListUserGroup } from "~/types/subscribe";

const props = withDefaults(
	defineProps<{
		group?: MailingListUserGroup;
	}>(),
	{
		group: "",
	},
);

const emit = defineEmits<{
	(success: void): void;
}>();

const toast = useToast();

const SUBSCRIBE_FORM_TIMESTAMP_LOCALSTORAGE_KEY = "subscribe-form-timestamp";
const previousTimestamp = useLocalStorage(
	SUBSCRIBE_FORM_TIMESTAMP_LOCALSTORAGE_KEY,
	0,
);

const schema = z.object({
	email: z.string().email("Invalid email"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	email: undefined,
});

function rateLimit() {
	toast.add({
		title: "Error",
		description: "Too many signups, please try again in a little while.",
		color: "error",
	});
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
	const time = new Date();
	const timestamp = time.valueOf();

	if (
		previousTimestamp.value &&
		Number(previousTimestamp.value) + 60000 > timestamp
	) {
		rateLimit();
		return;
	}

	previousTimestamp.value = timestamp;

	try {
		const response = await fetch(
			"https://app.loops.so/api/newsletter-form/cmcc289ja7g5x0j0iqdjc14v3",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `userGroup=${props.group}&mailingLists=&email=${encodeURIComponent(event.data.email)}`,
			},
		);

		const data = await response.json();
		if (!data.success) {
			throw new Error("Failed to submit form");
		}

		toast.add({
			title: "Success",
			description: "Thanks! We'll be in touch!",
			color: "success",
		});

		emit("success");
	} catch (error) {
		toast.add({
			title: "Error",
			description: "There was an error submitting the form.",
			color: "error",
		});

		console.error("Error submitting form:", error);

		return;
	}
}
</script>

<template>
	<UForm class="w-full space-y-4 flex flex-col" :schema="schema" :state="state" @submit="onSubmit">
		<UFormField label="Email" name="email" class="w-full">
			<UInput placeholder="you@example.com" class="w-full" v-model="state.email" />
		</UFormField>

		<UButton class="ml-auto" type="submit">
			Join Waitlist
		</UButton>
	</UForm>
</template>

