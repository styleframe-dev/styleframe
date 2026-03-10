import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useOlElement } from "./useOlElement";

describe("useOlElement", () => {
	it("should create ol selector with nested list reset", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useOlElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("ol");
		expect(css).toContain("var(--spacing)");
		expect(css).toContain("var(--spacing--lg)");
	});
});
