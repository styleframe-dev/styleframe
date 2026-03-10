import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useCodeElement } from "./useCodeElement";

describe("useCodeElement", () => {
	it("should create code selector", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useCodeElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("code, samp");
		expect(css).toContain("var(--font-family--mono)");
	});
});
