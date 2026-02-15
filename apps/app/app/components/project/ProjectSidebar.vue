<script setup lang="ts">
const route = useRoute();
const projectId = computed(() => route.params.id as string);

const designTokensStore = useDesignTokensStore();
const tokenGroups = computed(() => designTokensStore.getNamespaces(projectId.value));

const items = computed(() => [
	{
		label: "Design Tokens",
		children: tokenGroups.value.map((group) => ({
			label: group,
			to: `/dashboard/project/${projectId.value}/tokens/${group}`,
		})),
	},
]);

const defaultExpanded = ["Design Tokens"];
</script>

<template>
	<UPageAside>
		<UTree
			:items="items"
			:default-expanded="defaultExpanded"
		>
			<template #item="{ item }">
				<NuxtLink v-if="item.to" :to="item.to" class="block w-full">
					{{ item.label }}
				</NuxtLink>
				<span v-else>{{ item.label }}</span>
			</template>
		</UTree>
	</UPageAside>
</template>
