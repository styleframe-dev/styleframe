import { DEFAULT_INDENT } from "../../constants";
import {
	DTS_SHIMS_FILENAME,
	DTS_TYPES_FILENAME,
	VIRTUAL_MODULE_ID,
} from "./constants";

/**
 * Generates a `tsconfig.json` that wires the generated declarations into a
 * TypeScript project. It is designed to be used as an extension point — a
 * project's own tsconfig extends it to inherit the wiring:
 *
 * ```jsonc
 * { "extends": "./.styleframe/tsconfig.json" }
 * ```
 *
 * - `compilerOptions.paths` maps `virtual:styleframe` imports to the generated
 *   exports in `styleframe.d.ts`. Inherited by extending configs that do not
 *   declare their own `paths`.
 * - `include` pulls in the ambient module shims (`virtual:styleframe.css`) so
 *   the base config is self-sufficient when compiled directly.
 *
 * Relative paths are resolved against this file's location (`.styleframe/`),
 * which is where the companion `styleframe.d.ts` and `shims.d.ts` are emitted.
 */
export function generateTsconfig(): string {
	const tsconfig = {
		compilerOptions: {
			paths: {
				[VIRTUAL_MODULE_ID]: [`./${DTS_TYPES_FILENAME}`],
			},
		},
		include: [`./${DTS_SHIMS_FILENAME}`],
	};

	return `${JSON.stringify(tsconfig, null, DEFAULT_INDENT)}\n`;
}
