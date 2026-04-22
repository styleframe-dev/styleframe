<script setup lang="ts">
import {
	pgStatusBar,
	pgStatusBarDot,
	pgStatusBarGroup,
	pgStatusBarItem,
} from "virtual:styleframe";

defineProps<{
	line: number;
	column: number;
	language: string;
	indent?: string;
	encoding?: string;
	eol?: string;
	version?: string;
	problems?: number;
	scanSummary?: string;
}>();
</script>

<template>
	<footer :class="pgStatusBar()">
		<div :class="pgStatusBarGroup({ align: 'start' })">
			<span :class="pgStatusBarItem()">
				<span
					:class="pgStatusBarDot({ tone: (problems ?? 0) > 0 ? 'error' : 'success' })"
					aria-hidden="true"
				/>
				<span>
					{{ (problems ?? 0) === 0 ? "No problems" : `${problems} problem${problems === 1 ? "" : "s"}` }}
				</span>
			</span>
			<span v-if="version" :class="pgStatusBarItem()">
				<span>styleframe {{ version }}</span>
			</span>
			<span v-if="scanSummary" :class="pgStatusBarItem()" :title="scanSummary">
				<span>{{ scanSummary }}</span>
			</span>
		</div>
		<div :class="pgStatusBarGroup({ align: 'end' })">
			<span :class="pgStatusBarItem()">
				<span>Ln {{ line }}, Col {{ column }}</span>
			</span>
			<span v-if="indent" :class="pgStatusBarItem()">
				<span>{{ indent }}</span>
			</span>
			<span v-if="encoding" :class="pgStatusBarItem()">
				<span>{{ encoding }}</span>
			</span>
			<span v-if="eol" :class="pgStatusBarItem()">
				<span>{{ eol }}</span>
			</span>
			<span :class="pgStatusBarItem()">
				<span>{{ language }}</span>
			</span>
		</div>
	</footer>
</template>
