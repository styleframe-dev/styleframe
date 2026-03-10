import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useHrElement } from "./useHrElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useHrElement", () => {
	it("should create hr variable and selector", () => {
		const s = createInstance();
		const result = useHrElement(s);

		expect(result.hrBorderColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("hr");
		expect(css).toContain("--hr--border-color");
		expect(css).toContain("border-width: 0");
		expect(css).toContain("var(--border-width)");
	});
});
