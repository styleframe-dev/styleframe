import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useDlElement } from "./useDlElement";

describe("useDlElement", () => {
	it("should create dl, dt, dd selectors", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useDlElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("dl");
		expect(css).toContain("dt");
		expect(css).toContain("dd");
		expect(css).toContain("var(--font-weight--bold)");
	});
});
