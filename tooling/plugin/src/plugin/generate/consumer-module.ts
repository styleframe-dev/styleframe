import { transpile } from "@styleframe/transpiler";
import type { PluginGlobalState } from "../state";

/**
 * Generate the consumer module content using the transpiler.
 * Uses the TypeScript transpiler to generate proper recipe exports with serialized runtime data.
 */
export async function generateConsumerModule(
	state: PluginGlobalState,
): Promise<string> {
	if (!state.globalInstance) {
		return `// Styleframe not initialized`;
	}

	// Use the transpiler to generate TypeScript output for all recipes and selectors
	const result = await transpile(state.globalInstance, { type: "ts" });
	return result.files.find((f) => f.name === "index.ts")?.content ?? "";
}
