import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useLinkElement } from "./useLinkElement";

function createInstance() {
	const s = styleframe();
	useDesignTokensPreset(s);
	return s;
}

describe("useLinkElement", () => {
	it("should create link variables and selector with hover", () => {
		const s = createInstance();
		const result = useLinkElement(s);

		expect(result.linkColor).toBeDefined();
		expect(result.linkHoverColor).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("var(--link--color)");
		expect(css).toContain("var(--link--hover-color)");
	});

	it("should use custom link colors", () => {
		const s = createInstance();
		const result = useLinkElement(s, {
			color: "#0066cc",
			hoverColor: "#004499",
		});

		expect(result.linkColor.value).toBe("#0066cc");
		expect(result.linkHoverColor.value).toBe("#004499");
	});
});
