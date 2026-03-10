import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { usePreElement } from "./usePreElement";

describe("usePreElement", () => {
	it("should create pre selector with nested code reset", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		usePreElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("pre");
		expect(css).toContain("var(--font-family--mono)");
		expect(css).toContain("display: block");
		expect(css).toContain("overflow-x: auto");
	});
});
