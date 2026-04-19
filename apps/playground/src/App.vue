<script setup lang="ts">
import { onMounted, watch } from "vue";
import {
	pgToolbar,
	pgToolbarSubtitle,
	pgToolbarTitle,
} from "virtual:styleframe";
import vueUrl from "virtual:pg-vue-url";
import runtimeUrl from "virtual:pg-runtime-url";
import EditorPane from "@/components/EditorPane.vue";
import OutputPane from "@/components/OutputPane.vue";
import SplitPane from "@/components/SplitPane.vue";
import {
	debounce,
	runPipeline,
	type PipelineResult,
} from "@/pipeline/pipeline";
import { usePlaygroundState, type FileId } from "@/state/playground";

const state = usePlaygroundState();
let revokePrevious: (() => void) | null = null;

async function rebuild() {
	const result: PipelineResult = await runPipeline({
		config: state.files.config,
		app: state.files.app,
		component: state.files.component,
		vueUrl,
		runtimeUrl,
	});
	if (!result.ok) {
		state.error = `[${result.stage}] ${result.error.message}`;
		return;
	}
	if (revokePrevious) revokePrevious();
	revokePrevious = result.revoke;
	state.output.css = result.css;
	state.output.runtimeTs = result.runtimeTs;
	state.output.srcdoc = result.srcdoc;
	state.error = null;
}

const debouncedRebuild = debounce(() => {
	void rebuild();
}, 300);

function onChange(payload: { id: FileId; value: string }) {
	state.files[payload.id] = payload.value;
	debouncedRebuild();
}

onMounted(() => {
	void rebuild();
});

watch(
	() => state.activeFile,
	() => {},
);
</script>

<template>
	<header :class="pgToolbar()">
		<div>
			<div :class="pgToolbarTitle()">Styleframe Playground</div>
			<div :class="pgToolbarSubtitle()">
				Edit any file — the preview, CSS, and JS rebuild live.
			</div>
		</div>
	</header>
	<div style="flex: 1 1 auto; min-height: 0">
		<SplitPane :initial="50" :min="25" :max="75">
			<template #left>
				<EditorPane
					:files="state.files"
					:active="state.activeFile"
					@update:active="(value) => (state.activeFile = value)"
					@change="onChange"
				/>
			</template>
			<template #right>
				<OutputPane
					:active="state.activeOutput"
					:srcdoc="state.output.srcdoc"
					:css="state.output.css"
					:js="state.output.runtimeTs"
					:error="state.error"
					@update:active="(value) => (state.activeOutput = value)"
					@runtime-error="(message) => (state.error = message)"
					@dismiss-error="() => (state.error = null)"
				/>
			</template>
		</SplitPane>
	</div>
</template>
