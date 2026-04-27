import { reactive, readonly } from "vue";
import type { ScanResult } from "@/pipeline/scanAndRegisterUtilities";
import configSample from "@/samples/styleframe.config.sample.ts?raw";
import appSample from "@/samples/App.sample.vue?raw";
import buttonSample from "@/samples/Button.sample.vue?raw";
import cardSample from "@/samples/Card.sample.vue?raw";

export type FileId = "config" | "app" | "card" | "button";
export type OutputId = "preview" | "css" | "js";

interface PlaygroundState {
	files: Record<FileId, string>;
	lastBuiltFiles: Record<FileId, string>;
	activeFile: FileId;
	activeOutput: OutputId;
	output: {
		css: string;
		runtimeTs: string;
		srcdoc: string;
	};
	scan: ScanResult | null;
	error: string | null;
}

const state = reactive<PlaygroundState>({
	files: {
		config: configSample,
		app: appSample,
		card: cardSample,
		button: buttonSample,
	},
	lastBuiltFiles: {
		config: configSample,
		app: appSample,
		card: cardSample,
		button: buttonSample,
	},
	activeFile: "config",
	activeOutput: "preview",
	output: {
		css: "",
		runtimeTs: "",
		srcdoc: "",
	},
	scan: null,
	error: null,
});

export function usePlaygroundState() {
	return state;
}

export function usePlaygroundSnapshot() {
	return readonly(state);
}
