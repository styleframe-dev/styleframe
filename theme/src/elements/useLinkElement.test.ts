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
		expect(result.linkTextDecoration).toBeDefined();
		expect(result.linkHoverColor).toBeDefined();
		expect(result.linkHoverTextDecoration).toBeDefined();

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("var(--link--color)");
		expect(css).toContain("var(--link--text-decoration)");
		expect(css).toContain("var(--link--hover--color)");
		expect(css).toContain("var(--link--hover--text-decoration)");
	});

	it("should use custom link values", () => {
		const s = createInstance();
		const result = useLinkElement(s, {
			color: "#0066cc",
			textDecoration: "underline",
			hoverColor: "#004499",
			hoverTextDecoration: "none",
		});

		expect(result.linkColor.value).toBe("#0066cc");
		expect(result.linkTextDecoration.value).toBe("underline");
		expect(result.linkHoverColor.value).toBe("#004499");
		expect(result.linkHoverTextDecoration.value).toBe("none");
	});
});
