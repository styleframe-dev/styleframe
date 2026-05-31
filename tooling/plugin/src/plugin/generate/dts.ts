import fs from "node:fs/promises";
import path from "node:path";
import { transpile } from "@styleframe/transpiler";
import { consola } from "consola";
import { DEFAULT_DTS_OUT_DIR } from "../constants";
import type { PluginGlobalState } from "../state";

export interface TypeGeneratorOptions {
	/** Directory where types will be written (default: .styleframe) */
	outDir?: string;
}

/**
 * Generates type declarations for the styleframe virtual modules.
 *
 * Delegates to the transpiler's `dts` mode, which produces two
 * concern-separated files written verbatim to the output directory:
 * - `styleframe.d.ts` — top-level exports for `virtual:styleframe`
 * - `shims.d.ts`      — ambient shim for `virtual:styleframe.css`
 *
 * Consumers resolve `virtual:styleframe` via a `compilerOptions.paths` mapping
 * to `styleframe.d.ts` (written by `styleframe init`, or injected by the Nuxt
 * module's `prepare:types` hook).
 */
export async function generateTypeDeclarations(
	state: PluginGlobalState,
	cwd: string,
	options: TypeGeneratorOptions = {},
	silent = false,
): Promise<void> {
	if (!state.globalInstance) {
		return;
	}

	const outDir = path.resolve(cwd, options.outDir ?? DEFAULT_DTS_OUT_DIR);

	// Ensure output directory exists
	await fs.mkdir(outDir, { recursive: true });

	// Use transpiler's dts mode to generate type declarations
	const result = await transpile(state.globalInstance, { type: "dts" });

	await Promise.all(
		result.files.map((file) =>
			fs.writeFile(path.join(outDir, file.name), file.content),
		),
	);

	if (!silent) {
		consola.success(`[styleframe] Generated type declarations.`);
	}
}
