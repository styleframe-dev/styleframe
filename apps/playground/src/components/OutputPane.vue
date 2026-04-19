<script setup lang="ts">
import {
	pgEditorShell,
	pgEditorSurface,
} from "virtual:styleframe";
import CodeOutput from "./CodeOutput.vue";
import ErrorBanner from "./ErrorBanner.vue";
import PreviewFrame from "./PreviewFrame.vue";
import TabList from "./TabList.vue";

type OutputId = "preview" | "css" | "js";

const props = defineProps<{
	active: OutputId;
	srcdoc: string;
	css: string;
	js: string;
	error: string | null;
}>();

const emit = defineEmits<{
	"update:active": [value: OutputId];
	"runtime-error": [message: string];
	"dismiss-error": [];
}>();

const tabs: ReadonlyArray<{ id: OutputId; label: string }> = [
	{ id: "preview", label: "Preview" },
	{ id: "css", label: "CSS Output" },
	{ id: "js", label: "JS Output" },
];
</script>

<template>
	<div :class="pgEditorShell()">
		<TabList
			:tabs="tabs"
			:model-value="active"
			@update:model-value="(value) => emit('update:active', value)"
		/>
		<div :class="pgEditorSurface()" style="position: relative">
			<div v-show="active === 'preview'" style="height: 100%">
				<PreviewFrame
					:srcdoc="props.srcdoc"
					@runtime-error="(message) => emit('runtime-error', message)"
				/>
			</div>
			<div v-show="active === 'css'" style="height: 100%">
				<CodeOutput :value="props.css" language="typescript" />
			</div>
			<div v-show="active === 'js'" style="height: 100%">
				<CodeOutput :value="props.js" language="typescript" />
			</div>
			<ErrorBanner
				v-if="error"
				:message="error"
				@dismiss="emit('dismiss-error')"
			/>
		</div>
	</div>
</template>
