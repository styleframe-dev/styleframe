<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

definePageMeta({
	layout: "project",
});

const route = useRoute();
const projectId = computed(() => route.params.id as string);

useSeoMeta({
	title: "Tokens",
	description: "Design token graph",
});

const designTokensStore = useDesignTokensStore();

const nodes = computed(() => designTokensStore.getFlowNodes(projectId.value));
const edges = computed(() => designTokensStore.getFlowEdges(projectId.value));
</script>

<template>
	<main class="h-[calc(100vh-4rem)]">
		<VueFlow :nodes="nodes" :edges="edges">
			<template #node-tokenNamespace="props">
				<TokenNamespaceNode v-bind="props" />
			</template>
		</VueFlow>
	</main>
</template>
