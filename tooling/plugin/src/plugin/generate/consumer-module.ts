import type { TranspileOptions } from "@styleframe/transpiler";
import { transpile } from "@styleframe/transpiler";
import type { PluginGlobalState } from "../state";

/**
 * Generate the consumer module content using the transpiler.
 * Uses the TypeScript transpiler to generate proper recipe exports with serialized runtime data.
 */
export async function generateConsumerModule(
	state: PluginGlobalState,
	minify = false,
	minifyOptions?: TranspileOptions["minifyOptions"],
): Promise<string> {
	if (!state.globalInstance) {
		return `// Styleframe not initialized`;
	}

	const result = await transpile(state.globalInstance, {
		type: "ts",
		minify,
		minifyOptions,
	});
	return result.files.find((f) => f.name === "index.ts")?.content ?? "";
}
