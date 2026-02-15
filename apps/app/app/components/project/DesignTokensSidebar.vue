<script setup lang="ts">
import type { TokenNamespace } from "~/types";

const props = defineProps<{
	namespace: string;
}>();

const route = useRoute();
const projectId = computed(() => route.params.id as string);

const tokenTypeOptions = [
	{ label: "color", value: "color" },
	{ label: "dimension", value: "dimension" },
	{ label: "number", value: "number" },
	{ label: "string", value: "string" },
	{ label: "duration", value: "duration" },
	{ label: "reference", value: "reference" },
];

const designTokensStore = useDesignTokensStore();

const tokens = computed(() =>
	designTokensStore.getTokensByNamespace(
		projectId.value,
		props.namespace as TokenNamespace,
	),
);

function onUpdateToken(tokenId: string, field: string, value: string) {
	designTokensStore.updateToken(
		projectId.value,
		props.namespace as TokenNamespace,
		tokenId,
		{ [field]: value },
	);
}
</script>

<template>
	<UPageAside>
		<h2 class="text-sm font-semibold capitalize">{{ namespace }}</h2>

		<div class="mt-4 space-y-4">
			<div
				v-for="token in tokens"
				:key="token.id"
				class="space-y-2 border-b border-gray-200 pb-4 dark:border-gray-800"
			>
				<UFormField label="Name" size="sm">
					<UInput
						:model-value="token.name"
						size="sm"
						@update:model-value="onUpdateToken(token.id, 'name', $event)"
					/>
				</UFormField>
				<UFormField label="Value" size="sm">
					<UInput
						:model-value="token.value"
						size="sm"
						@update:model-value="onUpdateToken(token.id, 'value', $event)"
					/>
				</UFormField>
				<UFormField label="Type" size="sm">
					<USelect
						:model-value="token.type"
						:items="tokenTypeOptions"
						size="sm"
						@update:model-value="onUpdateToken(token.id, 'type', $event)"
					/>
				</UFormField>
			</div>
		</div>
	</UPageAside>
</template>
