import { DEFAULT_INDENT } from "../../constants";
import { DTS_HEADER, VIRTUAL_CSS_MODULE_ID } from "./constants";

/**
 * Generates ambient module shims for virtual modules that cannot be expressed
 * as a standalone `.d.ts` of exports.
 *
 * Currently this covers `virtual:styleframe.css`, whose default export is the
 * generated stylesheet as a string. The typed `virtual:styleframe` module is
 * resolved via the tsconfig `paths` mapping to `styleframe.d.ts` instead — see
 * {@link generateTsconfig}.
 */
export function generateShims(): string {
	const i = DEFAULT_INDENT;

	return `${[
		DTS_HEADER,
		`declare module "${VIRTUAL_CSS_MODULE_ID}" {`,
		`${i}const css: string;`,
		`${i}export default css;`,
		"}",
	].join("\n")}\n`;
}
