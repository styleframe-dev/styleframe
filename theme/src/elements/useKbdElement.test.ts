import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useKbdElement } from "./useKbdElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useKbdElement", () => {
	it("should create kbd variables and selector", () => {
		const s = createInstance();
		const result = useKbdElement(s);

		expect(result.kbdBackground).toBeDefined();
		expect(result.kbdColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("kbd");
		expect(css).toContain("--kbd--background");
		expect(css).toContain("--kbd--color");
		expect(css).toContain("var(--font-family--mono)");
		expect(css).toContain("display: inline-block");
	});
});
