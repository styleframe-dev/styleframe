import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useDesignTokensPreset } from "../presets/useDesignTokensPreset";
import { useAddressElement } from "./useAddressElement";

describe("useAddressElement", () => {
	it("should create address selector", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useAddressElement(s);

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("address");
		expect(css).toContain("font-style: normal");
		expect(css).toContain("var(--spacing)");
	});
});
