import fs from "node:fs/promises";
import path from "node:path";
import { transpile } from "@styleframe/transpiler";
import { consola } from "consola";
import type { PluginGlobalState } from "../state";

export interface TypeGeneratorOptions {
	/** Directory where types will be written (default: .styleframe) */
	outDir?: string;
}

const DEFAULT_OUT_DIR = ".styleframe";

/**
 * Generates type declarations for virtual:styleframe module.
 * Uses the transpiler's dts mode to generate the types.
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

	const outDir = path.resolve(cwd, options.outDir ?? DEFAULT_OUT_DIR);

	// Ensure output directory exists
	await fs.mkdir(outDir, { recursive: true });

	// Use transpiler's dts mode to generate type declarations
	const result = await transpile(state.globalInstance, { type: "dts" });
	const content =
		result.files.find((f) => f.name === "index.d.ts")?.content ?? "";

	const outputPath = path.join(outDir, "styleframe.d.ts");
	await fs.writeFile(outputPath, content);

	if (!silent) {
		consola.success(`[styleframe] Generated type declarations.`);
	}
}
