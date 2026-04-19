import { reactive, readonly } from "vue";
import configSample from "@/samples/styleframe.config.sample.ts?raw";
import appSample from "@/samples/App.sample.vue?raw";
import componentSample from "@/samples/Component.sample.vue?raw";

export type FileId = "config" | "app" | "component";
export type OutputId = "preview" | "css" | "js";

interface PlaygroundState {
	files: Record<FileId, string>;
	activeFile: FileId;
	activeOutput: OutputId;
	output: {
		css: string;
		runtimeTs: string;
		srcdoc: string;
	};
	error: string | null;
}

const state = reactive<PlaygroundState>({
	files: {
		config: configSample,
		app: appSample,
		component: componentSample,
	},
	activeFile: "config",
	activeOutput: "preview",
	output: {
		css: "",
		runtimeTs: "",
		srcdoc: "",
	},
	error: null,
});

export function usePlaygroundState() {
	return state;
}

export function usePlaygroundSnapshot() {
	return readonly(state);
}
