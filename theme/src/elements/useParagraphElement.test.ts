import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useParagraphElement } from "./useParagraphElement";

describe("useParagraphElement", () => {
	it("should create paragraph selector", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useParagraphElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("p {");
		expect(css).toContain("margin-top: 0");
		expect(css).toContain("var(--spacing)");
	});
});
