<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import type { DesignToken, TokenNamespace } from "~/types";

defineProps<{
	data: {
		namespace: TokenNamespace;
		tokens: DesignToken[];
	};
}>();
</script>

<template>
	<div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm min-w-[240px]">
		<Handle type="target" :position="Position.Left" />

		<div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
			<h3 class="text-sm font-semibold">{{ data.namespace }}</h3>
			<span class="text-xs text-gray-500">{{ data.tokens.length }} tokens</span>
		</div>

		<ul class="divide-y divide-gray-100 dark:divide-gray-800 max-h-[200px] overflow-y-auto">
			<li
				v-for="token in data.tokens"
				:key="token.id"
				class="px-4 py-2 flex items-center justify-between text-xs"
			>
				<span class="font-mono text-gray-700 dark:text-gray-300">{{ token.name }}</span>
				<span class="flex items-center gap-2">
					<span
						v-if="token.type === 'color'"
						class="inline-block w-3 h-3 rounded-full border border-gray-300"
						:style="{ backgroundColor: token.value }"
					/>
					<span class="text-gray-500 truncate max-w-[120px]">{{ token.value }}</span>
				</span>
			</li>
		</ul>

		<Handle type="source" :position="Position.Right" />
	</div>
</template>
