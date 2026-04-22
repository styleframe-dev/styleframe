<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
	button,
	pgThemeToggle,
	pgToolbar,
	pgToolbarSection,
} from "virtual:styleframe";
import { useTheme } from "@/state/theme";
import vueUrl from "virtual:pg-vue-url";
import runtimeUrl from "virtual:pg-runtime-url";
import BrandMark from "@/components/BrandMark.vue";
import EditorPane from "@/components/EditorPane.vue";
import Icon from "@/components/Icon.vue";
import OutputPane from "@/components/OutputPane.vue";
import SplitPane from "@/components/SplitPane.vue";
import StatusBar from "@/components/StatusBar.vue";
import type { EditorSelectionState } from "@/editor/codemirror";
import { runPipeline, type PipelineResult } from "@/pipeline/pipeline";
import { usePlaygroundState, type FileId } from "@/state/playground";

const state = usePlaygroundState();
const { mode, toggle } = useTheme();

const themeIcon = computed(() => {
	if (mode.value === "light") return "sun";
	if (mode.value === "dark") return "moon";
	return "monitor";
});

const themeLabel = computed(() => {
	if (mode.value === "light") return "Theme: Light";
	if (mode.value === "dark") return "Theme: Dark";
	return "Theme: Auto";
});

const fileLanguage: Record<FileId, string> = {
	config: "TypeScript",
	app: "Vue",
	component: "Vue",
};

const selection = ref<EditorSelectionState>({ line: 1, column: 1 });
const running = ref(false);

const dirty = computed<Record<FileId, boolean>>(() => ({
	config: state.files.config !== state.lastBuiltFiles.config,
	app: state.files.app !== state.lastBuiltFiles.app,
	component: state.files.component !== state.lastBuiltFiles.component,
}));

const canRun = computed(
	() => dirty.value.config || dirty.value.app || dirty.value.component || !!state.error,
);

const scanSummary = computed(() => {
	const scan = state.scan;
	if (!scan) return "";
	const matched = scan.diagnostics.filter((d) => d.factoryFound).length;
	const unmatched = scan.diagnostics.length - matched;
	const registered = scan.registered.length;
	const parts: string[] = [];
	parts.push(`scan: ${scan.diagnostics.length}`);
	if (registered > 0) parts.push(`+${registered}`);
	if (unmatched > 0) parts.push(`${unmatched} unmatched`);
	return parts.join(" · ");
});

function onSelectionChange(next: EditorSelectionState) {
	selection.value = next;
}

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
	state.scan = result.scan;
	state.error = null;
	state.lastBuiltFiles = { ...state.files };
}

async function run() {
	if (running.value) return;
	running.value = true;
	const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 400));
	try {
		await Promise.all([rebuild(), minDelay]);
	} finally {
		running.value = false;
	}
}

function onChange(payload: { id: FileId; value: string }) {
	state.files[payload.id] = payload.value;
}

function onKeyDown(event: KeyboardEvent) {
	const mod = event.metaKey || event.ctrlKey;
	if (mod && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "s") {
		event.preventDefault();
		void run();
	}
}

onMounted(() => {
	window.addEventListener("keydown", onKeyDown);
	void rebuild();
});

onBeforeUnmount(() => {
	window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
	<header :class="pgToolbar()">
		<div :class="pgToolbarSection()">
			<BrandMark />
		</div>
		<div :class="pgToolbarSection()">
			<button
				type="button"
				:class="pgThemeToggle()"
				:aria-label="themeLabel"
				:title="themeLabel"
				@click="toggle"
			>
				<Icon :name="themeIcon" :size="16" />
			</button>
			<button
				type="button"
				:class="button({ color: 'primary', variant: 'solid', size: 'sm' })"
				:disabled="running || !canRun"
				aria-label="Run (Ctrl/Cmd+S)"
				title="Run (Ctrl/Cmd+S)"
				@click="run"
			>
				<Icon :name="running ? 'spinner' : 'play'" :size="12" />
				<span>{{ running ? "Running…" : "Save and Run" }}</span>
			</button>
		</div>
	</header>
	<div style="flex: 1 1 auto; min-height: 0">
		<SplitPane :initial="50" :min="25" :max="75">
			<template #left>
				<EditorPane
					:files="state.files"
					:active="state.activeFile"
					:dirty="dirty"
					@update:active="(value) => (state.activeFile = value)"
					@change="onChange"
					@selection-change="onSelectionChange"
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
	<StatusBar
		:line="selection.line"
		:column="selection.column"
		:language="fileLanguage[state.activeFile]"
		indent="Spaces: 2"
		encoding="UTF-8"
		eol="LF"
		version="v1.0.0"
		:problems="state.error ? 1 : 0"
		:scan-summary="scanSummary"
	/>
</template>
