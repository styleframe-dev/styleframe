import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useHeadingElement } from "./useHeadingElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useHeadingElement", () => {
	it("should create heading variable and selectors with defaults", () => {
		const s = createInstance();
		const result = useHeadingElement(s);

		expect(result.headingColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("h1, h2, h3, h4, h5, h6");
		expect(css).toContain("--heading--color");
		expect(css).toContain("font-weight: var(--font-weight--bold)");
		expect(css).toContain("line-height: var(--line-height--tight)");
		expect(css).toContain("var(--font-size--4xl)");
		expect(css).toContain("var(--font-size--md)");
	});

	it("should use custom heading sizes", () => {
		const s = createInstance();
		useHeadingElement(s, { sizes: { h1: "3rem" } });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("3rem");
	});
});
