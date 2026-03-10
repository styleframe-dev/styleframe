import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useUlElement } from "./useUlElement";

describe("useUlElement", () => {
	it("should create ul selector with nested list reset", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useUlElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("ul");
		expect(css).toContain("var(--spacing)");
		expect(css).toContain("var(--spacing--lg)");
	});
});
