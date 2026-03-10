import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useFocusElement } from "./useFocusElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useFocusElement", () => {
	it("should create focus variable and selector", () => {
		const s = createInstance();
		const result = useFocusElement(s);

		expect(result.focusOutlineColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain(":focus-visible");
		expect(css).toContain("var(--focus--outline-color)");
	});

	it("should use custom outline values", () => {
		const s = createInstance();
		useFocusElement(s, {
			outlineWidth: "3px",
			outlineStyle: "dashed",
			outlineOffset: "4px",
		});

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("3px");
		expect(css).toContain("dashed");
		expect(css).toContain("4px");
	});
});
