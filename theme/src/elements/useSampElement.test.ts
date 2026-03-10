import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useSampElement } from "./useSampElement";

describe("useSampElement", () => {
	it("should create samp selector", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useSampElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("samp");
		expect(css).toContain("var(--font-family--mono)");
	});
});
