import { buildSrcdoc, type BuildSrcdocResult } from "./buildSrcdoc";
import { compileVueSfc } from "./compileVueSfc";
import { evalUserConfig } from "./evalUserConfig";
import {
	scanAndRegisterUtilities,
	type ScanResult,
} from "./scanAndRegisterUtilities";
import { transformTs } from "./transformTs";
import { transpileStyleframe } from "./transpileStyleframe";

export interface PipelineInput {
	config: string;
	app: string;
	component: string;
	vueUrl: string;
	runtimeUrl: string;
}

export interface PipelineSuccess {
	ok: true;
	css: string;
	runtimeTs: string;
	configCode: string;
	appCode: string;
	componentCode: string;
	srcdoc: string;
	scan: ScanResult;
	revoke: () => void;
}

export interface PipelineFailure {
	ok: false;
	stage:
		| "config-transform"
		| "config-eval"
		| "scan"
		| "transpile"
		| "config-compile"
		| "vue"
		| "assemble";
	error: Error;
}

export type PipelineResult = PipelineSuccess | PipelineFailure;

function toError(value: unknown): Error {
	if (value instanceof Error) return value;
	return new Error(String(value));
}

export async function runPipeline(
	input: PipelineInput,
): Promise<PipelineResult> {
	let compiledConfig: string;
	try {
		compiledConfig = await transformTs(input.config);
	} catch (error) {
		return { ok: false, stage: "config-transform", error: toError(error) };
	}

	let instance: Awaited<ReturnType<typeof evalUserConfig>>;
	try {
		instance = await evalUserConfig(compiledConfig);
	} catch (error) {
		return { ok: false, stage: "config-eval", error: toError(error) };
	}

	let scan: ScanResult;
	try {
		scan = scanAndRegisterUtilities(instance, [
			{ content: input.app, filePath: "App.vue" },
			{ content: input.component, filePath: "Component.vue" },
		]);
	} catch (error) {
		return { ok: false, stage: "scan", error: toError(error) };
	}

	let transpiled: Awaited<ReturnType<typeof transpileStyleframe>>;
	try {
		transpiled = await transpileStyleframe(instance);
	} catch (error) {
		return { ok: false, stage: "transpile", error: toError(error) };
	}

	let configCode: string;
	try {
		configCode = await transformTs(transpiled.ts);
	} catch (error) {
		return { ok: false, stage: "config-compile", error: toError(error) };
	}

	let appCompiled: { code: string };
	let componentCompiled: { code: string };
	try {
		[appCompiled, componentCompiled] = await Promise.all([
			compileVueSfc(input.app, "App.vue"),
			compileVueSfc(input.component, "Component.vue"),
		]);
	} catch (error) {
		return { ok: false, stage: "vue", error: toError(error) };
	}

	let built: BuildSrcdocResult;
	try {
		built = buildSrcdoc({
			css: transpiled.css,
			configCode,
			appCode: appCompiled.code,
			componentCode: componentCompiled.code,
			vueUrl: input.vueUrl,
			runtimeUrl: input.runtimeUrl,
		});
	} catch (error) {
		return { ok: false, stage: "assemble", error: toError(error) };
	}

	return {
		ok: true,
		css: transpiled.css,
		runtimeTs: transpiled.ts,
		configCode,
		appCode: appCompiled.code,
		componentCode: componentCompiled.code,
		srcdoc: built.srcdoc,
		scan,
		revoke: built.revoke,
	};
}

export function debounce<Args extends unknown[]>(
	fn: (...args: Args) => void,
	waitMs: number,
): (...args: Args) => void {
	let handle: ReturnType<typeof setTimeout> | null = null;
	return (...args: Args) => {
		if (handle !== null) clearTimeout(handle);
		handle = setTimeout(() => {
			handle = null;
			fn(...args);
		}, waitMs);
	};
}
