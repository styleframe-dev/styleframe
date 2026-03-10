import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useMarkElement } from "./useMarkElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useMarkElement", () => {
	it("should create mark variables and selector", () => {
		const s = createInstance();
		const result = useMarkElement(s);

		expect(result.markBackground).toBeDefined();
		expect(result.markColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("mark");
		expect(css).toContain("--mark--background");
		expect(css).toContain("--mark--color");
	});
});
