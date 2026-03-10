import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useSelectionElement } from "./useSelectionElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useSelectionElement", () => {
	it("should create selection variables and selector", () => {
		const s = createInstance();
		const result = useSelectionElement(s);

		expect(result.selectionBackground).toBeDefined();
		expect(result.selectionColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("::selection");
		expect(css).toContain("var(--selection--background)");
		expect(css).toContain("var(--selection--color)");
	});
});
