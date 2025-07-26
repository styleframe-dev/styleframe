<script setup lang="ts">
interface Props {
	title?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="p-1 border border-default rounded text-sm">
		<div v-if="title" class="flex items-center bg-slate-100 dark:bg-slate-800 p-2 rounded font-bold">
			<span class="flex gap-1 absolute">
				<span class="rounded-full bg-error inline-flex w-3 h-3" />
				<span class="rounded-full bg-warning inline-flex w-3 h-3" />
				<span class="rounded-full bg-success inline-flex w-3 h-3" />
			</span>
			<span class="flex w-full align-center justify-center">
				{{title}}
			</span>
		</div>
		<div class="p-3 overflow-auto">
			<slot mdc-unwrap="p" />
		</div>
	</div>
</template>
